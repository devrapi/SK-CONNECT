<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'message', 'read_at'];

// If you're using a default Eloquent date format for the timestamps
protected $dates = ['read_at', 'created_at', 'updated_at'];

// Relationship with User model
public function user()
{
    return $this->belongsTo(User::class);
}

// Mark the notification as read
public function markAsRead()
{
    $this->update(['read_at' => now()]);
}

// Check if the notification is unread
public function isUnread()
{
    return is_null($this->read_at);
}

}
