<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OldClientesModel extends Model
{
    protected $connection = 'mysql2';

    protected $table = 'clientes';

    protected $fillable = [];
}
