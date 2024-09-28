<?php

namespace App\Http\Controllers;

use App\Models\TimeSheet;
use Illuminate\Http\Request;

class TimeSheetController extends Controller
{
    // Get all timesheets
    public function index()
    {
        // Eager load the employee with department data
        $timesheets = TimeSheet::with(['employee.department'])->get();
        return response()->json($timesheets, 200);
    }


    // Get timesheet by ID
    public function show($id)
    {
        // Eager load the employee with department data
        $timesheet = TimeSheet::with(['employee.department'])->find($id);
        if ($timesheet) {
            return response()->json($timesheet, 200);
        } else {
            return response()->json(['error' => 'Timesheet not found'], 404);
        }
    }

    // Create a new timesheet
    public function store(Request $request)
    {
        $timesheet = TimeSheet::create($request->all());
        return response()->json($timesheet, 201);
    }

    // Update timesheet by ID
    public function update(Request $request, $id)
    {
        $timesheet = TimeSheet::find($id);
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
        $timesheet = TimeSheet::find($id);
        if ($timesheet) {
            $timesheet->delete();
            return response()->json(['message' => 'Timesheet deleted'], 200);
        } else {
            return response()->json(['error' => 'Timesheet not found'], 404);
        }
    }
}
