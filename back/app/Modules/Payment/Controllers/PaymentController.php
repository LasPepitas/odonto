<?php

namespace App\Modules\Payment\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Payment\Models\payment;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Carbon\Carbon;
use Exception;

class PaymentController extends Controller
{
    /**
     * GET /payments - Obtener todos los pagos
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = Payment::with(['appointment', 'treatment']);

            // Filtros básicos
            if ($request->appointment_id) {
                $query->where('appointment_id', $request->appointment_id);
            }

            if ($request->treatment_id) {
                $query->where('treatment_id', $request->treatment_id);
            }
            // join con patient y treatment
            $query->join('patient', 'payment.appointment_id', '=', 'patient.id')
                ->join('treatment', 'payment.treatment_id', '=', 'treatment.id')
                ->select('payment.*', 'patient.full_name as patient_name', 'treatment.name as treatment_name');

            $payments = $query->orderBy('payment_date', 'desc')
                ->paginate(15);

            return response()->json([
                'success' => true,
                'data' => $payments
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving payments',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * POST /payments - Crear nuevo pago
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validatedData = $request->validate([
                'appointment_id' => 'required|integer|exists:appointment,id',
                'amount' => 'required|numeric|min:0|max:999999.99',
                'payment_date' => 'required|date',
                'treatment_id' => 'nullable|integer|exists:treatment,id'
            ]);

            $payment = Payment::create($validatedData);

            return response()->json([
                'success' => true,
                'data' => $payment
            ], 201);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'errors' => $e->errors()
            ], 422);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error creating payment',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * GET /payments/{id} - Obtener pago específico
     */
    public function show(int $id): JsonResponse
    {
        try {
            $payment = Payment::with(['appointment', 'treatment'])
                ->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $payment
            ], 200);

        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Payment not found'
            ], 404);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving payment',
            ], 500);
        }
    }

    /**
     * PUT /payments/{id} - Actualizar pago existente
     */
    public function update(Request $request, int $id): JsonResponse
    {
        try {
            $payment = Payment::findOrFail($id);

            $validatedData = $request->validate([
                'appointment_id' => 'sometimes|integer|exists:appointment,id',
                'amount' => 'sometimes|numeric|min:0|max:999999.99',
                'payment_date' => 'sometimes|date',
                'treatment_id' => 'sometimes|nullable|integer|exists:treatment,id'
            ]);

            $payment->update($validatedData);

            return response()->json([
                'success' => true,
                'data' => $payment->fresh()
            ], 200);

        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Payment not found'
            ], 404);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'errors' => $e->errors()
            ], 422);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating payment'
            ], 500);
        }
    }

    /**
     * DELETE /payments/{id} - Eliminar pago
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            $payment = Payment::findOrFail($id);
            $payment->delete();

            return response()->json([
                'success' => true,
                'message' => 'Payment deleted successfully'
            ], 200);

        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Payment not found'
            ], 404);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error deleting payment'
            ], 500);
        }
    }

    /**
     * GET /payments/statistics - Estadísticas de pagos (diarias o por rango)
     * Query params:
     * - date: para estadísticas de un día específico
     * - start_date & end_date: para estadísticas por rango
     * - dentist_id: filtrar por dentista específico
     */
    public function getStatistics(Request $request): JsonResponse
    {
        try {
            // Validación flexible: puede ser un día específico o un rango
            $validatedData = $request->validate([
                'date' => 'nullable|date',
                'start_date' => 'nullable|date',
                'end_date' => 'nullable|date|after_or_equal:start_date',
                'dentist_id' => 'nullable|integer|exists:dentist,id'
            ]);

            // Determinar si es consulta diaria o por rango
            $isDaily = !empty($validatedData['date']);
            $isRange = !empty($validatedData['start_date']) && !empty($validatedData['end_date']);

            // Validar que se proporcione al menos un tipo de fecha
            if (!$isDaily && !$isRange) {
                return response()->json([
                    'success' => false,
                    'message' => 'Debe proporcionar "date" para estadísticas diarias o "start_date" y "end_date" para rango'
                ], 400);
            }

            // Si se proporciona date, usar solo ese día
            if ($isDaily) {
                $startDate = $validatedData['date'];
                $endDate = $validatedData['date'];
            } else {
                $startDate = $validatedData['start_date'];
                $endDate = $validatedData['end_date'];
            }

            $dentistId = $validatedData['dentist_id'] ?? null;

            // Construir query base
            $query = Payment::whereBetween('payment_date', [$startDate, $endDate])
                ->with(['appointment.patient', 'appointment.dentist', 'treatment']);

            // Filtro por dentista si se especifica
            if ($dentistId) {
                $query->whereHas('appointment', function ($appointmentQuery) use ($dentistId) {
                    $appointmentQuery->where('dentist_id', $dentistId);
                });
            }

            $payments = $query->get();

            // Estadísticas generales
            $totalPayments = $payments->count();
            $totalAmount = $payments->sum('amount');
            $averageAmount = $totalPayments > 0 ? $totalAmount / $totalPayments : 0;

            // Estadísticas por dentista
            $dentistStats = $payments->groupBy('appointment.dentist_id')->map(function ($dentistPayments) {
                $firstPayment = $dentistPayments->first();
                return [
                    'dentist_id' => $firstPayment->appointment->dentist_id,
                    'dentist_info' => [
                        'id' => $firstPayment->appointment->dentist->id,
                        'user_id' => $firstPayment->appointment->dentist->user_id
                    ],
                    'total_payments' => $dentistPayments->count(),
                    'total_amount' => $dentistPayments->sum('amount'),
                    'average_amount' => $dentistPayments->avg('amount'),
                    'patients_attended' => $dentistPayments->pluck('appointment.patient_id')->unique()->count()
                ];
            });

            // Estadísticas por tratamiento
            $treatmentStats = $payments->groupBy('treatment_id')->map(function ($treatmentPayments) {
                $firstPayment = $treatmentPayments->first();
                return [
                    'treatment_id' => $firstPayment->treatment_id,
                    'treatment_info' => $firstPayment->treatment ? [
                        'id' => $firstPayment->treatment->id,
                        'name' => $firstPayment->treatment->name,
                        'cost' => $firstPayment->treatment->cost
                    ] : null,
                    'total_payments' => $treatmentPayments->count(),
                    'total_amount' => $treatmentPayments->sum('amount')
                ];
            });

            // Preparar respuesta base
            $responseData = [
                'query_type' => $isDaily ? 'daily' : 'range',
                'general_statistics' => [
                    'total_payments' => $totalPayments,
                    'total_amount' => round($totalAmount, 2),
                    'average_amount' => round($averageAmount, 2),
                    'total_patients' => $payments->pluck('appointment.patient_id')->unique()->count(),
                    'total_dentists' => $payments->pluck('appointment.dentist_id')->unique()->count()
                ],
                'by_dentist' => $dentistStats->values(),
                'by_treatment' => $treatmentStats->values()
            ];

            // Información específica según el tipo de consulta
            if ($isDaily) {
                $responseData['date'] = $startDate;
                // Para consultas diarias, incluir detalles de cada pago
                $responseData['payment_details'] = $payments->map(function ($payment) {
                    return [
                        'id' => $payment->id,
                        'amount' => $payment->amount,
                        'payment_date' => $payment->payment_date,
                        'patient' => [
                            'id' => $payment->appointment->patient->id,
                            'full_name' => $payment->appointment->patient->full_name,
                            'dni' => $payment->appointment->patient->dni
                        ],
                        'dentist' => [
                            'id' => $payment->appointment->dentist->id,
                            'user_id' => $payment->appointment->dentist->user_id
                        ],
                        'treatment' => $payment->treatment ? [
                            'id' => $payment->treatment->id,
                            'name' => $payment->treatment->name
                        ] : null
                    ];
                });
            } else {
                $responseData['date_range'] = [
                    'start_date' => $startDate,
                    'end_date' => $endDate,
                    'total_days' => Carbon::parse($startDate)->diffInDays(Carbon::parse($endDate)) + 1
                ];

                // Para rangos, incluir estadísticas por día
                $responseData['daily_statistics'] = $payments->groupBy(function ($payment) {
                    return Carbon::parse($payment->payment_date)->format('Y-m-d');
                })->map(function ($dayPayments, $date) {
                    return [
                        'date' => $date,
                        'total_payments' => $dayPayments->count(),
                        'total_amount' => $dayPayments->sum('amount'),
                        'patients_attended' => $dayPayments->pluck('appointment.patient_id')->unique()->count()
                    ];
                })->sortBy('date')->values();
            }

            return response()->json([
                'success' => true,
                'data' => $responseData
            ], 200);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'errors' => $e->errors()
            ], 422);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving payment statistics'
            ], 500);
        }
    }
}

