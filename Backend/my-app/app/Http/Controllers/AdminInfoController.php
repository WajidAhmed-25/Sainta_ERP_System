<?php

namespace App\Http\Controllers;

use App\Models\AdminInfo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class AdminInfoController extends Controller
{



    // Get all admin info
    public function index()
    {
        return response()->json(AdminInfo::all());
    }

    // Get a specific admin info by ID
    public function show($id)
    {
        $admin = AdminInfo::find($id);
        if ($admin) {
            return response()->json($admin);
        } else {
            return response()->json(['message' => 'Admin Info not found'], 404);
        }
    }

    // Update an admin info by ID
    public function update(Request $request, $id)
    {
        $admin = AdminInfo::find($id);
        if ($admin) {
            $admin->update($request->all());
            return response()->json(['message' => 'Admin Info updated successfully']);
        } else {
            return response()->json(['message' => 'Admin Info not found'], 404);
        }
    }

    // Delete an admin info by ID
    public function destroy($id)
    {
        $admin = AdminInfo::find($id);
        if ($admin) {
            $admin->delete();
            return response()->json(['message' => 'Admin Info deleted successfully']);
        } else {
            return response()->json(['message' => 'Admin Info not found'], 404);
        }
    }




    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:admin_info,email',
            'contact' => 'required|string|max:20',
            'password' => 'required|string|min:6',
            'selectedService' => 'required|string|max:255',
            'period' => 'required|string|max:255',
            'contactEmail' => 'required|email',
        ]);

        do {
            $businessId = mt_rand(100000, 999999);
        } while (AdminInfo::where('business_id', $businessId)->exists());

        $adminInfo = AdminInfo::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'contact' => $validatedData['contact'],
            'password' => $validatedData['password'], 
            'selectedService' => $validatedData['selectedService'],
            'period' => $validatedData['period'],
            'contactEmail' => $validatedData['contactEmail'],
            'business_id' => $businessId,
        ]);

        return response()->json([
            'message' => 'Admin Info created successfully!',
            'data' => $adminInfo
        ], 201);
    }
    

    public function sendUserDetails(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
            'businessId' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid data', 'errors' => $validator->errors()], 400);
        }

        $email = $request->email;
        $password = $request->password;
        $businessId = $request->businessId;

        // Create HTML content for the email
        $htmlContent = "
        <html>
        <head>
            <title>SANTE Account Details</title>
        </head>
        <body>
            <h1>Welcome to SANTE !</h1>
            <br/>
            <p>Here are your account details:</p>
            <ul>
                <li><b>Email:</b> {$email}</li>
                <li><b>Password:</b> {$password}</li>
                <li><b>Business ID:</b> {$businessId}</li>
                <br/>
                <li><b>Login URL:</b>  <a>http://localhost:3000/login</a> </li>
            </ul>
            <p><b>Note:</b> Please keep this information safe and secure. We recommend changing your password after your first login.</p>
        </body>
        </html>
        ";

        try {
            // Send email with user details
            Mail::html($htmlContent, function ($message) use ($email) {
                $message->to($email)
                    ->subject('SANTE Account Details');
            });

            return response()->json(['message' => 'User details sent to email']);
        } catch (\Exception $e) {
            \Log::error('Failed to send email: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to send email'], 500);
        }
    }







    
}
