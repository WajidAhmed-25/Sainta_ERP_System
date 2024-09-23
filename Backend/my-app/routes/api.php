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

Route::get('/customers', [CustomerManagementController::class, 'index']);         // Get all customers
Route::post('/customers', [CustomerManagementController::class, 'store']);        // Create new customer
Route::get('/customers/{id}', [CustomerManagementController::class, 'show']);     // Get customer by ID
Route::put('/customers/{id}', [CustomerManagementController::class, 'update']);   // Update customer by ID
Route::delete('/customers/{id}', [CustomerManagementController::class, 'destroy']);  // Delete customer by ID





use App\Http\Controllers\SalesManagementController;


Route::get('/sales-management', [SalesManagementController::class, 'index']);
Route::get('/sales-management/{id}', [SalesManagementController::class, 'show']);
Route::post('sales-management', [SalesManagementController::class, 'store']);
Route::put('/sales-management/{id}', [SalesManagementController::class, 'update']);
Route::delete('/sales-management/{id}', [SalesManagementController::class, 'destroy']);




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
