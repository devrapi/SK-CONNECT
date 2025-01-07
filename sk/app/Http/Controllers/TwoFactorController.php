<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use PragmaRX\Google2FA\Google2FA;
use Illuminate\Support\Facades\Log;

class TwoFactorController extends Controller
{
   public function setupTwoFactor(Request $request)
{
    try {
        $google2fa = new Google2FA();

        // Generate a secret key
        $secretKey = $google2fa->generateSecretKey();

        // Optionally, save the secret key to the database
        $user = $request->user();
        $user->two_factor_secret = $secretKey;
        $user->save();

        return response()->json([
            'secret_key' => $secretKey,
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'error' => 'Failed to generate secret key: ' . $e->getMessage(),
        ], 500);
    }
}

public function verifyTwoFactor(Request $request)
{
    $request->validate([
        'code_2fa' => 'required|digits:6',
    ]);

    try {
        $google2fa = new Google2FA();
        $user = $request->user();

        if (!$user) {
            return response()->json(['error' => 'User is not authenticated'], 401);
        }

        if (empty($user->two_factor_secret)) {
            return response()->json(['error' => 'Two-factor secret is not set'], 400);
        }

        $isValid = $google2fa->verifyKey($user->two_factor_secret, $request->input('code_2fa'));

        if ($isValid) {
            return response()->json(['message' => '2FA verified successfully'], 200);
        }

        return response()->json(['error' => 'Invalid 2FA code'], 422);

    } catch (\Exception $e) {
        Log::error('2FA verification error: ' . $e->getMessage());
        return response()->json(['error' => 'An error occurred during 2FA verification'], 500);
    }
}

}
