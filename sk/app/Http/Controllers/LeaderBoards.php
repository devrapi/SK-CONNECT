<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Leaderboard;
use App\Models\Notification;
use Illuminate\Http\Request;

class LeaderBoards extends Controller
{
    public function LeaderBoards(){
        $users = User::orderBy('points', 'desc')->limit(10)->get(); // Get top 5 users
        return response()->json($users);
    }



    public function RewardsLB($user_id){

        $user = User::find($user_id);


        // if (!$user || !$leaderboard) {
        //     return response()->json(['message' => 'User or leaderboard entry not found.'], 404);
        // }

        $points = 100;
        $user->points += $points;
        $user->lb_last_claim =  Carbon::now();
        $user->save();




        // Create a notification
        Notification::create([
            'user_id' => $user->id,
            'message' => "You earned {$points} points for claiming your Leaderboard reward!",
            'read_at' => null, // Unread notification
        ]);

        return response()->json([
            'message' => "You earned {$points} points for claiming your Leaderboard reward!",
            'points' => $user->points,
        ]);
    }
}
