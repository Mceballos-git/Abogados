<?php
/**
 * Created by PhpStorm.
 * User: Nano
 * Date: 18/2/2019
 * Time: 6:54 PM
 */

namespace App\Services;

class FluffyQueryService
{
    public function fluffyQuery($query, $campos, $valor)
    {
        $query->where(function () use ($valor, $campos) {
            $searchWildcard = '%' . $valor . '%';
            $query = null;
            foreach ($campos as $campo) {
                $query->orWhere($campo, 'LIKE', $searchWildcard);
            }
            return $query;
        });
    }
}