<?php

namespace App\Modules\User\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    protected $table = 'user';
    protected $primaryKey = 'id'; // Por defecto es 'id'

    // protected $table = 'user';
    protected $fillable = [
        'email',
        'full_name',
        'password_hash',
        'role',
    ];

    protected $hidden = [
        'password_hash',
        'remember_token',
    ];
    public $timestamps = false;
    // JWT methods
    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
    public function getAuthPassword()
    {
        return $this->password_hash; // Asegúrate que apunta al campo correcto
    }
}