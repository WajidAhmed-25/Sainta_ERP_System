<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomerManagement extends Model
{
    use HasFactory;

    protected $table = 'customer_management';

    protected $primaryKey = 'Customer_ID';

    protected $fillable = [
        'Customer_name',
        'Furigana',
        'Telephone_number',
        'Email_address',
        'Address',
        'Company_name',
        'Post',
        'First_meeting_date',
        'Last_contact_date',
        'Next_contact_date',
        'Date_of_birth',
        'Preferred_language',
        'Preferred_Contact_method',
        'Support',
        'Supporting_details',
        'Satisfaction',
        'Encounter',
        'I_learnt',
        'Note'
    ];

    public $timestamps = true;
}
