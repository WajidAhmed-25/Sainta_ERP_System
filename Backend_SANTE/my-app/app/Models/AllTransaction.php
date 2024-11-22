<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AllTransaction extends Model
{
    use HasFactory;

    protected $table = 'all_transactions'; // Specify the table name
    protected $primaryKey = 'transaction_id'; // Specify the primary key
    public $timestamps = true; // Use the default timestamps (created_at, updated_at)

    // Define the fillable fields
    protected $fillable = [
        'product_id',
        'product_quantity',
        'product_price',
        'transaction_date',
    ];

    // Define the relationship with Product
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'product_id');
    }
}