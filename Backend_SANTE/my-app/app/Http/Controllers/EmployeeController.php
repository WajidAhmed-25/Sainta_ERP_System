<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    // Get all employees
    public function index()
    {
        return response()->json(Employee::with('department')->get(), 200);
    }

    // Get employee by ID
    public function show($id)
    {
        $employee = Employee::with('department')->find($id);
        if ($employee) {
            return response()->json($employee, 200);
        } else {
            return response()->json(['error' => 'Employee not found'], 404);
        }
    }

    // Create a new employee
    public function store(Request $request)
    {
        $employee = Employee::create($request->all());
        return response()->json($employee, 201);
    }

    // Update employee by ID
    public function update(Request $request, $id)
    {
        $employee = Employee::find($id);
        if ($employee) {
            $employee->update($request->all());
            return response()->json($employee, 200);
        } else {
            return response()->json(['error' => 'Employee not found'], 404);
        }
    }

    // Delete employee by ID
    public function destroy($id)
    {
        $employee = Employee::find($id);
        if ($employee) {
            $employee->delete();
            return response()->json(['message' => 'Employee deleted'], 200);
        } else {
            return response()->json(['error' => 'Employee not found'], 404);
        }
    }
}
