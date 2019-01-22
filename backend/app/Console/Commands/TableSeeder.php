<?php

namespace App\Console\Commands;

use App\Models\ClientModel;
use App\Models\MovementCategoryModel;
use App\Models\MovementModel;
use App\Models\OfficeModel;
use App\Models\OldCajaModel;
use App\Models\OldClientesModel;
use App\Models\OldOficinasModel;
use App\Models\OldTipos_Mov_CajaModel;
use App\Models\OldTurnosModel;
use App\Models\OldUsuariosModel;
use App\Models\TurnModel;
use App\Models\UserModel;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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
        $this->info('Initiated DB Seeding with Old Database Information');
        $this->info('');
        // Disable Foreign Check DUE Corrupted entries in old atabase.
        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        $this->createOffices();
        $this->createUsers();
        $this->createTurns();
        $this->createClients();
        $this->createMovementsCategories();
        $this->createMovements();
        // Enable Foreign Check again.
        DB::statement('SET FOREIGN_KEY_CHECKS=1');

        $this->info('');
        $this->info('DB Seeding Finalized Successfully');
    }

    public function createOffices()
    {
        $this->info('Creating Offices...');
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

    public function createUsers()
    {
        $this->info('Creating Users...');
        $old = OldUsuariosModel::get();
        foreach ($old as $user) {
            $newUser = [];
            $newUser['id'] = $user->id_operador;
            $newUser['username'] = $user->usuario;
            $newUser['first_name'] = $user->nombre;
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

    public function createTurns()
    {
        $this->info('Creating Turns...');
        $old = OldTurnosModel::get();
        foreach ($old as $turn) {
            $date = $turn->fecha_registro;
            if ($date === '0000-00-00') {
                $date = '1990-10-10';
            }
            $newTurn = [];
            $newTurn['id'] = $turn->id_turno;
            $newTurn['client_id'] = $turn->id_cliente;
            $newTurn['given_user_id'] = $turn->id_operador_dador;
            $newTurn['attention_user_id'] = $turn->id_operador_atencion;
            $newTurn['office_id'] = $turn->id_oficina;
            $newTurn['register_date'] = $turn->fecha_registro;
            $newTurn['turn_date'] = $date;
            $newTurn['turn_time_start'] = $turn->hora_desde;
            $newTurn['turn_time_end'] = $turn->hora_hasta;
            $newTurn['phone_number_ref'] = $turn->telefono_ref;
            $newTurn['priority'] = $turn->prioridad;
            $newTurn['title'] = $turn->titulo;
            $newTurn['active'] = $turn->activo;
            $newTurn['comments'] = mb_convert_encoding($turn->comentarios, 'utf-8');
            TurnModel::updateorcreate($newTurn);
        }
    }

    public function createClients()
    {
        $this->info('Creating Clients...');
        $old = OldClientesModel::get();
        foreach ($old as $client) {
            $date_of_birth = $client->fecha_nac;
            if ($date_of_birth === '0000-00-00') {
                $date_of_birth = '1990-10-10';
            }
            $newClient = [];
            $newClient['id'] = $client->id_cliente;
            $newClient['active'] = $client->activo;
            $newClient['first_name'] = $client->nombre;
            $newClient['last_name'] = $client->apellido;
            $newClient['nationality'] = $client->nacionalidad;
            $newClient['identification_type'] = $client->tipo_doc;
            $newClient['identification_number'] = $client->dni;
            $newClient['tin_number'] = $client->cuit;
            $newClient['date_of_birth'] = $date_of_birth;
            $newClient['phone_number'] = $client->telefono;
            $newClient['email'] = $client->email;
            $newClient['street_address'] = $client->domicilio_calle;
            $newClient['number_address'] = $client->domicilio_numero;
            $newClient['floor_address'] = $client->domicilio_piso;
            $newClient['department_address'] = $client->domicilio_depto;
            $newClient['country'] = $client->pais;
            $newClient['state'] = $client->provincia;
            $newClient['city'] = $client->ciudad;
            $newClient['observations'] = $client->observaciones;
            $newClient['extra'] = $client->extra;
            ClientModel::updateorcreate($newClient);
        }

    }

    public function createMovementsCategories()
    {
        $this->info('Creating Movement Categories ...');
        $old = OldTipos_Mov_CajaModel::get();
        foreach ($old as $movementCategory) {
            $newMovementCategory = [];
            $newMovementCategory['id'] = $movementCategory->id_tipo;
            $newMovementCategory['name'] = $movementCategory->nombre;
            MovementCategoryModel::updateorcreate($newMovementCategory);
        }
    }

    Public function createMovements()
    {
        $this->info('Creating Movements...');
        $old = OldCajaModel::get();
        foreach ($old as $movement) {
            $detalleMov = null;
            $detalleCliente = null;
            if ($movement->id_pago) {
                $detalleMov = OldCajaModel::where('id_pago', $movement->id_pago)->first();
                $detalleCliente = $detalleMov->id_pago;
            }
            if ($movement->id_venta) {
                $detalleMov = OldCajaModel::where('id_venta', $movement->id_venta)->first();
                $detalleCliente = $detalleMov->id_venta;
            }
            if ($movement->tipo === 'egreso') {
                $tipoMov = 1;
            }
            if ($movement->tipo === "ingreso") {
                $tipoMov = 2;
            }
            $newMovement = [];
            $newMovement['id'] = $movement->id_movimiento;
            $newMovement['datetime'] = $movement->fecha;
            $newMovement['amount'] = $movement->monto;
            $newMovement['concept'] = $movement->concepto;
            $newMovement['movement_type_id'] = $tipoMov;
            $newMovement['user_id'] = $movement->id_operador;
            $newMovement['movement_category_id'] = $movement->id_rubro;
            $newMovement['client_id'] = $detalleCliente;
            MovementModel::updateorcreate($newMovement);
        }
    }


}
