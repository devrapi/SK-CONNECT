<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\DailyLogin;
use Illuminate\Http\Request;

class UserTaskController extends Controller
{
    public function show()
    {
        return DailyLogin::all();
    }
    public function ClaimReferral(Request $request, $user_id)
    {
        // Validate the input
        $request->validate([
            'referal_code' => 'required|max:225',
        ]);



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


        // If a valid referrer is found
        if ($referrer) {
            // Reward the referrer with 100 points
            $referrer->points += 100;
            $referrer->save();

            // Mark the user as having claimed the referral and reward them
            $user->ref_status = "claimed";
            $user->points += 25;
            $user->save();

            return response()->json([
                'message' => 'Referral reward claimed successfully.',
            ], 200);
        }

        // If no valid referrer is found, return an error
        return response()->json([
            'errors' => [
                'general' => 'Invalid referral code.',
            ],
        ], 400);
    }


}
