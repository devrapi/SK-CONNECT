<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Official extends Model
{
    use HasFactory  ,SoftDeletes;

    protected $fillable = ['name', 'title', 'image_path' ,'deleted_at','batch_year'];

}
