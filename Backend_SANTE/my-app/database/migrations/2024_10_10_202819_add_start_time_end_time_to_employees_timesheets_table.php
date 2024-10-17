<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddStartTimeEndTimeToEmployeesTimesheetsTable extends Migration
{
    public function up()
    {
        Schema::table('employees_timesheet', function (Blueprint $table) {
            $table->time('start_time')->nullable()->after('Scheduling'); // Add start_time column
            $table->time('end_time')->nullable()->after('start_time');   // Add end_time column
        });
    }

    public function down()
    {
        Schema::table('employees_timesheet', function (Blueprint $table) {
            $table->dropColumn(['start_time', 'end_time']);  // Drop both columns in the rollback
        });
    }
}
