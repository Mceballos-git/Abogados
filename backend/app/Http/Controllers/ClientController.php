<?php

namespace App\Http\Controllers;

use App\Models\ClientModel;
use App\Models\TurnModel;
use Illuminate\Http\Request;
use App\Traits\ResponseHandlerTrait;
use Nexmo\Client;

class ClientController extends Controller
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
            'active',
            'first_name',
            'last_name',
            'nationality',
            'identification_type',
            'identification_number',
            'tin_number',
            'date_of_birth',
            'phone_number',
            'email',
            'street_address',
            'number_address',
            'floor_address',
            'department_address',
            'country',
            'state',
            'city',
            'observations',
            'extra'
        );

        $result = ClientModel::create([
            'active' => $requestData['active'],
            'deleted_by' => null,
            'first_name' => $requestData['first_name'],
            'last_name' => $requestData['last_name'],
            'nationality' => $requestData['nationality'],
            'identification_type' => $requestData['identification_type'],
            'identification_number' => $requestData['identification_number'],
            'tin_number' => $requestData['tin_number'],
            'date_of_birth' => $requestData['date_of_birth'],
            'phone_number' => $requestData['phone_number'],
            'email' => $requestData['email'],
            'street_address' => $requestData['street_address'],
            'number_address' => $requestData['number_address'],
            'floor_address' => $requestData['floor_address'],
            'department_address' => $requestData['department_address'],
            'country' => $requestData['country'],
            'state' => $requestData['state'],
            'city' => $requestData['city'],
            'observations' => $requestData['observations'],
            'extra' => $requestData['extra']
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
            ClientModel::get()
        );
    }

    /**
     * Example for handling GET request to api/examples/{id}
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getOne($id)
    {
        $entry = ClientModel::where('id', $id)->first();
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
            'active',
            'first_name',
            'last_name',
            'nationality',
            'identification_type',
            'identification_number',
            'tin_number',
            'date_of_birth',
            'phone_number',
            'email',
            'street_address',
            'number_address',
            'floor_address',
            'department_address',
            'country',
            'state',
            'city',
            'observations',
            'extra'
        ));
        ClientModel::where('id', $id)->update($requestData);
        return $this->successResponse(ClientModel::where('id', $id)->first());
    }

    /**
     * Example to handle DELETE request to api/examples/{id}
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($id)
    {
        $requestData = array('deleted_by' => Auth::user()->id);
        ClientModel::where('id', $id)->update($requestData);

        return $this->successResponse(array(
            'id' => ClientModel::where('id', $id)->delete()
        ));

    }
}
