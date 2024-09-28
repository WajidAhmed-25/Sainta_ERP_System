<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDepartmentsTable extends Migration
{
    public function up()
    {
        Schema::create('departments', function (Blueprint $table) {
            $table->id('Department_ID');
            $table->string('Department_Name');
            $table->string('Department_Description');
            $table->timestamps(); // To store created_at and updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('departments');
    }
}
