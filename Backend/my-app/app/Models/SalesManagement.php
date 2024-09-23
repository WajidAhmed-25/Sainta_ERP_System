<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SalesManagement extends Model
{
    use HasFactory;

    // Table name
    protected $table = 'Sales_Management';

    // Fillable fields
    protected $fillable = [
        'Merchendis_Info',
        'Merchandise_Details',
    ];

}
