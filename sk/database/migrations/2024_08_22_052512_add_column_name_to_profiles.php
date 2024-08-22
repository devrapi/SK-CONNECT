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
        Schema::table('profiles', function (Blueprint $table) {

        $table->string('full_name')->nullable();
        $table->string('first_name');
        $table->string('last_name');
        $table->string('gender');
        $table->date('birthdate')->nullable();
        $table->integer('age');
        $table->string('education');
        $table->string('address');
        $table->string('phone_number');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('profiles', function (Blueprint $table) {
            $table->dropColumn([
                'first_name',
                'last_name',
                'gender',
                'birthdate',
                'age',
                'education',
                'address',
                'phone_number'
            ]);

        });
    }
};
