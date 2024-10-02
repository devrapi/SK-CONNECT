<?php

namespace App\Http\Controllers;


use App\Models\User;
use App\Models\Reward;
use App\Models\Ticket;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ClaimController extends Controller
{
    public function claimReward(Request $request, $userId, $rewardId)
    {
        $reward = Reward::findOrFail($rewardId);
        $user = User::findOrFail($userId);

        // Check if user has enough points to claim the reward
        if ((int) $user->points >= (int) $reward->points) {
            try {
                $ticketNumber = 'TICKET-' . $user->id . '-' . time();

                // Create the ticket
                $ticket = Ticket::create([
                    'user_id' => $user->id,
                    'reward_id' => $reward->id,
                    'ticket_number' => $ticketNumber,
                ]);

                // Deduct points from the user
                $user->points -= $reward->points;
                $user->save();

                // Create notification for the user
                Notification::create([
                    'user_id' => $user->id,
                    'message' => "You have received a ticket ({$ticketNumber})",
                    'read_at' => null, // Unread notification
                ]);

                // Create notification for the user
                Notification::create([
                    'user_id' => $user->id,
                    'message' => "{$reward->points} points have been deducted for the reward.",
                    'read_at' => null, // Unread notification
                ]);

            } catch (\Exception $e) {
                Log::error("Error creating ticket: " . $e->getMessage());
            }

            return response()->json(['message' => 'Ticket claimed', 'ticket' => $ticket], 200);
        }

        return response()->json(['message' => 'Not enough points'], 400);
    }


     public function show(){
        $ticket = Ticket::with(['user' , 'reward' ])
        ->where('status' , 'for verification') // filter only claimed ticket will show
        ->get();

        return $ticket;
    }
    public function history(){
        $ticket = Ticket::with(['user' , 'reward' ])
        ->where('status' , 'converted') // filter only claimed ticket will show
        ->get();

        return $ticket;
    }

    public function verify(Ticket $ticket){



        $ticket->update([
            'status' => 'converted'
        ]);



        return response()->json(['message' => 'ticket verified' , 'ticket' => $ticket ], 200);
    }

}
