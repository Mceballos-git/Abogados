<?php

namespace App\Http\Controllers;

use App\Models\UserModel;
use App\Traits\ResponseHandlerTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthenticationController extends Controller
{
    use ResponseHandlerTrait;
    const SUCCESS_LOGGED_IN_SUCCESSFULLY = 'Logged in successfully';
    const SUCCESS_LOGGED_OUT_SUCCESSFULLY = 'Logged out successfully';
    const ERROR_LOGIN_FAILED = 'Authentication Attempt Failed: Invalid Credentials';

    /**
     * AuthenticationController constructor.
     */
    public function __construct()
    {

    }

    /**
     * Attempt to login
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        // Obtain Request posted values.
        $email = $request->input('email');
        $password = $request->input('password');
        $token = Auth::attempt(['email' => $email, 'password' => $password, 'active' => 1]);

        // There was an authentication Failure.
        if (!$token) {
            return $this->unauthorizedResponse(self::ERROR_LOGIN_FAILED);
        }

        // Login was successful, send token back to Client.
        $response = new \stdClass();
        $response->message = self::SUCCESS_LOGGED_IN_SUCCESSFULLY;
        $response->result = true;
        $response->token = $token;

        // Send Json Response back to client.
        return $this->successResponse($response);
    }

    /**
     * Invalidate Session.
     *
     * @param Request $request
     */
    public function logout(Request $request)
    {
        // Invalidate Token.
        Auth::invalidate(true);

        // Create new object and send it as json
        $response = new \stdClass();
        $response->message = self::SUCCESS_LOGGED_OUT_SUCCESSFULLY;
        $response->result = true;

        // send Json Response back to the client.
        return $this->successResponse($response);
    }
}
