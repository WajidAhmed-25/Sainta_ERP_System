<?php
// database/migrations/xxxx_xx_xx_xxxxxx_create_employees_daily_attendance_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmployeesDailyAttendanceTable extends Migration
{
    public function up()
    {
        Schema::create('employees_daily_attendance', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('employee_id'); // Foreign key to employees table
            $table->time('todays_joining_time');
            $table->time('todays_departure_time');
            $table->float('break_time_in_hours', 8, 2);
            $table->timestamps();

            // Foreign key constraint
            $table->foreign('employee_id')
                  ->references('Employee_ID')
                  ->on('employees')
                  ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('employees_daily_attendance');
    }
}
