<?php

namespace App\Http\Controllers;


use App\Models\UserModel;
use App\Services\UserService;
use App\Traits\ResponseHandlerTrait;
use Illuminate\Http\Request;

/**
 * Class UserController
 * @package App\Http\Controllers
 */
class UserController extends Controller
{

    /**
     * @var UserService
     */
    protected $userService;

    /**
     * Add Responses methods
     */
    use ResponseHandlerTrait;

    /**
     * UserController constructor.
     * @param UserService $userService
     */
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * Get user list.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getList()
    {
        return $this->successResponse(
            UserModel::get()
        );

    }

    /**
     * Get user details by id
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getOne($id)
    {
        $entry = UserModel::where('id', $id)->first();
        $entry->role_list = json_decode($entry->role_list);
        return $this->successResponse($entry);
    }


    /**
     * Create an user
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse|mixed
     */
    public function create(Request $request)
    {
        // Obtain Request Information from POST
        $requestData = $request->only(array(
            "email",
            "role_list",
            "active",
            "first_name",
            "last_name",
            "degree",
            "position",
            "shift_start",
            "shift_end",
            "username"
        ));

        // Transform Data or add additional parameters.
        $requestData['role_list'] = json_encode($requestData['role_list']);
        $requestData['password'] = UserModel::DEFAULT_PASSWORD;

        // Create new User.
        $newUser = UserModel::create($requestData);

        // Send Invitation Email
        try {
            $this->userService->sendInvitationEmail($newUser);
        } catch(\Exception $e) {
            // el mail no se envio.
        }

        // Send Message back to UI.
        return $this->successResponse($newUser);
    }


    /**
     * Update an user
     *
     * @param Request $request
     * @param $id
     * @return bool
     */
    public function update(Request $request, $id)
    {
        // Obtain Request Information from POST
        $requestData = $request->only(array(
            "email",
            "role_list",
            "active",
            "first_name",
            "last_name",
            "degree",
            "position",
            "shift_start",
            "shift_end"
        ));

        // Transform Data or add additional parameters.
        $requestData['role_list'] = json_encode($requestData['role_list']);
        UserModel::where('id', $id)->update($requestData);
        return $this->successResponse(UserModel::where('id', $id)->first());
    }

    /**
     * @param $id
     * @return mixed
     */
    public function delete($id)
    {
        return $this->successResponse(array('id' => UserModel::where('id', $id)->delete()));
    }

}