<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCustomerManagementTable extends Migration
{
    public function up()
    {
        Schema::create('customer_management', function (Blueprint $table) {
            $table->id('Customer_ID');
            $table->string('Customer_name');
            $table->string('Furigana');
            $table->bigInteger('Telephone_number');
            $table->string('Email_address');
            $table->string('Address');
            $table->string('Company_name');
            $table->string('Post');
            $table->date('First_meeting_date')->nullable();
            $table->date('Last_contact_date')->nullable();
            $table->date('Next_contact_date')->nullable();
            $table->date('Date_of_birth')->nullable();
            $table->string('Preferred_language');
            $table->string('Preferred_Contact_method');
            $table->string('Support');
            $table->string('Supporting_details');
            $table->integer('Satisfaction');
            $table->string('Encounter');
            $table->string('I_learnt');
            $table->string('Note')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('customer_management');
    }
}
