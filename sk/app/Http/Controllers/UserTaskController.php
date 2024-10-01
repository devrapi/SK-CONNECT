<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\DailyLogin;
use Illuminate\Http\Request;

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

            // Mark the user as having claimed the referral and reward them
            $user->ref_status = "claimed";
            $points = 25;
            $user->points += 25;
            $user->save();

            return response()->json([
                'message' => 'Referral reward claimed successfully.',
                'points' => $points
            ], 200);
        }

        // If no valid referrer is found, return an error
        return response()->json([
            'errors' => [
                'general' => 'Invalid referral code.',
            ],
        ], 400);
    }
    public function ClaimStreak($user_id){

        $user = User::find($user_id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $dailyLogin = DailyLogin::where('user_id', $user->id)->first();

        if (!$dailyLogin || $dailyLogin->streak < 6) {
            return response()->json(['message' => 'Not enough streaks to claim reward'], 400);
        }

        // Reward logic: Add points to user (e.g., 100 points)
        $user->points += 100; // You can adjust the points as per your logic

        // Reset streak to 0
        $dailyLogin->streak = 0;

        // Save changes
        $user->save();
        $dailyLogin->save();

        return response()->json(['message' => 'Reward claimed successfully', 'points' => $user->points]);

    }


}
