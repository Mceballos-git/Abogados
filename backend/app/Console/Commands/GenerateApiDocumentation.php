<?php

namespace App\Console\Commands;

use App\Services\FileAccessService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\View;

class GenerateApiDocumentation extends Command
{

    const EXECUTION_START = 'Generation of API Documentation has started';
    const EXECUTION_END = 'Generation of API Documentation has Finished';

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
        $this->info(self::EXECUTION_START);
        $routes = $this->fileAccessService->getFiles('routingConfigFiles');
        $view = View::make('documentation.endpoints')->with(array('endpoints' => $routes))->render();
        $this->fileAccessService->overrideFileContent('/documentation/', 'api_docs.html', $view);
        $this->info(self::EXECUTION_END);
    }
}
