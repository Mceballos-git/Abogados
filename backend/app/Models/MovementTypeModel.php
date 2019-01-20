<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MovementTypeModel extends Model
{
    protected $table = 'movement_types';

    protected $fillable = [
        'id',
        'name'
    ];



}
