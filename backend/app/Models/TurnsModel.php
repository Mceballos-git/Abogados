<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TurnsModel extends Model
{
    //Sino pongo esto, intenta insertar timestamps en la tabla
    //y como no existe la columna en la tabla, da error.
    public $timestamps = false;

    protected $table = 'turns';

    protected $fillable = [
        'client_id',
        'given_operator_id',
        'attention_operator_id',
        'office_id',
        'register_date',
        'turn_date',
        'turn_time_start',
        'turn_time_end',
        'phone_number_ref',
        'priority',
        'comments',
        'title',
        'active'
    ];
}
