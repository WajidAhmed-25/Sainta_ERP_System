<?php

namespace App\Http\Controllers;

use App\Models\StockType;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class StockTypeController extends Controller
{
    // GET /api/stock_types - Retrieve all stock types
    public function index()
    {
        try {
            $stockTypes = StockType::all();
            return response()->json($stockTypes, Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to retrieve stock types',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // GET /api/stock_types/{id} - Retrieve a stock type by ID
    public function show($id)
    {
        try {
            $stockType = StockType::findOrFail($id);
            return response()->json($stockType, Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Stock type not found',
                'error' => $e->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    // POST /api/stock_types - Create a new stock type
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'type_name' => 'required|string|max:255',
            'description' => 'sometimes|nullable|string',
        ]);

        try {
            $stockType = StockType::create($validatedData);
            return response()->json([
                'message' => 'Stock type created successfully',
                'stock_type' => $stockType
            ], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to create stock type',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // PUT /api/stock_types/{id} - Update a stock type
    // public function update(Request $request, $id)
    // {
    //     $validatedData = $request->validate([
    //         'type_name' => 'sometimes|required|string|max:255',
    //         'description' => 'sometimes|nullable|string',
    //     ]);

    //     try {
    //         $stockType = StockType::findOrFail($id);
    //         $stockType->update($validatedData);

    //         return response()->json([
    //             'message' => 'Stock type updated successfully',
    //             'stock_type' => $stockType
    //         ], Response::HTTP_OK);
    //     } catch (\Exception $e) {
    //         return response()->json([
    //             'message' => 'Failed to update stock type',
    //             'error' => $e->getMessage()
    //         ], Response::HTTP_INTERNAL_SERVER_ERROR);
    //     }
    // }

    public function update(Request $request, $id)
{
    $validatedData = $request->validate([
        'type_name' => 'sometimes|required|string|max:255',
        'description' => 'sometimes|nullable|string',
    ]);

    try {
        $stockType = StockType::findOrFail($id);
        
        // Ensure fields are filled even if data format is different
        $stockType->type_name = $request->input('type_name', $stockType->type_name);
        $stockType->description = $request->input('description', $stockType->description);
        
        $stockType->save();

        return response()->json([
            'message' => 'Stock type updated successfully',
            'stock_type' => $stockType
        ], Response::HTTP_OK);
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Failed to update stock type',
            'error' => $e->getMessage()
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}


    // DELETE /api/stock_types/{id} - Delete a stock type
    public function destroy($id)
    {
        try {
            $stockType = StockType::findOrFail($id);
            $stockType->delete();

            return response()->json([
                'message' => 'Stock type deleted successfully'
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to delete stock type',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
