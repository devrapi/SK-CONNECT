<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class ResetPointsExceptLeaderboards extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'points:reset-except-leaderboards';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command Reset points for all users except those on the leaderboard';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $leaderboardUsers = User::orderBy('points', 'desc')->limit(5)->pluck('id');

        // Reset points for all users except those on the leaderboard
        $affectedRows = User::whereNotIn('id', $leaderboardUsers)->update(['points' => 0]);

        // Output the result
        $this->info("Points reset for $affectedRows users.");

        return Command::SUCCESS;
    }
}
