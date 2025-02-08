<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('sub_expense_calculations', function (Blueprint $table) {
            $table->json('files_path')->nullable()->after('status');
        });
    }

    public function down()
    {
        Schema::table('sub_expense_calculations', function (Blueprint $table) {
            $table->dropColumn('files_path');
        });
    }
};
