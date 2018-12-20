<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('username')->unique();
            $table->string('email')->unique();
            $table->text('roles')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->text('key')->nullable();
            $table->integer('active')->default(0);
            $table->rememberToken();
            $table->timestamps();
        });

        // Create admin user for test proposes
        \App\Models\UserModel::create([
            'username' => 'admin',
            'email' => '',
            'password' => Hash::make('password'),
            'active' => 1
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
