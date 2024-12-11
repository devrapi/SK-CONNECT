<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class ResetRewardsClaimCount extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'reset:rewards-claimed';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Reset the rewards claimed count for all users on the 1st day of the month';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Reset the rewards claimed count for all users
        User::query()->update(['reward_claimed_count' => 0]);

        $this->info('Rewards claimed count has been reset for all users.');
        return 0;
    }
}
