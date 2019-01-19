<?php

namespace App\Http\Controllers;


use App\Models\PasswordResetModel;
use App\Services\UserService;
use App\Traits\ResponseHandlerTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserSecurityController extends Controller
{
    /**
     * Wording
     */
    const FORGOT_PASSWORD_SUCCESS_MESSAGE = 'An email was sent';
    const FORGOT_PASSWORD_INVALID_EMAIL = 'Provided Email do not match any operator in existing records.';
    const RESET_PASSWORD_INVALID_TOKEN = 'Provided Token is Invalid or has Expired';
    const RESET_PASSWORD_SUCCESS = 'Password Reset Succeed!';
    const CHANGE_PASSWORD_INVALID_CURRENT_PASSWORD = 'current_password is invalid';
    const REQUEST_SUCCESS_CHANGE_PASSWORD = 'Password Changed Successfully';

    /**
     * Add Responses methods
     */
    use ResponseHandlerTrait;

    /**
     * @var UserService
     */
    protected $userService;

    /**
     * UserSecurityController constructor.
     * @param UserService $userService
     */
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * Change Password of logged account.
     * Roles: Operator
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse|mixed
     */
    public function changePassword(Request $request)
    {
        // Declare Request Parameters Validation Rules
        $requestRules = [
            'current_password' => 'required',
            'new_password' => 'min:5|confirmed|different:current_password',
            'new_password_confirmation' => 'required_with:password|same:new_password'
        ];

        // Gather Request Input.
        $requestInput = $request->only(
            'current_password',
            'new_password',
            'new_password_confirmation'
        );

        // Evaluate Request Input, If it is not valid, Send back a Bad Request Response.
        $validator = Validator::make($requestInput, $requestRules);
        if ($validator->fails()) {
            return $this->badRequestResponse(self::BAD_REQUEST_MESSAGE, $validator->errors());
        }

        // Evaluate if current_password is valid for the logged account
        $user = Auth::user();
        if (!Hash::check($requestInput['current_password'], $user->password)) {
            return $this->badRequestResponse(self::CHANGE_PASSWORD_INVALID_CURRENT_PASSWORD);
        }

        // Save new password
        $user->password = Hash::make($requestInput['new_password']);
        $user->save();

        // Create Response and send it as json.
        $response = new \stdClass();
        $response->message = self::REQUEST_SUCCESS_CHANGE_PASSWORD;
        $response->result = true;
        return $this->successResponse($response);
    }


    /**
     * Forgot password action.
     * Roles: Guest
     * @param Request $request
     */
    public function forgotPassword(Request $request)
    {
        // Declare Request Parameters Validation Rules
        $requestRules = [
            'email' => 'required|email'
        ];

        // Gather Request Input.
        $requestInput = $request->only(
            'email'
        );

        // Evaluate Request Input, If it is not valid, Send back a Bad Request Response.
        $validator = Validator::make($requestInput, $requestRules);
        if ($validator->fails()) {
            return $this->badRequestResponse(self::BAD_REQUEST_MESSAGE, $validator->errors());
        }

        // Check if There is an existing user with the provided email
        if (!$user = $this->userService->getActiveUserByEmail($requestInput['email'])) {
            return $this->badRequestResponse(self::FORGOT_PASSWORD_INVALID_EMAIL);
        }

        // Send email
        try {
            $this->userService->sendPasswordResetEmail($user);
        } catch(\Exception $e) {
            // el mail no se envio.
        }

        // Send Response back to client
        $response = new \stdClass();
        $response->message = self::FORGOT_PASSWORD_SUCCESS_MESSAGE;
        $response->result = true;
        return $this->successResponse($response);
    }

    /**
     * Reset password action.
     *
     * Roles: Guest
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse|mixed
     */
    public function resetPassword(Request $request)
    {
        // Declare Request Parameters Validation Rules
        $requestRules = [
            'reset_token' => 'required',
            'new_password' => 'min:5|required',
            'new_password_confirmation' => 'required_with:password|same:new_password'
        ];

        // Gather Request Input.
        $requestInput = $request->only('reset_token', 'new_password', 'new_password_confirmation');

        // Evaluate Request Input. If it is not valid, Send back a Bad Request Response.
        $validator = Validator::make($requestInput, $requestRules);
        if ($validator->fails()) {
            return $this->badRequestResponse(self::BAD_REQUEST_MESSAGE, $validator->errors());
        }

        // Evaluate if there is a valid reset token
        $resetToken = PasswordResetModel::where('token', $requestInput['reset_token'])->first();
        if (!$resetToken || $resetToken->hasExpired()) {
            return $this->badRequestResponse(self::RESET_PASSWORD_INVALID_TOKEN);
        }

        // Get User and save new changes.
        $user = $resetToken->user;
        $user->password = Hash::make($requestInput['new_password']);
        $user->save();

        // Destroy Token so it cannot be reused
        $resetToken->delete();

        // Send Response back to the client.
        $response = new \stdClass();
        $response->result = true;
        $response->message = self::RESET_PASSWORD_SUCCESS;
        return $this->successResponse($response);
    }

    /**
     * Can only be executed by admin Role.
     * Admin Required certain operator to be Activated
     * @param Request $request
     */
    public function activateUser(Request $request)
    {
        // Obtain Request Information from POST
        $userId = $request->input('user_id');
        $user = UserModel::where('id', $userId);
        $user->active = 1;
        $user->save();
        return $this->successResponse($user);
    }

    /**
     * Roles: can only be executed by admin role.
     * @param Request $request
     *
     */
    public function deactivateUser(Request $request)
    {
        // Obtain Request Information from POST
        $userId = $request->input('user_id');
        $user = UserModel::where('id', $userId);
        $user->active = 0;
        $user->save();
        return $this->successResponse($user);
    }
}