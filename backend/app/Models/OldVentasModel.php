<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OldVentasModel extends Model
{
    protected $connection = 'mysql2';

    protected $table = 'ventas';

    protected $fillable = [];
}
