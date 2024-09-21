<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddBusinessIdToAdminInfoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('admin_info', function (Blueprint $table) {
            $table->string('business_id')->unique()->after('id');
        });
    }
    
    public function down()
    {
        Schema::table('admin_info', function (Blueprint $table) {
            $table->dropColumn('business_id');
        });
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
 
}
