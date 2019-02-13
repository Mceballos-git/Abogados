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

class ProcedureController extends Controller
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
            'inicio_demanda',
            'sentencia_primera_instancia',
            'sentencia_segunda_instancia',
            'sentencia_corte_suprema',
            'inicio_de_ejecucion',
            'observaciones'
        );

        $result = ProcedureModel::create([
            'client_id' => $requestData['client_id'],
            'inicio_demanda' => $requestData['inicio_demanda'],
            'sentencia_primera_instancia' => $requestData['sentencia_primera_instancia'],
            'sentencia_segunda_instancia' => $requestData['sentencia_segunda_instancia'],
            'sentencia_corte_suprema' => $requestData['sentencia_corte_suprema'],
            'inicio_de_ejecucion' => $requestData['inicio_de_ejecucion'],
            'observaciones' => $requestData['observaciones'],
        ]);

        return $this->successResponse($result);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getList(Request $request)
    {
        $dateFrom = $request->input('date_from', false);
        $dateTo = $request->input('date_to', false);

        $query = ProcedureModel::with(['client'])->orderBy('id', 'desc');

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
        $entry = ProcedureModel::with(['client'])->where('id', $id)->first();
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
