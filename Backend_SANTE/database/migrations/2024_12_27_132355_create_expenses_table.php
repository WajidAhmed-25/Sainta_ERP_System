<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExpensesTable extends Migration
{
    public function up()
    {
        Schema::create('expenses', function (Blueprint $table) {
            $table->id(); // Auto-increment primary key
            $table->string('expenseName');
            $table->decimal('expenseCost', 10, 2);
            $table->string('expenseRecorderName');
            $table->date('expenseDate');
            $table->string('expenseType');
            $table->timestamps(); // created_at and updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('expenses');
    }
}