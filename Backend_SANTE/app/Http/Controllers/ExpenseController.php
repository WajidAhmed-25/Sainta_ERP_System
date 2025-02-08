<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{
    // GET ALL
    public function index()
    {
        return response()->json(Expense::all(), 200);
    }

    // GET ID
    public function show($id)
    {
        $expense = Expense::find($id);

        if (!$expense) {
            return response()->json(['message' => 'Expense not found'], 404);
        }

        return response()->json($expense, 200);
    }

    // POST
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'expenseName' => 'required|string',
            'expenseCost' => 'required|numeric',
            'expenseRecorderName' => 'required|string',
            'expenseDate' => 'required|date',
            'expenseType' => 'required|string',
        ]);

        $expense = Expense::create($validatedData);

        return response()->json($expense, 201);
    }

    // PUT
    public function update(Request $request, $id)
    {
        $expense = Expense::find($id);

        if (!$expense) {
            return response()->json(['message' => 'Expense not found'], 404);
        }

        $validatedData = $request->validate([
            'expenseName' => 'sometimes|required|string',
            'expenseCost' => 'sometimes|required|numeric',
            'expenseRecorderName' => 'sometimes|required|string',
            'expenseDate' => 'sometimes|required|date',
            'expenseType' => 'sometimes|required|string',
        ]);

        $expense->update($validatedData);

        return response()->json($expense, 200);
    }

    // DELETE
    public function destroy($id)
    {
        $expense = Expense::find($id);

        if (!$expense) {
            return response()->json(['message' => 'Expense not found'], 404);
        }

        $expense->delete();

        return response()->json(['message' => 'Expense deleted successfully'], 200);
    }
}
