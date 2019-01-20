<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OldTurnosModel extends Model
{
    protected $connection = 'mysql2';

    protected $table = 'turnos';

    protected $fillable = [];
}
