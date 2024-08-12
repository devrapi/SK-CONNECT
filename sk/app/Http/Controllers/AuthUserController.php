<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthUserController extends Controller
{
    public function register(Request $request){

        $fields = $request->validate([
            'name' => 'required|max:225',
            'email' => 'required|email|unique:users',
            'password' => 'required'
        ]);

        $User = User::create($fields);
        $token = $User->createToken($request->name);

        return  [
            'User' => $User,
            'token' => $token->plainTextToken
        ];

    }
    public function login(Request $request){

        $request->validate([

            'email' => 'required|email|exists:users',
            'password' => 'required'
        ]);

        $User = User::where('email' ,$request->email)->first();

        if(!$User || !Hash::check($request->password, $User->password))
        return [
                'message' => 'invalid credentials'
        ];

        $token = $User->createToken($User->name);

        return  [
            'User' => $User,
            'token' => $token->plainTextToken
        ];

    }
    public function logout(Request $request){

        $request->user()->tokens()->delete();

        return [
            'message' => 'you are logged out'
        ];

    }

}
