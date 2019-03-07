<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMovementsCategories extends Migration
{

    public function up()
    {
        Schema::create('movement_categories', function (Blueprint $table) {
            $table->integer('id')->unsigned()->primary();
            $table->string('name');
            $table->timestamps();

        });
    }


    public function down()
    {
        Schema::dropIfExists('movement_categories');
    }
}
