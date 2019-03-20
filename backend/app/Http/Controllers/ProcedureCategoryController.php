<?php

namespace App\Http\Controllers;

//use App\Models\ClientModel;
//use App\Models\MovementModel;
//use App\Models\MovementTypeModel;
use App\Models\ProcedureCategoryModel;
//use App\Models\TurnModel;
use Illuminate\Http\Request;
use App\Traits\ResponseHandlerTrait;
//use Nexmo\Client;
use App\Services\DataTableService;


class ProcedureCategoryController extends Controller
{
    /**
     * @var DataTableService
     */
    protected $dataTableService;

    /**
     * ProcedureCategoryController constructor.
     * @param DataTableService $dataTableService
     */
    public function __construct(DataTableService $dataTableService) {
        $this->dataTableService = $dataTableService;
    }

    /**
     * Add Responses methods
     */
    use ResponseHandlerTrait;

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Request $request)
    {
        // Obtain Request Information from POST
        $requestData = $request->only(
            'name'
        );

        $result = ProcedureCategoryModel::create([
            'name' => $requestData['name']
        ]);

        return $this->successResponse($result);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getList(Request $request)
    {
        $params = $request->all();
        return $this->successResponse($this->dataTableService->getProcedureCategoryDataTableList($params));
    }

    /**
     * Example for handling GET request to api/examples/{id}
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getOne($id)
    {
        $entry = ProcedureCategoryModel::where('id', $id)->first();
        return $this->successResponse($entry);
    }

    /**
     * Example to handle PUT request to api/examples/{id}
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $requestData = $request->only(array(
            'name'
        ));
        ProcedureCategoryModel::where('id', $id)->update($requestData);
        return $this->successResponse(ProcedureCategoryModel::where('id', $id)->first());
    }

    /**
     * Example to handle DELETE request to api/examples/{id}
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($id)
    {
        return $this->successResponse(array('id' => ProcedureCategoryModel::where('id', $id)->delete()));

    }


}
