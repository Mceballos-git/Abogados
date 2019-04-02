<?php

namespace App\Http\Controllers;

use App\Services\DataTableService;
use App\Models\UserModel;
use App\Services\UserService;
use App\Traits\ResponseHandlerTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Middleware\ValidationMiddleware;


/**
 * Class UserController
 * @package App\Http\Controllers
 */
class UserController extends Controller
{
    /**
     * @var DataTableService
     */
    protected $dataTableService;
    protected $userService;

    /**
     * Add Responses methods
     */
    use ResponseHandlerTrait;


    /**
     * UserController constructor.
     * @param DataTableService $dataTableService
     */
    public function __construct(DataTableService $dataTableService, UserService $userService)
    {
        $this->dataTableService = $dataTableService;
        $this->userService = $userService;
    }

    public function getProfile()
    {

        $requestData = array('id' => Auth::user()->id);
        $entry = UserModel::where('id', $requestData['id'])->first();
        $entry->role_list = json_decode($entry->role_list);
        return $this->successResponse($entry);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUsersSelectSearch(Request $request)
    {
        // Si no proveen ningun filtro vamos a retornar vacio, no queremos retonar todos
        // los clientes para evitar problemas de performance
        if (!$filter = $request->input('filter')) {
            return $this->successResponse([]);
        }


        $filterValue = $filter . '%';
        $fieldsToFilter = ['first_name', 'last_name'];
        $query = UserModel::select('id', 'first_name', 'last_name')
            ->where('active', 1)
            ->where(function ($q) use ($fieldsToFilter, $filterValue) {
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
            array_push($data, $obj);
        }

        return $this->successResponse($data);
    }

    /**
     * Get user list.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getList(Request $request)
    {
        $params = $request->all();
        return $this->successResponse($this->dataTableService->getUsersDataTableList($params));
    }

    /**
     * Get user details by id
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getOne($id)
    {
        $entry = UserModel::where('id', $id)->first();
        $entry->role_list = json_decode($entry->role_list);
        return $this->successResponse($entry);
    }


    /**
     * Create an user
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse|mixed
     */
    public function create(Request $request)
    {
        // Obtain Request Information from POST
        $requestData = $request->only(array(
            "email",
            "role_list",
            "active",
            "first_name",
            "last_name",
            "degree",
            "position",
            "shift_start",
            "shift_end",
            "username"
        ));

        // Transform Data or add additional parameters.
        $requestData['role_list'] = json_encode($requestData['role_list']);
        $requestData['password'] = UserModel::DEFAULT_PASSWORD;


        // Create new User.
        $newUser = UserModel::create($requestData);

        // Send Invitation Email
        try {
            $this->userService->sendInvitationEmail($newUser);
        } catch (\Exception $e) {
            // el mail no se envio.
        }

        // Send Message back to UI.
        return $this->successResponse($newUser);
    }


    /**
     * Update an user
     *
     * @param Request $request
     * @param $id
     * @return bool
     */
    public function update(Request $request, $id)
    {
        // Obtain Request Information from POST
        $requestData = $request->only(array(
            "email",
            "role_list",
            "active",
            "first_name",
            "last_name",
            "degree",
            "position",
            "shift_start",
            "shift_end",
            "username"
        ));

        // Transform Data or add additional parameters.
        $requestData['role_list'] = json_encode($requestData['role_list']);
        UserModel::where('id', $id)->update($requestData);
        return $this->successResponse(UserModel::where('id', $id)->first());
    }

    /**
     * @param $id
     * @return mixed
     */
    public function delete($id)
    {
        return $this->successResponse(array('id' => UserModel::where('id', $id)->delete()));
    }

}