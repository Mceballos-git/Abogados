<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProcedureModel extends Model
{
    protected $table = 'procedures';

    protected $fillable = [
        'client_id',
        'inicio_demanda',
        'sentencia_primera_instancia',
        'sentencia_segunda_instancia',
        'sentencia_corte_suprema',
        'inicio_de_ejecucion',
        'observaciones',
    ];

    public function client(){
        return $this->belongsTo(ClientModel::class, 'client_id', 'id');
    }
}
