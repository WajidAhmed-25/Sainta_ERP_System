<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmployeesTimesheetTable extends Migration
{
    public function up()
    {
        Schema::create('employees_timesheet', function (Blueprint $table) {
            $table->id('TimeSheet_ID');
            $table->unsignedBigInteger('Employee_ID');
            $table->integer('Number_of_Working_Days');
            $table->integer('Number_of_Days_Absent')->nullable();
            $table->string('Reason_for_Absence')->nullable();
            $table->string('Scheduling');
            $table->date('Week');
            $table->timestamps();

            // Foreign key constraint
            $table->foreign('Employee_ID')->references('Employee_ID')->on('employees')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('employees_timesheet');
    }
}
