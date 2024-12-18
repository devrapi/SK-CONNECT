<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Profile;
use App\Models\DailyLogin;
use Illuminate\Support\Str;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Auth\Events\Verified;
use Illuminate\Support\Facades\Hash;
use App\Models\EmailVerificationToken;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Storage;
use Illuminate\Container\Attributes\Auth;
use Illuminate\Validation\Rules\Password;
use App\Notifications\EmailVerificationNotification;

class AuthUserController extends Controller
{
    public function register(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|max:225',
            'email' => 'required|email|unique:users',
            'password' => [
                'required',
                'confirmed',
                Password::min(8) // Minimum length of 8 characters
                    ->mixedCase() // Must include both uppercase and lowercase characters
            ]
        ]);

        // Find the profile by full name
        $profiling = Profile::withTrashed()->where('full_name', $request->input('name'))->first();

        // Check if profile exists
        if (!$profiling) {
            return response()->json(['message' => 'Name not found in profiling database. Please register for profiling first.'], 400);
        }

        // Check if profile is soft-deleted
        if ($profiling->trashed()) {
            return response()->json(['message' => 'The profile has been deactivated. Please contact support for assistance.'], 403);
        }

        // Check if profile is already associated with another user
        if (User::where('profile_id', $profiling->id)->exists()) {
            return response()->json(['message' => 'Profile is already associated with another user.'], 400);
        }

        // Generate referral code
        $referalCode = strtoupper(Str::random(6));

        // Create the user
        $User = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => bcrypt($fields['password']),
            'profile_id' => $profiling->id,
            'referal_code' => $referalCode,
        ]);

        // Create an API token
        $token = $User->createToken($request->name);

        // Return a successful response
        return response()->json([
            'User' => $User,
            'token' => $token->plainTextToken,
            'role' => $User->role,
            'message' => 'Registration successful. Please verify your email to activate your account.',
        ], 200);
    }


    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users',
            'password' => 'required'
        ]);

         // Fetch the user and their associated profile (including trashed profiles)
        $User = User::where('email', $request->email)
        ->with(['profile' => function ($query) {
            $query->withTrashed();
        }])
        ->first();

        if (!$User || !Hash::check($request->password, $User->password)) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401); // Return 401 Unauthorized status
        }
        if ($User->profile && $User->profile->trashed()) {
            return response()->json(['message' => 'This account is deactivated.'], 403);
        }
        $verify_status = !is_null($User->email_verified_at);



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
            $dailyLogin = DailyLogin::create([
                'user_id' => $User->id,
                'login_date' => $today,
                'status' => 'completed',
            ]);

            // Assign the created daily login id to the user
            $User->daily_login_id = $dailyLogin->id;

            // Reward points for the first login
            $points = 50;
            $User->points += $points;
            $User->save();

            // Notification message for first-time login
            $notificationMessage = "You earned 50 points for your first login!";

        } else {
            // If the user already has a login record, check if it's a new day
            $yesterday = now()->subDay()->toDateString(); // Get yesterday's date

        if ($dailyLogin->login_date !== $today) {
            // Check if the login date was not yesterday, and reset the streak
            if ($dailyLogin->login_date !== $yesterday) {
                $dailyLogin->streak = 0; // Reset streak
            }

            // Update the login_date and reset status
            $dailyLogin->update([
                'login_date' => $today,
                'status' => 'completed',
            ]);

            // Reward points for logging in on the new day
            $points = 10;
            $User->points += $points;
            $dailyLogin->streak += 1; // Increase streak by 1
            $dailyLogin->save();

            // Assign the updated daily login id to the user
            $User->daily_login_id = $dailyLogin->id;
            $User->save();

            // Notification message for daily login
            $notificationMessage = "You earned 10 points for logging in today!";
        }
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
            'is_verified' => $verify_status
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

    public function VerifyNotice()
    {
        return response()->json(['message' => 'Please verify your email address.']);
    }

    public function sendVerificationEmail(User $user)
    {
        $token = Str::random(64);

        // Store the token
        EmailVerificationToken::create([
            'user_id' => $user->id,
            'signature' => $token,
        ]);

        // Generate the verification link
        $url = url("/verify-email/{$user->id}/{$token}");

        // Send the notification
        $user->notify(new EmailVerificationNotification($url));

        return response()->json(['message' => 'Verification email sent.']);
    }



    public function verifyEmail($userId, $token)
    {
        $verificationToken = EmailVerificationToken::where('user_id', $userId)
            ->where('signature', $token)
            ->first();

        if (!$verificationToken) {
            return response()->json(['message' => 'Invalid or expired token.'], 400);
        }

        // Mark email as verified
        $user = $verificationToken->user;
        $user->email_verified_at = now();
        $user->save();

        // Delete the token after verification
        $verificationToken->delete();

        return redirect('/email-verified'); // Redirect to a success page or return JSON
    }





}
