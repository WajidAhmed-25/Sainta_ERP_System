<?php

namespace App\Http\Controllers;

use App\Models\AllTransaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AllTransactionController extends Controller
{
    // GET all transactions
    public function index()
    {
        $transactions = AllTransaction::with(['product'])->get();;
        return response()->json($transactions);
    }

    // GET transaction by ID
    public function show($id)
    {
        $transaction = AllTransaction::with(['product'])->findOrFail($id);

        if (!$transaction) {
            return response()->json(['message' => 'Transaction not found'], 404);
        }

        return response()->json($transaction);
    }

    // POST create a new transaction
    public function store(Request $request)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'product_id' => 'required|exists:products,product_id',
            'product_quantity' => 'required|integer',
            'product_price' => 'required|numeric',
            'transaction_date' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Create the transaction
        $transaction = AllTransaction::create([
            'product_id' => $request->product_id,
            'product_quantity' => $request->product_quantity,
            'product_price' => $request->product_price,
            'transaction_date' => $request->transaction_date,
        ]);

        return response()->json($transaction, 201);
    }

    // PUT update an existing transaction
    public function update(Request $request, $id)
    {
        $transaction = AllTransaction::find($id);

        if (!$transaction) {
            return response()->json(['message' => 'Transaction not found'], 404);
        }

        // Validate the request data
        $validator = Validator::make($request->all(), [
            'product_id' => 'sometimes|required|exists:products,product_id',
            'product_quantity' => 'sometimes|required|integer',
            'product_price' => 'sometimes|required|numeric',
            'transaction_date' => 'sometimes|required|date',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Update the transaction
        $transaction->update([
            'product_id' => $request->product_id,
            'product_quantity' => $request->product_quantity,
            'product_price' => $request->product_price,
            'transaction_date' => $request->transaction_date,
        ]);

        return response()->json($transaction);
    }

    // DELETE a transaction
    public function destroy($id)
    {
        $transaction = AllTransaction::find($id);

        if (!$transaction) {
            return response()->json(['message' => 'Transaction not found'], 404);
        }

        $transaction->delete();
        return response()->json(['message' => 'Transaction deleted successfully']);
    }
}