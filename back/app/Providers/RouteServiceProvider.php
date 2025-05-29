<?php

namespace App\Providers;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;

class RouteServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        parent::boot();

        $this->mapModuleApiRoutes();
    }

    protected function mapModuleApiRoutes(): void
    {
        $modulesPath = base_path('app/Modules');
        $modules = File::directories($modulesPath);

        foreach ($modules as $modulePath) {
            $moduleName = basename($modulePath);
            $routesPath = $modulePath . '/Routes/api.php';

            if (File::exists($routesPath)) {
                Route::prefix('api')
                    ->middleware('api')
                    ->group($routesPath);
            }
        }
    }
}
