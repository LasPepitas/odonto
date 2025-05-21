<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class ModuleServiceProvider extends ServiceProvider
{
    protected $modules = [
        'User',
        'Patient',
        'Appointment',
        'Dentist',
        'Treatment',
        'Payment',
        'Inventory'
    ];

    public function register(): void
    {
        // Register module routes
        foreach ($this->modules as $module) {
            if (file_exists(app_path("Modules/{$module}/Routes/api.php"))) {
                $this->loadRoutesFrom(app_path("Modules/{$module}/Routes/api.php"));
            }
        }
    }

    public function boot(): void
    {
        // Boot module services
    }
}