<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MovementModel extends Model
{
    protected $table = 'movements';

    protected $fillable = [
        'datetime',
        'amount',
        'concept',
        'movement_type_id',
        'user_id',
        'movement_category_id',
        'client_id',
        'deleted',
        'deleted_at',
        'deleted_by',
    ];

    public function user(){
        return $this->belongsTo(UserModel::class, 'user_id', 'id');
    }

    public function client(){
        return $this->belongsTo(ClientModel::class, 'client_id', 'id');
    }

    public function movementCategory(){
        return $this->belongsTo(MovementCategoryModel::class, 'movement_category_id', 'id');
    }

    public function movementType(){
        return $this->belongsTo(MovementTypeModel::class, 'movement_type_id', 'id');
    }
}
