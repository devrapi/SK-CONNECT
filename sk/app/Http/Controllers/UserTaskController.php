<?php

namespace App\Http\Controllers;

use App\Models\DailyLogin;
use Illuminate\Http\Request;

class UserTaskController extends Controller
{
    public function show()
    {
        return DailyLogin::all();
    }
}
