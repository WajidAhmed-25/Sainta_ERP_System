<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    use HasFactory;

    protected $table = 'stock';
    protected $primaryKey = 'stock_id';

    protected $fillable = [
        'stock_type_id',
        'quantity',
        'location',
        'stocked_date',
        'stock_name',
    ];

    public function stockType()
    {
        return $this->belongsTo(StockType::class, 'stock_type_id', 'stock_type_id');
    }
}
