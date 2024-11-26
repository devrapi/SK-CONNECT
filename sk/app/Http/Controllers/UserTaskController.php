<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Referral;
use App\Models\DailyLogin;
use Illuminate\Http\Request;
use App\Models\Notification;
class UserTaskController extends Controller
{
    public function show($id)
    {
        // Find the daily login by its ID
        $dailyLogin = DailyLogin::find($id);

        // Check if daily login exists
        if ($dailyLogin) {
            return response()->json($dailyLogin);
        } else {
            return response()->json(['message' => 'Daily login not found'], 404);
        }
    }

    public function index()
    {
        return DailyLogin::all();
    }

    public function ClaimReferral(Request $request, $user_id)
    {
        // Validate the input
        $request->validate([
            'referal_code' => 'required|max:225',
        ]);

        // Define points for the user claiming the referral
        $points = 25;

        // Find the user by their ID
        $user = User::find($user_id);

        // Check if the user has already claimed the referral reward
        if ($user->ref_status === "claimed") {
            return response()->json([
                'errors' => [
                    'general' => 'You have already claimed your referral reward.',
                ],
            ], 400);
        }

        // Find the referrer by their referral code
        $referrer = User::where('referal_code', $request->input('referal_code'))->first();

        if (!$referrer) {
            return response()->json([
                'errors' => [
                    'general' => 'Invalid referral code.',
                ],
            ], 400);
        }

        if ($referrer->id === $user->id) {
            return response()->json([
                'errors' => [
                    'general' => 'You cannot refer yourself.',
                ],
            ], 400);
        }

        // If a valid referrer is found
        if ($referrer) {
            // Reward the referrer with 100 points
            $referrer->points += 100;
            $referrer->save();

            // Create notification for the referrer
            Notification::create([
                'user_id' => $referrer->id,
                'message' => "You earned 100 points for successfully referring a user!",
                'read_at' => null, // Unread notification
            ]);

            // Mark the user as having claimed the referral and reward them
            $user->ref_status = "claimed"; // Set the claim status
            $user->points += $points;       // Add points to the user
            $user->referred_by = $referrer->id; // Save the referrer ID
            $user->save();

            // Create the referral record
            Referral::create([
                'referrer_id' => $referrer->id,
                'referred_id' => $user->id,

            ]);

            // Create notification for the user who claimed the referral reward
            Notification::create([
                'user_id' => $user->id,
                'message' => "You earned {$points} points for claiming your referral bonus!",
                'read_at' => null, // Unread notification
            ]);

            return response()->json([
                'message' => 'Referral reward claimed successfully.',
                'points' => $points,
            ], 200);
        }

        // If no valid referrer is found, return an error
        return response()->json([
            'errors' => [
                'general' => 'Invalid referral code.',
            ],
        ], 400);
    }



    public function ClaimStreak($user_id)
{
    $user = User::find($user_id);

    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }

    $dailyLogin = DailyLogin::where('user_id', $user->id)->first();

    if (!$dailyLogin || $dailyLogin->streak <= 6) {
        return response()->json(['message' => 'Not enough streaks to claim reward'], 400);
    }

    // Reward logic: Add points to user (e.g., 100 points)
    $points = 100; // Adjust the points as per your logic
    $user->points += $points;

    // Reset streak to 0
    $dailyLogin->streak = 0;

    // Save changes
    $user->save();
    $dailyLogin->save();

    // Create notification for claimed streak reward
    Notification::create([
        'user_id' => $user->id,
        'message' => "You earned {$points} points for claiming your streak reward!",
        'read_at' => null, // Unread notification
    ]);

    return response()->json([
        'message' => 'Reward claimed successfully',
        'points' => $user->points,
    ]);
}



}
