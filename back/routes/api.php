<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/checkhealth', function () {
    return response()->json(['status' => 'ok']);
});

// RUTAS PARA USUARIOS y AUTENTICACIÓN
Route::group([], function () {
    require __DIR__ . '/../app/Modules/User/Routes/api.php';
});

// TODO: RUTAS PARA TRATAMIENTOS
// TODO: RUTAS PARA PACIENTES
// TODO: RUTAS PARA CITA
// TODO: RUTAS PARA HISTORIAL CLÍNICO
// TODO: RUTAS PARA FACTURACIÓN
// TODO: RUTAS PARA REPORTES
