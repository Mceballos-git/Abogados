<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTurnsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('turns', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('client_id');
            $table->integer('given_user_id');
            $table->integer('attention_user_id');
            $table->integer('office_id')->nullable();
            $table->date('register_date');
            $table->date('turn_date');
            $table->time('turn_time_start');
            $table->time('turn_time_end');
            $table->string('phone_number_ref');
            $table->text('priority');
            $table->text('comments')->nullable();
            $table->char('title',100)->nullable();
            $table->boolean('active');
            $table->timestamps();


        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('turns');
    }
}
