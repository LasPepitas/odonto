<?php

namespace App\Modules\Patient\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Modules\Patient\Models\Patient;

class PatientController extends Controller
{
    // 🧾 Mostrar todos los pacientes
    public function index()
    {
        $patients = Patient::all();

        return response()->json([
            'success' => true,
            'data' => $patients
        ]);
    }

    // 🔍 Mostrar un paciente por ID
    public function show($id)
    {
        $patient = Patient::find($id);

        if (!$patient) {
            return response()->json([
                'success' => false,
                'message' => 'Paciente no encontrado.'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $patient
        ]);
    }

    // ➕ Crear nuevo paciente
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'full_name' => 'required|string',
            'dni' => 'required|string|max:20|unique:patient,dni',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
            'birth_date' => 'nullable|date'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $patient = Patient::create($validator->validated());

        return response()->json([
            'success' => true,
            'message' => 'Paciente creado correctamente.',
            'data' => $patient
        ], 201);
    }

    // ✏️ Actualizar paciente
    public function update(Request $request, $id)
    {
        $patient = Patient::find($id);

        if (!$patient) {
            return response()->json([
                'success' => false,
                'message' => 'Paciente no encontrado.'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'full_name' => 'sometimes|required|string',
            'dni' => 'sometimes|required|string|max:20|unique:patient,dni,' . $id,
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
            'birth_date' => 'nullable|date'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $patient->update($validator->validated());

        return response()->json([
            'success' => true,
            'message' => 'Paciente actualizado correctamente.',
            'data' => $patient
        ]);
    }

    // ❌ Eliminar paciente
    public function destroy($id)
    {
        $patient = Patient::find($id);

        if (!$patient) {
            return response()->json([
                'success' => false,
                'message' => 'Paciente no encontrado.'
            ], 404);
        }

        $patient->delete();

        return response()->json([
            'success' => true,
            'message' => 'Paciente eliminado correctamente.'
        ]);
    }
}
