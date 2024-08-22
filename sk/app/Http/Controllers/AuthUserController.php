<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthUserController extends Controller
{
    public function register(Request $request){

        $fields = $request->validate([
            'name' => 'required|max:225',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed'
        ]);

        $profiling = Profile::where('full_name', $request->input('name'))->first();

        if (!$profiling) {
            return response()->json(['message' => 'Name not found in profiling database. Please register for profiling first.'], 400);
        }

        if (User::where('profile_id', $profiling->id)->exists()) {
            return response()->json(['message' => 'Profile is already associated with another user.'], 400);
        }


        $User = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => bcrypt($fields['password']),
            'profile_id' => $profiling->id
        ]);
        $token = $User->createToken($request->name);

        return response()->json([
            'User' => $User,
            'token' => $token->plainTextToken,
            'role' => $User->role,
        ], 200);

    }
    public function login(Request $request)
{
            $request->validate([
                'email' => 'required|email|exists:users',
                'password' => 'required'
            ]);

            $User = User::where('email', $request->email)->first();

            if (!$User || !Hash::check($request->password, $User->password)) {
                return response()->json([
                    'message' => 'Invalid credentials'
                ], 401); // Return 401 Unauthorized status
            }

            $token = $User->createToken($User->name);

            return response()->json([
                'User' => $User,
                'token' => $token->plainTextToken,
                'role' => $User->role,


            ], 200);
}

    public function logout(Request $request){

        $request->user()->tokens()->delete();

        return [
            'message' => 'you are logged out'
        ];

    }

}
