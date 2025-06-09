<?php

use App\Modules\Patient\Controllers\PatientController;
use Illuminate\Support\Facades\Route;


// Rutas para el módulo de Pacientes
Route::get('patients', [PatientController::class, 'index']);
Route::get('patients/{id}', [PatientController::class, 'show']);
Route::post('patients', [PatientController::class, 'store']);
Route::put('patients/{id}', [PatientController::class, 'update']);
Route::delete('patients/{id}', [PatientController::class, 'destroy']);
