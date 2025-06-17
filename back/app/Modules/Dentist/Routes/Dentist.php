<?php

use App\Modules\Dentist\Controllers\DentistController;
use Illuminate\Support\Facades\Route;

//rutas para el módulo de Dentistas
Route::get('dentists', [DentistController::class, 'index']);
Route::get('dentists/{id}', [DentistController::class, 'show']);
Route::post('dentists', [DentistController::class, 'store']);
Route::put('dentists/{id}', [DentistController::class, 'update']);
Route::delete('dentists/{id}', [DentistController::class, 'destroy']);