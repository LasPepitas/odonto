<?php

namespace App\Modules\User\Services;

use App\Modules\User\Models\User;
use App\Modules\Dentist\Models\Dentist;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\Validator;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;


class UserService
{
    public function getAllUsers($search): Collection
    {
        return User::when($search, function ($query, $search) {
            return $query->where('email', 'like', '%' . $search . '%')
                ->orWhere('full_name', 'like', '%' . $search . '%')
                ->orWhere('role', 'like', '%' . $search . '%');
        })->get();
    }

    public function createUser(array $data): User
    {
        // Validar que el email no exista
        if (User::where('email', $data['email'])->exists()) {
            throw ValidationException::withMessages([
                'email' => ['El correo electrónico ya está en uso.'],
            ]);
        }

        $user = User::create([
            'email' => strtolower($data['email']),
            'full_name' => $data['full_name'],
            'password_hash' => bcrypt($data['password']),
            'role' => $data['role']
        ]);

        if ($data['role'] === 'dentist') {
            Dentist::create([
                'user_id' => $user->id,
                'specialty' => $data['specialty'] ?? null,
            ]);
        }
        return $user;
    }

    public function updateUser(User $user, array $data): User
    {

        if (isset($data['password'])) {
            $data['password_hash'] = Hash::make($data['password']);
        }

        $user->update($data);
        return $user;
    }

    public function deleteUser(User $user): bool
    {
        return $user->delete();
    }

    public function login(array $credentials): array
    {
        // Debug: Verificar qué está recibiendo

        // Buscar el usuario directamente
        $user = User::join('dentist', 'dentist.user_id', '=', 'user.id', 'left')
            ->where('user.email', $credentials['email'])
            ->select('user.*', 'dentist.id as dentist_id')
            ->first();

        if (!$user) {
            throw new \Exception('Usuario no encontrado', 404);
        }

        // Verificar contraseña manualmente
        if (!\Hash::check($credentials['password'], $user->password_hash)) {
            throw new \Exception('Credenciales incorrectas', 401);
        }
        $token = JWTAuth::fromUser($user);
        if (!$token) {
            throw new JWTException('No se pudo crear el token', 500);
        }
        return [
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 3600 // Tiempo de expiración del token en segundos
        ];
    }

    public function register(array $userData): array
    {
        $user = $this->createUser($userData);
        $token = JWTAuth::fromUser($user);
        return [
            'user' => $user,
            'access_token' => $token
        ];
    }

    public function getAuthenticatedUser($token): ?User
    {
        try {
            $user = JWTAuth::authenticate($token);
            return $user;
        } catch (JWTException $e) {
            // Manejar el error de token inválido o expirado
            return null;
        }
    }

    public function logout(): void
    {
        Auth::user()->tokens()->delete();
    }

    public function getCurrentUser(): ?User
    {
        return Auth::user();
    }

    public function forgotPassword(string $email): void
    {
        $user = User::where('email', $email)->first();

        if ($user) {
            // Generate password reset token and send email
            Password::sendResetLink(['email' => $email]);
        }
    }

    public function resetPassword(array $data): void
    {
        Password::reset($data, function ($user, $password) {
            $user->password = Hash::make($password);
            $user->save();
        });
    }

    public function changePassword(User $user, string $currentPassword, string $newPassword): bool
    {
        if (!Hash::check($currentPassword, $user->password)) {
            throw ValidationException::withMessages([
                'current_password' => ['The provided password is incorrect.'],
            ]);
        }

        $user->password = Hash::make($newPassword);
        return $user->save();
    }
}