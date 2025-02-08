<?php

// app/Models/EmployeeDailyAttendance.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeDailyAttendance extends Model
{
    use HasFactory;

    protected $table = 'employees_daily_attendance';

    protected $fillable = [
        'employee_id',
        'todays_joining_time',
        'todays_departure_time',
        'break_time_in_hours',
        'date'
    ];

    // Define the relationship with the Employee model
    public function employee()
    {
        return $this->belongsTo(Employee::class, 'employee_id', 'Employee_ID');
    }
}
