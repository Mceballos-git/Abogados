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
            ['name' => 'Pensión judicial'],
            ['name' => 'Jubilación'],
            ['name' => 'Pensión derivada'],
            ['name' => 'Amparo'],
            ['name' => 'Honorario de Anses'],
            ['name' => 'Jubilación por invalidez judicial'],
            ['name' => 'Laboral - Despido'],
            ['name' => 'ART'],
            ['name' => 'Sucesión'],
            ['name' => 'Desalojo'],
            ['name' => 'Alimentos'],
            ['name' => 'Ejecución de títulos'],
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
