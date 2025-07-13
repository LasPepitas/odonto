<?php

use Illuminate\Support\Facades\Route;
use App\Modules\Payment\Controllers\PaymentController;

Route::prefix('payments')->group(function () {
    Route::get('/', [PaymentController::class, 'index']);
    Route::post('/', [PaymentController::class, 'store']);
    Route::get('{id}', [PaymentController::class, 'show']);
    Route::put('{id}', [PaymentController::class, 'update']);
    Route::delete('{id}', [PaymentController::class, 'destroy']);
});

// Estadísticas
Route::get('/statistics', [PaymentController::class, 'getStatistics']);
