<?php

namespace App\Http\Controllers;

use App\Models\ClientModel;
use App\Models\MovementModel;
use App\Models\ProcedureModel;
use App\Models\TurnModel;
use Illuminate\Http\Request;
use App\Traits\ResponseHandlerTrait;
use Illuminate\Support\Facades\Auth;
use Nexmo\Client;
use App\Services\DataTableService;


class ProcedureController extends Controller
{
    /**
     * @var DataTableService
     */
    protected $dataTableService;

    /**
     * Add Responses methods
     */
    use ResponseHandlerTrait;

    public function __construct(DataTableService $dataTableService) {
        $this->dataTableService = $dataTableService;
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Request $request)
    {
        // Obtain Request Information from POST
        $requestData = $request->only(
            'client_id',
            'procedure_category_id',
            'inicio_demanda',
            'sentencia_primera_instancia',
            'sentencia_segunda_instancia',
            'sentencia_corte_suprema',
            'inicio_de_ejecucion',
            'observaciones'
        );

        $result = ProcedureModel::create([
            'client_id' => $requestData['client_id'],
            'procedure_category_id' => $requestData['procedure_category_id'],
            'inicio_demanda' => $requestData['inicio_demanda'],
            'sentencia_primera_instancia' => $requestData['sentencia_primera_instancia'],
            'sentencia_segunda_instancia' => $requestData['sentencia_segunda_instancia'],
            'sentencia_corte_suprema' => $requestData['sentencia_corte_suprema'],
            'inicio_de_ejecucion' => $requestData['inicio_de_ejecucion'],
            'observaciones' => $requestData['observaciones'],
        ]);

        return $this->successResponse($result);
    }

    public function getList(Request $request)
    {
        $params = $request->all();
        return $this->successResponse($this->dataTableService->getProcedureDataTableList($params));
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getListOld(Request $request)
    {
        $dateFrom = $request->input('date_from', false);
        $dateTo = $request->input('date_to', false);

        $query = ProcedureModel::with(['client'])
            ->with(['procedureCategory'])
            ->orderBy('id', 'desc');

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
        $entry = ProcedureModel::with(['client'])
            ->with(['procedureCategory'])->where('id', $id)->first();
        return $this->successResponse($entry);
    }

    //para obtener listado filtrado por cliente
    public function getProceduresByClient(Request $request, $id)
    {
        $params = $request->all();

        return $this->successResponse(
            $this->dataTableService->getProceduresByClientDataTableList(
                $params, $id));

    }


    //Para exportar a excel
    public function getListForExport()
    {
        return $this->successResponse(
            ProcedureModel::with(['procedureCategory'])
                ->with(['client'])->orderBy('id', 'desc')
                ->get()
        );
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
            'procedure_category_id',
            'inicio_demanda',
            'sentencia_primera_instancia',
            'sentencia_segunda_instancia',
            'sentencia_corte_suprema',
            'inicio_de_ejecucion',
            'observaciones'
        ));
        ProcedureModel::where('id', $id)->update($requestData);

        return $this->successResponse(ProcedureModel::where('id', $id)->first());
    }

    /**
     * Example to handle DELETE request to api/examples/{id}
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($id)
    {
        return $this->successResponse(array('id' => ProcedureModel::where('id', $id)->delete()));
    }


}
