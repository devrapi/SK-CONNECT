<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('daily_logins', function (Blueprint $table) {
            $table->integer('streak')->default(0); // Add the streak column
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('daily_logins', function (Blueprint $table) {
            $table->dropColumn('streak');
        });
    }
};
