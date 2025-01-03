<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Contracts\Support\ValidatedData;
use Illuminate\Http\Request;



class ProfilesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Profile::orderBy('created_at', 'desc')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request )
    {
        $validatedData = $request->validate([
            'first_name'   => 'required|string|max:255',
            'last_name'    => 'required|string|max:255',
            'gender'       => 'required|in:male,female,other',
            'birthdate'    => [
                'required',
                'date',
                'date_format:Y-m-d',
                'before:'.now()->format('Y-m-d'), // Ensure birthdate is before today
            ],
            'age'          => 'required|integer|min:0',
            'education'    => 'required|string|max:255',
            'address'      => 'required|string|max:255',
            'phone_number' => [
                'required',
                'string',
                'regex:/^09[0-9]{9}$/', // Phone number must start with 09 and be 11 digits long
            ],
        ]);


        $validatedData['full_name'] = $request->input('first_name') . ' ' . $request->input('last_name');
        $profile = Profile::create($validatedData);

        return response()->json([
            'message' => 'Profile created successfully',
            'profile' => $profile
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Profile $profile)
    {
        return $profile;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Profile $profile)
    {
        $validatedData = $request->validate([
            'full_name'    => 'nullable|string|max:255',
            'first_name'   => 'required|string|max:255',
            'last_name'    => 'required|string|max:255',
            'gender'       => 'required|in:male,female,other',
            'birthdate'    => 'required|date|before_or_equal:today',
            'age'          => 'required|integer|min:0',
            'education'    => 'required|string|max:255',
            'address'      => 'required|string|max:255',
            'phone_number' => 'required|string|max:15',
        ]);


        $validatedData['full_name'] = $request->input('first_name') . ' ' . $request->input('last_name');


        $profile->update($validatedData);

        return ['message' => 'update success' , $profile];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Profile $profile)
    {
        $profile->delete();

        return ['message' => 'profile is  deleted'];
    }



}
