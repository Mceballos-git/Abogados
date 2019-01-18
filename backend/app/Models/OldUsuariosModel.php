<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OldUsuariosModel extends Model
{
    protected $connection = 'mysql2';

    protected $table = 'operadores';

    protected $fillable = [];
}
