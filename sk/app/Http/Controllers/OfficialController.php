<?php

namespace App\Http\Controllers;

use App\Models\Official;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class OfficialController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       return Official::get()->all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'title' => 'required|string',
            'batch_year' => 'required|string',
            'image_path' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);


        if ($request->hasFile('image_path')) {
            $imagePath = $request->file('image_path')->store('officials_images', 'public');
        } else {
            $imagePath = null;
        }
        Official::create([
            'name' => $request->name,
            'title' => $request->title,
            'image_path' => $imagePath,
        ]);

        return response()->json(['message' => 'Sk Officials created successfully']);

    }

    /**
     * Display the specified resource.
     */
    public function show(Official $official)
    {
        return $official;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Official $official)
    {
        $fields = $request->validate([
           'name' => 'required|string|max:255',
            'title' => 'required|string',
            'image_path' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $official->name = $fields['name'];
        $official->title = $fields['title'];

        if ($request->hasFile('image_path')) {
            // If the user has an existing image, delete the old image
            if (!is_null($official->image_path) && Storage::disk('public')->exists($official->image_path)) {
                Storage::disk('public')->delete($official->image_path);
            }

            // Store the new image in 'event_images' folder and update the image path
            $imagePath = $request->file('image_path')->store('officials_images', 'public');
            $official->image_path = $imagePath; // Save new image path to the reward model
        }

        $official->save();

        return response()->json([
            'message' => 'Update successful',
            'reward' => $official  // Return the updated reward object
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy( Official $official )
    {
        $official->delete();

        return ['message' => 'sk officials is deleted'];
    }

    public function fetchArchived()
    {
    // Retrieve all profiles that have been soft deleted
    $archivedProfiles = Official::onlyTrashed()->get();

    // Check if the result set is empty
    if ($archivedProfiles->isEmpty()) {
        return response()->json(['message' => 'No archived profiles found'], 404);
    }

    // Return the archived profiles
    return $archivedProfiles;
    }
}
