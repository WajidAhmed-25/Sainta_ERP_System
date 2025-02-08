<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SalesProduct extends Model
{
    use HasFactory;

    protected $table = 'sales_product';

    protected $fillable = [
        'sales_id',
        'product_id',
        'quantity',
        'price',
        'subtotal',
    ];


     public function sales()
     {
         return $this->belongsTo(Sale::class, 'sales_id', 'id');
     }
 

     public function product()
     {
         return $this->belongsTo(Product::class, 'product_id', 'product_id');
     }
}
