<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Profile;
use App\Models\DailyLogin;
use App\Models\Notification;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

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

        $referalCode = strtoupper(Str::random(6));


        $User = User::create([

            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => bcrypt($fields['password']),
            'profile_id' => $profiling->id,
            'referal_code' => $referalCode

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

    // Initialize points variable
    $points = 0;
    $notificationMessage = '';

    // Check if there's a daily login record for the user
    $dailyLogin = DailyLogin::where('user_id', $User->id)->first();

    if (!$dailyLogin) {
        // First time login: create the daily login record
        DailyLogin::create([
            'user_id' => $User->id,
            'login_date' => $today,
            'status' => 'completed',
        ]);



        // Reward points for the first login
        $points = 50;
        // $User->daily_login_id = $dailyLogin->id;
        $User->points += $points;
        $User->save();



        // Notification message for first-time login
        $notificationMessage = "You earned 50 points for your first login!";

    } else {
        // If the user already has a login record, check if it's a new day
        if ($dailyLogin->login_date !== $today) {
            // Update the login_date and reset status
            $dailyLogin->update([
                'login_date' => $today,
                'status' => 'completed',
            ]);

            // Reward points for logging in on the new day
            $points = 10;
            $User->points += $points;
            $dailyLogin->streak += 1;
            $User->save();
            $dailyLogin->save();

            // Notification message for daily login
            $notificationMessage = "You earned 10 points for logging in today!";
        }

        // if($dailyLogin->streak >= 7){
        //     $User->points += 70;
        //     $dailyLogin->streak = 0;
        //     $User->save();
        //     $dailyLogin->save();

        //     // Notification message for 7-day streak
        //     $notificationMessage = "You earned 70 bonus points for a 7-day streak!";
        // }
    }

    // Create the notification if points were earned
    if ($points > 0) {
        Notification::create([
            'user_id' => $User->id,
            'message' => $notificationMessage,
            'read_at' => null, // Unread notification
        ]);
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

    public function update(Request $request, User $user)
    {
        // Validate only the image
        $fields = $request->validate([
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // Check if the user is uploading a new image and if they previously didn't have an avatar
        $awardingPoints = is_null($user->image_path) && $request->hasFile('image');

        // Initialize points variable and notification message
        $points = 0;
        $notificationMessage = '';

        // Check if an image file is being uploaded
        if ($request->hasFile('image')) {
            // If the user has an existing image, delete the old image
            if (!is_null($user->image_path) && Storage::disk('public')->exists($user->image_path)) {
                Storage::disk('public')->delete($user->image_path);
            }

            // Store the new image in 'user_avatar' folder and update the image path
            $imagePath = $request->file('image')->store('user_avatar', 'public');
            $user->image_path = $imagePath; // Save new image path to the user model

            // Award points if this is the user's first avatar upload
            if ($awardingPoints) {
                $points = 100; // Award points (e.g., 100 points)
                $user->points += $points;

                // Notification message for first avatar upload
                $notificationMessage = "You earned 100 points for uploading your first avatar!";
            }
        }

        // Save the updated user (even if only the image path changes)
        $user->save();

        // Create the notification if points were earned
        if ($points > 0) {
            Notification::create([
                'user_id' => $user->id,
                'message' => $notificationMessage,
                'read_at' => null, // Unread notification
            ]);
        }

        return response()->json([
            'message' => 'Avatar updated successfully',
            'user' => $user,
            'points' => $points,
        ]);
    }




}
