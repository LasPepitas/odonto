<?php

namespace App\Modules\Patient\Models;

use Illuminate\Database\Eloquent\Model;

class Treatment extends Model
{
    // Nombre de la tabla (opcional si sigue la convención plural: patients)
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
}
