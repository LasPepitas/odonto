<?php

namespace App\Modules\ClinicalHistory\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Appointment\Models\Appointment;
use App\Modules\Patient\Models\Patient;
use App\Modules\Dentist\Models\Dentist;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Exception;

class ClinicalHistoryController extends Controller
{
    /**
     * GET /clinical-history/patient/{patient_id} - Historial clínico completo de un paciente
     */
    public function getPatientClinicalHistory(int $patientId): JsonResponse
    {
        try {
            // Validar que el paciente existe
            $patient = Patient::findOrFail($patientId);
            
            // Obtener todas las citas del paciente con sus relaciones
            $appointments = Appointment::where('patient_id', $patientId)
                ->with(['dentist', 'treatment'])
                ->orderBy('appointment_datetime', 'desc')
                ->get();

            // Si no hay citas, retornar datos básicos del paciente
            if ($appointments->isEmpty()) {
                return response()->json([
                    'success' => true,
                    'data' => [
                        'patient' => [
                            'id' => $patient->id,
                            'full_name' => $patient->full_name,
                            'dni' => $patient->dni,
                            'phone' => $patient->phone,
                            'address' => $patient->address,
                            'birth_date' => $patient->birth_date
                        ],
                        'total_appointments' => 0,
                        'doctors_attended' => [],
                        'attendance_history' => []
                    ]
                ], 200);
            }

            // Agrupar citas por médico
            $doctorsSummary = $appointments->groupBy('dentist_id')->map(function ($appointmentsByDoctor) {
                $firstAppointment = $appointmentsByDoctor->first();
                $dentist = $firstAppointment->dentist;
                
                return [
                    'doctor_id' => $dentist->id,
                    'doctor_info' => [
                        'id' => $dentist->id,
                        'user_id' => $dentist->user_id
                    ],
                    'total_appointments' => $appointmentsByDoctor->count(),
                    'first_appointment' => $appointmentsByDoctor->last()->appointment_datetime,
                    'last_appointment' => $appointmentsByDoctor->first()->appointment_datetime,
                    'treatments_performed' => $appointmentsByDoctor->pluck('treatment')->unique('id')->values()
                ];
            });

            // Crear historial de atención chronológico
            $attendanceHistory = $appointments->map(function ($appointment) {
                return [
                    'appointment_id' => $appointment->id,
                    'date' => $appointment->appointment_datetime,
                    'doctor' => [
                        'id' => $appointment->dentist->id,
                        'user_id' => $appointment->dentist->user_id
                    ],
                    'treatment' => [
                        'id' => $appointment->treatment->id,
                        'name' => $appointment->treatment->name,
                        'description' => $appointment->treatment->description,
                        'cost' => $appointment->treatment->cost
                    ],
                    'status' => $appointment->status
                ];
            });

            return response()->json([
                'success' => true,
                'data' => [
                    'patient' => [
                        'id' => $patient->id,
                        'full_name' => $patient->full_name,
                        'dni' => $patient->dni,
                        'phone' => $patient->phone,
                        'address' => $patient->address,
                        'birth_date' => $patient->birth_date
                    ],
                    'total_appointments' => $appointments->count(),
                    'doctors_attended' => $doctorsSummary->values(),
                    'attendance_history' => $attendanceHistory
                ]
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener el historial clínico del paciente',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * GET /clinical-history/patient/{patient_id}/summary - Resumen simple del historial
     */
    public function getPatientSummary(int $patientId): JsonResponse
    {
        try {
            $patient = Patient::findOrFail($patientId);
            
            $appointments = Appointment::where('patient_id', $patientId)
                ->with(['dentist', 'treatment'])
                ->orderBy('appointment_datetime', 'desc')
                ->get();

            if ($appointments->isEmpty()) {
                return response()->json([
                    'success' => true,
                    'data' => [
                        'patient' => $patient->full_name,
                        'dni' => $patient->dni,
                        'total_appointments' => 0,
                        'message' => 'No hay citas registradas para este paciente'
                    ]
                ], 200);
            }

            // Obtener fechas únicas de atención
            $attendanceDates = $appointments->pluck('appointment_datetime')->unique()->sort()->values();
            
            // Obtener médicos únicos que lo atendieron
            $doctorsAttended = $appointments->pluck('dentist')->unique('id')->map(function ($dentist) {
                return [
                    'doctor_id' => $dentist->id,
                    'user_id' => $dentist->user_id
                ];
            })->values();

            return response()->json([
                'success' => true,
                'data' => [
                    'patient' => [
                        'name' => $patient->full_name,
                        'dni' => $patient->dni,
                        'phone' => $patient->phone
                    ],
                    'total_appointments' => $appointments->count(),
                    'doctors_attended' => $doctorsAttended,
                    'attendance_dates' => $attendanceDates,
                    'first_appointment' => $appointments->last()->appointment_datetime,
                    'last_appointment' => $appointments->first()->appointment_datetime
                ]
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener el resumen del paciente'
            ], 500);
        }
    }

    /**
     * GET /clinical-history/doctor/{doctor_id}/patients - Pacientes atendidos por un doctor
     */
    public function getDoctorPatients(int $doctorId): JsonResponse
    {
        try {
            // Validar que el dentista existe
            $dentist = Dentist::findOrFail($doctorId);
            
            $appointments = Appointment::where('dentist_id', $doctorId)
                ->with(['patient', 'treatment'])
                ->orderBy('appointment_datetime', 'desc')
                ->get();

            if ($appointments->isEmpty()) {
                return response()->json([
                    'success' => true,
                    'data' => [
                        'doctor_id' => $doctorId,
                        'total_patients' => 0,
                        'patients_attended' => [],
                        'message' => 'No hay pacientes registrados para este médico'
                    ]
                ], 200);
            }

            $patientsSummary = $appointments->groupBy('patient_id')->map(function ($appointmentsByPatient) {
                $firstAppointment = $appointmentsByPatient->first();
                $patient = $firstAppointment->patient;
                
                return [
                    'patient' => [
                        'id' => $patient->id,
                        'full_name' => $patient->full_name,
                        'dni' => $patient->dni,
                        'phone' => $patient->phone
                    ],
                    'total_appointments' => $appointmentsByPatient->count(),
                    'first_appointment' => $appointmentsByPatient->last()->appointment_datetime,
                    'last_appointment' => $appointmentsByPatient->first()->appointment_datetime,
                    'attendance_dates' => $appointmentsByPatient->pluck('appointment_datetime')->toArray(),
                    'treatments_performed' => $appointmentsByPatient->pluck('treatment')->unique('id')->values()
                ];
            });

            return response()->json([
                'success' => true,
                'data' => [
                    'doctor_id' => $doctorId,
                    'doctor_info' => [
                        'id' => $dentist->id,
                        'user_id' => $dentist->user_id
                    ],
                    'total_patients' => $patientsSummary->count(),
                    'patients_attended' => $patientsSummary->values()
                ]
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener los pacientes del doctor'
            ], 500);
        }
    }

    /**
     * GET /clinical-history/all-patients - Resumen de todos los pacientes
     */
    public function getAllPatientsHistory(): JsonResponse
    {
        try {
            $patients = Patient::all();
            $summary = [];

            foreach ($patients as $patient) {
                $appointments = Appointment::where('patient_id', $patient->id)
                    ->with(['dentist', 'treatment'])
                    ->orderBy('appointment_datetime', 'desc')
                    ->get();

                $patientData = [
                    'patient' => [
                        'id' => $patient->id,
                        'full_name' => $patient->full_name,
                        'dni' => $patient->dni,
                        'phone' => $patient->phone
                    ],
                    'total_appointments' => $appointments->count()
                ];

                if ($appointments->isNotEmpty()) {
                    $doctors = $appointments->pluck('dentist')->unique('id')->map(function ($dentist) {
                        return [
                            'doctor_id' => $dentist->id,
                            'user_id' => $dentist->user_id
                        ];
                    })->values();

                    $patientData['doctors_attended'] = $doctors;
                    $patientData['first_appointment'] = $appointments->last()->appointment_datetime;
                    $patientData['last_appointment'] = $appointments->first()->appointment_datetime;
                    $patientData['attendance_dates'] = $appointments->pluck('appointment_datetime')->toArray();
                } else {
                    $patientData['doctors_attended'] = [];
                    $patientData['first_appointment'] = null;
                    $patientData['last_appointment'] = null;
                    $patientData['attendance_dates'] = [];
                }

                $summary[] = $patientData;
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'total_patients' => count($summary),
                    'patients_history' => $summary
                ]
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener el historial de todos los pacientes'
            ], 500);
        }
    }
}