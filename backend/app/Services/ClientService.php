<?php
/**
 * Created by PhpStorm.
 * User: Nano
 * Date: 18/2/2019
 * Time: 6:54 PM
 */

namespace App\Services;

use App\Models\ClientModel;
use App\Models\MovementModel;

class ClientService
{
    /**
     * @param $clientId
     * @return bool
     */
    public function updateClientBalance($clientId)
    {
        $entry = ClientModel::where('id', $clientId)->first();
        if ($entry === null) {
            return false;
        }
        $movements = MovementModel::where('client_id', $clientId)
            ->orderBy('id', 'desc')->get();
        $balance = 0;
        foreach ($movements as $movement) {
            $egreso = $movement->movement_type_id == '1';
            $balance = $egreso ? $balance - $movement->amount : $balance + $movement->amount;

        }
        $entry->balance = $balance;
        $entry->save();

    }
}