<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class SupplierController extends Controller
{
    // GET /api/suppliers - Retrieve all suppliers
    public function index()
    {
        try {
            $suppliers = Supplier::all();
            return response()->json($suppliers, Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to retrieve suppliers',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // GET /api/suppliers/{id} - Retrieve a supplier by ID
    public function show($id)
    {
        try {
            $supplier = Supplier::findOrFail($id);
            return response()->json($supplier, Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Supplier not found',
                'error' => $e->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    // POST /api/suppliers - Create a new supplier
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'supplier_name' => 'required|string|max:255',
            'contact_details' => 'required|string|max:255',
            'address' => 'required|string',
        ]);

        try {
            $supplier = Supplier::create($validatedData);
            return response()->json([
                'message' => 'Supplier created successfully',
                'supplier' => $supplier
            ], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to create supplier',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // PUT /api/suppliers/{id} - Update a supplier
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'supplier_name' => 'sometimes|required|string|max:255',
            'contact_details' => 'sometimes|required|string|max:255',
            'address' => 'sometimes|required|string',
        ]);
    
        try {
            $supplier = Supplier::findOrFail($id);
    
            $supplier->update($validatedData);
    
            return response()->json([
                'message' => 'Supplier updated successfully',
                'supplier' => $supplier
            ], Response::HTTP_OK);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Supplier not found',
                'error' => $e->getMessage()
            ], Response::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update supplier',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    

    // DELETE /api/suppliers/{id} - Delete a supplier
    public function destroy($id)
    {
        try {
            $supplier = Supplier::findOrFail($id);
            $supplier->delete();

            return response()->json([
                'message' => 'Supplier deleted successfully'
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to delete supplier',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
