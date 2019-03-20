<?php

namespace App\Services;


use Illuminate\Support\Facades\DB;
use stdClass;


class DataTableService
{

    private $query;
    private $where;
    private $order;
    private $groupBy;
    private $orderFields;
    private $searchFields;
    private $parameters = [];
    private $limit;
    private $offset;
    private $draw;

    private $sortOptions = ['asc' => 'ASC', 'desc' => 'DESC'];

    /**
     * @param $requestParams
     * @return array
     */
    public function getMovementsDataTableList($requestParams)
    {
        $dataTableParams = $this->getData($requestParams);
        $this->setDataTableDefaults($dataTableParams);


        $this->searchFields = [
            'm.datetime', 'mc.name', 'mt.name', 'c.first_name', 'c.last_name', 'concept', 'amount',
            'u.first_name', 'u.last_name'

        ];

        $this->orderFields = [
            'm.datetime', 'mc.name', 'client_name', 'mt.name', 'm.concept', 'm.amount', 'user_name',
        ];

        $this->select = <<<SELECT
SELECT m.id as id,
 m.datetime,
 mc.name as movement_category_name,
 mt.name as movement_type_name,
 m.concept,
 m.amount,
 mt.id as movement_type_id,
 CONCAT(
    COALESCE(c.first_name, ''), ' ',
    COALESCE(c.last_name, ''), ' '
) as client_name,
 CONCAT(
    COALESCE(u.first_name, ''), ' ',
    COALESCE(u.last_name, ''), ' '
) as user_name

SELECT;

        $this->from = <<<FROM
FROM movements m
LEFT JOIN movement_types mt ON mt.id = m.movement_type_id
LEFT JOIN movement_categories mc ON mc.id = m.movement_category_id
LEFT JOIN clients c ON c.id = m.client_id
LEFT JOIN users u ON u.id = m.user_id

FROM;

        $this->where = <<<WHERE
WHERE deleted_at IS NULL
WHERE;

        $this->setSearch($dataTableParams->searchTerm);
        $this->setOrder($dataTableParams->sortField, $dataTableParams->sortDir);
        $query = $this->getQuery(true);
        return $this->getResultForDatatable($query);
    }

    /**
     * @param $requestParams
     * @return array
     */
    public function getMovementsCategoriesDataTableList($requestParams)
    {
        $dataTableParams = $this->getData($requestParams);
        $this->setDataTableDefaults($dataTableParams);


        $this->searchFields = [
            'mc.id'
        ];

        $this->orderFields = [
            'mc.name'
        ];

        $this->select = <<<SELECT
SELECT mc.id as id,
mc.name as movement_category_name
SELECT;

        $this->from = <<<FROM
FROM movement_categories mc
FROM;

        $this->where = <<<WHERE
WHERE 1=1
WHERE;

        $this->setSearch($dataTableParams->searchTerm);
        $this->setOrder($dataTableParams->sortField, $dataTableParams->sortDir);
        $query = $this->getQuery(true);
        return $this->getResultForDatatable($query);
    }

    /**
     * @param $requestParams
     * @return array
     */
    public function getProcedureCategoryDataTableList($requestParams)
    {
        $dataTableParams = $this->getData($requestParams);
        $this->setDataTableDefaults($dataTableParams);


        $this->searchFields = [
            'pc.id'
        ];

        $this->orderFields = [
            'pc.name'
        ];

        $this->select = <<<SELECT
SELECT pc.id as id,
pc.name as procedure_category_name

SELECT;

        $this->from = <<<FROM
FROM procedure_categories pc
FROM;

        $this->where = <<<WHERE
WHERE 1=1
WHERE;

        $this->setSearch($dataTableParams->searchTerm);
        $this->setOrder($dataTableParams->sortField, $dataTableParams->sortDir);
        $query = $this->getQuery(true);
        return $this->getResultForDatatable($query);
    }

    /**
     * @param $requestParams
     * @return array
     */
    public function getProcedureDataTableList($requestParams)
    {
        $dataTableParams = $this->getData($requestParams);
        $this->setDataTableDefaults($dataTableParams);


        $this->searchFields = [
            'pc.name', 'p.inicio_demanda', 'p.inicio_de_ejecucion', 'p.observaciones', 'p.sentencia_corte_suprema',
            'p.sentencia_primera_instancia', 'p.sentencia_segunda_instancia'
        ];

        $this->orderFields = [
            'p.id', 'c.id', 'client_name'
        ];

        $this->select = <<<SELECT
SELECT p.id as id,
pc.name as procedure_name,
p.inicio_demanda,
p.inicio_de_ejecucion,
p.observaciones,
pc.id as procedure_category_id,
p.sentencia_corte_suprema,
p.sentencia_primera_instancia,
p.sentencia_segunda_instancia,
 CONCAT(
    COALESCE(c.first_name, ''), ' ',
    COALESCE(c.last_name, ''), ' '
) as client_name

SELECT;

        $this->from = <<<FROM
FROM procedures p
LEFT JOIN procedure_categories pc ON pc.id = p.procedure_category_id
LEFT JOIN clients c ON c.id = p.client_id
FROM;

        $this->where = <<<WHERE
WHERE 1=1
WHERE;

        $this->setSearch($dataTableParams->searchTerm);
        $this->setOrder($dataTableParams->sortField, $dataTableParams->sortDir);
        $query = $this->getQuery(true);
        return $this->getResultForDatatable($query);
    }

