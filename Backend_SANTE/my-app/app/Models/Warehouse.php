<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Warehouse extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'address', 'owner_name', 'datelastupdatedstock', 'number_of_workers'
    ];

    public function suppliers()
    {
        return $this->belongsToMany(Supplier::class, 'supplier_warehouse', 'warehouse_id', 'supplier_id');
    }   
}