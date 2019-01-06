<?php

namespace App\Http\Controllers;

use App\Models\ClientModel;
use App\Models\MovementModel;
use App\Models\TurnModel;
use Illuminate\Http\Request;
use App\Traits\ResponseHandlerTrait;
use Nexmo\Client;

class MovementController extends Controller
{
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
            'user_id',
            'movement_category_id',
            'client_id',
            'deleted',
            'deleted_at',
            'deleted_by'
        );

        $result = MovementModel::create([
            'datetime' => $requestData['datetime'],
            'amount' => $requestData['amount'],
            'concept' => $requestData['concept'],
            'movement_type_id' => $requestData['movement_type_id'],
            'user_id' => $requestData['user_id'],
            'movement_category_id' => $requestData['movement_category_id'],
            'client_id' => $requestData['client_id'],
            'deleted' => $requestData['deleted'],
            'deleted_at' => $requestData['deleted_at'],
            'deleted_by' => $requestData['deleted_by'],
        ]);

        return $this->successResponse($result);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getList()
    {
        return $this->successResponse(
            MovementModel::get()
        );
    }

    /**
     * Example for handling GET request to api/examples/{id}
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getOne($id)
    {
        $entry = MovementModel::where('id', $id)->first();

//        var_dump($entry->user);
//        die();

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
            'user_id',
            'movement_category_id',
            'client_id',
            'deleted',
            'deleted_at',
            'deleted_by'
        ));
        MovementModel::where('id', $id)->update($requestData);
        return $this->successResponse(MovementModel::where('id', $id)->first());
    }

    /**
     * Example to handle DELETE request to api/examples/{id}
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($id)
    {
        return $this->successResponse(array('id' => MovementModel::where('id', $id)->delete()));

    }


}
