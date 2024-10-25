// ------------------------------------------------- Second time------------------------------------------------------------------//


import React, { useState } from 'react';
import { Pen } from 'lucide-react';
import imagee from './rk1.png';
import bcrypt from 'bcryptjs'; 
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { ChevronDown, Building2, User, Lock, Eye, EyeOff, UserRoundPlus } from 'lucide-react';
// import registration icon from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';

export default function Registration() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [selectedService, setSelectedService] = useState('');

  const [period, setPeriod] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [otp, setOtp] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); 

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
};


  const [hashedPassword, setHashedPassword] = useState('');

  const hashPassword = async (password) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
  };


  const navigate = useNavigate(); 

  const services = ['サインタ・業務', 'サインタ・ラボ']

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hash = await hashPassword(password);
    setHashedPassword(hash);
    console.log('Hashed password:', hash);
    
    if (!name || !email || !contact || !password || !selectedService || !period || !contactEmail) {
      toast.error('全てのフィールドを入力してください。');
      return;
    }
  
    // Fetch all existing user data
    try {
      const response = await fetch('https://apisanta.devcir.co/api/admin-info');
      
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const userData = await response.json();
      
      // Check if the email already exists
      const emailExists = userData.some(user => user.email === email);
      if (emailExists) {
        toast.error('入力されたメールアドレスは既に登録されています。');
        return;
      }
  
      // If email is unique, proceed with OTP verification
      console.log('Sending OTP to email:', email);
  
      const otpResponse = await fetch('https://apisanta.devcir.co/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      const responseText = await otpResponse.text();
      console.log('Server response:', responseText);
  
      if (otpResponse.ok) {
        try {
          const result = JSON.parse(responseText);
          toast.success('ワン・タイム・コードが正常にメールに送信されました。');
          console.log(result.message);
          setShowOtpForm(true);
        } catch (error) {
          console.error('Error parsing JSON:', error);
          toast.error('サーバーからの応答を解析できませんでした。');
        }
      } else {
        toast.error('ワン・タイム・コードの送信に失敗しました。');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('エラーが発生しました。後でもう一度お試しください。');
    }
  };
  



  

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    try {
      // Verify OTP
      const otpResponse = await fetch('https://apisanta.devcir.co/api/verify-otp', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      const otpResult = await otpResponse.json();
      if (otpResponse.ok) {
        console.log(otpResult.message);
        toast.success('ワン・タイム・コードが正常に検証されました。');

        const hashedPassword = await hashPassword(password);
        const registrationData = {
          name,
          email,
          contact,
          password: hashedPassword,
          selectedService,
          period,
          contactEmail
        };

        // Register user
        const registrationResponse = await fetch('https://apisanta.devcir.co/api/admin-info', {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(registrationData),
        });

        if (registrationResponse.ok) {
          const registrationResult = await registrationResponse.json();
          console.log('Registration Successful:', registrationResult);
          
          // Send email with user details
          const sendDetailsResponse = await fetch('https://apisanta.devcir.co/api/send-user-details', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({
              email,
              password,
              businessId: registrationResult.data.business_id // Use business_id instead of Bussiness_ID
            }),
          });

          if (sendDetailsResponse.ok) {
            toast.success('登録が成功しました。メールで詳細を送信しましたので、ご確認ください。');
          } else {
            console.error('Failed to send user details email');
            toast.warning('ユーザー詳細のメール送信に失敗しました。');
          }

          setTimeout(() => {
            navigate('/login');
          }, 2000);
        } else {
          console.error('Registration failed. Status:', registrationResponse.status);
          toast.error('登録に失敗しました。もう一度お試しください。');
        }
      } else {
        console.error(otpResult.message);
        toast.error('ワン・タイム・コードの検証に失敗しました。');
      }
    } catch (error) {
      console.error('Error during registration process:', error);
      toast.error('エラーが発生しました。後でもう一度お試しください。');
    }
  };
  
  const renderInitialForm = () => (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="氏名"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007AAFF7]"
        />
      </div>
      <div>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007AAFF7]"
        />
      </div>
      <div>
        <input
          type="tel"
          placeholder="電話番号"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007AAFF7]"
        />
      </div>

<div className="relative">
                                <input
                                    type={passwordVisible ? "text" : "password"} // Toggle password visibility
                                    placeholder="パスワード"
                                    className="w-full px-3 py-2 border border-gray-300 placeholder:pl-4 pl-12 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007AAFF7]"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Lock className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute transform -translate-y-1/2 right-3 top-1/2"
                                >
                                    {passwordVisible ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
                                </button>
                            </div>
      <div className="mb-4">
        <h2 className="mb-2 text-lg font-semibold">サービスを選択</h2>
        <div className="flex space-x-4">
          {services.map((service) => (
            <label key={service} className="flex items-center">
              <input
                type="radio"
                name="service"
                value={service}
                checked={selectedService === service}
                onChange={() => setSelectedService(service)}
                className="w-4 h-4 text-[#007AAFF7] form-radio focus:ring-[#007AAFF7]"
              />
              <span className="ml-2 text-sm">{service}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="mb-4">
      <label className="block mb-1 text-sm font-medium text-gray-700">
        Period
      </label>
      <select
        value={period}
        onChange={(e) => setPeriod(e.target.value)} 
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007AAFF7]"
      >
        <option value="" disabled>契約期間を選択</option>
        <option value="Monthly Contract">月額契約</option>
        <option value="Weekly Contract">週額契約</option>
        <option value="Yearly Contract">年間契約</option>
      </select>
    </div>
      <div className="mb-8">
        <label className="block mb-1 text-sm font-medium text-gray-700">
          メールアドレス
        </label>
        <input
          type="email"
          placeholder="メールアドレス"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007AAFF7]"
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 mt-4 font-semibold text-black border-[#007AAFF7] border-2 pt-4 pb-4 bg-white rounded-md hover:bg-[#007AAFF7] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#007AAFF7] focus:ring-offset-2"
      >
        Verify Me
      </button>
    </form>
  );

  const renderOtpForm = () => (
    <form className="space-y-4" onSubmit={handleOtpSubmit}>
      <div className="mb-4">
        <p className="mb-2 text-sm text-gray-600">
          入力されたメールアドレスに送信されたワン・タイム・コードを入力してください。
        </p>
        <input
          type="text"
          placeholder="ワン・タイム・コードを入力"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007AAFF7]"
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 mt-4 font-semibold text-black border-[#007AAFF7] border-2 pt-4 pb-4 bg-white rounded-md hover:bg-[#007AAFF7] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#007AAFF7] focus:ring-offset-2"
      >
        ワン・タイム・コードを検証
      </button>
    </form>
  );

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-md shadow-lg">
        <div className="flex items-center mb-8">
              <div className="flex items-center justify-center w-10 h-10 mr-2 border-2 rounded-full">
              <UserRoundPlus className="w-6 h-6 text-[#007AAFF7]" />
            </div>
          <h2 className="text-2xl font-semibold">登録</h2>
        </div>

        <p className="mb-6 text-gray-600">アカウントを作成する際に、以下の情報を入力してください。</p>
        {showOtpForm ? renderOtpForm() : renderInitialForm()}
      </div>
      <ToastContainer />
    </div>
  );
}