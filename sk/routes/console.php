<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;


// Artisan::command('inspire', function () {
//     $this->comment(Inspiring::quote());
// })->purpose('Display an inspiring quote')->hourly();


Schedule::command('reset:daily-login')->daily('23:59')->timezone('Asia/Manila');
// Schedule the command to run daily
// Schedule::command('app:delete-old-notifications')->daily();


// Schedule the reset command
Schedule::command('reset:rewards-claimed')
->monthlyOn(1, '00:00')
->timezone('Asia/Manila');


// Schedule::command('reset:rewards-claimed')
//     ->everyMinute()  // Run every minute for testing purposes
//     ->timezone('Asia/Manila');
