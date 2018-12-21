<?php

namespace App\Providers;

use App\Services\FileAccessService;
use Illuminate\Support\ServiceProvider;

/**
 * Class RouteLoaderServiceProvider
 * @package App\Providers\Services
 */
class FileAccessServiceProvider extends ServiceProvider
{
    /**
     * Register RouterLoaderService Provider.
     */
    public function register()
    {
        $instance = new FileAccessService($this->app->basePath());
        $this->app->instance(FileAccessService::class, $instance);
    }
}
