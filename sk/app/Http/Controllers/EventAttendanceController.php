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
    public function generateQrCode($eventId)
        {

            // Fetch the event details
            $event = Event::findOrFail($eventId); // Automatically throws a 404 if not found

            // Prepare the data to be encoded
            $data = [
                'id' => $event->id,
                'date' => $event->date, // Adjust field name if necessary
            ];

            // Convert the data to a JSON string for encoding
            $qrData = json_encode($data);

            // Generate the QR code
            $qrCode = QrCode::size(300)->generate($qrData);

            // Return the QR code as a response
            return response($qrCode)->header('Content-Type', 'image/svg+xml');


     }
     public function VerifiyQrCode(Request $request)
     {

     }
}
