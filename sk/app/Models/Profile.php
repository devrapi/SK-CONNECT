<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

    protected $fillable = ['full_name'];

    public function users()
    {
        return $this->hasOne(User::class, 'profile_id');
    }
}
