<?php

namespace App\Http\Controllers;

use App\Models\Reward;
use Illuminate\Http\Request;

class RewardController extends Controller
{
    public function index()
    {
        return Reward::all();
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'points' => 'required|integer',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('event_images', 'public');
        } else {
            $imagePath = null;
        }

        Reward::create([
            'name' => $request->name,
            'description' => $request->description,
            'points' => $request->points,
            'image_path' => $imagePath,
        ]);

        return response()->json(['message' => 'Reward created successfully']);
    }

    public function show(Reward $reward)
    {
        return $reward;
    }

    public function update( Reward $reward , Request $request){

        $fields = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable',
            'points' => 'required|integer',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('image')) {
            // Store the new image
            $imagePath = $request->file('image')->store('event_images', 'public');
            $fields['image_path'] = $imagePath;
        }

        $reward->update($fields);

    return ['message' => 'update success' , $reward];

    }

    public function destroy( Reward $reward )
    {
            $reward->delete();

            return ['message' => ' the rewrads is deleted'];
    }
}


