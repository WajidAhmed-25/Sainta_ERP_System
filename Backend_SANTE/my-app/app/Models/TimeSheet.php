<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TimeSheet extends Model
{
    use HasFactory;

    protected $table = 'timesheets';

    protected $primaryKey = 'TimeSheet_ID';

    protected $fillable = [
        'Employee_ID',
        'Todays_Work',
        'Today_Departure',
        'Break_Time_in_Hours',
        'Number_of_Working_Days',
        'Number_of_Days_Absent',
        'Reason_for_Absence',
        'Scheduling',
        'Week'
    ];

    // Define the relationship with Employee
    public function employee()
    {
        return $this->belongsTo(Employee::class, 'Employee_ID', 'Employee_ID');
    }
}
