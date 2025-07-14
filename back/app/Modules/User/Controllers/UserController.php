<?php

namespace App\Modules\User\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\User\Models\User;
use App\Modules\User\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\ErrorHandler\Debug;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function login(Request $request): JsonResponse
    {
        // Validación
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $validated = $validator->validated();
        $result = $this->userService->login($validated);
        return response()->json($result, 200);
    }
    public function register(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:user,email',
            'full_name' => 'required|string|max:255',
            'password' => 'required|string|min:6',
            'role' => 'required|in:admin,receptionist,dentist'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $validated = $validator->validated();
        $result = $this->userService->register($validated);
        return response()->json($result, 201);
    }
    public function profile(): JsonResponse
    {
        $user = auth()->user();
        // debug logs
        \Log::debug('User profile accessed', ['user' => $user]);
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        return response()->json($user);
    }

    public function index(): JsonResponse
    {
        $search = request()->query('search');
        $users = $this->userService->getAllUsers($search);
        return response()->json($users);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => 'required|string|unique:user,email',
            'full_name' => 'required|string|max:255',
            'password' => 'required|string|min:6',
            'role' => 'required|string'
        ]);

        $user = $this->userService->createUser($validated);
        return response()->json($user, 201);
    }

    public function show(User $user): JsonResponse
    {
        return response()->json($user);
    }

    public function update(Request $request, User $user): JsonResponse
    {
        $validated = $request->validate([
            'full_name' => 'string|max:255',
            'email' => 'string|email|unique:user,email,' . $user->id,
            'password' => 'string|min:6|nullable',
            'role' => 'string'
        ]);
        if (empty($validated['password'])) {
            unset($validated['password']);
        }
        $updatedUser = $this->userService->updateUser($user, $validated);
        return response()->json($updatedUser);
    }

    public function destroy(User $user): JsonResponse
    {
        $this->userService->deleteUser($user);
        return response()->json(null, 204);
    }
}