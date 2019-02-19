<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClientModel extends Model
{
    protected $table = 'clients';

    protected $fillable = [
        'id',
        'balance',
        'active',
        'deleted',
        'deleted_at',
        'deleted_by',
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
    ];
}
