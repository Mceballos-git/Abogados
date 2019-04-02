<?php

namespace App\Http\Controllers;

use App\Models\TurnModel;
use App\Models\ClientModel;
use Illuminate\Http\Request;
use App\Traits\ResponseHandlerTrait;

class TurnController extends Controller
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
            'given_user_id',
            'attention_user_id',
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



        $result = TurnModel::create([
            'client_id' => $requestData['client_id'],
            'given_user_id' => $requestData['given_user_id'],
            'attention_user_id' => $requestData['attention_user_id'],
            'register_date' => $requestData['register_date'],
            'turn_date' => $requestData['turn_date'],
            'turn_time_start' => $requestData['turn_time_start'],
            'turn_time_end' => $requestData['turn_time_end'],
            'phone_number_ref' => $requestData['phone_number_ref'],
            'priority' => $requestData['priority'],
            'comments' => $requestData['comments'],
            'title' => $requestData['title'],
            'active' => $requestData['active'],
            'office_id' => 1
        ]);

        return $this->successResponse( 
            TurnModel::with(['client', 'attentionUser', 'givenUser'])->where('id', $result->id)->first()
        );
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getList()
    {
        return $this->successResponse(
            TurnModel::with(['client', 'attentionUser', 'givenUser'])->where('active', '1')->get()
        );
    }

    /**
     * Example for handling GET request to api/examples/{id}
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getOne($id)
    {
        $entry = TurnModel::with(['client', 'attentionUser', 'givenUser'])->where('id', $id)->first();
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
            'client_id',
            'given_user_id',
            'attention_user_id',
            'register_date',
            'turn_date',
            'turn_time_start',
            'turn_time_end',
            'shift_start',
            'shift_end',
            'phone_number_ref',
            'priority',
            'comments',
            'title',
            'active'
        ));
        TurnModel::where('id', $id)->update($requestData);
        return $this->successResponse( 
            TurnModel::with(['client', 'attentionUser', 'givenUser'])->where('id', $id)->first()
        );
    }

    /**
     * Example to handle DELETE request to api/examples/{id}
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($id)
    {
        return $this->successResponse(array('id' => TurnModel::where('id', $id)->delete()));

    }
}
