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
    public function __construct(DataTableService $dataTableService)
    {
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
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getProcedureCategorySelectSearch(Request $request)
    {
        // Si no proveen ningun filtro vamos a retornar vacio, no queremos retonar todos
        // los clientes para evitar problemas de performance
        if (!$filter = $request->input('filter')) {
            return $this->successResponse([]);
        }

        $filterValue = $filter .'%';
        $fieldsToFilter = ['name'];
        $query = ProcedureCategoryModel::select('id', 'name')
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
            $obj->text = $entry->name;
            array_push($data, $obj);
        }

        return $this->successResponse($data);
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
