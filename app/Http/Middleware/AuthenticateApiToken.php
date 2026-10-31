<?php

namespace App\Http\Middleware;

use App\Models\PersonalAccessToken;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AuthenticateApiToken
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthenticated. Token tidak ditemukan.',
            ], 401);
        }

        $hashedToken = hash('sha256', $token);
        $tokenRecord = PersonalAccessToken::where('token', $hashedToken)->with('user')->first();

        if (!$tokenRecord || !$tokenRecord->user) {
            return response()->json([
                'success' => false,
                'message' => 'Token tidak valid atau sudah kedaluwarsa.',
            ], 401);
        }

        $tokenRecord->update(['last_used_at' => now()]);
        Auth::setUser($tokenRecord->user);

        return $next($request);
    }
}
