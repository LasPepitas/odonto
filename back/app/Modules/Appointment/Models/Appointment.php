<?php

namespace App\Modules\Appointment\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Modules\Patient\Models\Patient;
use App\Modules\Dentist\Models\Dentist;
use App\Modules\Treatment\Models\Treatment;

class Appointment extends Model
{
    use HasFactory;

    protected $table = 'appointment';
    public $timestamps = false;

    protected $fillable = [
        'patient_id',
        'dentist_id',
        'treatment_id',
        'appointment_datetime',
        'status',
    ];

    protected $casts = [
        'patient_id' => 'integer',
        'dentist_id' => 'integer',
        'treatment_id' => 'integer',
        'appointment_datetime' => 'datetime',
    ];

    // Relaciones
    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    public function dentist()
    {
        return $this->belongsTo(Dentist::class);
    }

    public function treatment()
    {
        return $this->belongsTo(Treatment::class);
    }

    // Método helper para obtener citas por dentista
    public function getByDentist($dentistId)
    {
        $appointments = Appointment::where('dentist_id', $dentistId)
            ->with(['patient', 'treatment'])
            ->get();
            
        return response()->json($appointments);
    }

    // Método helper para obtener citas por paciente
    public function getByPatient($patientId)
    {
        $appointments = Appointment::where('patient_id', $patientId)
            ->with(['dentist', 'treatment'])
            ->get();
            
        return response()->json($appointments);
    }
}