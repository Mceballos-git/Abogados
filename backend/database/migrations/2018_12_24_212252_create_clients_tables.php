<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateClientsTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->increments('id');
            $table->boolean('active');
            $table->timestamps();
            $table->softDeletes('deleted');
            $table->softDeletes('deleted_at');
            $table->integer('deleted_by')->unsigned();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('nationality');
            $table->string('identification_type');
            $table->string('identification_number');
            $table->string('tin_number');
            $table->timestamp('date_of_birth');
            $table->string('phone_number');
            $table->string('email');
            $table->string('domicilio_calle');
            $table->integer('domicilio_numero');
            $table->integer('domicilio_piso');
            $table->string('domicilio_depto');
            $table->string('pais');
            $table->string('provincia');
            $table->string('ciudad');
            $table->string('observations');
            $table->string('extra');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('clients');
    }
}
