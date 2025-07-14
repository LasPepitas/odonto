<?php

use Illuminate\Support\Facades\Route;
use App\Modules\Inventory\Controllers\InventoryController;


// Rutas de API para Inventory
Route::prefix('inventory')->group(function () {
    Route::get('/', [InventoryController::class, 'index'])->name('inventory.index');
    Route::post('/', [InventoryController::class, 'store'])->name('inventory.store');
    Route::get('/{id}', [InventoryController::class, 'show'])->name('inventory.show');
    Route::put('/{id}', [InventoryController::class, 'update'])->name('inventory.update');
    Route::delete('/{id}', [InventoryController::class, 'destroy'])->name('inventory.destroy');
});

