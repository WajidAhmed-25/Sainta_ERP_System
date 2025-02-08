<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSalesTable extends Migration
{
    public function up()
    {
        Schema::create('sales', function (Blueprint $table) {
            $table->id();
            $table->string('order_number')->unique();
            $table->foreignId('Customer_ID')  ->constrained('customer_management', 'Customer_ID'); 
            $table->dateTime('order_date')->default(now());
            $table->enum('status', ['Pending', 'Completed', 'Cancelled']);
            $table->decimal('total_amount', 10, 2);
            $table->decimal('discount_in_percent', 5, 2)->nullable();
            $table->decimal('tax_value', 10, 2);
            $table->decimal('net_amount', 10, 2);
            $table->enum('payment_status', ['Paid', 'Pending', 'Partial']);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('sales');
    }
}