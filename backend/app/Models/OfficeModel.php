<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OfficeModel extends Model
{
    protected $table = 'offices';

    protected $fillable = [
        'name',
        'address',
        'comments',
    ];
}

