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
use App\Services\DataTableService;


class MovementCategoryController extends Controller
{
    /**
     * @var DataTableService
     */
    protected $dataTableService;

    /**
     * Add Responses methods
     */
    use ResponseHandlerTrait;

    public function __construct(DataTableService $dataTableService) {
        $this->dataTableService = $dataTableService;
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getList(Request $request)
    {
        $params = $request->all();
        return $this->successResponse($this->dataTableService->getMovementsCategoriesDataTableList($params));
    }

    public function getMovementCategorySelectSearch(Request $request)
    {
        $filtro = $request->input('filtro');
        MovementCategoryModel::select('name')->where('campo', 'like', 'valor%');
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