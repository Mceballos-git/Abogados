<?php

namespace App\Console\Commands;

use App\Models\OfficeModel;
use App\Models\OldOficinasModel;
use App\Models\OldUsuariosModel;
use App\Models\UserModel;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use function MongoDB\BSON\toJSON;


class TableSeeder extends Command
{

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'table:seeder';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fill the new tables with the contents of the original DB';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->createOffices();
        $this->createUsers();
    }

    public function createOffices(){
        $old = OldOficinasModel::get();
        foreach ($old as $office) {
            $newOffice = [];
            $newOffice['id'] = $office->id_oficina;
            $newOffice['name'] = $office->nombre;
            $newOffice['address'] = $office->domicilio;
            $newOffice['comments'] = $office->comentario;
            OfficeModel::updateorcreate($newOffice);
        }
    }

    public function createUsers(){
        $old = OldUsuariosModel::get();
        foreach ($old as $user) {
            $newUser = [];
            $newUser['id'] = $user->id_operador;
            $newUser['username'] = $user->usuario;
            $newUser['first_name'] = mb_convert_encoding($user->nombre, 'utf-8') ;
            $newUser['last_name'] = $user->apellido;
            $newUser['email'] = $user->email;
            $newUser['password'] = Hash::make($user->clave);
            $newUser['active'] = $user->activo;
            $newUser['degree'] = $user->titulo;
            $newUser['position'] = $user->cargo;
            $newUser['shift_start'] = $user->horario_desde;
            $newUser['shift_end'] = $user->horario_hasta;
            UserModel::updateorcreate($newUser);
        }
    }
}
