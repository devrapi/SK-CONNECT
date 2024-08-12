<?php

use App\Http\Controllers\AuthUserController;
use Illuminate\Container\Attributes\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register' , [AuthUserController::class , 'register']);
Route::post('/login' , [AuthUserController::class , 'login']);
Route::post('/logout' , [AuthUserController::class , 'logout'])->middleware('auth:sanctum');
