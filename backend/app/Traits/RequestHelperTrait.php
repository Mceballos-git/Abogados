<?php

namespace App\Traits;

use Illuminate\Http\Request;

/**
 * Simplified interface to work with request objects.
 * Trait RequestHelperTrait
 * @package App\Traits
 */
trait RequestHelperTrait
{
    /**
     * @var Request
     */
    protected $request;

    /**
     * Request setter
     * @param Request $request
     */
    public function setRequest(Request $request)
    {
        $this->request = $request;
    }

    /**
     * Get Route as
     * @return mixed
     */
    protected function getRouteIdentifier()
    {
        $route = $this->getRequestRoute();
        return $route->action['as'];
    }

    /**
     * Getter for request cookies
     * @return mixed
     */
    protected function getRequestCookies()
    {
        return $this->request->cookie();
    }

    /**
     * Get all request params
     * @return mixed
     */
    protected function getRequestParams()
    {
        return $this->request->all();
    }

    /**
     * Get request route.
     * @return mixed
     */
    protected function getRequestRoute()
    {
        return $this->request->route();
    }

    /**
     * Get Route parameters
     * @return mixed
     */
    protected function getRequestRouteParams()
    {
        return $this->request->route()[2];
    }

    /**
     * Get Request IP Address
     * @return mixed
     */
    protected function getRequestIpAddress()
    {
        return $this->request->ip();
    }

    /**
     * Get Single Request parameter by its identifier.
     * @param $key
     * @return mixed
     */
    protected function getRequestInput($key)
    {
        return $this->request->input($key);
    }

    /**
     * Get Only request params.
     *
     * @param $array
     * @return array
     */
    protected function getOnlyRequestParams($array)
    {
        return $this->request->only($array);
    }

    /**
     * Get single request parameter using get method, if not found, apply default value.
     *
     * @param $key
     * @param $default
     * @return mixed
     */
    protected function getRequestParam($key, $default)
    {
        return $this->request->get($key, $default);
    }

    /**
     * @return array|string
     */
    protected function getRequestHeaders()
    {
        return $this->request->header();
    }

    /**
     * Request check if is method
     * @param String $isMethod
     */
    public function isRequestMethod($method)
    {
        return $this->request->isMethod($method);
    }
}
