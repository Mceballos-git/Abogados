<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MovementCategoryModel extends Model
{
    protected $table = 'movement_categories';

    protected $fillable = [
        'id',
        'name'

    ];



}
