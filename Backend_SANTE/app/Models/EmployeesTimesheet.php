<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeesTimesheet extends Model
{
    use HasFactory;

    protected $table = 'employees_timesheet';

    protected $primaryKey = 'TimeSheet_ID';

    protected $fillable = [
        'Employee_ID',
        'Number_of_Working_Days',
        'Number_of_Days_Absent',
        'Reason_for_Absence',
        'start_time',
        'end_time',
        'Week',
        'timesheets_created'
    ];

    // Define the relationship with Employee
    public function employee()
    {
        return $this->belongsTo(Employee::class, 'Employee_ID', 'Employee_ID');
    }
}
