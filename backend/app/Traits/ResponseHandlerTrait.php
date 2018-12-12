<?php

namespace App\Traits;


/**
 * This trait will handle all the HTTP response needed in the application. This way, will have
 * centralized control about codes, names and return types.
 */
trait ResponseHandlerTrait
{
    /**
     * Format and return a JSON response with Corresponding HTTP code
     * If no status has been set it defaults to "InternalError" response type.
     * @param array $data
     * @param string $statusKey
     * @return string
     */
    protected function jsonResponse($data = array(), $statusCode)
    {
        return response()->json($data, $statusCode);
    }

    /**
     * @param $data
     * @return \Illuminate\Http\JsonResponse
     */
    protected function successResponse($data = array())
    {
        return response()->json($data, 200);
    }

    /**
     * Create a Response with standard format for errors.
     *
     * @param $title
     * @param $message
     * @param $data
     * @param $statusCode
     * @return \Illuminate\Http\JsonResponse
     */
    protected function returnErrorResponse($title, $message, $data, $statusCode)
    {
        $responseData = array(
            'error' => $title,
            'details' => [
                'message' => $message,
                'data' => $data,
            ],
            'status_code' => $statusCode
        );
        return response()->json($responseData, $statusCode);
    }

    /**
     * Return a Bad Request response with errors information
     * @param $errors
     * @return mixed
     */
    protected function badRequestResponse($msg = '', $data = array())
    {
        return $this->returnErrorResponse('400 - BAD REQUEST ', $msg, $data, 400);
    }

    /**
     * Request is good, but cannot be processed due invalid content. (validation errors,etc)
     * @param $errors
     * @return mixed
     */
    protected function unprocessableRequest($msg = '', $data = array())
    {
        return $this->returnErrorResponse('422 - UNPROCESSABLE ENTITY ', $msg, $data, 422);
    }

    /**
     * @param $data
     * @return \Illuminate\Http\JsonResponse
     */
    protected function unauthorizedResponse($msg = '', $data = array())
    {
        return $this->returnErrorResponse('401 - UNAUTHORIZED', $msg, $data, 401);
    }

    /**
     * @param $data
     * @return \Illuminate\Http\JsonResponse
     */
    protected function notFoundResponse($msg = '', $data = array())
    {
        return $this->returnErrorResponse('401 - NOT FOUND', $msg, $data, 404);
    }

    /**
     * @param $data
     * @return \Illuminate\Http\JsonResponse
     */
    protected function forbiddenResponse($msg = '', $data = array())
    {
        return $this->returnErrorResponse('403 - FORBIDDEN', $msg, $data, 403);
    }

    /**
     * @param $data
     * @return \Illuminate\Http\JsonResponse
     */
    protected function internalErrorResponse($msg = '', $data = array())
    {
        return $this->returnErrorResponse('500 - INTERNAL ERROR', $msg, $data, 500);
    }

    /**
     * @param $data
     * @return \Illuminate\Http\JsonResponse
     */
    protected function methodNotAllowedResponse($data = array())
    {
        return $this->returnErrorResponse('405 - METHOD NOT ALLOWED', $msg, $data, 405);
    }

}
