<?php

// app/Http/Controllers/EmployeeDailyAttendanceController.php

namespace App\Http\Controllers;

use App\Models\EmployeeDailyAttendance;
use Illuminate\Http\Request;

class EmployeeDailyAttendanceController extends Controller
{
    // Create a new attendance record
    public function store(Request $request)
    {
        $request->validate([
            'employee_id' => 'required|integer|exists:employees,Employee_ID',
            'todays_joining_time' => 'required|date_format:H:i',
            'todays_departure_time' => 'required|date_format:H:i',
            'break_time_in_hours' => 'required|numeric',
            'date' => 'required|date',
        ]);

        $attendance = EmployeeDailyAttendance::create($request->all());
        return response()->json($attendance, 201);
    }

    // Get all attendance records
    public function index()
    {
        return EmployeeDailyAttendance::with('employee')->get();
    }

    // Get attendance record by ID
    public function show($id)
    {
        $attendance = EmployeeDailyAttendance::with('employee')->find($id);
        if (!$attendance) {
            return response()->json(['message' => 'Attendance record not found'], 404);
        }
        return response()->json($attendance);
    }

    // Get attendance records by employee ID
    public function getByEmployeeId($employee_id)
    {
        $attendances = EmployeeDailyAttendance::with('employee')->where('employee_id', $employee_id)->get();
        return response()->json($attendances);
    }

    // Update attendance record by employee ID
    public function update(Request $request, $id)
    {
        $attendance = EmployeeDailyAttendance::find($id);
        if (!$attendance) {
            return response()->json(['message' => 'Attendance record not found'], 404);
        }

        $request->validate([
            'employee_id' => 'sometimes|integer|exists:employees,Employee_ID',
            'todays_joining_time' => 'sometimes|date_format:H:i',
            'todays_departure_time' => 'sometimes|date_format:H:i',
            'break_time_in_hours' => 'sometimes|numeric',
            'date' => 'required|date', 
        ]);

        $attendance->update($request->all());
        return response()->json($attendance);
    }

    // Delete attendance record
    public function destroy($id)
    {
        $attendance = EmployeeDailyAttendance::find($id);
        if (!$attendance) {
            return response()->json(['message' => 'Attendance record not found'], 404);
        }
        $attendance->delete();
        return response()->json(['message' => 'Attendance record deleted successfully']);
    }

    // Delete attendance records by employee ID
    public function destroyByEmployeeId($employee_id)
    {
        $deletedRows = EmployeeDailyAttendance::where('employee_id', $employee_id)->delete();
        return response()->json(['message' => "{$deletedRows} attendance records deleted successfully"]);
    }
}
