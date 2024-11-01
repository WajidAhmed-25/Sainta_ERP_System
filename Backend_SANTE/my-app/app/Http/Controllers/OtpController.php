<?php



namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Otp;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class OtpController extends Controller
{
    // public function sendOtp(Request $request)
    // {
    //     $validator = Validator::make($request->all(), [
    //         'email' => 'required|email',
    //     ]);

    //     if ($validator->fails()) {
    //         return response()->json(['message' => 'Invalid email address'], 400);
    //     }

    //     // Generate a random OTP
    //     $otp = rand(100000, 999999);

    //     // Save OTP in the database
    //     Otp::create([
    //         'email' => $request->email,
    //         'otp' => $otp,
    //     ]);

    //     // Send OTP via email
    //     Mail::raw("Verification OTP : $otp", function ($message) use ($request) {
    //         $message->to($request->email)
    //             ->subject('Sainta VERIFICATION OTP');
    //     });

    //     return response()->json(['message' => 'OTP sent to your email']);
    // }



    public function sendOtp(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'name'  => 'required|string'
        ]);
    
        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid email address'], 400);
        }
    
        $otp = rand(1000, 9999);
    
        Otp::create([
            'email' => $request->email,
            'name' => $request->name,
            'otp' => $otp,
            'expires_at' => now()->addHour(),
        ]);
    
        $emailContent = "
            ログインの確認
    
            <br/><br/>
            <strong>{$request->name}様</strong>、
            <br/><br/>
            アカウントの保護のため、ログイン前にワンタイムコードを発行いたしました。このコードは新しいデバイスからログインする際にのみ入力する必要があります。コードの有効期限は発行から1時間です。
            <br/><br/>
            <strong>・OTP:</strong> {$otp}
            <br/><br/>
            このメールに心当たりがない場合は、無視してください。アカウントが不正アクセスされた可能性があるため、パスワードの変更をお勧めします。
            <br/><br/>
            サポートが必要ですか？
            <br/>
            ご不明点がある場合は、ウェブサイトのメインページから直接お問い合わせください。このメールに返信してもご対応いたしかねます。
            <br/><br/>
            © 2025 株式会社サインタ。全著作権所有。
        ";
    
        Mail::html($emailContent, function ($message) use ($request) {
            $message->to($request->email)
                ->subject('サインタ VERIFICATION OTP');
        });
    
        return response()->json(['message' => 'OTP sent to your email']);
    }
    












    public function verifyOtp(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'otp' => 'required|digits:4',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid OTP'], 400);
        }

        // Check if OTP exists and matches
        $otpRecord = Otp::where('email', $request->email)
                         ->where('otp', $request->otp)
                         ->first();

        if ($otpRecord) {
            // OTP is valid
            return response()->json(['message' => 'OTP verified successfully']);
        } else {
            return response()->json(['message' => 'Invalid OTP'], 400);
        }
    }
}


