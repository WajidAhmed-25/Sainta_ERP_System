<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubExpenseCalculation extends Model
{
    use HasFactory;

    protected $casts = [
        'files_path' => 'array',
    ];
    

    protected $fillable = [
        'sub_expense_id',
        'reviewer_id',
        'employee_id',
        'expense_name',
        'expense_cost',
        'recording_date',
        'status',
         'files_path'
    ];

    public function reviewer()
    {
        return $this->belongsTo(Employee::class, 'reviewer_id', 'Employee_ID');
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class, 'employee_id', 'Employee_ID');
    }

    public function subExpense()
    {
        return $this->belongsTo(SubExpense::class, 'sub_expense_id');
    }
}
