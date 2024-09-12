<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id' ,
        'reward_id',
        'ticket_number',
        'status',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
    public function reward(){
        return $this->belongsTo(Reward::class);
    }
}
