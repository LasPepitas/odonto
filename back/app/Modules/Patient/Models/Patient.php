<?php

namespace App\Modules\Patient\Models;

use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    // Nombre de la tabla (opcional si sigue la convención plural: patients)
    protected $table = 'patient';

    // Clave primaria (opcional si es "id")
    protected $primaryKey = 'id';

    // Si no usas timestamps (created_at, updated_at)
    public $timestamps = false;

    // Campos que pueden ser asignados masivamente
    protected $fillable = [
        'full_name',
        'dni',
        'phone',
        'address',
        'birth_date',
    ];

    // Opcional: especificar tipos de campos para casting automático
    protected $casts = [
        'birth_date' => 'date',
    ];
}
