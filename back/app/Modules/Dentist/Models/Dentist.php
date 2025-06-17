<?php

namespace App\Modules\Dentist\Models;

use Illuminate\Database\Eloquent\Model;

class Dentist extends Model
{
    // Nombre de la tabla (opcional si sigue la convención plural: users)
    protected $table = 'dentist';

    // Clave primaria (opcional si es "id")
    protected $primaryKey = 'id';

    // Si no usas timestamps (created_at, updated_at)
    public $timestamps = false;

    // Campos que pueden ser asignados masivamente
    protected $fillable = [
        'user_id',
    ];

    // Opcional: especificar tipos de campos para casting automático
    protected $casts = [
        'user_id' => 'integer',
    ];
}