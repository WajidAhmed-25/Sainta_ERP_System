<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_number',
        'Customer_ID', 
        'order_date',
        'status',
        'total_amount',
        'discount_in_percent',
        'tax_value',
        'net_amount',
        'payment_status'
    ];
    protected $casts = [
        'order_date' => 'datetime',
        'total_amount' => 'decimal:2',
        'discount_in_percent' => 'decimal:2',
        'tax_value' => 'decimal:2',
        'net_amount' => 'decimal:2'
    ];

    public function customer()
    {
        return $this->belongsTo(CustomerManagement::class, 'Customer_ID', 'Customer_ID');
    }
}