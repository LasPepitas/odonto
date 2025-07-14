<?php

namespace App\Modules\Inventory\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    use HasFactory;

    protected $table = 'inventory';
    public $timestamps = false;

    protected $fillable = [
        'material_name',
        'categoria',
        'actual_stock',
        'min_stock',
        'proveedor',
        'costo_unitario'
    ];

    protected $casts = [
        'actual_stock' => 'integer',
        'min_stock' => 'integer',
        'costo_unitario' => 'decimal:2'
    ];

    /**
     * Devuelve los materiales con stock bajo o igual al mínimo.
     */
    public static function getLowStockItems()
    {
        return self::whereColumn('actual_stock', '<=', 'min_stock')->get();
    }
}
