<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Sale;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class SaleController extends Controller
{
    public function index()
    {
        $sales = Sale::with('customer')->get();
        return response()->json([
            // 'status' => true,
            // 'data' => $sales
            $sales
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'Customer_ID' => 'required|exists:customer_management,Customer_ID',
            'total_amount' => 'required|numeric|min:0',
            'discount_in_percent' => 'nullable|numeric|min:0|max:100',
            'tax_value' => 'required|numeric|min:0',
            'net_amount' => 'required|numeric|min:0',
            'payment_status' => 'required|in:Paid,Pending,Partial',
            'status' => 'required|in:Pending,Completed,Cancelled'
        ]);

        $sale = Sale::create([
            'order_number' => 'ORD-' . Str::random(10),
            'Customer_ID' => $request->Customer_ID,
            'order_date' => $request->order_date ?? now(),
            'status' => $request->status,
            'total_amount' => $request->total_amount,
            'discount_in_percent' => $request->discount_in_percent,
            'tax_value' => $request->tax_value,
            'net_amount' => $request->net_amount,
            'payment_status' => $request->payment_status
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Sale created successfully',
            'data' => $sale->load('customer')
        ], 201);
    }

    public function show($id)
    {
        $sale = Sale::with('customer')->find($id);
        
        if (!$sale) {
            return response()->json([
                'status' => false,
                'message' => 'Sale not found'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'data' => $sale
        ]);
    }

    public function getByStatus($status)
    {
        $sales = Sale::with('customer')
                    ->where('status', $status)
                    ->get();

        return response()->json([
            'status' => true,
            'data' => $sales
        ]);
    }

    public function getByPaymentStatus($paymentStatus)
    {
        $sales = Sale::with('customer')
                    ->where('payment_status', $paymentStatus)
                    ->get();

        return response()->json([
            'status' => true,
            'data' => $sales
        ]);
    }

    public function update(Request $request, $id)
    {
        $sale = Sale::find($id);

        if (!$sale) {
            return response()->json([
                'status' => false,
                'message' => 'Sale not found'
            ], 404);
        }

        $request->validate([
            'status' => 'required|in:Pending,Completed,Cancelled',
            'payment_status' => 'required|in:Paid,Pending,Partial',
            'total_amount' => 'required|numeric|min:0',
            'discount_in_percent' => 'nullable|numeric|min:0|max:100',
            'tax_value' => 'required|numeric|min:0',
            'net_amount' => 'required|numeric|min:0'
        ]);

        $sale->update($request->all());

        return response()->json([
            'status' => true,
            'message' => 'Sale updated successfully',
            'data' => $sale->load('customer')
        ]);
    }

    public function destroy($id)
    {
        $sale = Sale::find($id);

        if (!$sale) {
            return response()->json([
                'status' => false,
                'message' => 'Sale not found'
            ], 404);
        }

        $sale->delete();

        return response()->json([
            'status' => true,
            'message' => 'Sale deleted successfully'
        ]);
    }
}