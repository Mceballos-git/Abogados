<?php

namespace App\Http\Controllers;

use App\Models\MovementModel;
use App\Services\ClientService;
use App\Models\ClientModel;
use Illuminate\Http\Request;
use App\Traits\ResponseHandlerTrait;
use Illuminate\Support\Facades\Auth;

class MovementController extends Controller
{
    protected $clientService;

    /**
     * updateBalance constructor.
     * @param ClientService $clientService
     */
    public function __construct(ClientService $clientService)
    {
        $this->clientService = $clientService;
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
        $dateFrom = $request->input('date_from', false);
        $dateTo = $request->input('date_to', false);

        $query = MovementModel::with(['user', 'client', 'movementCategory', 'movementType'])->orderBy('id', 'desc');

        if ($dateFrom) {
            $query->where('datetime', '>', $dateFrom);
        }

        if ($dateTo) {
            $query->where('datetime', '<', $dateTo);
        }

        return $this->successResponse($query->get());
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

        MovementModel::where('id', $id)->update($requestData);

        // update balance
        $this->clientService->updateClientBalance($requestData['client_id']);

        return $this->successResponse(MovementModel::where('id', $id)->first());
    }

    /**
     * Example to handle DELETE request to api/examples/{id}
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($id)
    {
        $getMovement = MovementModel::where('id', $id)->first();
        $getIdClient = $getMovement->client_id;
        $getMovementAmount = $getMovement->amount;
        $getMovementType = $getMovement->movement_type_id;
        $getClient = ClientModel::where('id', $getIdClient)->first();
        $getClientBalance = $getClient->balance;

        if ($getMovementType == '1') {     //egreso
            $balance = $getClientBalance + $getMovementAmount;
        } else {                         //ingreso
            $balance = $getClientBalance - $getMovementAmount;
        }
        ClientModel::where('id', $getIdClient)->update(['balance' => $balance]);

        $requestData = array('deleted_by' => Auth::user()->id);
        MovementModel::where('id', $id)->update($requestData);

        return $this->successResponse(array(
            'id' => MovementModel::where('id', $id)->delete()
        ));
    }
}
