<?php

use App\Http\Controllers\ArchivedController;
use App\Http\Controllers\AssignTask;
use App\Http\Controllers\AuthAdminController;
use App\Http\Controllers\AuthUserController;
use App\Http\Controllers\ClaimController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\LeaderBoards;
use App\Http\Controllers\ProfilesController;
use App\Http\Controllers\RewardController;
use App\Http\Controllers\UserTaskController;
use Illuminate\Container\Attributes\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//USER API
Route::post('/register' , [AuthUserController::class , 'register']);
Route::post('/login' , [AuthUserController::class , 'login']);
Route::post('update/user/{user}' , [AuthUserController::class , 'update']);
Route::post('/logout' , [AuthUserController::class , 'logout'])->middleware('auth:sanctum');

//ADMIN API
Route::post('/admin/register' , [AuthAdminController::class , 'register']);
Route::post('/admin/login' , [AuthAdminController::class , 'login']);
Route::post('/admin/logout' , [AuthAdminController::class , 'logout'])->middleware('auth:sanctum');


//events API
Route::apiResource('events', EventController::class);
Route::post('events/update/{event}', [EventController::class, 'update']);

//PROFILES API
Route::apiResource('profiles', ProfilesController::class);

//ARCHIVED AND RESTORE API
Route::patch('profiles/restore/{id}', [ArchivedController::class, 'restore']);
Route::get('profiles/archived/fetch', [ArchivedController::class, 'fetchArchived']);

//Rewards API
Route::apiResource('rewards', RewardController::class);
Route::post('rewards/update/{reward}', [RewardController::class, 'update']);

//Create a Ticker
Route::post('/rewards/claim/{user}/{id}' , [ClaimController::class , 'claimReward']);

//Get all Tickets
Route::get('/rewards/claim/all' , [ClaimController::class , 'show']);

//Get history tickets
Route::get('/rewards/claim/history' , [ClaimController::class , 'history']);

//Verify Ticket
Route::put('/rewards/claim/verify/{ticket}' , [ClaimController::class , 'verify']);

//Task API
Route::apiResource('task', AssignTask::class);

//Daily Login
Route::get('dailyLogin' , [UserTaskController::class , 'show']);

//Referral Bonus
Route::post('/referral/{user_id}' , [UserTaskController::class , 'ClaimReferral']);

//LeaderBoards
Route::get('leaderboards' , [LeaderBoards::class , 'LeaderBoards']);
