<?php

namespace App\Modules\Treatment\Models;

use Illuminate\Database\Eloquent\Model;

class Treatment extends Model
{
    // Nombre de la tabla (asumiendo que es 'services' basado en la estructura)
    protected $table = 'treatment';

    // Clave primaria (opcional si es "id")
    protected $primaryKey = 'id';

    // Si no usas timestamps (created_at, updated_at)
    public $timestamps = false;

    // Campos que pueden ser asignados masivamente
    protected $fillable = [
        'name',
        'description',
        'cost',
    ];

    // Opcional: especificar tipos de campos para casting automático
    protected $casts = [
        'cost' => 'decimal:2',
    ];
}