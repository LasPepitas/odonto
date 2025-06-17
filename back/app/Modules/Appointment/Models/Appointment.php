<?php

namespace App\Modules\Appointment\Models;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    // Nombre de la tabla (opcional si sigue la convención plural: appointments)
    protected $table = 'appointment';

    // Clave primaria (opcional si es "id")
    protected $primaryKey = 'id';

    // Si no usas timestamps (created_at, updated_at)
    public $timestamps = false;

    // Campos que pueden ser asignados masivamente
    protected $fillable = [
        'patient_id',
        'dentist_id',
        'treatment_id',
        'appointment_datetime',
        'status',
    ];

    // Opcional: especificar tipos de campos para casting automático
    protected $casts = [
        'patient_id' => 'integer',
        'dentist_id' => 'integer',
        'treatment_id' => 'integer',
        'appointment_datetime' => 'datetime',
    ];
}