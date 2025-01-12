<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\User;
use App\Models\Comment;
use App\Models\Announcement;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AnnouncementController extends Controller
{
    public function index()
    {
        return Announcement::orderBy('created_at', 'desc')->get();
    }

    public function show(Announcement $Announcement)
    {
        return $Announcement;

    }
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image_path' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Max size 2MB
        ]);

        if ($request->hasFile('image_path')) {
            $imagePath = $request->file('image_path')->store('annnouncement_images', 'public');
        } else {
            $imagePath = null;
        }


        // Create the announcement
        $announcement = Announcement::create([
            'title' => $request->title,
            'content' => $request->content,
            'image_path' => $imagePath,
        ]);

        // Send notification to all users
        $users = User::all(); // Retrieve all users

        foreach ($users as $user) {
            Notification::create([
                'user_id' => $user->id,
                'message' => "New announcement: {$announcement->title}",
                'read_at' => null, // Unread notification
            ]);
        }

        return response()->json(['message' => 'Announcement created and notifications sent successfully']);
    }

    public function destroy(Announcement $announcement)
    {
        $announcement->delete();

        return response()->json(['message' => 'Announcement deleted']);
    }

    public function update( Request $request , Announcement $announcement){

       $fields = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'image_path' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Max size 2MB

        ]);

        $announcement->title = $fields['title'];
        $announcement->content = $fields['content'];

        if ($request->hasFile('image_path')) {
            // If the user has an existing image, delete the old image
            if (!is_null($announcement->image_path) && Storage::disk('public')->exists($announcement->image_path)) {
                Storage::disk('public')->delete($announcement->image_path);
            }
             // Store the new image in 'event_images' folder and update the image path
        $imagePath = $request->file('image_path')->store('announcement_images', 'public');
        $announcement->image_path = $imagePath;

    }

    $announcement->save();

    return response()->json([
        'message' => 'Update successful',
        'reward' => $announcement  // Return the updated reward object
    ], 200);
}
        public function comment(Request $request, Announcement $announcement, $userId)
    {
        $request->validate([
            'comment' => 'required|string',
        ]);

        $user = User::findOrFail($userId);

        $comment = $announcement->comments()->create([
            'comment' => $request->comment,
            'user_id' => $user->id,
        ]);

        return response()->json($comment);
    }

    public function getComments($announcementId)
    {
        $comments = Comment::where('announcement_id', $announcementId)->with('user')->get();
        return response()->json($comments);
    }

    public function like(Announcement $announcement,$userId)
        {
            $user = User::findOrFail($userId);

            $announcement->likes()->create(['user_id' => $user->id]);
            return response()->json(['message' => 'Liked' , $announcement]);
        }

    public function unlike(Announcement $announcement, $userId)
        {
            $user = User::findOrFail($userId);

            $announcement->likes()->where('user_id', $user->id)->delete();
            return response()->json(['message' => 'Unliked']);
        }
    public function getLike($announcementId)
        {

            $like = Like::where('announcement_id', $announcementId)->with('user')->get();
            return response()->json($like);
        }

        public function destroyComment($id)
    {
        try {
            // Find the comment by ID
            $comment = Comment::findOrFail($id);

            // Check if the logged-in user is the owner of the comment
            // if ($comment->user_id !== Auth::id()) {
            //     return response()->json([
            //         'message' => 'Unauthorized: You can only delete your own comments.'
            //     ], 403);
            // }

            // Delete the comment
            $comment->delete();

            return response()->json([
                'message' => 'Comment deleted successfully.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to delete the comment.',
                'error' => $e->getMessage()
            ], 500);
        }

    }
}
