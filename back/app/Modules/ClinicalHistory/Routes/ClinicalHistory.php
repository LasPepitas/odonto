<?php

use App\Modules\ClinicalHistory\Controllers\ClinicalHistoryController;
// routes/api.php
Route::prefix('clinical-history')->group(function () {
    Route::get('/patient/{patient_id}', [ClinicalHistoryController::class, 'getPatientClinicalHistory']);
    Route::get('/patient/{patient_id}/summary', [ClinicalHistoryController::class, 'getPatientSummary']);
    Route::get('/doctor/{doctor_id}/patients', [ClinicalHistoryController::class, 'getDoctorPatients']);
    Route::get('/all-patients', [ClinicalHistoryController::class, 'getAllPatientsHistory']);
});