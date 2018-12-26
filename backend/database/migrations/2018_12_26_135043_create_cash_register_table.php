<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCashRegisterTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cash_register', function (Blueprint $table) {
            $table->increments('id');
            $table->date('date');
            $table->integer('item_id');
            $table->integer('type_id'); //egreso o ingreso -> type_movements_table
            $table->integer('pay_id')->unsigned()->default('0');
            $table->integer('sale_id')->unsigned()->default('0');
            $table->float('amount');
            $table->text('concept')->default(null);
            $table->date('user_id')->default(null);
            $table->integer('cash_register_id')->default('1');



        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cash_register');
    }
}
