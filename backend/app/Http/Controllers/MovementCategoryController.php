<?php

namespace App\Http\Controllers;


use App\Models\MovementCategoryModel;
use App\Models\PasswordResetModel;
use App\Services\UserService;
use App\Traits\ResponseHandlerTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class MovementCategoryController extends Controller
{

    /**
     * Add Responses methods
     */
    use ResponseHandlerTrait;

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getList(Request $request)
    {
        $filtros = $request->only(array('name'));
        $result = MovementCategoryModel::where($filtros)->get();
        return $this->successResponse($result);

    }


    /**
     * Busca en la base de datos la categoria de movimiento con el id provisto.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */


    public function getOne(Request $request, $id)
    {
        $entry = MovementCategoryModel::where('id', $id)->first();
        return $this->successResponse($entry);
    }


    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse|mixed
     */
    public function create(Request $request)
    {
        // Declare Request Parameters Validation Rules
        $requestRules = [
            'name' => 'required'
        ];

        // Gather Request Input.
        $requestInput = $request->only(
            'name'
        );

        // Evaluate Request Input, If it is not valid, Send back a Bad Request Response.
        $validator = Validator::make($requestInput, $requestRules);
        if ($validator->fails()) {
            return $this->badRequestResponse(self::BAD_REQUEST_MESSAGE, $validator->errors());

        }
        $result = MovementCategoryModel::create(['name' => $requestInput['name']]);
        return $this->successResponse($result);

    }

    public function update(Request $request, $id) {
        // Declare Request Parameters Validation Rules
        $requestRules = [
            'name' => 'required'
        ];

        // Gather Request Input.
        $requestInput = $request->only(
            'name'
        );

        // Evaluate Request Input, If it is not valid, Send back a Bad Request Response.
        $validator = Validator::make($requestInput, $requestRules);
        if ($validator->fails()) {
            return $this->badRequestResponse(self::BAD_REQUEST_MESSAGE, $validator->errors());

        }

        if(!$entry = MovementCategoryModel::where('id', $id)->first()) {
            return $this->badRequestResponse('el rubro no existe');
        }

        $entry->name = $requestInput['name'];
        $entry->save();
        return $this->successResponse($entry);
    }

    /**
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse|mixed
     */
    public function delete(Request $request, $id) {
        if(!$entry = MovementCategoryModel::where('id', $id)->first()) {
            return $this->badRequestResponse('el rubro no existe');
        }

        $entry->delete();
        return $this->successResponse($entry->id);

    }

}