<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Invite;
use App\Models\Notification;
use Illuminate\Http\Request;

class InviteController extends Controller
{
    public function store(Request $request)
    {

        $validated = $request->validate([
            'inviter_name' => 'required|string|max:255', // Inviter's name
            'invitee_name' => 'required|string|max:255',
            'invitee_address' => 'required|string|max:255',
            'invitee_phone' => 'required|string|max:15',
        ]);

        // Save invite
        Invite::create($validated);

        //Find inviter by name
        $user = User::where('name', $validated['inviter_name'])->first();

        $pointsEarned = 20;

        if (!$user) {
            return response()->json(['message' => 'Inviter not found.'], 404);
        }

        $user->points += $pointsEarned;
        $user->save();

        Notification::create([
            'user_id' => $user->id,
            'message' => "Your invitee, {$validated['invitee_name']}, has participated in an event. You earned {$pointsEarned} points!",
            'read_at' => null, // Unread notification
        ]);

        return response()->json(['message' => 'Points granted successfully!'], 200);
    }

    public function getAllUsers()
    {
        $users = User::select('id', 'name')->get();
        return response()->json($users);
    }
}
