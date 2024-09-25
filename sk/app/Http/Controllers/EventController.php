<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;


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
    // Validate the fields, including optional image upload
    $fields = $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'required|string',
        'date' => 'required|date',
        'points' => 'required|integer',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:10048',
    ]);

    // Update the event fields
    $event->title = $fields['title'];
    $event->description = $fields['description'];
    $event->date = $fields['date'];
    $event->points = $fields['points'];

    // Check if an image file is being uploaded
    if ($request->hasFile('image')) {
        // If the event has an existing image, delete the old image
        if (!is_null($event->image_path) && Storage::disk('public')->exists($event->image_path)) {
            Storage::disk('public')->delete($event->image_path);
        }

        // Store the new image in 'event_images' folder and update the image path
        $imagePath = $request->file('image')->store('event_images', 'public');
        $event->image_path = $imagePath; // Save the new image path to the event model
    }

    // Save the updated event
    $event->save();

    return response()->json([
        'message' => 'Update successful',
        'event' => $event  // Return the updated event object
    ], 200);
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
