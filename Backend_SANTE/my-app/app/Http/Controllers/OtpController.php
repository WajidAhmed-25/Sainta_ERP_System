<?php



namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Otp;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class OtpController extends Controller
{
    public function sendOtp(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid email address'], 400);
        }

        // Generate a random OTP
        $otp = rand(100000, 999999);

        // Save OTP in the database
        Otp::create([
            'email' => $request->email,
            'otp' => $otp,
        ]);

        // Send OTP via email
        Mail::raw("Verification OTP : $otp", function ($message) use ($request) {
            $message->to($request->email)
                ->subject('SANTE VERIFICATION OTP');
        });

        return response()->json(['message' => 'OTP sent to your email']);
    }

    public function verifyOtp(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'otp' => 'required|digits:6',
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


