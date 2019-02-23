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
            $table->integer('client_id');
            $table->integer('procedure_category_id')->default(0);
            $table->string('inicio_demanda')->nullable();
            $table->string('sentencia_primera_instancia')->nullable();
            $table->string('sentencia_segunda_instancia')->nullable();
            $table->string('sentencia_corte_suprema')->nullable();
            $table->string('inicio_de_ejecucion')->nullable();
            $table->text('observaciones')->nullable();
            $table->timestamps();
            $table->foreign('client_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
            $table->foreign('procedure_category_id')
                ->references('id')
                ->on('procedures_categories')
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
