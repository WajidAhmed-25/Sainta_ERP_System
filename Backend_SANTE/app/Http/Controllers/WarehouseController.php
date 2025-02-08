<?php

namespace App\Http\Controllers;

use App\Models\Warehouse;
use Illuminate\Http\Request;

class WarehouseController extends Controller
{
    public function index()
    {
        $warehouses = Warehouse::all();
        return response()->json($warehouses);
    }

    public function show($id)
    {
        $warehouse = Warehouse::find($id);
        if ($warehouse) {
            return response()->json($warehouse);
        } else {
            return response()->json(['message' => 'Warehouse not found'], 404);
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string',
            'owner_name' => 'required|string|max:255',
            'datelastupdatedstock' => 'required|date',
            'number_of_workers' => 'required|integer',
        ]);

        $warehouse = Warehouse::create($request->all());

        return response()->json($warehouse, 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'string|max:255',
            'address' => 'string',
            'owner_name' => 'string|max:255',
            'datelastupdatedstock' => 'date',
            'number_of_workers' => 'integer',
        ]);

        $warehouse = Warehouse::find($id);

        if (!$warehouse) {
            return response()->json(['message' => 'Warehouse not found'], 404);
        }

        $warehouse->update($request->all());

        return response()->json($warehouse);
    }


    public function destroy($id)
    {
        $warehouse = Warehouse::find($id);

        if (!$warehouse) {
            return response()->json(['message' => 'Warehouse not found'], 404);
        }

        $warehouse->suppliers()->detach();

        $warehouse->delete();

        return response()->json(['message' => 'Warehouse deleted successfully.']);
    }
}