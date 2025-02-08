<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;

    protected $table = 'departments';

    protected $primaryKey = 'Department_ID';

    protected $fillable = [
        'Department_Name',
        'Department_Description',
    ];

    public $timestamps = true;
}
