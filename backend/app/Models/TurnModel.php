<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TurnModel extends Model
{
    protected $table = 'turns';

    protected $fillable = [
        'id',
        'client_id',
        'given_user_id',
        'attention_user_id',
        'office_id',
        'register_date',
        'turn_date',
        'turn_time_start',
        'turn_time_end',
        'phone_number_ref',
        'priority',
        'comments',
        'title',
        'active'
    ];

    public function client(){
        return $this->belongsTo(ClientModel::class, 'client_id', 'id');
    }
}

