<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomerManagement extends Model
{
    use HasFactory;

    protected $table = 'customer_management';
    protected $primaryKey = 'customer_id';

    // Define which attributes will be cast to JSON
    protected $casts = [
        'basic_information' => 'array',
        'survey_information' => 'array',
        'contact_information' => 'array',
        'cultural_information' => 'array',
        'support_information' => 'array',
        'other_information' => 'array',
    ];

    protected $fillable = [
        'basic_information',
        'survey_information',
        'contact_information',
        'cultural_information',
        'support_information',
        'other_information',
    ];
}