    /**
     * @param $requestParams
     * @return array
     */
    public function getUsersDataTableList($requestParams)
    {
        $dataTableParams = $this->getData($requestParams);
        $this->setDataTableDefaults($dataTableParams);


        $this->searchFields = [
            'u.username', 'u.first_name', 'u.last_name'
        ];

        $this->orderFields = [
            'u.name', 'u.first_name', 'u.last_name'
        ];

        $this->select = <<<SELECT
SELECT u.id as id,
u.username,
u.first_name, 
u.last_name,
u.active,
u.shift_start,
u.shift_end

SELECT;

        $this->from = <<<FROM
FROM users u
FROM;

        $this->where = <<<WHERE
WHERE 1=1
WHERE;

        $this->setSearch($dataTableParams->searchTerm);
        $this->setOrder($dataTableParams->sortField, $dataTableParams->sortDir);
        $query = $this->getQuery(true);
        return $this->getResultForDatatable($query);
    }

    /**
     * @param $requestParams
     * @return stdClass
     */
    public function getBalanceDataTableList($requestParams)
    {
        $dataTableParams = $this->getData($requestParams);
        $this->setDataTableDefaults($dataTableParams);


        $this->searchFields = [
            'm.type_id', 'm.amount'

        ];

        $this->orderFields = [
            'm.type_id', 'm.amount'
        ];

        $this->select = <<<SELECT
SELECT SUM(m.amount) as total,
SUM( IF(m.movement_type_id = 1, m.amount, 0)) as egresos,
SUM( IF(m.movement_type_id = 2, m.amount, 0)) as ingresos

SELECT;

        $this->from = <<<FROM
FROM movements m
FROM;

        $this->where = <<<WHERE
WHERE deleted_at IS NULL
WHERE;

        $this->setSearch($dataTableParams->searchTerm);
        $this->setOrder($dataTableParams->sortField, $dataTableParams->sortDir);
        $query = $this->getQuery(false);
        $result = DB::select($query, $this->parameters);

        $response = new stdClass();
        $response->incomes = $result[0]->ingresos;
        $response->outcomes = $result[0]->egresos;
        $response->balance = $result[0]->ingresos - $result[0]->egresos;

        return $response;
    }

    /**
     * @param $requestParams
     * @return array
     */
    public function getClientsDataTableList($requestParams)
    {
        $dataTableParams = $this->getData($requestParams);
        $this->setDataTableDefaults($dataTableParams);


        $this->searchFields = [
            'c.last_name', 'c.first_name', 'c.identification_number', 'c.city', 'c.balance'
        ];

        $this->orderFields = [
            'c.last_name', 'c.first_name', 'c.identification_number', 'c.city', 'c.balance'
        ];

        $this->select = <<<SELECT
SELECT c.id, c.last_name, c.first_name, c.identification_number, c.city, c.balance, c.active 
SELECT;

        $this->from = <<<FROM
FROM 
clients c
FROM;

        $this->where = <<<WHERE
WHERE deleted_by IS NULL
WHERE;

        $this->setSearch($dataTableParams->searchTerm);
        $this->setOrder($dataTableParams->sortField, $dataTableParams->sortDir);
        $query = $this->getQuery(true);
        return $this->getResultForDatatable($query);
    }

    /**
     * @param $dataTableData
     * @return \stdClass
     */
    public function getData($dataTableData)
    {
        $obj = new \stdClass();
        $obj->draw = $dataTableData['draw'];
        $obj->offset = $dataTableData['start'];
        $obj->limit = $dataTableData['length'];
        $obj->searchTerm = $dataTableData['search']['value'];
        $obj->sortField = $dataTableData['order'][0]['column'];
        $obj->sortDir = $dataTableData['order'][0]['dir'];
        return $obj;
    }

    /**
     * @param $dataTableParams
     */
    private function setDataTableDefaults($dataTableParams)
    {
        $this->limit = $dataTableParams->limit;
        $this->offset = $dataTableParams->offset;
        $this->draw = $dataTableParams->draw;
    }

    /**
     * @param bool $withPagination
     * @return array
     */
    private function getResultForDatatable($query)
    {
        $queryResult = DB::select($query, $this->parameters);
        $result = new \stdClass();
        $result->data = $queryResult;
        $result->draw = $this->draw;
        $total = $this->getTotal();
        $result->recordsTotal = $total;
        $result->recordsFiltered = $total;
        return $result;
    }

    /**
     * @param $withPagination
     * @return string
     */
    public function getQuery($withPagination)
    {
        $q = $this->select . ' ';
        $q .= $this->from . ' ';
        $q .= $this->where . ' ';
        $q .= $this->groupBy . ' ';
        $q .= $this->order . ' ';

        if ($withPagination) {
            $q .= ' LIMIT ' . $this->limit . ' OFFSET ' . $this->offset;
        }

        return $q;
    }

    /**
     * @return int
     */
    private function getTotal()
    {
        $query = $this->getQuery(false);
        $results = DB::select("SELECT COUNT(*) as total from ({$query}) as t", $this->parameters);
        return isset($results[0]) ? $results[0]->total : 0;
    }

    /**
     * @param $searchValue
     * @return void
     */
    public function setSearch($searchValue)
    {
        if (!$searchValue || !count($this->searchFields)) {
            return;
        }

        $this->where .= ' AND (';
        foreach ($this->searchFields as $k => $field) {
            if ($k !== 0) {
                $this->where .= ' OR ';
            }
            $this->where .= " $field LIKE ? ";
            array_push($this->parameters, "%$searchValue%");
        }
        $this->where .= ')';
    }

    /**
     * @param $array
     */
    public function setOrder($orderField, $orderDirection)
    {
        $order = 'ASC';

        if (!isset($this->searchFields[$orderField])) {
            return false;
        }

        if (isset($this->sortOptions[$orderDirection])) {
            $order = $this->sortOptions[$orderDirection];
        }

        $this->order = "ORDER BY {$this->searchFields[$orderField]} {$order}";
    }
}