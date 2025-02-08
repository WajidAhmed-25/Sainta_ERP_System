<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSubExpenseCalculationTable extends Migration
{
    public function up()
    {
        Schema::create('sub_expense_calculations', function (Blueprint $table) {
            $table->id(); // Primary Key
            $table->foreignId('sub_expense_id')->constrained('sub_expenses')->onDelete('cascade');
            $table->unsignedBigInteger('reviewer_id'); // Foreign Key for Employee_ID
            $table->unsignedBigInteger('employee_id'); // Foreign Key for Employee_ID
            $table->string('expense_name');
            $table->decimal('expense_cost', 10, 2);
            $table->date('recording_date')->default(now());
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->timestamps();

            // Explicitly define foreign keys for employees
            $table->foreign('reviewer_id')->references('Employee_ID')->on('employees')->onDelete('cascade');
            $table->foreign('employee_id')->references('Employee_ID')->on('employees')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('sub_expense_calculations');
    }
}
