<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Referral extends Model
{
    use HasFactory;

    protected $fillable = [
        'referrer_id',   // ID of the user who referred the new user
        'referred_id',   // ID of the user who was referred

    ];

     // Relationship: Get the user who made the referral
     public function referrer()
     {
         return $this->belongsTo(User::class, 'referrer_id');
     }

     // Relationship: Get the user who was referred
     public function referredUser()
     {
         return $this->belongsTo(User::class, 'referred_id');
     }
}
