<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('sub_expenses', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Sub Expense Name
            $table->foreignId('expense_category_id') // Foreign Key
                  ->constrained('expense_categories')
                  ->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sub_expenses');
    }
};
