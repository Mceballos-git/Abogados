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
            $table->text('role_list')->nullable();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('degree')->nullable()->default(null);
            $table->string('position')->nullable()->default(null);
            $table->string('shift_start')->nullable()->default(null);
            $table->string('shift_end')->nullable()->default(null);
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
            'email' => 'dsf@dfsdf.com',
            'password' => Hash::make('password'),
            'active' => 1,
            'role_list' => json_encode(array('admin')),
            'first_name' => 'Admin',
            'last_name' => 'Nanapu',
            'degree' => '',
            'position' => 'Testing Software',
            'shift_start' => '00:00:00.0000',
            'shift_end' => '23:59:59.9999'
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
