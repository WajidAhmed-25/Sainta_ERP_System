<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StockType extends Model
{
    use HasFactory;

    protected $table = 'stock_types';
    protected $primaryKey = 'stock_type_id';

    protected $fillable = [
        'type_name',
        'description',
    ];
}
