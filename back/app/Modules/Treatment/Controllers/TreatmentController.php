<?php

namespace App\Modules\Treatment\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Modules\Treatment\Models\Treatment;

class TreatmentController extends Controller
{
    // 🧾 Mostrar todos los tratamientos
    public function index()
    {
        $treatments = Treatment::all();

        return response()->json([
            'success' => true,
            'data' => $treatments
        ]);
    }

    // 🔍 Mostrar un tratamiento por ID
    public function show($id)
    {
        $treatment = Treatment::find($id);

        if (!$treatment) {
            return response()->json([
                'success' => false,
                'message' => 'Tratamiento no encontrado.'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $treatment
        ]);
    }

    // ➕ Crear nuevo tratamiento
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'cost' => 'required|numeric|min:0'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $treatment = Treatment::create($validator->validated());

        return response()->json([
            'success' => true,
            'data' => $treatment
        ], 201);
    }

    // ✏️ Actualizar tratamiento existentex|
    public function update(Request $request, $id)
    {
        $treatment = Treatment::find($id);

        if (!$treatment) {
            return response()->json([
                'success' => false,
                'message' => 'Tratamiento no encontrado.'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'cost' => 'required|numeric|min:0'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $treatment->update($validator->validated());

        return response()->json([
            'success' => true,
            'data' => $treatment
        ]);
    }

    // ❌ Eliminar tratamiento
    public function destroy($id)
    {
        $treatment = Treatment::find($id);

        if (!$treatment) {
            return response()->json([
                'success' => false,
                'message' => 'Tratamiento no encontrado.'
            ], 404);
        }

        $treatment->delete();

        return response()->json([
            'success' => true,
            'message' => 'Tratamiento eliminado correctamente.'
        ]);
    }
}
