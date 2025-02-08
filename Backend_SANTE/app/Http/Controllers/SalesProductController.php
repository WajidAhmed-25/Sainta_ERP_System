<?php

namespace App\Http\Controllers;

use App\Models\SalesProduct;
use Illuminate\Http\Request;
use Psy\Readline\Hoa\Console;

class SalesProductController extends Controller
{
    public function index()
    {
        // Fetch all sales products with related sales and product data
        $salesProducts = SalesProduct::with(['sales', 'product'])->get();
        return response()->json($salesProducts);
    }

    public function show($id)
    {
        // Fetch a single sales product with related sales and product data
        $salesProduct = SalesProduct::with(['sales', 'product'])->find($id);

        if (!$salesProduct) {
            return response()->json(['message' => 'Record not found'], 404);
        }

        return response()->json($salesProduct);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'sales_id' => 'required|exists:sales,id',
            'product_id' => 'required|exists:products,product_id',
            'quantity' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
            'subtotal' => 'required|numeric|min:0',
        ]);
    
        $salesProduct = SalesProduct::create($validatedData);
    
        return response()->json($salesProduct, 201);
    }
    

    // public function update(Request $request, $id)
    // {
    //     $salesProduct = SalesProduct::find($id);

    //     print_r($id);

    //     if (!$salesProduct) {
    //         return response()->json(['message' => 'Record not found'], 404);
    //     }

    //     $validatedData = $request->validate([
    //         'sales_id' => 'exists:sales,id',
    //         'product_id' => 'exists:products,id',
    //         'quantity' => 'integer|min:1',
    //         'price' => 'numeric|min:0',
    //         'subtotal' => 'numeric|min:0',
    //     ]);

    //     $salesProduct->update($validatedData);

    //     return response()->json($salesProduct);
    // }


    public function update(Request $request, $id)
{
    // Find the SalesProduct record
    $salesProduct = SalesProduct::find($id);

    if (!$salesProduct) {
        return response()->json(['message' => 'Record not found'], 404);
    }

    // Validate the request
    $validatedData = $request->validate([
        'sales_id' => 'exists:sales,id',
        'product_id' => 'exists:products,id',
        'quantity' => 'integer|min:1',
        'price' => 'numeric|min:0',
        'subtotal' => 'numeric|min:0',
    ]);

    // Update the record
    $salesProduct->update($validatedData);

    return response()->json(['message' => 'Record updated successfully', 'data' => $salesProduct]);
}



    public function destroy($id)
    {
        $salesProduct = SalesProduct::find($id);
        if (!$salesProduct) {
            return response()->json(['message' => 'Record not found'], 404);
        }

        $salesProduct->delete();

        return response()->json(['message' => 'Record deleted successfully']);
    }
}
