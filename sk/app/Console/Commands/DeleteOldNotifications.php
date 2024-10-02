<?php

namespace App\Console\Commands;

use App\Models\Notification;
use Illuminate\Support\Carbon;
use Illuminate\Console\Command;

class DeleteOldNotifications extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:delete-old-notifications';

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
         // Get the date for one day ago
         $date = Carbon::now()->subDay();

         // Delete notifications older than one day
         $deletedCount = Notification::where('created_at', '<', $date)->delete();

         $this->info("Deleted {$deletedCount} old notifications.");

    }
}
