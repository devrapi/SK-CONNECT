<?php

namespace App\Http\Controllers;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class NotificationController extends Controller
{
    public function Notification($userId)
{
    // Fetch unread notifications for the specified user, ordered by created_at descending
    $notifications = Notification::where('user_id', $userId)
        ->whereNull('read_at')  // Only get unread notifications (read_at is null)
        ->orderBy('created_at', 'desc')
        ->get();

    // Check if there are any unread notifications
    if ($notifications->isEmpty()) {
        return response()->json(['message' => 'No unread notifications found'], 404);
    }

    // Return unread notifications as a JSON response
    return response()->json([
        'message' => 'Unread notifications retrieved successfully',
        'notifications' => $notifications,
    ], 200);
}



    public function markAllAsRead($userId)
    {
        try {
            // Update all notifications for the user to mark them as read (set read_at timestamp)
            Notification::where('user_id', $userId)
                ->whereNull('read_at')  // Only mark unread notifications
                ->update(['read_at' => now()]);  // Set the current timestamp

            return response()->json([
                'message' => 'All notifications marked as read.'
            ], 200);
        } catch (\Exception $e) {
            // Handle and log any errors
            Log::error('Error marking notifications as read: ' . $e->getMessage());
            return response()->json([
                'message' => 'An error occurred while marking notifications as read.'
            ], 500);
        }
    }


}
