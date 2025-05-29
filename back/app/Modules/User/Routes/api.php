<?php

use App\Modules\User\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// Rutas públicas de autenticación
Route::prefix('auth')->group(function () {
    Route::post('login', [UserController::class, 'login']);
    Route::post('register', [UserController::class, 'register']);
    Route::post('forgot-password', [UserController::class, 'forgotPassword']);
    Route::post('reset-password', [UserController::class, 'resetPassword']);

    // check health endpoint
    Route::get('health', fn() => response()->json(['status' => 'ok']));

    // Rutas protegidas por auth
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('logout', [UserController::class, 'logout']);
        Route::get('me', [UserController::class, 'me']);
        Route::post('change-password', [UserController::class, 'changePassword']);
    });
});

// CRUD de usuarios, también protegido
Route::middleware('auth:sanctum')->prefix('users')->group(function () {
    Route::get('/', [UserController::class, 'index']);
    Route::post('/', [UserController::class, 'store']);
    Route::get('/{user}', [UserController::class, 'show']);
    Route::put('/{user}', [UserController::class, 'update']);
    Route::delete('/{user}', [UserController::class, 'destroy']);
});
