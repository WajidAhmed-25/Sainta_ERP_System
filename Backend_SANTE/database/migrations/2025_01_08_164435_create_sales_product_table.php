<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSalesProductTable extends Migration
{
    public function up()
    {
        Schema::create('sales_product', function (Blueprint $table) {
            $table->id();
            $table->foreign('sales_id')->references('id')->on('sales')->onDelete('cascade');
            $table->foreign('product_id')->references('product_id')->on('products')->onDelete('cascade');
            $table->integer('quantity');
            $table->decimal('price', 8, 2);
            $table->decimal('subtotal', 10, 2);
            $table->timestamps();

            // Foreign Keys
   
       
        });
    }

    public function down()
    {
        Schema::dropIfExists('sales_product');
    }
}
