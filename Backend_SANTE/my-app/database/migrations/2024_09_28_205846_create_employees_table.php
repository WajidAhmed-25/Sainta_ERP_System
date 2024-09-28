<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmployeesTable extends Migration
{
    public function up()
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id('Employee_ID');
            $table->unsignedBigInteger('Department_ID');
            $table->string('Employee_Name');
            $table->string('Furigana');
            $table->string('Gender', 50);
            $table->string('Nationality', 100);
            $table->date('Date_Of_Birth');
            $table->bigInteger('Telephone_Number');
            $table->string('Email_Address');
            $table->string('Address');
            $table->string('Deploy', 100);
            $table->string('Employment_Status', 50);
            $table->string('Post', 100);
            $table->date('Hiring_Date');
            $table->string('Payroll_Interval', 50);
            $table->string('Payday', 50);
            $table->integer('Salary');
            $table->float('Deduction_rate');
            $table->integer('Total_Deduction_Amount');
            $table->bigInteger('Health_Insurance_Number');
            $table->bigInteger('Employee_Pension_Insurance_Number');
            $table->bigInteger('Employment_Insurance_Number');
            $table->integer('Working_Days_Count');
            $table->integer('Absent_Days_Count');
            $table->string('Absence_History')->nullable();
            $table->integer('Performance_Evaluation');
            $table->date('Last_Meeting_Date')->nullable();
            $table->string('Other_Notes')->nullable();
            $table->text('Employment_Contract')->nullable();
            $table->text('Personal_Information')->nullable();
            $table->text('Resume')->nullable();
            $table->string('Username');
            $table->string('Password');
            $table->string('Authority', 100);
            $table->timestamps();

            // Foreign key constraint
            $table->foreign('Department_ID')->references('Department_ID')->on('departments')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('employees');
    }
}
