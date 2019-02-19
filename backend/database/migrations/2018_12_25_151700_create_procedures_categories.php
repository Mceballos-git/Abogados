<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProceduresCategories extends Migration
{

    public function up()
    {
        Schema::create('procedure_categories', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->nullable();
            $table->timestamps();

        });
        $procedureCategories = [
            ['name' => 'Reajuste de haberes'],
            ['name' => 'Pension judicial'],
            ['name' => 'Jubilacion'],
            ['name' => 'Pension derivada'],
            ['name' => 'Amparo'],
            ['name' => 'Honorario de Anses'],
            ['name' => 'Jubilacion de por invalidez judicial'],
            ['name' => 'Laboral - Despido'],
            ['name' => 'ART'],
            ['name' => 'Sucesion'],
            ['name' => 'Desalojo'],
            ['name' => 'Alimentos'],
            ['name' => 'Ejecucion de titulos'],
            ['name' => 'Daños y perjuicios'],
            ['name' => 'Salud'],
            ['name' => 'Otros'],
        ];
        \App\Models\ProcedureCategoryModel::insert($procedureCategories);
    }

    public function down()
    {
        Schema::create('procedure_categories', function (Blueprint $table) {
            $table->dropColumn(['id', 'name']);
        });
    }


}
