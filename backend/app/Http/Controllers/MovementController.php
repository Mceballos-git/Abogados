<?php

namespace App\Http\Controllers;

use App\Models\ClientModel;
use App\Models\MovementModel;
use App\Models\TurnModel;
use Illuminate\Http\Request;
use App\Traits\ResponseHandlerTrait;
use Illuminate\Support\Facades\Auth;
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
            'movement_category_id',
            'client_id',
            'deleted_by'
        );

        $result = MovementModel::create([
            'datetime' => $requestData['datetime'],
            'amount' => $requestData['amount'],
            'concept' => $requestData['concept' ],
            'movement_type_id' => $requestData['movement_type_id'],
            'user_id' => $user = Auth::user()->id,
            'movement_category_id' => $requestData['movement_category_id'],
            'client_id' => $requestData['client_id'],
            'deleted_by' => null,
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
            MovementModel::with(['user','client', 'movementCategory', 'movementType'])->orderBy('id','desc')->get()
        );
    }

    /**
     * Example for handling GET request to api/examples/{id}
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getOne($id)
    {
        $deletedEntry = MovementModel::onlyTrashed()->where('id', $id)->get();
        $entry = MovementModel::where('id', $id)->first();

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

        return $this->successResponse(MovementModel::where('id', $id)->first());
    }

    /**
     * Example to handle DELETE request to api/examples/{id}
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($id)
    {
        $requestData = array('deleted_by' => Auth::user()->id);
        MovementModel::where('id', $id)->update($requestData);

        return $this->successResponse(array(
            'id' => MovementModel::where('id', $id)->delete()
        ));
    }


}
