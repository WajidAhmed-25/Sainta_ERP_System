<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTimesheetsCreatedToEmployeesTimesheetsTable extends Migration
{
    public function up()
    {
        Schema::table('employees_timesheet', function (Blueprint $table) {
            $table->date('timesheets_created')->after('Week')->nullable();
        });
    }

    public function down()
    {
        Schema::table('employees_timesheet', function (Blueprint $table) {
            $table->dropColumn('timesheets_created');
        });
    }
}
