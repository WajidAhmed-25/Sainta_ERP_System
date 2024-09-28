<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    // Get all departments
    public function index()
    {
        return response()->json(Department::all(), 200);
    }

    // Get department by ID
    public function show($id)
    {
        $department = Department::find($id);
        if ($department) {
            return response()->json($department, 200);
        } else {
            return response()->json(['error' => 'Department not found'], 404);
        }
    }

    // Create a new department
    public function store(Request $request)
    {
        $department = Department::create($request->all());
        return response()->json($department, 201);
    }

    // Update a department by ID
    public function update(Request $request, $id)
    {
        $department = Department::find($id);
        if ($department) {
            $department->update($request->all());
            return response()->json($department, 200);
        } else {
            return response()->json(['error' => 'Department not found'], 404);
        }
    }

    // Delete a department by ID
    public function destroy($id)
    {
        $department = Department::find($id);
        if ($department) {
            $department->delete();
            return response()->json(['message' => 'Department deleted'], 200);
        } else {
            return response()->json(['error' => 'Department not found'], 404);
        }
    }
}
