<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProcedures extends Migration
{


    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::create('Procedures', function (Blueprint $table) {
            $table->increments('id');
            $table->string('client_id');
            $table->date('inicio_demanda');
            $table->date('sentencia_primera_instancia')->nullable();
            $table->date('sentencia_segunda_instancia')->nullable();
            $table->date('sentencia_corte_suprema')->nullable();
            $table->date('inicio_de_ejecucion')->nullable();
            $table->text('observaciones')->nullable();
            $table->timestamps();
            $table->foreign('client_id')
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
        Schema::dropIfExists('procedures');
    }
}
