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
