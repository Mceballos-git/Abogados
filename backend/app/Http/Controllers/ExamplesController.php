<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ExamplesController extends BaseController
{
    const MESSAGE_RESOURCE_DELETED = 'Resource deleted successfully.';


    /**
     * Example for handling POST request to api/examples
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Request $request)
    {
        // The pre Execute will bind The request to the controller
        // This will allow us to work with the request using the RequestHelperTrait.
        $this->preExecute($request);

        // Do not access request parameters Directly
        // Use the accessor methods defined on RequestHelperTrait.

        // Get all Body parameters at once.
        $params = $this->getRequestParams();

        // Grab the information. process the Request using a service.
        // Then generate an array with the resultant information (data, messages)
        // and send it back as a Json.
        $result = array(
            'id' => 1, 'type' => $params['type'], 'example' => $params['example']
        );
        return $this->successResponse($result);
    }

    /**
     * Example for handling GET request to api/examples
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getList(Request $request)
    {
        // The pre Execute will bind The request to the controller
        // This will allow us to work with the request using the RequestHelperTrait.
        $this->preExecute($request);

        // Do not access request parameters Directly
        // Use the accessors methods defined on RequestHelperTrait.

        // Grab the information. process the Request using a service.
        // Then generate an array with the resultant information (data, messages)
        // and send it back as a Json.
        $data = array(
            array('id' => 1, 'type' => 'type', 'example' => 'example'),
            array('id' => 2, 'type' => 'type', 'example' => 'example'),
            array('id' => 3, 'type' => 'type', 'example' => 'example'),
            array('id' => 4, 'type' => 'type', 'example' => 'example'),
        );
        return $this->successResponse($data);
    }

    /**
     * Example for handling GET request to api/examples/{id}
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getOne(Request $request)
    {
        // The pre Execute will bind The request to the controller
        // This will allow us to work with the request using the RequestHelperTrait.
        $this->preExecute($request);

        // Do not access request parameters Directly
        // Use the accessor methods defined on RequestHelperTrait.

        // Get Route params as an array.
        $routeParams = $this->getRequestRouteParams();

        // Grab the information. process the Request using a service.
        // Then generate an array with the resultant information (data, messages)
        // and send it back as a Json.
        $response = array(
            'id' => $routeParams['id'], 'type' => 'type', 'example' => 'example'
        );
        return $this->successResponse($response);
    }

    /**
     * Example to handle PUT request to api/examples/{id}
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request)
    {
        // The pre Execute will bind The request to the controller
        // This will allow us to work with the request using the RequestHelperTrait.
        $this->preExecute($request);

        // Do not access request parameters Directly
        // Use the accessor methods defined on RequestHelperTrait.

        // Get Route params as an array.
        $routeParams = $this->getRequestRouteParams();

        // Get Body params as an array
        $bodyParams = $this->getRequestParams();

        // Grab the information. process the Request using a service.
        // Then generate an array with the resultant information (data, messages)
        // and send it back as a Json.
        $response = array(
            'id' => $routeParams['id'], 'type' => $bodyParams['type'],
            'example' => $bodyParams['example']
        );

        return $this->successResponse($response);
    }

    /**
     * Example to handle PATCH request to api/examples/{id}
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function patch(Request $request)
    {
        // The pre Execute will bind The request to the controller
        // This will allow us to work with the request using the RequestHelperTrait.
        $this->preExecute($request);

        // Do not access request parameters Directly
        // Use the accessor methods defined on RequestHelperTrait.

        // Get Route params as an array.
        $routeParams = $this->getRequestRouteParams();

        // Get Body params as an array
        $bodyParams = $this->getRequestParams();

        // Grab the information. process the Request using a service.
        // Then generate an array with the resultant information (data, messages)
        // and send it back as a Json.
        $response = array(
            'id' => $routeParams['id'], 'type' => 'type',
            'example' => $bodyParams['example']
        );

        return $this->successResponse($response);
    }

    /**
     * Example to handle DELETE request to api/examples/{id}
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete(Request $request)
    {
        // The pre Execute will bind The request to the controller
        // This will allow us to work with the request using the RequestHelperTrait.
        $this->preExecute($request);

        // Do not access request parameters Directly
        // Use the accessor methods defined on RequestHelperTrait.

        // Get Route params as an array.
        // $routeParams = $this->getRequestRouteParams();

        // then Deleting using the id on $routeParams['id'];

        // Grab the information. process the Request using a service.
        // Then generate an array with the resultant information (data, messages)
        // and send it back as a Json.
        $resultData = array('result' => true, 'message' => self::MESSAGE_RESOURCE_DELETED);
        return $this->successResponse($resultData);
    }
}
