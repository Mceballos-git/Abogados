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
            $table->boolean('active')->default(0);
            $table->timestamps();
            $table->softDeletes('deleted');
            $table->softDeletes('deleted_at');
            $table->integer('deleted_by');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('nationality');
            $table->string('identification_type');
            $table->string('identification_number');
            $table->string('tin_number');
            $table->date('date_of_birth')->nullable();
            $table->string('phone_number');
            $table->string('email')->unique();
            $table->string('street_address');
            $table->integer('number_address');
            $table->string('floor_address');
            $table->string('department_address');
            $table->string('country');
            $table->string('state');
            $table->string('city');
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
