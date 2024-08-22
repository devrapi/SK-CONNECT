<?php

use App\Http\Controllers\AuthAdminController;
use App\Http\Controllers\AuthUserController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\ProfilesController;
use Illuminate\Container\Attributes\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//USER API
Route::post('/register' , [AuthUserController::class , 'register']);
Route::post('/login' , [AuthUserController::class , 'login']);
Route::post('/logout' , [AuthUserController::class , 'logout'])->middleware('auth:sanctum');

//ADMIN API
Route::post('/admin/register' , [AuthAdminController::class , 'register']);
Route::post('/admin/login' , [AuthAdminController::class , 'login']);
Route::post('/admin/logout' , [AuthAdminController::class , 'logout'])->middleware('auth:sanctum');


//POST API
Route::apiResource('events', EventController::class);

//PROFILES API
Route::apiResource('profiles', ProfilesController::class);
