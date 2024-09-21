<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeBusinessIdToIntegerInAdminInfoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('admin_info', function (Blueprint $table) {
            // Modify the business_id column to an integer type
            $table->unsignedBigInteger('business_id')->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('admin_info', function (Blueprint $table) {
            // Revert business_id back to string type if rolled back
            $table->string('business_id')->change();
        });
    }
}
