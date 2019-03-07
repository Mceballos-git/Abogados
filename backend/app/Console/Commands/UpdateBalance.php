<?php

namespace App\Console\Commands;


use App\Models\ClientModel;
use App\Services\ClientService;
use Illuminate\Console\Command;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Services\FluffyQueryService;


class updateBalance extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'update:balances';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate balance content in client table';
    /**
     * @var FluffyQueryService
     */
    protected $clientService;

    /**
     * updateBalance constructor.
     * @param ClientService $clientService
     */
    public function __construct(ClientService $clientService)
    {
        $this->clientService = $clientService;
        parent::__construct();
    }


    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {

        Schema::table('clients', function (Blueprint $table) {
            $table->integer('id')->autoIncrement()->change();
        });
        Schema::table('movement_categories', function (Blueprint $table) {
            $table->integer('id')->autoIncrement()->change();
        });



        $this->info('Updating Clients Balances...');
        $clients = ClientModel::get();
        foreach ($clients as $client) {
            $client_id = $client->id;
            $this->clientService->updateClientBalance($client_id);
        }
    }
}