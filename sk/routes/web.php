<?php

use Illuminate\Support\Facades\Route;

Route::get('/{any}', function () {
    return view('app'); // Make sure 'index.blade.php' is correctly set up to load your React app
})->where('any', '.*');
