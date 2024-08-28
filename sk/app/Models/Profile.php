<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Profile extends Model
{
    use HasFactory , SoftDeletes;

    protected $fillable = [
    'full_name',
    'first_name',
    'last_name',
    'gender',
    'birthdate',
    'age',
    'education',
    'address',
    'phone_number',
    'deleted_at'


];

    public function users()
    {
        return $this->hasOne(User::class, 'profile_id');
    }
}
