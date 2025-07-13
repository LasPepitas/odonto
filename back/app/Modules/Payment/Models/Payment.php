<?php

namespace App\Modules\Payment\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Modules\Appointment\Models\Appointment;
use App\Modules\Treatment\Models\Treatment;


class Payment extends Model
{
    use HasFactory;

    protected $table = 'payment';
    public $timestamps = false;

    protected $fillable = [
        'appointment_id',
        'amount',
        'payment_date',
        'treatment_id'
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'payment_date' => 'date'
    ];

    // Relaciones
    public function appointment()
    {
        return $this->belongsTo(Appointment::class);
    }

    public function treatment()
    {
        return $this->belongsTo(Treatment::class);
    }

    public function getByAppointment($appointmentId)
    {
        $payments = Payment::where('appointment_id', $appointmentId)
            ->with('treatment')
            ->get();
            
        return response()->json($payments);
    }
}