<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateUsersTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function ($table) {
            $table->string('first_name');
            $table->string('last_name');
            $table->string('degree');
            $table->string('position');
            $table->timestamp('shift_start');
            $table->timestamp('shift_end');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function ($table) {
            $table->dropColumn('first_name');
            $table->dropColumn('last_name');
            $table->dropColumn('degree');
            $table->dropColumn('position');
            $table->dropColumn('shift_start');
            $table->dropColumn('shift_end');
        });
    }
}
