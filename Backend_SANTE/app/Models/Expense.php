<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    use HasFactory;

    // Define the table name (optional if table name matches the pluralized model name)
    protected $table = 'expenses';

    // Fields that are mass-assignable
    protected $fillable = [
        'expenseName',
        'expenseCost',
        'expenseRecorderName',
        'expenseDate',
        'expenseType',
    ];
}
