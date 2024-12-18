<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invite extends Model
{
    use HasFactory;

    protected $fillable = [
        'inviter_name',     // Name of the user who invited
        'invitee_name',     // Name of the invitee
        'invitee_address',  // Address of the invitee
        'invitee_phone',    // Phone number of the invitee
    ];

    public function invites()
    {
        return $this->hasMany(Invite::class, 'inviter_name', 'name');
    }
}
