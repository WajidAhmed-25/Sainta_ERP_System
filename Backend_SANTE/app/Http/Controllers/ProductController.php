<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProductController extends Controller
{
    // GET /api/products - Retrieve all products
    public function index()
    {
        try {
            $products = Product::with(['productType', 'stock.stockType', 'supplier'])->get();
            return response()->json($products, Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to retrieve products',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // GET /api/products/{id} - Retrieve a product by ID
    public function show($id)
    {
        try {
            $product = Product::with(['productType', 'stock.stockType', 'supplier'])->findOrFail($id);
            return response()->json($product, Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Product not found',
                'error' => $e->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }


    // GET prouct by Stock ID


    public function showByStockID($stock_id)
    {
        try {
            $stocks = Product::with(['productType', 'stock.stockType', 'supplier'])->where('stock_id', $stock_id)->get();
            
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

/// Show by product type ID

    public function showByProductTypeID($product_type_id)
    {
        try {
            $Products = Product::with(['productType', 'stock.stockType', 'supplier'])->where('product_type_id', $product_type_id)->get();
            
            if ($Products->isEmpty()) {
                return response()->json([
                    'message' => 'No stock found for the given Product type ID.'
                ], Response::HTTP_NOT_FOUND);
            }
    
            return response()->json($Products, Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while fetching Product data.',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    // POST /api/products - Create a new product
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'product_name' => 'required|string|max:255',
            'product_type_id' => 'nullable|exists:product_types,product_type_id',
            'unit_quantity' => 'required|numeric',
            'unit_type' => 'required|string|max:255',
            'product_description' => 'required|string',
            'cost' => 'required|numeric',
            'stock_id' => 'nullable|exists:stock,stock_id',
            'supplier_id' => 'nullable|exists:suppliers,supplier_id',
            'registration_date' => 'required|date',
            'calculation_method' => 'required|string|max:255',
        ]);

        try {
            $product = Product::create($validatedData);
            return response()->json([
                'message' => 'Product created successfully',
                'product' => $product
            ], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to create product',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // PUT /api/products/{id} - Update a product
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'product_name' => 'sometimes|required|string|max:255',
            'product_type_id' => 'nullable|exists:product_types,product_type_id',
            'unit_quantity' => 'sometimes|numeric',
            'unit_type' => 'sometimes|required|string|max:255',
            'product_description' => 'sometimes|required|string',
            'cost' => 'sometimes|numeric',
            'stock_id' => 'nullable|exists:stock,stock_id',
            'supplier_id' => 'nullable|exists:suppliers,supplier_id',
            'registration_date' => 'sometimes|date',
            'calculation_method' => 'sometimes|required|string|max:255',
        ]);

        try {
            $product = Product::findOrFail($id);
            $product->update($validatedData);

            return response()->json([
                'message' => 'Product updated successfully',
                'product' => $product
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update product',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // DELETE /api/products/{id} - Delete a product
    public function destroy($id)
    {
        try {
            $product = Product::findOrFail($id);
            $product->delete();

            return response()->json([
                'message' => 'Product deleted successfully'
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to delete product',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
