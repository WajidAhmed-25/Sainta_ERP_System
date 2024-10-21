<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


use App\Http\Controllers\AdminInfoController;

Route::get('/admin-info', [AdminInfoController::class, 'index']); 
Route::get('/admin-info/{id}', [AdminInfoController::class, 'show']); 
Route::put('/admin-info/{id}', [AdminInfoController::class, 'update']); 
Route::delete('/admin-info/{id}', [AdminInfoController::class, 'destroy']); 
Route::post('/admin-info', [AdminInfoController::class, 'store']); 


Route::post('/send-user-details', [AdminInfoController::class, 'sendUserDetails']);





use App\Http\Controllers\OtpController;

Route::post('/send-otp', [OtpController::class, 'sendOtp']);
Route::post('/verify-otp', [OtpController::class, 'verifyOtp']);







use App\Http\Controllers\CustomerManagementController;

Route::get('/customers', [CustomerManagementController::class, 'index']);          
Route::get('/customers/{id}', [CustomerManagementController::class, 'show']);       
Route::post('/customers', [CustomerManagementController::class, 'store']);          
Route::put('/customers/{id}', [CustomerManagementController::class, 'update']);      
Route::delete('/customers/{id}', [CustomerManagementController::class, 'destroy']);   




use App\Http\Controllers\DepartmentController;

Route::get('/departments', [DepartmentController::class, 'index']);          
Route::get('/departments/{id}', [DepartmentController::class, 'show']);         
Route::post('/departments', [DepartmentController::class, 'store']);            
Route::put('/departments/{id}', [DepartmentController::class, 'update']);       
Route::delete('/departments/{id}', [DepartmentController::class, 'destroy']);  


use App\Http\Controllers\EmployeeController;

Route::get('/employees', [EmployeeController::class, 'index']);             
Route::get('/employees/{id}', [EmployeeController::class, 'show']);       
Route::post('/employees', [EmployeeController::class, 'store']);       
Route::put('/employees/{id}', [EmployeeController::class, 'update']);  
Route::delete('/employees/{id}', [EmployeeController::class, 'destroy']);   



use App\Http\Controllers\EmployeesTimesheetController;

Route::get('/employees_timesheets', [EmployeesTimesheetController::class, 'index']);            
Route::get('/employees_timesheets/{id}', [EmployeesTimesheetController::class, 'show']);    
Route::get('employees_timesheets/employee/{employee_id}', [EmployeesTimesheetController::class, 'get_by_Employee_id']);
Route::post('/employees_timesheets', [EmployeesTimesheetController::class, 'store']);           
Route::put('/employees_timesheets/{id}', [EmployeesTimesheetController::class, 'update']);       
Route::delete('/employees_timesheets/{id}', [EmployeesTimesheetController::class, 'destroy']);  
Route::delete('/employees_timesheets/delete-employee/{employee_id}', [EmployeesTimesheetController::class, 'deleteByEmployeeId']);






use App\Http\Controllers\EmployeeDailyAttendanceController;


Route::post('/attendance', [EmployeeDailyAttendanceController::class, 'store']); // Create attendance record
Route::get('/attendance', [EmployeeDailyAttendanceController::class, 'index']); // Get all attendance records
Route::get('/attendance/{id}', [EmployeeDailyAttendanceController::class, 'show']); // Get attendance by ID
Route::get('/attendance/employee/{employee_id}', [EmployeeDailyAttendanceController::class, 'getByEmployeeId']); // Get attendance by employee ID
Route::put('/attendance/{id}', [EmployeeDailyAttendanceController::class, 'update']); // Update attendance by ID
Route::delete('/attendance/{id}', [EmployeeDailyAttendanceController::class, 'destroy']); // Delete attendance by ID
Route::delete('/attendance/employee/{employee_id}', [EmployeeDailyAttendanceController::class, 'destroyByEmployeeId']); // Delete attendance by employee ID





/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
   return $request->user();
    
});
