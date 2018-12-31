<?php

namespace App\Console\Commands;

use App\Services\FileAccessService;
use Illuminate\Console\Command;

class GenerateApiDocumentation extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'Documentation:generateApiDocumentation';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate API Documentation as .MD file';

    /**
     * @var FileAccessService
     */
    protected $fileAccessService;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct(FileAccessService $fileAccessService)
    {
        $this->fileAccessService = $fileAccessService;
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {


        $routes = $this->fileAccessService->getFiles('routingConfigFiles');





    }
}
