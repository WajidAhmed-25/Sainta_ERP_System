<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubExpense extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'expense_category_id'];

    // Define relationship to ExpenseCategory
    public function expenseCategory()
    {
        return $this->belongsTo(ExpenseCategory::class, 'expense_category_id');
    }
}
