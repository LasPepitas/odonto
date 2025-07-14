<?php

namespace App\Modules\Dentist\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Modules\Dentist\Models\Dentist;
use App\Modules\User\Models\User;


class DentistController extends Controller
{
    // 🧾 Mostrar todos los dentistas
    public function index()
    {
        $dentists = Dentist::join('user', 'dentist.user_id', '=', 'user.id')
            ->select('dentist.*', 'user.email', 'user.full_name')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $dentists
        ]);
    }

    // 🔍 Mostrar un dentista por ID
    public function show($id)
    {
        $dentist = Dentist::find($id);

        if (!$dentist) {
            return response()->json([
                'success' => false,
                'message' => 'Dentista no encontrado.'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $dentist
        ]);
    }

    // ➕ Crear nuevo dentista
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|integer|exists:user,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $dentist = Dentist::create($validator->validated());

        return response()->json([
            'success' => true,
            'data' => $dentist
        ], 201);
    }

    // ✏️ Actualizar dentista
    public function update(Request $request, $id)
    {
        $dentist = Dentist::find($id);

        if (!$dentist) {
            return response()->json([
                'success' => false,
                'message' => 'Dentista no encontrado.'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'user_id' => 'sometimes|required|integer|exists:user,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $dentist->update($validator->validated());

        return response()->json([
            'success' => true,
            'data' => $dentist
        ]);
    }

    // ❌ Eliminar dentista
    public function destroy($id)
    {
        $dentist = Dentist::find($id);

        if (!$dentist) {
            return response()->json([
                'success' => false,
                'message' => 'Dentista no encontrado.'
            ], 404);
        }

        $dentist->delete();

        return response()->json([
            'success' => true,
            'message' => 'Dentista eliminado correctamente.'
        ]);
    }
}