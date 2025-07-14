<?php

namespace App\Modules\Inventory\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Inventory\Models\Inventory;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class InventoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = Inventory::query();

            // Filtro por nombre de material
            if ($request->has('material_name')) {
                $query->where('material_name', 'like', '%' . $request->material_name . '%');
            }

            // Filtro por categoría
            if ($request->has('categoria')) {
                $query->where('categoria', 'like', '%' . $request->categoria . '%');
            }

            // Filtro por stock bajo
            if ($request->has('low_stock') && $request->low_stock === 'true') {
                $query->whereColumn('actual_stock', '<=', 'min_stock');
            }

            // Ordenamiento
            $sortBy = $request->get('sort_by', 'material_name');
            $sortOrder = $request->get('sort_order', 'asc');
            $query->orderBy($sortBy, $sortOrder);

            // Paginación (devuelve el objeto paginator completo)
            $inventory = $query->paginate($request->get('per_page', 15));

            return response()->json([
                'success' => true,
                'data' => $inventory
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener el inventario',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'material_name'   => 'required|string|max:255',
            'categoria'       => 'required|string|max:100',
            'proveedor'       => 'required|string|max:150',
            'costo_unitario'  => 'required|numeric|min:0',
            'actual_stock'    => 'required|integer|min:0',
            'min_stock'       => 'required|integer|min:0'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Datos de validación incorrectos',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $inventory = Inventory::create($validator->validated());

            return response()->json([
                'success' => true,
                'message' => 'Material creado exitosamente',
                'data' => $inventory
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al crear el material',
                'error' => $e->getMessage()
            ], 500);
        }
    }

   public function show($id): JsonResponse
    {
        try {
            $inventory = Inventory::findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $inventory
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener el material',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'material_name'   => 'required|string|max:255',
            'categoria'       => 'required|string|max:100',
            'proveedor'       => 'required|string|max:150',
            'costo_unitario'  => 'required|numeric|min:0',
            'actual_stock'    => 'required|integer|min:0',
            'min_stock'       => 'required|integer|min:0'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Datos de validación incorrectos',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $inventory = Inventory::findOrFail($id);
            $inventory->update($validator->validated());

            return response()->json([
                'success' => true,
                'message' => 'Material actualizado exitosamente',
                'data' => $inventory
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al actualizar el material',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
        try {
            $inventory = Inventory::findOrFail($id);
            $inventory->delete();

            return response()->json([
                'success' => true,
                'message' => 'Material eliminado exitosamente'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al eliminar el material',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
