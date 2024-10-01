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
        Schema::table('users', function (Blueprint $table) {
            $table->unsignedBigInteger('daily_login_id')->nullable()->after('id'); // You can change 'after' to the column where you want it positioned
            $table->foreign('daily_login_id')->references('id')->on('daily_logins')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['daily_login_id']);
            $table->dropColumn('daily_login_id');
        });
    }
};
