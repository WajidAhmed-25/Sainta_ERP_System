<?php

namespace App\Http\Controllers;

use App\Models\SubExpenseCalculation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;


use Illuminate\Support\Facades\Mail;

class SubExpenseCalculationController extends Controller
{
    public function index()
    {
        $subExpenseCalculations = SubExpenseCalculation::with(['subExpense', 'reviewer', 'employee'])->get();

        // Modify file paths to be accessible via /storage/
        $subExpenseCalculations->each(function ($record) {
            if ($record->files_path) {
                $record->files_path = collect($record->files_path)->map(function ($path) use ($record) {
                    return asset("storage/subexpensedocuments/{$record->id}/{$path}");
                });
            }
        });

        return response()->json($subExpenseCalculations);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'sub_expense_id' => 'required|exists:sub_expenses,id',
            'reviewer_id' => 'required|exists:employees,Employee_ID',
            'expense_name' => 'required|string|max:255',
            'expense_cost' => 'required|numeric',
            'employee_id' => 'required|exists:employees,Employee_ID',
            'recording_date' => 'nullable|date',
            'status' => 'nullable|in:pending,approved,rejected',
            'files.*' => 'file|mimes:jpg,jpeg,png,pdf,doc,docx|max:2048' // Allow multiple files
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
    
        $data = $validator->validated();
        $data['recording_date'] = $data['recording_date'] ?? now();
    
        // Create SubExpenseCalculation record
        $subExpenseCalculation = SubExpenseCalculation::create($data);
    
        // Handle file uploads
        $filePaths = [];
        if ($request->hasFile('files')) {
            $folderPath = "public/subexpensedocuments/{$subExpenseCalculation->id}";
            foreach ($request->file('files') as $file) {
                $fileName = time() . '_' . $file->getClientOriginalName();
                $file->storeAs($folderPath, $fileName);
                $filePaths[] = $fileName; // Store only file name
            }
        }
    
        // Save file paths in JSON format
        $subExpenseCalculation->update(['files_path' => json_encode($filePaths)]);
    
        return response()->json($subExpenseCalculation, 201);
    }

    
    public function show($id)
    {
        $subExpenseCalculation = SubExpenseCalculation::with(['subExpense', 'reviewer', 'employee'])->findOrFail($id);

        // Modify file paths for access via /storage/
        if ($subExpenseCalculation->files_path) {
            $subExpenseCalculation->files_path = collect($subExpenseCalculation->files_path)->map(function ($path) use ($subExpenseCalculation) {
                return asset("storage/subexpensedocuments/{$subExpenseCalculation->id}/{$path}");
            });
        }

        return response()->json($subExpenseCalculation);
    }

    public function update(Request $request, $id)
    {
        $subExpenseCalculation = SubExpenseCalculation::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'sub_expense_id' => 'nullable|exists:sub_expenses,id',
            'reviewer_id' => 'nullable|exists:employees,Employee_ID',
            'expense_name' => 'nullable|string|max:255',
            'expense_cost' => 'nullable|numeric',
            'employee_id' => 'nullable|exists:employees,Employee_ID',
            'recording_date' => 'nullable|date',
            'status' => 'nullable|in:pending,approved,rejected',
            'files.*' => 'file|mimes:jpg,jpeg,png,pdf,doc,docx|max:2048' // Allow multiple files
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $data = $validator->validated();

        // Handle new file uploads
        $filePaths = json_decode($subExpenseCalculation->files_path, true) ?? [];
        if ($request->hasFile('files')) {
            $folderPath = "public/subexpensedocuments/{$subExpenseCalculation->id}";
            foreach ($request->file('files') as $file) {
                $fileName = time() . '_' . $file->getClientOriginalName();
                $file->storeAs($folderPath, $fileName);
                $filePaths[] = $fileName; // Append new file names
            }
        }

        // Update files_path and other fields
        $data['files_path'] = json_encode($filePaths);
        $subExpenseCalculation->update($data);

        return response()->json($subExpenseCalculation);
    }

    public function destroy($id)
    {
        $subExpenseCalculation = SubExpenseCalculation::findOrFail($id);

        // Delete associated files
        $folderPath = "public/subexpensedocuments/{$id}";
        if (Storage::exists($folderPath)) {
            Storage::deleteDirectory($folderPath);
        }

        $subExpenseCalculation->delete();

        return response()->json(['message' => 'Record and associated files deleted successfully.']);
    }

    public function getBySubExpenseId($subExpenseId)
    {
        $subExpenseCalculations = SubExpenseCalculation::with(['subExpense', 'reviewer', 'employee'])
            ->where('sub_expense_id', $subExpenseId)
            ->get();

        // Modify file paths for frontend access
        $subExpenseCalculations->each(function ($record) {
            if ($record->files_path) {
                $record->files_path = collect($record->files_path)->map(function ($path) use ($record) {
                    return asset("storage/subexpensedocuments/{$record->id}/{$path}");
                });
            }
        });

        return response()->json($subExpenseCalculations);
    }




    ///////// Mail Logic ///////////////


    

    public function sendReviewNotification(Request $request, $receiverEmail)
{
    // Validate the incoming request
    $validator = Validator::make($request->all(), [
        'review_expense_id' => 'required|integer',
        'review_expense_name' => 'required|string',
        'status' => 'required|string',
        'comment' => 'nullable|string',
        'reviewer_mail' => 'required|email',
    ]);

    if ($validator->fails()) {
        return response()->json(['message' => 'Invalid input data'], 400);
    }

    // Extract validated data
    $data = $request->only([
        'review_expense_id', 
        'review_expense_name', 
        'status', 
        'comment', 
        'reviewer_mail'
    ]);

    // Prepare the email content
    $emailContent = "


<p>{$receiverEmail}様</p>

<p>経費申請 <strong>{$data['review_expense_name']}</strong> (ID: {$data['review_expense_id']}) が <strong>{$data['reviewer_mail']}</strong> によって確認されました。</p>

<p>ステータスが <strong>{$data['status']}</strong> に変更されました。</p>

<p><strong>コメント:</strong> " . (isset($data['comment']) ? $data['comment'] : 'コメントはありません。') . "</p>

<p><strong>日時:</strong> " . now()->format('Y-m-d H:i:s') . "</p>

<p>このアクションに心当たりがない場合は、すぐにご連絡ください。</p>

<p>よろしくお願いいたします。<br>Sainta ERP </p>


    ";

    // Send the email
    Mail::html($emailContent, function ($message) use ($receiverEmail) {
        $message->to($receiverEmail)
            ->subject('Expense Review Notification');
    });

    // Return a response
    return response()->json(['message' => 'Review notification sent successfully.']);
}








}
