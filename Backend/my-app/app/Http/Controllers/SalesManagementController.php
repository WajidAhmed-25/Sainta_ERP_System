<?php

namespace App\Http\Controllers;

use App\Models\SalesManagement;
use Illuminate\Http\Request;

class SalesManagementController extends Controller
{
    // Get all sales records
    public function index()
    {
        return SalesManagement::all();
    }

    // Get a specific sales record by ID
    public function show($id)
    {
        return SalesManagement::findOrFail($id);
    }

    // Create a new sales record

    public function store(Request $request)
    {
        // Validate the request
        $request->validate([
            'Merchendis_Info' => 'required|array',
            'Merchandise_Details' => 'required|array',
            'Merchandise_Details.Basic_Information' => 'required|array',
            'Merchandise_Details.Basic_Information.Status' => 'required|string|max:255',
            'Merchandise_Details.Basic_Information.Manager' => 'required|integer',
            'Merchandise_Details.Basic_Information.Customer' => 'required|integer',
            'Merchandise_Details.Business_Information' => 'nullable|array',
            'Merchandise_Details.Business_Information.Lead_Date' => 'nullable|date',
            'Merchandise_Details.Business_Information.Expected_Closing_Date' => 'nullable|date',
            'Merchandise_Details.Business_Information.Notes' => 'nullable|string|max:255',
            'Merchandise_Details.Requested_Information' => 'nullable|array',
            'Merchandise_Details.Requested_Information.Request_ID' => 'nullable|string|max:255',
        ]);
    
        // Create the sales management entry
        $salesManagement = SalesManagement::create([
            'Merchendis_Info' => json_encode($request->input('Merchendis_Info')),  // Encode the array to JSON
            'Merchandise_Details' => json_encode($request->input('Merchandise_Details')),  // Encode the array to JSON
        ]);
    
        return response()->json($salesManagement, 201);
    }
    




    // Update a sales record by ID
    public function update(Request $request, $id)
    {
        $salesManagement = SalesManagement::findOrFail($id);

        $validatedData = $request->validate([
            'Merchendis_Info' => 'required|json',
            'Merchandise_Details' => 'required|json',
        ]);

        $salesManagement->update($validatedData);

        return $salesManagement;
    }

    // Delete a sales record by ID
    public function destroy($id)
    {
        $salesManagement = SalesManagement::findOrFail($id);
        $salesManagement->delete();

        return response()->json(['message' => 'Record deleted successfully']);
    }
}
