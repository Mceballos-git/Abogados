<?php

namespace App\Http\Controllers;

use App\Models\MovementModel;
use App\Services\ClientService;
use App\Models\ClientModel;
use App\Services\DataTableService;
use Illuminate\Http\Request;
use App\Traits\ResponseHandlerTrait;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class MovementController extends Controller
{
    /**
     * @var ClientService
     */
    protected $clientService;

    /**
     * @var DataTableService
     */
    protected $dataTableService;

    /**
     * MovementController constructor.
     * @param ClientService $clientService
     * @param DataTableService $dataTableService
     */
    public function __construct(
        ClientService $clientService,
        DataTableService $dataTableService
    ) {
        $this->clientService = $clientService;
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
            'datetime',
            'amount',
            'concept',
            'movement_type_id',
            'movement_category_id',
            'client_id',
            'deleted_by'
        );

        $result = MovementModel::create([
            'datetime' => $requestData['datetime'],
            'amount' => $requestData['amount'],
            'concept' => $requestData['concept'],
            'movement_type_id' => $requestData['movement_type_id'],
            'user_id' => $user = Auth::user()->id,
            'movement_category_id' => $requestData['movement_category_id'],
            'client_id' => $requestData['client_id'],
            'deleted_by' => null,
        ]);

        // update balance
        $this->clientService->updateClientBalance($requestData['client_id']);

        return $this->successResponse($result);
    }

    /**
     * @param $id
     * @return mixed
     */
    public function getMovementsByClient($id)
    {
        return MovementModel::where('client_id', $id)
            ->with(['client', 'movementCategory', 'movementType'])
            ->orderBy('id', 'desc')->get();
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getList(Request $request)
    {
        $params = $request->all();
        return $this->successResponse($this->dataTableService->getMovementsDataTableList($params));
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTotalBalance(Request $request)
    {
        $params = $request->all();
        return $this->successResponse($this->dataTableService->getBalanceDataTableList($params));
    }

    /**
     * Example for handling GET request to api/examples/{id}
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getOne($id)
    {
        $deletedEntry = MovementModel::onlyTrashed()->where('id', $id)->get();
        $entry = MovementModel::with(['client', 'movementCategory'])->where('id', $id)->first();

        if ($entry == null) {
            return $this->successResponse($deletedEntry);
        }
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
            'datetime',
            'amount',
            'concept',
            'movement_type_id',
            'movement_category_id',
            'client_id',
        ));

        $requestData['user_id'] = Auth::user()->id;

        // update old client balance
        $oldClientMovement = MovementModel::where('id', $id)->first();
        $oldClientId = $oldClientMovement->client_id;

        // update movement
        MovementModel::where('id', $id)->update($requestData);

        // Previous Client not actual provided
        if ($oldClientId && !$requestData['client_id']) {
            $this->clientService->updateClientBalance($requestData['client_id']);
        }

        // Provided client Id
        if ($requestData['client_id']) {
            $this->clientService->updateClientBalance($requestData['client_id']);
        }

        // Provided Client and Previous Client And Actual Client are different.
        if ($requestData['client_id'] && $oldClientId !== $requestData['client_id']) {
            $this->clientService->updateClientBalance($oldClientId);
        }

        return $this->successResponse(MovementModel::where('id', $id)->first());
    }

    /**
     * Example to handle DELETE request to api/examples/{id}
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($id)
    {
        $movement = MovementModel::where('id', $id)->first();
        $clientId = $movement->client_id;

        // Updatea el deleted by
        $movement->deleted_by = Auth::user()->id;
        $movement->save();

        // Delete the movement.
        $deletedId = $movement->delete();
        if ($clientId) {
            $this->clientService->updateClientBalance($clientId);
        }

        return $this->successResponse(array(
            'id' => $deletedId
        ));
    }
}
