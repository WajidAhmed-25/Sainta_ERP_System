<?php

// database/migrations/xxxx_xx_xx_xxxxxx_add_date_to_employees_daily_attendance_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDateToEmployeesDailyAttendanceTable extends Migration
{
    public function up()
    {
        Schema::table('employees_daily_attendance', function (Blueprint $table) {
            $table->date('date')->nullable()->after('break_time_in_hours'); // Allow NULL values
        });
    }

    public function down()
    {
        Schema::table('employees_daily_attendance', function (Blueprint $table) {
            $table->dropColumn('date'); // Dropping the date column
        });
    }
}
