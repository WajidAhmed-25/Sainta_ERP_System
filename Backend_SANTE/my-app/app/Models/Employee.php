<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    protected $table = 'employees';

    protected $primaryKey = 'Employee_ID';

    protected $fillable = [
        'Department_ID',
        'Employee_Name',
        'Furigana',
        'Gender',
        'Nationality',
        'Date_Of_Birth',
        'Telephone_Number',
        'Email_Address',
        'Address',
        'Deploy',
        'Employment_Status',
        'Post',
        'Hiring_Date',
        'Payroll_Interval',
        'Payday',
        'Salary',
        'Deduction_rate',
        'Total_Deduction_Amount',
        'Health_Insurance_Number',
        'Employee_Pension_Insurance_Number',
        'Employment_Insurance_Number',
        'Working_Days_Count',
        'Absent_Days_Count',
        'Absence_History',
        'Performance_Evaluation',
        'Last_Meeting_Date',
        'Other_Notes',
        'Employment_Contract',
        'Personal_Information',
        'Resume',
        'Username',
        'Password',
        'Authority'
    ];

    // Define the relationship with Department
    public function department()
    {
        return $this->belongsTo(Department::class, 'Department_ID', 'Department_ID');
    }
}
