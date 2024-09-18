<?php

namespace App\Console\Commands;

use App\Models\DailyLogin;
use Illuminate\Console\Command;

class ResetDaiylyLogin extends Command
{


    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'reset:daily-login';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Update all daily login records to set status to 'pending'
        DailyLogin::where('status', 'completed')
            ->update(['status' => 'pending']);

        $this->info('Daily login statuses updated to pending');
    }
}
