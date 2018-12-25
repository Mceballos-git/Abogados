<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MovementCategories extends Migration
{

    public function up()
    {
        Schema::create('movements_categories', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');

        });
    }


    public function down()
    {
        Schema::create('movements_categories', function (Blueprint $table) {
            $table->dropColumn(['id', 'name']);
        });
    }
}
