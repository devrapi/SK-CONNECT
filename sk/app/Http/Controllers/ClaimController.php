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

        // Check if the user has reached the maximum claim limit
        if ($user->reward_claimed_count >= 3) {
            return response()->json(['error' => 'You have already claimed 3 rewards this month.'], 403);
        }

        // Check if the reward has available stock
        if ($reward->stocks <= 0) {
            return response()->json(['error' => 'Reward out of stock'], 400);
        }

        // Check if the user has enough points to claim the reward
        if ((int) $user->points < (int) $reward->points) {
            return response()->json(['error' => 'Not enough points'], 400);
        }

        try {
            // Generate ticket number
            $ticketNumber = 'TICKET-' . $user->id . '-' . rand(100000, 999999);

            // Create the ticket
            $ticket = Ticket::create([
                'user_id' => $user->id,
                'reward_id' => $reward->id,
                'ticket_number' => $ticketNumber,
            ]);

            // Deduct points and update reward stock
            $user->points -= $reward->points;
            $reward->stocks -= 1;

            // Increment the user's reward claim count
            $user->increment('reward_claimed_count');

            $reward->save();
            $user->save();

            // Create notifications
            Notification::create([
                'user_id' => $user->id,
                'message' => "You have received a ticket ({$ticketNumber}).",
                'read_at' => null, // Unread notification
            ]);

            Notification::create([
                'user_id' => $user->id,
                'message' => "{$reward->points} points have been deducted for the reward.",
                'read_at' => null, // Unread notification
            ]);

            return response()->json(['message' => 'Ticket claimed', 'ticket' => $ticket], 200);
        } catch (\Exception $e) {
            Log::error("Error claiming reward: " . $e->getMessage());
            return response()->json(['error' => 'Error processing reward claim'], 500);
        }
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
