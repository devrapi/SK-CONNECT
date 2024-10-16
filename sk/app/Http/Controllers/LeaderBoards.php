<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\Notification;
use Illuminate\Http\Request;

class LeaderBoards extends Controller
{
    public function LeaderBoards(){
        $users = User::orderBy('points', 'desc')->limit(5)->get(); // Get top 5 users
        return response()->json($users);
    }
    public function RewardsLB($user_id){

        $user = User::find($user_id);

        $points = 50;

        $user->points += $points;
        $user->save();

        Notification::create([
            'user_id' => $user->id,
            'message' => "You earned {$points} points for claiming your Leaderbords reward!",
            'read_at' => null, // Unread notification
        ]);

        return response()->json([
            'message' => "You earned {$points} points for claiming your Leaderbords reward!",
            'points' => $user->points,
        ]);
    }
}
