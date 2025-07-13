<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::options('/{any}', function () {
    return response()->json([], 200)
        ->header('Access-Control-Allow-Origin', 'http://localhost:5173')
        ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
        ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
        ->header('Access-Control-Allow-Credentials', 'true');
})->where('any', '.*');

Route::get('/checkhealth', function () {
    return response()->json(['status' => 'ok']);
});

// RUTAS PARA USUARIOS y AUTENTICACIÓN
Route::group([], function () {
    require __DIR__ . '/../app/Modules/User/Routes/api.php';
});

// TODO: RUTAS PARA TRATAMIENTOS
Route::group([], function () {
    require __DIR__ . '/../app/Modules/Treatment/Routes/Treatment.php';
});
// TODO: RUTAS PARA PACIENTES
Route::group([], function () {
    require __DIR__ . '/../app/Modules/Patient/Routes/Patient.php';
});

//TODO: RUTAS PARA DENTISTAS
Route::group([], function () {
    require __DIR__ . '/../app/Modules/Dentist/Routes/Dentist.php';
});
// TODO: RUTAS PARA CITA
Route::group([], function () {
    require __DIR__ . '/../app/Modules/Appointment/Routes/Appointment.php';
});
// TODO: RUTAS PARA HISTORIAL CLÍNICO
Route::group([], function () {
    require __DIR__ . '/../app/Modules/ClinicalHistory/Routes/ClinicalHistory.php';
});
// TODO: RUTAS PARA FACTURACIÓN
Route::group([], function () {
    require __DIR__ . '/../app/Modules/Payment/Routes/Payment.php';
});
// TODO: RUTAS PARA REPORTES
