<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function index()
    {
        // Get all payments with related sales product data
        $payments = Payment::with('salesProduct')->get();
        return response()->json($payments);
    }

    public function show($id)
    {
        // Get payment by ID with related sales product data
        $payment = Payment::with('salesProduct')->find($id);

        if (!$payment) {
            return response()->json(['message' => 'Payment not found'], 404);
        }

        return response()->json($payment);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'sales_product_id' => 'required|exists:sales_product,id',
            'payment_date' => 'required|date',
            'payment_method' => 'required|in:Cash,Credit Card,Bank Transfer',
            'amount' => 'required|numeric|min:0',
            'transaction_id' => 'nullable|string',
            'status' => 'required|in:Success,Failed,Pending',
        ]);

        $payment = Payment::create($validatedData);
        return response()->json($payment, 201);
    }

    public function update(Request $request, $id)
    {
        $payment = Payment::find($id);

        if (!$payment) {
            return response()->json(['message' => 'Payment not found'], 404);
        }

        $validatedData = $request->validate([
            'sales_product_id' => 'exists:sales_product,id',
            'payment_date' => 'date',
            'payment_method' => 'in:Cash,Credit Card,Bank Transfer',
            'amount' => 'numeric|min:0',
            'transaction_id' => 'nullable|string',
            'status' => 'in:Success,Failed,Pending',
        ]);

        $payment->update($validatedData);
        return response()->json($payment);
    }

    public function destroy($id)
    {
        $payment = Payment::find($id);

        if (!$payment) {
            return response()->json(['message' => 'Payment not found'], 404);
        }

        $payment->delete();
        return response()->json(['message' => 'Payment deleted successfully']);
    }
}
