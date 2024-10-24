<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use App\Models\Comment;
use App\Models\Like;
use App\Models\User;
use Illuminate\Http\Request;

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
            'content' => 'nullable|string',

        ]);

        Announcement::create([
            'title' => $request->title,
            'content' => $request->content,


        ]);

        return response()->json(['message' => ' Announcement created successfully']);
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

        ]);

        $announcement->update($fields);

        return ['message' => 'update success' , $announcement];

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
}
