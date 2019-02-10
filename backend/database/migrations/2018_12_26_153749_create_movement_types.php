<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMovementTypes extends Migration
{

    public function up()
    {
        Schema::create('movement_types', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->timestamps();
        });

        DB::table('movement_types')->insert([
                'name' => 'EGRESO'
            ]
        );
        DB::table('movement_types')->insert([
                'name' => 'INGRESO'
            ]
        );
    }


    public function down()
    {
        Schema::dropIfExists('movement_types');
    }
}
