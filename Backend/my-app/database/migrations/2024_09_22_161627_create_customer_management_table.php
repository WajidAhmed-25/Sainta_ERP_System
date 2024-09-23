<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCustomerManagementTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('customer_management', function (Blueprint $table) {
            $table->id('customer_id');  // Primary key

            // Store the sections as JSON columns
            $table->json('basic_information')->nullable();  // JSON for basic information
            $table->json('survey_information')->nullable();  // JSON for survey information
            $table->json('contact_information')->nullable();  // JSON for contact information
            $table->json('cultural_information')->nullable();  // JSON for cultural information
            $table->json('support_information')->nullable();  // JSON for support information
            $table->json('other_information')->nullable();  // JSON for other information

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('customer_management');
    }
}
