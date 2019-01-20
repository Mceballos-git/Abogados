<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OldCajaModel extends Model
{
    protected $connection = 'mysql2';

    protected $table = 'caja';

    protected $fillable = [];
}
