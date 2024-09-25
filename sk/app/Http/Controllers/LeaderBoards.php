<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;

class LeaderBoards extends Controller
{
    public function LeaderBoards(){
        $users = User::orderBy('points', 'desc')->limit(5)->get(); // Get top 5 users
        return response()->json($users);
    }
}
