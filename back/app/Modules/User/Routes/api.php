<?php

use App\Modules\User\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware('api')->group(function () {
    Route::prefix('api/auth')->group(function () {
        Route::post('login', [UserController::class, 'login']);
        Route::post('register', [UserController::class, 'register']);
        Route::post('forgot-password', [UserController::class, 'forgotPassword']);
        Route::post('reset-password', [UserController::class, 'resetPassword']);
        
        // Protected routes
        Route::middleware('auth:sanctum')->group(function () {
            Route::post('logout', [UserController::class, 'logout']);
            Route::get('me', [UserController::class, 'me']);
            Route::post('change-password', [UserController::class, 'changePassword']);
        });
    });

    // Existing CRUD routes
    Route::middleware('auth:sanctum')->prefix('api/users')->group(function () {
        Route::get('/', [UserController::class, 'index']);
        Route::post('/', [UserController::class, 'store']);
        Route::get('/{user}', [UserController::class, 'show']);
        Route::put('/{user}', [UserController::class, 'update']);
        Route::delete('/{user}', [UserController::class, 'destroy']);
    });
});