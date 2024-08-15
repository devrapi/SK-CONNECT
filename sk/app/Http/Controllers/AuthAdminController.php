<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;


class AuthAdminController extends Controller
{
    public function register(Request $request){

        $fields = $request->validate([
            'name' => 'required|max:225',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed'
        ]);

        $Admin = Admin::create($fields);
        $token = $Admin->createToken($request->name);

        return  [
            'Admin' => $Admin,
            'token' => $token->plainTextToken
        ];

    }
    public function login(Request $request)
{
            $request->validate([
                'email' => 'required|email|exists:admins',
                'password' => 'required'
            ]);

            $Admin = Admin::where('email', $request->email)->first();

            if (!$Admin || !Hash::check($request->password, $Admin->password)) {
                return response()->json([
                    'message' => 'Invalid credentials'
                ], 401); // Return 401 Unauthorized status
            }

            $token = $Admin->createToken($Admin->name);

            return response()->json([
                'Admin' => $Admin,
                'token' => $token->plainTextToken,
                'role' =>$Admin->role
            ], 200); // Return 200 OK status
}

    public function logout(Request $request){

        $request->user()->tokens()->delete();

        return [
            'message' => 'you are logged out'
        ];

    }
}
