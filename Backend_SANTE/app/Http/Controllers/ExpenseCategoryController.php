<?php

namespace App\Http\Controllers;

use App\Models\ExpenseCategory;
use Illuminate\Http\Request;

class ExpenseCategoryController extends Controller
{
    public function index()
    {
        return response()->json(ExpenseCategory::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate(['name' => 'required|string|max:255']);
        $category = ExpenseCategory::create($validated);

        return response()->json($category, 201);
    }

    public function show($id)
    {
        $category = ExpenseCategory::find($id);

        if (!$category) {
            return response()->json(['message' => 'Expense Category not found'], 404);
        }

        return response()->json($category);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate(['name' => 'required|string|max:255']);
        $category = ExpenseCategory::find($id);

        if (!$category) {
            return response()->json(['message' => 'Expense Category not found'], 404);
        }

        $category->update($validated);

        return response()->json($category);
    }

    public function destroy($id)
    {
        $category = ExpenseCategory::find($id);

        if (!$category) {
            return response()->json(['message' => 'Expense Category not found'], 404);
        }

        $category->delete();

        return response()->json(['message' => 'Expense Category deleted successfully']);
    }
}
