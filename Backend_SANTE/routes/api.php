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




use App\Http\Controllers\SupplierController;


Route::get('/suppliers', [SupplierController::class, 'index']);
Route::get('/suppliers/{id}', [SupplierController::class, 'show']);
Route::post('/suppliers', [SupplierController::class, 'store']);
Route::put('/suppliers/{id}', [SupplierController::class, 'update']);
Route::delete('/suppliers/{id}', [SupplierController::class, 'destroy']);



use App\Http\Controllers\ProductTypeController;

Route::get('/product_types', [ProductTypeController::class, 'index']);
Route::get('/product_types/{id}', [ProductTypeController::class, 'show']);
Route::post('/product_types', [ProductTypeController::class, 'store']);
Route::put('/product_types/{id}', [ProductTypeController::class, 'update']);
Route::delete('/product_types/{id}', [ProductTypeController::class, 'destroy']);



use App\Http\Controllers\StockTypeController;

Route::get('/stock_types', [StockTypeController::class, 'index']);
Route::get('/stock_types/{id}', [StockTypeController::class, 'show']);
Route::post('/stock_types', [StockTypeController::class, 'store']);
Route::put('/stock_types/{id}', [StockTypeController::class, 'update']);
Route::delete('/stock_types/{id}', [StockTypeController::class, 'destroy']);




use App\Http\Controllers\StockController;

Route::get('/stocks', [StockController::class, 'index']);
Route::get('/stocks/{id}', [StockController::class, 'show']);
Route::post('/stocks', [StockController::class, 'store']);
Route::put('/stocks/{id}', [StockController::class, 'update']);
Route::delete('/stocks/{id}', [StockController::class, 'destroy']);
// Get by Stock Type ID
Route::get('/stocks/stock_type/{stockTypeId}', [StockController::class, 'showByStockType']);





use App\Http\Controllers\ProductController;

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::post('/products', [ProductController::class, 'store']);
Route::put('/products/{id}', [ProductController::class, 'update']);
Route::delete('/products/{id}', [ProductController::class, 'destroy']);
// Get by Stock ID
Route::get('/products/stock/{stock_id}', [ProductController::class, 'showByStockID']);

Route::get('/products/product-type/{product_type_id}', [ProductController::class, 'showByProductTypeID']);


use App\Http\Controllers\AllTransactionController;

Route::get('transactions', [AllTransactionController::class, 'index']);
Route::get('transactions/{id}', [AllTransactionController::class, 'show']);
Route::post('transactions', [AllTransactionController::class, 'store']);
Route::put('transactions/{id}', [AllTransactionController::class, 'update']);
Route::delete('transactions/{id}', [AllTransactionController::class, 'destroy']);


use App\Http\Controllers\WarehouseController;

Route::get('warehouses', [WarehouseController::class, 'index']);
Route::get('warehouses/{id}', [WarehouseController::class, 'show']);
Route::post('warehouses', [WarehouseController::class, 'store']);
Route::put('warehouses/{id}', [WarehouseController::class, 'update']);
Route::delete('/warehouses/{id}', [WarehouseController::class, 'destroy']);


use App\Http\Controllers\SupplierWarehouseController;

Route::get('/supplier-warehouse', [SupplierWarehouseController::class, 'index']);
Route::post('/supplier-warehouse', [SupplierWarehouseController::class, 'store']);
Route::put('/supplier-warehouse/{id}', [SupplierWarehouseController::class, 'update']);
Route::delete('/supplier-warehouse', [SupplierWarehouseController::class, 'destroy']);


use App\Http\Controllers\ExpenseController;

Route::get('/expenses', [ExpenseController::class, 'index']); // GET all expenses
Route::get('/expenses/{id}', [ExpenseController::class, 'show']); // GET specific expense by ID
Route::post('/expenses', [ExpenseController::class, 'store']); // POST a new expense
Route::put('/expenses/{id}', [ExpenseController::class, 'update']); // PUT to update an expense
Route::delete('/expenses/{id}', [ExpenseController::class, 'destroy']); // DELETE an expense




use App\Http\Controllers\SaleController;

Route::prefix('sales')->group(function () {
   Route::get('/', [SaleController::class, 'index']);
   Route::post('/', [SaleController::class, 'store']);
   Route::get('/{id}', [SaleController::class, 'show']);
   Route::put('/{id}', [SaleController::class, 'update']);
   Route::delete('/{id}', [SaleController::class, 'destroy']);
   Route::get('/status/{status}', [SaleController::class, 'getByStatus']);
   Route::get('/payment-status/{paymentStatus}', [SaleController::class, 'getByPaymentStatus']);

});



use App\Http\Controllers\SalesProductController;

Route::post('/sales-products', [SalesProductController::class, 'store']); 
Route::get('/sales-products', [SalesProductController::class, 'index']); 
Route::get('/sales-products/{id}', [SalesProductController::class, 'show']); 
Route::put('/sales-products/{id}', [SalesProductController::class, 'update']); 
Route::delete('/sales-products/{id}', [SalesProductController::class, 'destroy']); 





use App\Http\Controllers\PaymentController;

Route::get('/payments', [PaymentController::class, 'index']);
Route::get('/payments/{id}', [PaymentController::class, 'show']);
Route::post('/payments', [PaymentController::class, 'store']);
Route::put('/payments/{id}', [PaymentController::class, 'update']);
Route::delete('/payments/{id}', [PaymentController::class, 'destroy']);







use App\Http\Controllers\ExpenseCategoryController;


Route::get('expense-categories', [ExpenseCategoryController::class, 'index']);
Route::post('expense-categories', [ExpenseCategoryController::class, 'store']);
Route::get('expense-categories/{id}', [ExpenseCategoryController::class, 'show']);
Route::put('expense-categories/{id}', [ExpenseCategoryController::class, 'update']);
Route::delete('expense-categories/{id}', [ExpenseCategoryController::class, 'destroy']);





use App\Http\Controllers\SubExpenseController;


Route::get('sub-expenses', [SubExpenseController::class, 'index']);
Route::post('sub-expenses', [SubExpenseController::class, 'store']);
Route::get('sub-expenses/{id}', [SubExpenseController::class, 'show']);
Route::put('sub-expenses/{id}', [SubExpenseController::class, 'update']);
Route::delete('sub-expenses/{id}', [SubExpenseController::class, 'destroy']);




use App\Http\Controllers\SubExpenseCalculationController;


Route::post('/sub-expense-calculations', [SubExpenseCalculationController::class, 'store']);
Route::get('/sub-expense-calculations', [SubExpenseCalculationController::class, 'index']);
Route::get('/sub-expense-calculations/{id}', [SubExpenseCalculationController::class, 'show']);
Route::put('/sub-expense-calculations/{id}', [SubExpenseCalculationController::class, 'update']);
Route::delete('/sub-expense-calculations/{id}', [SubExpenseCalculationController::class, 'destroy']);
Route::get('/sub-expense-calculations/sub-expense/{sub_expense_id}/details', [SubExpenseCalculationController::class, 'getBySubExpenseId']);

Route::post('/expense/{receiverEmail}/review', [SubExpenseCalculationController::class, 'sendReviewNotification']);



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|f
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
   return $request->user();
    
});
