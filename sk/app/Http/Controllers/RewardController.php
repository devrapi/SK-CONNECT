<?php

namespace App\Http\Controllers;

use App\Models\Reward;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class RewardController extends Controller
{
    public function index()
    {
        return Reward::orderBy('created_at', 'desc')->get();
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'description' => 'nullable|string',
            'points' => 'required|integer',
            'stocks' => 'required|integer',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('event_images', 'public');
        } else {
            $imagePath = null;
        }

        Reward::create([
            'name' => $request->name,
            'category' => $request->category,
            'description' => $request->description,
            'points' => $request->points,
            'stocks' => $request->stocks,
            'image_path' => $imagePath,
        ]);

        return response()->json(['message' => 'Reward created successfully']);
    }

    public function show(Reward $reward)
    {
        return $reward;
    }

    public function update(Request $request, Reward $reward)
{
    // Validate the fields, including optional image upload
    $fields = $request->validate([
        'name' => 'required|string|max:255',
        'description' => 'nullable|string|max:1000',  // Adjust max length as needed
        'points' => 'required|integer',
        'stocks' => 'required|integer',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    ]);

    // Update the other fields (name, description, points)
    $reward->name = $fields['name'];
    $reward->description = $fields['description'] ?? $reward->description; // If description is nullable, retain the old value if it's not provided
    $reward->points = $fields['points'];
    $reward->stocks = $fields['stocks'];
    // Check if an image file is being uploaded
    if ($request->hasFile('image')) {
        // If the user has an existing image, delete the old image
        if (!is_null($reward->image_path) && Storage::disk('public')->exists($reward->image_path)) {
            Storage::disk('public')->delete($reward->image_path);
        }

        // Store the new image in 'event_images' folder and update the image path
        $imagePath = $request->file('image')->store('event_images', 'public');
        $reward->image_path = $imagePath; // Save new image path to the reward model
    }

    // Save the reward object with updated data
    $reward->save();

    return response()->json([
        'message' => 'Update successful',
        'reward' => $reward  // Return the updated reward object
    ], 200);
}


    public function destroy( Reward $reward )
    {
            $reward->delete();

            return ['message' => ' the rewrads is deleted'];
    }
}


