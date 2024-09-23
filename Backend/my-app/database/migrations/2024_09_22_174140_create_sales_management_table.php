<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSalesManagementTable extends Migration
{
    public function up()
    {
        Schema::create('sales_management', function (Blueprint $table) {
            $table->id();
            $table->json('Merchendis_Info');
            $table->json('Merchandise_Details');
            $table->timestamps();
        });
    }
    

    public function down()
    {
        Schema::dropIfExists('Sales_Management');
    }
}
