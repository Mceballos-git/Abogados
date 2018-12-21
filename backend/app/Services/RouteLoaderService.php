<?php

namespace App\Services;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\App;

/**
 * Class RouteLoaderService
 * Load Predefined Routes
 */
class RouteLoaderService
{

    /**
     * App Router
     * @var Router
     */
    protected $router;

    /**
     * @var FileAccessService
     */
    protected $fileAccessService;

    /**
     * RouteLoaderService constructor.
     * @param Router $router
     * @param FileAccessService $fas
     */
    public function __construct($fileLoader, $router)
    {
        $this->fileAccessService = $fileLoader;
        $this->router = $router;
    }

    /**
     * Load Route Config Files and Create endpoints.
     */
    public function loadRoutes()
    {
        $this->_setAPIRoutes();
    }


    /**
     * Load Routes Callback.
     */
    private function _setAPIRoutes()
    {
        // Get config files.
        $routingConfigFiles = $this->fileAccessService->getFiles(
            FileAccessService::CATEGORY_ROUTING_CONFIG_FILES
        );

        foreach ($routingConfigFiles as $prefix => $routeDivision) {
            if (!is_array($routeDivision)) {
                continue;
            }

            $this->_loadRouteGroup($routeDivision, $prefix);
        }
    }

    /**
     * Load and enable route
     * @param $routeGroup
     * @param $prefix
     * @return bool
     */
    private function _loadRouteGroup($routeGroup, $prefix)
    {
        if (!count($routeGroup)) {
            return false;
        }

        foreach ($routeGroup as $route) {
            $endpointConfig = array(
                'as' => $prefix . '/' . $route->identifier,
                'middleware' => $this->_getMiddleWare($route),
                'uses' => "{$route->controller}@{$route->action}"
            );

            $endpoint = '/' . strtolower($prefix) . $route->endpoint;
            $methods = $this->_getMethods($route->requestType);
            $this->router->addRoute($methods, $endpoint, $endpointConfig);
        }
        return true;
    }


    /**
     * @param $requestTypeValue
     * @return array
     */
    private function _getMethods($requestTypeValue)
    {
        $methods = array('OPTIONS');
        if (is_array($requestTypeValue)) {
            return array_merge($methods, $requestTypeValue);
        }
        array_push($methods, $requestTypeValue);
        return $methods;
    }

    /**
     * Build an array with middleware configuration for given route config.
     * @param $routeConfig
     * @return array
     */
    private function _getMiddleware($routeConfig)
    {

        // Define default middlewares.
        $middleware = array(
            'App\\Http\\Middleware\\CorsMiddleware:1'
        );

        // Add Authentication middleware.
        if ($routeConfig->authenticationMiddleware === 'true') {
            array_push($middleware, 'App\\Http\\Middleware\\Authenticate:1');
        }
        return $middleware;
//        $purifyValues = isset($routeConfig->purifyValues) ? $routeConfig->purifyValues : "false";
//        return array(
//            "cors:1",
//            "authentication:{$routeConfig->authenticationMiddleware}",
//            "authorization:{$routeConfig->authorizationMiddleware}",
//            "validation:{$routeConfig->validationMiddleware},{$purifyValues}"
//        );
    }
}
