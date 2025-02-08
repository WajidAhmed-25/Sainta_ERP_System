<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddStockNameToStockTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('stock', function (Blueprint $table) {
            $table->string('stock_name')->nullable(); // Add stock_name column
        });
    }
    
    public function down()
    {
        Schema::table('stock', function (Blueprint $table) {
            $table->dropColumn('stock_name');
        });
    }
    
}
