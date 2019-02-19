<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OldPagosModel extends Model
{
    protected $connection = 'mysql2';

    protected $table = 'pagos';

    protected $fillable = [];
}
