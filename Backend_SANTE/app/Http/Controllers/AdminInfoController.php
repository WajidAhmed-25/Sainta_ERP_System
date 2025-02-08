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
    

//     public function sendUserDetails(Request $request)
//     {
//         $validator = Validator::make($request->all(), [
//             'email' => 'required|email',
//             'password' => 'required',
//             'businessId' => 'required|integer',
//             'name' => 'required'
//         ]);

//         if ($validator->fails()) {
//             return response()->json(['message' => 'Invalid data', 'errors' => $validator->errors()], 400);
//         }

//         $email = $request->email;
//         $password = $request->password;
//         $businessId = $request->businessId;
//         $name=$request->name;

//         // Create HTML content for the email
      

//         $htmlContent = "
// <html>
// <head>
//     <title>サインタ アカウント情報</title>
//     <meta charset='utf-8'>
//     <style>
//         body {
//             font-family: 'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo, sans-serif;
//             line-height: 1.6;
//             color: #333333;
//         }
//         .logo {
//             text-align: right;
//             margin-bottom: 20px;
//         }
//         .header {
//             font-size: 24px;
//             border-bottom: 1px solid #0066cc;
//             padding-bottom: 10px;
//             margin-bottom: 20px;
//         }
//         .content {
//             margin: 20px 0;
//         }
//         .account-info {
//             margin: 20px 0;
//         }
//         .note {
//             margin-top: 30px;
//             font-size: 14px;
//         }
//         .footer {
//             margin-top: 40px;
//             border-top: 1px solid #cccccc;
//             padding-top: 20px;
//         }
//     </style>
// </head>
// <body>
//     <div class='logo'>サインタ</div>
    
//     <div class='header'>登録完了のお知らせ</div>
    
//     <div class='content'>
//         {$name}様、
//         <p>サインタ・業務へのご登録を有難う御座います。サインタ・業務のアカウント情報は以下の通りです。</p>
        
//         <div class='account-info'>
//             <p>・ビジネスID: {$businessId}</p>
//             <p>・ユーザー名: {$email}</p>
//             <p>・パスワード: {$password}</p>
//         </div>
        
//         <p>サインタのご利用を有難う御座います。何かご不明点があれば、お気軽にお問い合わせください。</p>
//     </div>
    
//     <div class='footer'>
//         <h3>アカウント情報の変更</h3>
//         <p>ご登録いただいたアカウント情報は、ビジネスIDを除いて変更可能です。ビジネスIDは、企業のデータを当社のサーバーにリンクするために使用されるため、一定でなければなりません。ユーザー名やパスワードはいつでも変更できます。</p>
//     </div>
// </body>
// </html>
// ";


//         try {
//             // Send email with user details
//             Mail::html($htmlContent, function ($message) use ($email) {
//                 $message->to($email)
//                     ->subject('Sainta Account Details');
//             });

//             return response()->json(['message' => 'User details sent to email']);
//         } catch (\Exception $e) {
//             \Log::error('Failed to send email: ' . $e->getMessage());
//             return response()->json(['message' => 'Failed to send email'], 500);
//         }
//     }




public function sendUserDetails(Request $request)
{
    $validator = Validator::make($request->all(), [
        'email' => 'required|email',
        'password' => 'required',
        'businessId' => 'required|integer',
        'name' => 'required|string|max:255', 
    ]);

    if ($validator->fails()) {
        return response()->json(['message' => 'Invalid data', 'errors' => $validator->errors()], 400);
    }

    $email = $request->input('email');
    $password = $request->input('password');
    $businessId = $request->input('businessId');
    $name = $request->input('name');

 
    $htmlContent = "
    <html>
    <head>
        <title>サインタ アカウント情報</title>
        <meta charset='utf-8'>
        <style>
            body {
                font-family: 'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo, sans-serif;
                line-height: 1.6;
                color: #333333;
            }
            .logo {
                text-align: right;
                margin-bottom: 20px;
            }
            .header {
                font-size: 24px;
                border-bottom: 1px solid #0066cc;
                padding-bottom: 10px;
                margin-bottom: 20px;
            }
            .content {
                margin: 20px 0;
            }
            .account-info {
                margin: 20px 0;
            }
            .note {
                margin-top: 30px;
                font-size: 14px;
            }
            .footer {
                margin-top: 40px;
                border-top: 1px solid #cccccc;
                padding-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class='logo'>サインタ</div>
        
        <div class='header'>登録完了のお知らせ</div>
        
        <div class='content'>
            {$name}様、
            <p>サインタ・ビジネスへのご登録を有難う御座います。サインタ・ビジネスのアカウント情報は以下の通りです。</p>
            
            <div class='account-info'>
                <p>・ビジネスID: {$businessId}</p>
                <p>・ユーザー名: {$email}</p>
                <p>・パスワード: {$password}</p>
            </div>
            
            <p>サインタのご利用を有難う御座います。何かご不明点があれば、お気軽にお問い合わせください。</p>
        </div>
        
        <div class='footer'>
            <h3>アカウント情報の変更</h3>
            <p>ご登録いただいたアカウント情報は、ビジネスIDを除いて変更可能です。ビジネスIDは、企業のデータを当社のサーバーにリンクするために使用されるため、一定でなければなりません。ユーザー名やパスワードはいつでも変更できます。</p>
        </div>
    </body>
    </html>
    
"; 


    
    try {
        Mail::html($htmlContent, function ($message) use ($email) {
            $message->to($email)
                ->subject('Sainta Account Details');
        });

        return response()->json(['message' => 'User details sent to email']);
    } catch (\Exception $e) {
        \Log::error('Failed to send email: ' . $e->getMessage());
        return response()->json(['message' => 'Failed to send email'], 500);
    }
}







    
}
