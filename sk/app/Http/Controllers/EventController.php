<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;


class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Event::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'date' => 'required|date',
            'points' => 'required|integer',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('event_images', 'public');
        } else {
            $imagePath = null;
        }

        Event::create([
            'title' => $request->title,
            'description' => $request->description,
            'date' => $request->date,
            'points' => $request->points,
            'image_path' => $imagePath,
        ]);

        return response()->json(['message' => 'Event created successfully']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event)
    {
        return $event;
    }

    /**
     * Update the specified resource in storage.
     */
   public function update(Request $request, Event $event)
{
    $fields = $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'required|string',
        'date' => 'required|date',
        'points' => 'required|integer',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    ]);

    // Handle image upload
    if ($request->hasFile('image')) {
        $imagePath = $request->file('image')->store('event_images', 'public');
        $fields['image'] = $imagePath;
    } else {
        // If no image is uploaded, remove 'image' from $fields
        unset($fields['image']);
    }

    $event->update($fields);

    return $event;
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy( Event $event )
    {
            $event->delete();

            return ['message' => ' the event is deleted'];
    }
}
