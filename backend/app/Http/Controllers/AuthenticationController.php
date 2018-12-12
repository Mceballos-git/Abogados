<?php

namespace App\Http\Controllers;



use App\Traits\ResponseHandlerTrait;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthenticationController extends Controller
{
    use ResponseHandlerTrait;

    const ERROR_LOGIN_FAILED = ' Authentication Attempt Failed: Invalid Credentials';


    /**
     * AuthenticationController constructor.
     */
    public function __construct()
    {
        User::create([
            'name' => 'ezequiel',
            'email' => 'ezequiel.carrizo.ac@gmail.com',
            'password' => Hash::make('shikaka'),
        ]);die();

    }

    /**
     * Attempt to login
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $email = $request->input('email');
        $password = $request->input('password');
        $token = Auth::attempt(['email' => $email, 'password' => $password]);

        // There was an authentication Failure.
        if (!$token) {
            return $this->unauthorizedResponse(self::ERROR_LOGIN_FAILED);
        }

        // Login was successful send token back to Client.
        $response = array(
          'message' => 'Logged in successfully',
          'result' => true,
          'token' => $token
        );

        return $this->successResponse($response);
    }

    /**
     * Invalidate Session.
     *
     * @param Request $request
     */
    public function logout(Request $request)
    {
        Auth::invalidate(true);
        $response = array(
            'message' => 'Logged out Successfully',
            'result' => true
        );
        return $this->successResponse($response);
    }



}
