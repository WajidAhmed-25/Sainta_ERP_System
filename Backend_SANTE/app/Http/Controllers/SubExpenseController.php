<?php

namespace App\Http\Controllers;

use App\Models\SubExpense;
use App\Models\ExpenseCategory;
use Illuminate\Http\Request;

class SubExpenseController extends Controller
{
    public function index()
    {
        return response()->json(SubExpense::with('expenseCategory')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'expense_category_id' => 'required|exists:expense_categories,id',
        ]);

        $subExpense = SubExpense::create($validated);

        return response()->json($subExpense, 201);
    }

    public function show($id)
    {
        $subExpense = SubExpense::with('expenseCategory')->find($id);

        if (!$subExpense) {
            return response()->json(['message' => 'Sub Expense not found'], 404);
        }

        return response()->json($subExpense);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'expense_category_id' => 'required|exists:expense_categories,id',
        ]);

        $subExpense = SubExpense::find($id);

        if (!$subExpense) {
            return response()->json(['message' => 'Sub Expense not found'], 404);
        }

        $subExpense->update($validated);

        return response()->json($subExpense);
    }

    public function destroy($id)
    {
        $subExpense = SubExpense::find($id);

        if (!$subExpense) {
            return response()->json(['message' => 'Sub Expense not found'], 404);
        }

        $subExpense->delete();

        return response()->json(['message' => 'Sub Expense deleted successfully']);
    }
}
