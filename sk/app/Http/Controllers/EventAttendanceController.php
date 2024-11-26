<?php

namespace App\Http\Controllers;


use App\Models\User;
use App\Models\Event;
use App\Models\Notification;
use Illuminate\Http\Request;
use App\Models\EventAttendance;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class EventAttendanceController extends Controller
{
    public function attendEvent(Request $request, $eventId, $user_id)
    {
        $user = User::find($user_id);
        $event = Event::find($eventId);

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
            'points_awarded' =>$event->points,
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
                'points' => $event->points,
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
            // Validate the request input

       $validatedData = $request->validate([
        'event_id' => 'required|integer',
        'points_awarded' => 'required|integer',
        'user_id' => 'required|integer',
    ]);

    $points = $validatedData['points_awarded'];

    try {
        // Retrieve the attendance record
        $attendance = EventAttendance::where('event_id', $request->event_id)
            ->where('user_id', $request->user_id)
            ->first();

        // Check if attendance exists and is not already verified
        if (!$attendance) {
            return response()->json([
                'message' => 'Attendance record not found.',
                'status' => 'error',
            ], 404);
        }

        if ($attendance->status === 'verified') {
            return response()->json([
                'message' => 'User is already verified.',
                'status' => 'error',
            ], 400);
        }

        // Grant points to the user
        $user = User::find($request->user_id);
        if ($user) {
            $pointsToGrant = $points;
            $user->points += $pointsToGrant;
            $user->save();
        }

        // Update the attendance record to verified
        $attendance->status = 'verified';
        $attendance->save();

        Notification::create([
            'user_id' => $user->id,
            'message' => "{$pointsToGrant} points have been added to your account for attending the event.",
            'read_at' => null, // Unread notification
        ]);

        // Return success response
        return response()->json([
            'message' => 'User attendance verified and points granted.',
            'points_granted' => $pointsToGrant,
            'status' => 'success',
        ], 200);
    } catch (\Exception $e) {
        // Handle errors
        return response()->json([
            'message' => 'An error occurred: ' . $e->getMessage(),
            'status' => 'error',
        ], 500);
    }
     }

     public function status($user_id){

        $user = User::find($user_id);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        // Get all pending events for the user
        $pendingEvents = EventAttendance::where('user_id', $user->id)
            ->where('status', 'pending')
            ->with('event') // Ensure you load the event details
            ->get();



        return response()->json(['pending_events' => $pendingEvents], 200);
     }
}
