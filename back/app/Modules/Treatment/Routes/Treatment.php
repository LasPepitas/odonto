<?php

use App\Modules\Treatment\Controllers\TreatmentController;
use Illuminate\Support\Facades\Route;

// Rutas para el módulo de Tratamientos
Route::get('treatments', [TreatmentController::class, 'index']);
Route::get('treatments/{id}', [TreatmentController::class, 'show']);
Route::post('treatments', [TreatmentController::class, 'store']);  
Route::put('treatments/{id}', [TreatmentController::class, 'update']);
Route::delete('treatments/{id}', [TreatmentController::class, 'destroy']);