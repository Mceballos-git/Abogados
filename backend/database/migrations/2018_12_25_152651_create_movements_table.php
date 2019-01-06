<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMovementsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('movements', function (Blueprint $table) {
            $table->increments('id');
            $table->date('datetime');
            $table->float('amount');
            $table->text('concept');
            $table->integer('movement_type_id')->unsigned();
            $table->integer('user_id')->unsigned();
            $table->integer('movement_category_id')->unsigned();
            $table->integer('client_id')->unsigned();
            $table->softDeletes('deleted');
            $table->softDeletes('deleted_at');
            $table->integer('deleted_by')->unsigned();
            $table->timestamps();
            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');






        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('movements');
    }
}
