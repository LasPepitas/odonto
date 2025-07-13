<?php

namespace App\Modules\Appointment\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Appointment\Models\Appointment;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Exception;

class AppointmentController extends Controller
{
    /**
     * GET /appointments - Obtener todas las citas
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = Appointment::with(['patient', 'dentist', 'treatment']);

            // Filtros básicos
            if ($request->patient_id) {
                $query->where('patient_id', $request->patient_id);
            }

            if ($request->dentist_id) {
                $query->where('dentist_id', $request->dentist_id);
            }

            if ($request->treatment_id) {
                $query->where('treatment_id', $request->treatment_id);
            }

            if ($request->status) {
                $query->where('status', $request->status);
            }

            $appointments = $query->orderBy('appointment_datetime', 'desc')
                                ->paginate(15);

            return response()->json([
                'success' => true,
                'data' => $appointments
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving appointments'
            ], 500);
        }
    }

    /**
     * POST /appointments - Crear nueva cita
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validatedData = $request->validate([
                'patient_id' => 'required|integer|exists:patient,id',
                'dentist_id' => 'required|integer|exists:dentist,id',
                'treatment_id' => 'required|integer|exists:treatment,id',
                'appointment_datetime' => 'required|date|after:now',
                'status' => 'required|string|in:scheduled,completed,cancelled,no_show'
            ]);

            $appointment = Appointment::create($validatedData);

            return response()->json([
                'success' => true,
                'data' => $appointment
            ], 201);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'errors' => $e->errors()
            ], 422);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error creating appointment'
            ], 500);
        }
    }

    /**
     * GET /appointments/{id} - Obtener cita específica
     */
     public function show(int $id): JsonResponse
    {
        try {
            $appointment = Appointment::with(['patient', 'dentist', 'treatment'])
                                    ->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $appointment
            ], 200);

        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Appointment not found'
            ], 404);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving appointment'
            ], 500);
        }
    }

    /**
     * PUT /appointments/{id} - Actualizar cita existente
     */
    public function update(Request $request, int $id): JsonResponse
    {
        try {
            $appointment = Appointment::findOrFail($id);

            $validatedData = $request->validate([
                'patient_id' => 'sometimes|integer|exists:patient,id',
                'dentist_id' => 'sometimes|integer|exists:dentist,id',
                'treatment_id' => 'sometimes|integer|exists:treatment,id',
                'appointment_datetime' => 'sometimes|date',
                'status' => 'sometimes|string|in:scheduled,completed,cancelled,no_show'
            ]);

            $appointment->update($validatedData);

            return response()->json([
                'success' => true,
                'data' => $appointment->fresh()
            ], 200);

        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Appointment not found'
            ], 404);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'errors' => $e->errors()
            ], 422);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating appointment'
            ], 500);
        }
    }

    /**
     * DELETE /appointments/{id} - Eliminar cita
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            $appointment = Appointment::findOrFail($id);
            $appointment->delete();

            return response()->json([
                'success' => true,
                'message' => 'Appointment deleted successfully'
            ], 200);

        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Appointment not found'
            ], 404);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error deleting appointment'
            ], 500);
        }
    }
}