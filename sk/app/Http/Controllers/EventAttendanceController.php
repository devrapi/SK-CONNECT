<?php

namespace App\Http\Controllers;


use App\Models\User;
use App\Models\Event;
use Illuminate\Http\Request;
use App\Models\EventAttendance;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class EventAttendanceController extends Controller
{
    public function attendEvent(Request $request, $eventId, $user_id)
    {
        $user = User::find($user_id);

        // Check if user already attended
        $existing = EventAttendance::where('user_id', $user->id)->where('event_id', $eventId)->first();
        if ($existing) {
            return response()->json(['message' => 'Already registered for this event.'], 400);
        }

        // Create attendance record
        EventAttendance::create([
            'user_id' => $user->id,
            'event_id' => $eventId,
            'status' => 'pending',
            'points_awarded' => false,
        ]);

        return response()->json(['message' => 'Attendance registered.']);
    }
    public function generateQrCode()
        {

        }
}
