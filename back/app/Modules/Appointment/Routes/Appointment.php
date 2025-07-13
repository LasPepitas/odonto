<?php

use App\Modules\Appointment\Controllers\AppointmentController;
use Illuminate\Support\Facades\Route;

Route::prefix('appointments')->group(function () {
    Route::get('/', [AppointmentController::class, 'index']); // Listar
    Route::post('/', [AppointmentController::class, 'store']); // Crear
    Route::get('/{id}', [AppointmentController::class, 'show']); // Mostrar por ID
    Route::put('/{id}', [AppointmentController::class, 'update']); // Actualizar
    Route::delete('/{id}', [AppointmentController::class, 'destroy']); // Eliminar
});