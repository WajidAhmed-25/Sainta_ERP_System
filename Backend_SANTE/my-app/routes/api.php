<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


use App\Http\Controllers\AdminInfoController;

Route::get('/admin-info', [AdminInfoController::class, 'index']); // Get all
Route::get('/admin-info/{id}', [AdminInfoController::class, 'show']); // Get by ID
Route::put('/admin-info/{id}', [AdminInfoController::class, 'update']); // Update by ID
Route::delete('/admin-info/{id}', [AdminInfoController::class, 'destroy']); // Delete by ID
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



use App\Http\Controllers\TimeSheetController;

Route::get('/timesheets', [TimeSheetController::class, 'index']);            
Route::get('/timesheets/{id}', [TimeSheetController::class, 'show']);         
Route::post('/timesheets', [TimeSheetController::class, 'store']);           
Route::put('/timesheets/{id}', [TimeSheetController::class, 'update']);       
Route::delete('/timesheets/{id}', [TimeSheetController::class, 'destroy']);  


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
