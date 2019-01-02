<?php

namespace App\Http\Controllers;

use App\Models\TurnsModel;
use Illuminate\Http\Request;
use App\Traits\ResponseHandlerTrait;

class TurnsController extends Controller
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
            'client_id',
            'given_operator_id',
            'attention_operator_id',
            'office_id',
            'register_date',
            'turn_date',
            'turn_time_start',
            'turn_time_end',
            'phone_number_ref',
            'priority',
            'comments',
            'title',
            'active'
        );

        $result = TurnsModel::create([
            'client_id' => $requestData['client_id'],
            'given_operator_id' => $requestData['given_operator_id'],
            'attention_operator_id' => $requestData['attention_operator_id'],
            'office_id' => $requestData['office_id'],
            'register_date' => $requestData['register_date'],
            'turn_date' => $requestData['turn_date'],
            'turn_time_start' => $requestData['turn_time_start'],
            'turn_time_end' => $requestData['turn_time_end'],
            'phone_number_ref' => $requestData['phone_number_ref'],
            'priority' => $requestData['priority'],
            'comments' => $requestData['comments'],
            'title' => $requestData['title'],
            'active' => $requestData['active']
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
            TurnsModel::get()
        );
    }

    /**
     * Example for handling GET request to api/examples/{id}
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getOne($id)
    {
        $entry = TurnsModel::where('id', $id)->first();
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
            "client_id",
            "given_operator_id",
            "attention_operator_id",
            "office_id",
            "turn_date",
            "turn_time_start",
            "turn_time_end",
            "shift_start",
            "shift_end",
            'phone_number_ref',
            'priority',
            'comments',
            'title',
            'active'
        ));
        TurnsModel::where('id', $id)->update($requestData);
        return $this->successResponse(TurnsModel::where('id', $id)->first());
    }

    /**
     * Example to handle DELETE request to api/examples/{id}
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($id)
    {
        return $this->successResponse(array('id' => TurnsModel::where('id', $id)->delete()));

    }
}
