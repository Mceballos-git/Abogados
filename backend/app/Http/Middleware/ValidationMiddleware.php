<?php

namespace App\Http\Middleware;

use App\Services\FileAccessService;
use App\Traits\RequestHelperTrait;
use App\Traits\ResponseHandlerTrait;
use \Illuminate\Support\Facades\Validator;
use \Illuminate\Http\Request;
use Mews\Purifier\Purifier;

/**
 * Class ValidationMiddleware
 * @package App\Http\Middleware
 */
class ValidationMiddleware
{
    use ResponseHandlerTrait;
    use RequestHelperTrait;

    /**
     * @var Purifier
     */
    protected $purifier;

    /**
     * @var FileAccessService
     */
    protected $fileAccessService;

    /**
     * ValidationMiddleware constructor.
     * @param Purifier $purifier
     * @param FileAccessService $fileAccessService
     */
    public function __construct(Purifier $purifier, FileAccessService $fileAccessService)
    {
        $this->purifier = $purifier;
        $this->fileAccessService = $fileAccessService;
    }

    /**
     * Handle an incoming request
     * @param  Request $request $request
     * @param  mixed $next
     * @param  Bool $validate
     * @return mixed
     *
     * @SuppressWarnings(PHPMD.BooleanArgumentFlag)
     */
    public function handle($request, $next, $purifyvalues = false)
    {
        $this->setRequest($request);
        $routeIdentifier = $this->getRouteIdentifier();
        $config = $this->fileAccessService->getFromCache(
            FileAccessService::CATEGORY_ROUTING_CONFIG_FILES,
            $routeIdentifier,
            true
        );

        // Execute validation
        $validationRules = $this->getDecoratedValidationRules($config->validationRules);
        $validationResult = $this->validate($validationRules);

        // Validation is successful continue execution!
        if ($validationResult['result'] === true) {
            $this->purifyValues($purifyvalues, $request);
            return $next($request);
        }

        // Validation failed. Inform about bad request.
        return $this->badRequestResponse($validationResult['errors']);
    }

    /**
     * Get decorated Validation Rule
     *
     * @param $validationRules
     * @return mixed
     */
    private function getDecoratedValidationRules($validationRules)
    {
        $routeParams = $this->getRequestRouteParams();
        foreach((array) $validationRules as $key => $validationRule) {
            if (strpos($validationRule, '{id}') !== false) {
                $id = $routeParams['id'];
                $validationRules->{$key} = str_replace('{id}', $id, $validationRule);
            }
        }
        return $validationRules;
    }

    /**
     * @param $purifyValues
     * @param $request
     */
    private function purifyValues($purifyValues, Request $request)
    {
        if (!$purifyValues) {
            return false;
        }

        $requestParameters = $this->getRequestParams();
        foreach ($requestParameters as &$value) {
            $value = $this->purifier->clean($value);
        }
        $request->replace($requestParameters);
    }

    /**
     * Do validation.
     * @param $validationRules
     * @return array
     *
     * @SuppressWarnings(PHPMD.StaticAccess)
     */
    private function validate($validationRules)
    {
        $default = array('result' => true);

        // Start request validation
        $params = $this->getRequestParams();
        $validator = Validator::make($params, (array) $validationRules);

        // If there is no error let continue with normal execution.
        if (!$validator->fails()) {
            return $default;
        }

        // There was an error while validating, set information.
        $default['result'] = false;
        $default['errors'] = $validator->errors();
        return $default;
    }
}
