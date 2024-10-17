<?php

namespace App\Http\Controllers;

use App\Models\EmployeesTimesheet;
use Illuminate\Http\Request;

class EmployeesTimesheetController extends Controller
{
    // Get all timesheets
    public function index()
    {
        // Eager load the employee with department data
        $timesheets = EmployeesTimesheet::with(['employee.department'])->get();
        return response()->json($timesheets, 200);
    }

    // Get timesheet by ID
    public function show($id)
    {
        // Eager load the employee with department data
        $timesheet = EmployeesTimesheet::with(['employee.department'])->find($id);
        if ($timesheet) {
            return response()->json($timesheet, 200);
        } else {
            return response()->json(['error' => 'Timesheet not found'], 404);
        }
    }

    // Get timesheets by Employee ID
    public function get_by_Employee_id($employee_id)
    {
        $timesheets = EmployeesTimesheet::with(['employee.department'])
            ->where('Employee_ID', $employee_id)
            ->get();

        if ($timesheets->isNotEmpty()) {
            return response()->json($timesheets, 200);
        } else {
            return response()->json(['error' => 'No timesheets found for this employee'], 404);
        }
    }

    // Create a new timesheet
    public function store(Request $request)
    {
        $timesheet = EmployeesTimesheet::create($request->all());
        return response()->json($timesheet, 201);
    }

    // Update timesheet by ID
    public function update(Request $request, $id)
    {
        $timesheet = EmployeesTimesheet::find($id);
        if ($timesheet) {
            $timesheet->update($request->all());
            return response()->json($timesheet, 200);
        } else {
            return response()->json(['error' => 'Timesheet not found'], 404);
        }
    }

    // Delete timesheet by ID
    public function destroy($id)
    {
        $timesheet = EmployeesTimesheet::find($id);
        if ($timesheet) {
            $timesheet->delete();
            return response()->json(['message' => 'Timesheet deleted'], 200);
        } else {
            return response()->json(['error' => 'Timesheet not found'], 404);
        }
    }




// Delete by Employee ID //

    public function deleteByEmployeeId($employee_id)
    {
     
        $timesheets = EmployeesTimesheet::where('Employee_ID', $employee_id)->get();
    
        if ($timesheets->isNotEmpty()) {
           
            EmployeesTimesheet::where('Employee_ID', $employee_id)->delete();
            return response()->json(['message' => 'All timesheets for the employee deleted'], 200);
        } else {
            return response()->json(['error' => 'No timesheets found for this employee'], 404);
        }
    }
    







}
