<?php

namespace App\Http\Controllers;

use App\Models\Stock;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class StockController extends Controller
{
    // GET /api/stocks - Retrieve all stocks
    public function index()
    {
        try {
            $stocks = Stock::with('stockType','warehouse')->get();
            return response()->json($stocks, Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to retrieve stocks',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // GET /api/stocks/{id} - Retrieve a stock by ID
    public function show($id)
    {
        try {
            $stock = Stock::with('stockType')->findOrFail($id);
            return response()->json($stock, Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Stock not found',
                'error' => $e->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    // POST /api/stocks - Create a new stock
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'stock_type_id' => 'required|exists:stock_types,stock_type_id',
            'quantity' => 'sometimes|integer|min:0',
            'location' => 'sometimes|string|max:255',
            'stock_name' => 'sometimes|string|max:255',
            'stocked_date' => 'required|date',
        ]);

        try {
            $stock = Stock::create($validatedData);
            return response()->json([
                'message' => 'Stock created successfully',
                'stock' => $stock
            ], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to create stock',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // PUT /api/stocks/{id} - Update a stock
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'stock_type_id' => 'sometimes|required|exists:stock_types,stock_type_id',
            'quantity' => 'sometimes|integer|min:0',
            'location' => 'sometimes|required|string|max:255',
            'stock_name' => 'sometimes|string|max:255',
            'stocked_date' => 'sometimes|required|date',
        ]);

        try {
            $stock = Stock::findOrFail($id);
            $stock->update($validatedData);

            return response()->json([
                'message' => 'Stock updated successfully',
                'stock' => $stock
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update stock',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // DELETE /api/stocks/{id} - Delete a stock
    public function destroy($id)
    {
        try {
            $stock = Stock::findOrFail($id);
            $stock->delete();

            return response()->json([
                'message' => 'Stock deleted successfully'
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to delete stock',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


// Find Stock by Stock ID



public function showByStockType($stockTypeId)
{
    try {
        $stocks = Stock::with('stockType')->where('stock_type_id', $stockTypeId)->get();
        
        if ($stocks->isEmpty()) {
            return response()->json([
                'message' => 'No stock found for the given stock type ID.'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json($stocks, Response::HTTP_OK);
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'An error occurred while fetching stock data.',
            'error' => $e->getMessage()
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}


// Function ends


}