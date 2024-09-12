<?php

namespace App\Http\Controllers;


use App\Models\User;
use App\Models\Reward;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ClaimController extends Controller
{
    public function claimReward(Request $request, $userId , $rewardId){

        $reward = Reward::findOrFail($rewardId);
        $user = User::findOrFail($userId);

        Log::info("user points :" . $user->points);
        Log::info("reward points :" . $reward->points);

        if((int) $user->points >= (int) $reward->points){

            try {
                $ticketNumber = 'TICKET-' .$user->id . '-' . time();

                $ticket = Ticket::create([
                    'user_id' => $user->id ,
                    'reward_id' => $reward->id ,
                    'ticket_number' => $ticketNumber,
                ]);

                $user->points -= $reward->points;
                $user->save();

            } catch (\Exception $e) {
                Log::error("error creating ticket : " . $e->getMessage());
            }

            return response()->json(['message' => 'ticket claimed' , 'ticket' => $ticket], 200);

        }

        return response()->json(['message' => 'not enough points']);
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

        Log::info('before update status: ' . $ticket->status);

        $ticket->update([
            'status' => 'converted'
        ]);

        Log::info('after update status: ' . $ticket->status);


        return response()->json(['message' => 'ticket verified' , 'ticket' => $ticket ], 200);
    }

}
