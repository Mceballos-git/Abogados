<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMovementsCategories extends Migration
{

    public function up()
    {
        Schema::create('movement_categories', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');

        });
    }


    public function down()
    {
        Schema::create('movement_categories', function (Blueprint $table) {
            $table->dropColumn(['id', 'name']);
        });
    }
}
