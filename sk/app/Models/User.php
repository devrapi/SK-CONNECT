<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable , HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'profile_id',
        'points',
        'referal_code',
        'image_path',
        'referred_by',
        'reward_claimed_count',
        'reward_reset_date'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function profile()
    {
        return $this->belongsTo(Profile::class);
    }

    public function dailyLogins()
    {
    return $this->hasMany(DailyLogin::class);
    }

     // Relationship: Get the users referred by this user
     public function referredUsers()
     {
         return $this->hasMany(User::class, 'referred_by');
     }

     // Relationship: Get the user who referred this user
     public function referrer()
     {
         return $this->belongsTo(User::class, 'referred_by');
     }

        public function leaderboard()
    {
        return $this->belongsTo(Leaderboard::class);
    }
    public function emailVerificationTokens()
{
    return $this->hasMany(EmailVerificationToken::class);
}
    }
