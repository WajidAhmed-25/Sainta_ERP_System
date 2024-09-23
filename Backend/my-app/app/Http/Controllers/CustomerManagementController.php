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

    // Get customer by ID
    public function show($id)
    {
        $customer = CustomerManagement::find($id);

        if (!$customer) {
            return response()->json(['message' => 'Customer not found'], 404);
        }

        return response()->json($customer, 200);
    }

    // Create a new customer
    public function store(Request $request)
    {
        // Validate the request
        $request->validate([
            'basic_information' => 'required|array',
            'survey_information' => 'nullable|array',
            'contact_information' => 'nullable|array',
            'cultural_information' => 'nullable|array',
            'support_information' => 'nullable|array',
            'other_information' => 'nullable|array',
        ]);

        // Create the customer
        $customer = CustomerManagement::create([
            'basic_information' => $request->input('basic_information'),
            'survey_information' => $request->input('survey_information'),
            'contact_information' => $request->input('contact_information'),
            'cultural_information' => $request->input('cultural_information'),
            'support_information' => $request->input('support_information'),
            'other_information' => $request->input('other_information'),
        ]);

        return response()->json($customer, 201);
    }

    // Update customer by ID
    public function update(Request $request, $id)
    {
        $customer = CustomerManagement::find($id);

        if (!$customer) {
            return response()->json(['message' => 'Customer not found'], 404);
        }

        // Validate the request
        $request->validate([
            'basic_information' => 'nullable|array',
            'survey_information' => 'nullable|array',
            'contact_information' => 'nullable|array',
            'cultural_information' => 'nullable|array',
            'support_information' => 'nullable|array',
            'other_information' => 'nullable|array',
        ]);

        // Update the customer details
        $customer->update([
            'basic_information' => $request->input('basic_information', $customer->basic_information),
            'survey_information' => $request->input('survey_information', $customer->survey_information),
            'contact_information' => $request->input('contact_information', $customer->contact_information),
            'cultural_information' => $request->input('cultural_information', $customer->cultural_information),
            'support_information' => $request->input('support_information', $customer->support_information),
            'other_information' => $request->input('other_information', $customer->other_information),
        ]);

        return response()->json($customer, 200);
    }

    // Delete customer by ID
    public function destroy($id)
    {
        $customer = CustomerManagement::find($id);

        if (!$customer) {
            return response()->json(['message' => 'Customer not found'], 404);
        }

        $customer->delete();

        return response()->json(['message' => 'Customer deleted successfully'], 200);
    }
}
