<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Profile;
use App\Models\DailyLogin;
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

    // Generate an API token
    $token = $User->createToken($User->name);

    // Get today's date and midnight for the next day
    $today = now()->format('Y-m-d');
    $midnight = now()->copy()->endOfDay();

    // Check if there's a daily login record for the user
    $dailyLogin = DailyLogin::where('user_id', $User->id)->first();

    if (!$dailyLogin) {
        // First time login: create the daily login record
        DailyLogin::create([
            'user_id' => $User->id,
            'login_date' => $today,
            'status' => 'completed', // or any other status you want to track
        ]);

        // Reward points for the first login
        $User->points += 10;
        $User->save();
    } else {
        // If the user already has a login record, check if it's a new day
        if ($dailyLogin->login_date !== $today) {
            // Update the login_date and reset status
            $dailyLogin->update([
                'login_date' => $today,
                'status' => 'completed', // update status for a new day
            ]);

            // Reward points for logging in on the new day
            $User->points += 10;
            $User->save();
        }
    }

    // Return a successful response with the user, token, role, and points earned
    return response()->json([
        'User' => $User,
        'token' => $token->plainTextToken,
        'role' => $User->role,
    ], 200);
}



    public function logout(Request $request ){



        $request->user()->tokens()->delete();

        return [
            'message' => 'you are logged out'
        ];

    }

}
