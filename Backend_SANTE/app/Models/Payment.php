<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'sales_product_id',
        'payment_date',
        'payment_method',
        'amount',
        'transaction_id',
        'status',
    ];

    // Relationship with SalesProduct
    public function salesProduct()
    {
        return $this->belongsTo(SalesProduct::class, 'sales_product_id', 'id');
    }
}
