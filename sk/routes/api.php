<?php


use Illuminate\Http\Request;
use App\Http\Controllers\AssignTask;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LeaderBoards;
use App\Http\Controllers\ClaimController;
use App\Http\Controllers\EventController;
use Illuminate\Container\Attributes\Auth;
use App\Http\Controllers\RewardController;
use App\Http\Controllers\ArchivedController;
use App\Http\Controllers\AuthUserController;
use App\Http\Controllers\OfficialController;
use App\Http\Controllers\ProfilesController;
use App\Http\Controllers\UserTaskController;
use App\Http\Controllers\AuthAdminController;
use App\Http\Controllers\InviteController;
use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\EventAttendanceController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;


// Route::middleware(['auth:sanctum', 'verified'])->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', function (Request $request) {
        return $request->user();
    })->middleware('auth:sanctum');

    // Route::get('/email/verify/{id}/{hash}', [AuthUserController::class, 'VerifyEmail'])
    // ->middleware('signed')
    // ->name('verification.verify');


});

Route::get('/verify-email/{id}/{token}', [AuthUserController::class, 'verifyEmail']);
Route::post('/email/verification-notification/{user}', [AuthUserController::class, 'sendVerificationEmail']);

// Route::get('/email/verify' , [AuthUserController::class , 'VerifyNotice'])->middleware('auth:sanctum')->name('verification.notice');


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
Route::get('dailyLogin/{id}' , [UserTaskController::class , 'show']);
Route::get('dailyLogin/' , [UserTaskController::class , 'index']);
Route::post('claimStreak/{user_id}' , [UserTaskController::class , 'ClaimStreak']);
//Referral Bonus
Route::post('/referral/{user_id}' , [UserTaskController::class , 'ClaimReferral']);

//LeaderBoards
Route::get('leaderboards' , [LeaderBoards::class , 'LeaderBoards']);
Route::post('leaderboards/{user_id}' , [LeaderBoards::class , 'RewardsLB']);

//Notification
Route::get('notification/{user_id}' , [NotificationController::class , 'Notification']);
Route::post('/notification/{user_id}/mark-all-read', [NotificationController::class, 'markAllAsRead']);

//Get all Referred users
Route::get('referredUsers/{user_id}' , [ClaimController::class , 'getReferredUsers']);

//Announcement
Route::get('announcement' ,[AnnouncementController::class , 'index'] );
Route::get('announcement/{announcement}' ,[AnnouncementController::class , 'show'] );
Route::post('announcement' ,[AnnouncementController::class , 'store'] );
Route::delete('announcement/{announcement}' ,[AnnouncementController::class , 'destroy'] );
Route::post('announcement/update/{announcement}' ,[AnnouncementController::class , 'update'] );

//Comment
Route::post('announcement/comment/{announcement}/{userId}' ,[AnnouncementController::class , 'comment'] );
Route::get('announcement/comment/{announcementId}' ,[AnnouncementController::class , 'getComments'] );

//Likes
Route::post('announcement/like/{announcement}/{user_id}' , [AnnouncementController::class , 'like'] );
Route::get('announcement/like/{announcementId}' ,[AnnouncementController::class , 'getLike'] );
Route::delete('announcement/like/{announcement}/{user_id}' , [AnnouncementController::class , 'unlike'] );


//Attend Event
Route::post('events/{eventId}/{user_id}/attend', [EventAttendanceController::class, 'attendEvent']);
Route::get('qr-code/{eventId}', [EventAttendanceController::class, 'generateQrCode']);
Route::post('verify-qr-code', [EventAttendanceController::class, 'VerifiyQrCode']);
Route::get('events/{user_id}/status', [EventAttendanceController::class, 'status']);
Route::get('events/reject/{attendanceId}', [EventAttendanceController::class, 'rejectAttendance']);

//Sk-Officials
Route::apiResource('officials', OfficialController::class);
Route::post('officials/update/{official}', [OfficialController::class, 'update']);

//addmin invites
Route::post('admin/invites', [InviteController::class, 'store']);
Route::get('admin/users', [InviteController::class, 'getAllUsers']);
