<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OldOficinasModel extends Model
{
    protected $connection = 'mysql2';

    protected $table = 'oficinas';

    protected $fillable = [
        'id',
        'id_oficina',
        'nombre',
        'comentarios'
    ];
}
