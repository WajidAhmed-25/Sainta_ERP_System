<?php

namespace App\Http\Controllers;

use App\Models\ProductType;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProductTypeController extends Controller
{
    // GET /api/product_types - Retrieve all product types
    public function index()
    {
        try {
            $productTypes = ProductType::all();
            return response()->json($productTypes, Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to retrieve product types',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // GET /api/product_types/{id} - Retrieve a product type by ID
    public function show($id)
    {
        try {
            $productType = ProductType::findOrFail($id);
            return response()->json($productType, Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Product type not found',
                'error' => $e->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    // POST /api/product_types - Create a new product type
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'type_name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        try {
            $productType = ProductType::create($validatedData);
            return response()->json([
                'message' => 'Product type created successfully',
                'product_type' => $productType
            ], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to create product type',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // PUT /api/product_types/{id} - Update a product type
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'type_name' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|nullable|string',
        ]);

        try {
            $productType = ProductType::findOrFail($id);
            $productType->update($validatedData);

            return response()->json([
                'message' => 'Product type updated successfully',
                'product_type' => $productType
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update product type',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // DELETE /api/product_types/{id} - Delete a product type
    public function destroy($id)
    {
        try {
            $productType = ProductType::findOrFail($id);
            $productType->delete();

            return response()->json([
                'message' => 'Product type deleted successfully'
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to delete product type',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
