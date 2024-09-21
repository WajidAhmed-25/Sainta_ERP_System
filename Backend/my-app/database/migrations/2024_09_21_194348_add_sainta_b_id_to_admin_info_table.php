<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddSaintaBIdToAdminInfoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('admin_info', function (Blueprint $table) {
            // Add a new integer column 'sainta_b_id'
            $table->unsignedBigInteger('sainta_b_id')->nullable();
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
            // Drop the 'sainta_b_id' column if rollback is needed
            $table->dropColumn('sainta_b_id');
        });
    }
}
