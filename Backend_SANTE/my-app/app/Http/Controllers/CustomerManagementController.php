<?php

namespace App\Http\Controllers;

use App\Models\CustomerManagement;
use Illuminate\Http\Request;

class CustomerManagementController extends Controller
{
    // Get all customers
    public function index()
    {
        return response()->json(CustomerManagement::all(), 200);
    }

    // Get a customer by ID
    public function show($id)
    {
        $customer = CustomerManagement::find($id);
        if ($customer) {
            return response()->json($customer, 200);
        } else {
            return response()->json(['error' => 'Customer not found'], 404);
        }
    }

    // Create a new customer
    public function store(Request $request)
    {
        $customer = CustomerManagement::create($request->all());
        return response()->json($customer, 201);
    }

    // Update a customer by ID
    public function update(Request $request, $id)
    {
        $customer = CustomerManagement::find($id);
        if ($customer) {
            $customer->update($request->all());
            return response()->json($customer, 200);
        } else {
            return response()->json(['error' => 'Customer not found'], 404);
        }
    }

    // Delete a customer by ID
    public function destroy($id)
    {
        $customer = CustomerManagement::find($id);
        if ($customer) {
            $customer->delete();
            return response()->json(['message' => 'Customer deleted'], 200);
        } else {
            return response()->json(['error' => 'Customer not found'], 404);
        }
    }
}
