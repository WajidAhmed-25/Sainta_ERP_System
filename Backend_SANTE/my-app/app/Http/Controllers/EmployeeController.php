<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Storage;

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
    // public function store(Request $request)
    // {
    //     $employee = Employee::create($request->all());
    //     return response()->json($employee, 201);
    // }




    public function store(Request $request)
    {
        // $employee = Employee::create($request->all());
        $requestss=$request->all();

        $username = $request->input('Username');
        $basePath = "employees/{$username}";

        $filePaths = [];

        // Define the file types and their corresponding folder names
        $fileTypes = [
            'Employment_Contract' => 'employment_contract',
            'Personal_Information' => 'personal_information',
            'Resume' => 'resume'
        ];

        foreach ($fileTypes as $fileKey => $folderName) {
            if ($request->hasFile($fileKey)) {
                $file = $request->file($fileKey);
                $filePaths[$fileKey] = $this->storeFile($file, "{$basePath}/{$folderName}");
            }
        }
        $requestss["Employment_Contract"]=$filePaths['Employment_Contract'];
        $requestss["Personal_Information"]=$filePaths['Personal_Information'];
        $requestss["Resume"]=$filePaths['Resume'];
        Employee::create($requestss);
        return response()->json([
            'message' => 'Employee added successfully',
            'filePaths' => $filePaths
        ]);
    }

    // private function storeFile($file, $directory)
    // {
    //     $path = Storage::putFile($directory, $file);
        
    //     // Get the full path for logging purposes
    //     $fullPath = Storage::path($path);
        
    //     // Log the full path
    //     \Log::info("File stored at: " . $fullPath);

    //     return $path;
    // }

    private function storeFile($file, $directory)
    {
      
        $path = Storage::putFile($directory, $file);
    
      
        $fullPath = Storage::path($path); 
    
 
        \Log::info("File stored at: " . $fullPath);
    

        return $path;
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
