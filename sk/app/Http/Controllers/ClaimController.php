<?php

namespace App\Http\Controllers;


use App\Models\User;
use App\Models\Reward;
use App\Models\Referral;
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
                $ticketNumber = 'TICKET-' . $user->id . '-' . rand(100000, 999999);


                // Create the ticket
                $ticket = Ticket::create([
                    'user_id' => $user->id,
                    'reward_id' => $reward->id,
                    'ticket_number' => $ticketNumber,
                ]);

                // Deduct points from the user
                $user->points -= $reward->points;
                $reward->stocks -= 1;
                $reward->save();
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

        return response()->json(['error' => 'Not enough points'], 400);
    }


     public function show(){
        $ticket = Ticket::with(['user' , 'reward' ])
        ->where('status' , 'Pending') // filter only pending ticket will show
        ->get();

        return $ticket;
    }

    public function history(){
        $ticket = Ticket::with(['user' , 'reward' ])
        ->where('status' , 'Claimed') // filter only claimed ticket will show
        ->get();

        return $ticket;
    }

    public function verify(Ticket $ticket)
    {
        // Update both the status and claimed_date in a single operation
        $ticket->update([
            'status' => 'Claimed',
            'claimed_date' => now()  // Set the claimed_date to the current time
        ]);

        return response()->json(['message' => 'ticket verified', 'ticket' => $ticket], 200);
    }
    public function getReferredUsers($userId)
    {
        // Fetch the user or fail with a 404 error
        $user = User::findOrFail($userId);

        // Get all referred users through the referrals table
        $referredUsers = Referral::where('referrer_id', $user->id)
            ->with('referredUser') // Load the referred user details
            ->get()
           ;

        return response()->json($referredUsers); // Return the referred users as a JSON response
    }

}
