<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use App\Models\Warehouse;
use Illuminate\Http\Request;

class SupplierWarehouseController extends Controller
{
    // GET: Retrieve all relationships
    public function index()
    {
        $data = Warehouse::with('suppliers')->get();
        return response()->json($data);
    }

    // POST: Attach a supplier to a warehouse
    public function store(Request $request)
    {
        $validated = $request->validate([
            'warehouse_id' => 'required|exists:warehouses,id',
            'supplier_id' => 'required|exists:suppliers,supplier_id',
        ]);

        $warehouse = Warehouse::find($validated['warehouse_id']);
        $warehouse->suppliers()->attach($validated['supplier_id']);

        return response()->json(['message' => 'Supplier attached to warehouse successfully.']);
    }

    // PUT: Update supplier-warehouse relationship
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'supplier_id' => 'required|exists:suppliers,supplier_id',
            'warehouse_id' => 'required|exists:warehouses,id',
        ]);

        $warehouse = Warehouse::findOrFail($validated['warehouse_id']);
        $warehouse->suppliers()->syncWithoutDetaching([$validated['supplier_id']]);

        return response()->json(['message' => 'Relationship updated successfully.']);
    }

    // DELETE: Detach a supplier from a warehouse
    public function destroy(Request $request)
    {
        $validated = $request->validate([
            'warehouse_id' => 'required|exists:warehouses,id',
            'supplier_id' => 'required|exists:suppliers,supplier_id',
        ]);

        $warehouse = Warehouse::findOrFail($validated['warehouse_id']);
        $warehouse->suppliers()->detach($validated['supplier_id']);

        return response()->json(['message' => 'Supplier detached from warehouse successfully.']);
    }
}
