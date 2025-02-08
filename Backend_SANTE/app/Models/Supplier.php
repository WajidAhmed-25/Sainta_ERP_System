<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    use HasFactory;

    protected $table = 'suppliers';
    protected $primaryKey = 'supplier_id';

    protected $fillable = [
        'supplier_name',
        'contact_details',
        'address',
    ];

    public function warehouses()
    {
        return $this->belongsToMany(Warehouse::class, 'supplier_warehouse', 'supplier_id', 'warehouse_id');
    }
}
