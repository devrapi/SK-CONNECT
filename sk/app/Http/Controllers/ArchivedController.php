<?php

namespace App\Http\Controllers;
use App\Models\Profile;

use Illuminate\Http\Request;

class ArchivedController extends Controller
{
    public function restore($id)
    {
        // Retrieve the profile with trashed profiles included
        $profile = Profile::withTrashed()->find($id);

        // Check if the profile exists and is trashed
        if ($profile && $profile->trashed()) {
            $profile->restore();
            return response()->json(['message' => 'Profile restored successfully'], 200);
        }

        return response()->json(['message' => 'Profile not found or not trashed'], 404);
    }

    public function fetchArchived()
    {
    // Retrieve all profiles that have been soft deleted
    $archivedProfiles = Profile::orderBy('created_at', 'desc')->get();

    // Check if the result set is empty
    if ($archivedProfiles->isEmpty()) {
        return response()->json(['message' => 'No archived profiles found'], 404);
    }

    // Return the archived profiles
    return $archivedProfiles;
    }
}
