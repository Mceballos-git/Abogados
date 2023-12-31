<?php

namespace App\Http\Controllers;

use App\Models\ClientModel;
use Illuminate\Http\Request;
use App\Traits\ResponseHandlerTrait;
use Illuminate\Support\Facades\Auth;
use App\Services\FluffyQueryService;
use App\Services\DataTableService;
use Illuminate\Support\Facades\DB;
use App\Services\ClientService;
use stdClass;

class ClientController extends Controller
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
    )
    {
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
            'extra' => null
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
        return $this->successResponse($this->dataTableService->getClientsDataTableList($params));
    }

    /**
     * @param Request $request
     */
    public function getActiveClientsSelectSearch(Request $request)
    {
        // Si no proveen ningun filtro vamos a retornar vacio, no queremos retonar todos
        // los clientes para evitar problemas de performance
        if (!$filter = $request->input('filter')) {
            return $this->successResponse([]);
        }

        $filterValue = $filter .'%';
        $fieldsToFilter = ['first_name', 'last_name'];
        $query = ClientModel::select('id', 'first_name', 'last_name', 'phone_number')
            ->where('active', 1)
            ->whereNull('deleted_by')
            ->where(function($q) use ($fieldsToFilter, $filterValue) {
                foreach ($fieldsToFilter as $k => $field) {
                    if ($k === 0) {
                        $q->where($field, 'like', $filterValue);
                        continue;
                    }
                    $q->orWhere($field, 'like', $filterValue);
                }
            });

        $entries = $query->get();

        // Si la query no devolvio ningun resultado devolvemos un array vacio.
        if (!count($entries)) {
            return $this->successResponse([]);

        }
        // por cada uno de las entradas devueltas por las queries Creamos un objecto nuevo con Id y Texto
        // que se van a mostrar en la ui, y lo incluimos en el array que vamos a mandar a la ui
        $data = [];
        foreach ($entries as $entry) {
            $obj = new \stdClass();
            $obj->id = $entry->id;
            $obj->text = $entry->first_name . ' ' . $entry->last_name;
            $obj->phone = $entry->phone_number;
            array_push($data, $obj);
        }

        return $this->successResponse($data);
    }


    public function getListForExport()
    {
        return $this->successResponse(
            ClientModel::orderBy('last_name', 'asc')
                ->whereNull('deleted_by')
                ->get()
        );
    }

    public function getListActive()
    {
        return $this->successResponse(
            ClientModel::where('active', 1)->orderBy('last_name', 'asc')->get()
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


    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function activateClient(Request $request)
    {
        // Obtain Request Information from POST
        $clientId = $request->input('client_id');
        $client = ClientModel::where('id', $clientId)->first();
        $client->active = 1;
        $client->save();
        return $this->successResponse($client);
    }

    /**
     * Roles: can only be executed by admin role.
     * @param Request $request
     *
     */
    public function deactivateClient(Request $request)
    {
        // Obtain Request Information from POST
        $clientId = $request->input('client_id');
        $client = ClientModel::where('id', $clientId)->first();
        $client->active = 0;
        $client->save();
        return $this->successResponse($client);
    }
}