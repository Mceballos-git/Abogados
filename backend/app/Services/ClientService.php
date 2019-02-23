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
            ->with(['client', 'movementCategory', 'movementType'])
            ->orderBy('id', 'desc')->get();
        $balance = 0;
        foreach ($movements as $movement) {
            if ($movement->movement_type_id == '1') {     //egreso
                $balance = $balance - $movement->amount;
            } else {                                      //ingreso
                $balance = $balance + $movement->amount;
            }
            ClientModel::where('id', $clientId)->update(['balance' => $balance]);
        }
    }
}