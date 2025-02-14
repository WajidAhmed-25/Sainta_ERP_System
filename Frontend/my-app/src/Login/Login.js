


// ------------------------------------------------------------------------------------------------------------------------//






import React, { useState } from 'react';
import { ChevronDown, Building2, User, Lock, Eye, EyeOff } from 'lucide-react';
import lock from './zc.png';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; 
import 'react-toastify/dist/ReactToastify.css';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '../AuthContext';


export default function Login() {
    const navigate = useNavigate(); 
    
    // const { setIsAuthenticated } = useAuth();
   
    const [service, setService] = useState('');
    const [businessId, setBusinessId] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    const handleBusinessIdChange = (e) => {
        const value = e.target.value;
        if (!/^\d*$/.test(value) || value.length > 6) {
            toast.error("ビジネスIDには6桁の整数を入力してください。");
            return;
        }
        setBusinessId(value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const hash = await hashPassword(password);
        console.log("My hash: ",hash)
        if (!service || !businessId || !username || !password) {
            toast.error("全てのフィルドを入力してください。");
            return;
        }
        try {
            const response = await fetch('https://api.sainta-erp.xyz/api/admin-info');
            console.log("Wadsa")
            const apiData = await response.json();
            console.log("Api: ",apiData)
            if (Array.isArray(apiData) && apiData.length > 0) {
                const matchingUser = apiData.find(userData => {
                    const isBusinessIdMatch = userData.business_id.toString() === businessId;
                    const isUsernameMatch = userData.email === username;
                    const isPasswordMatch = userData.password === hash;
                    const isServiceMatch = userData.selectedService === service;
              console.log(`Checking data for user: ${userData.email}`);
                    if (isBusinessIdMatch) {
                     console.log("Business ID matches.");
                    } else {
                     console.log(`Business ID does not match. Entered: ${businessId}, Expected: ${userData.business_id}`);
                    }
                    if (isUsernameMatch) {
                     console.log("Username matches.");
                    } else {
                      console.log(`Username does not match. Entered: ${username}, Expected: ${userData.email}`);
                    }
                    if (isPasswordMatch) {
                   console.log("Password matches.");
                     console.log("Entered Password Hash:", hash);
                     console.log("DB Password Hash:", userData.password);
                    } else {
                  console.log(`Password does not match. Entered Hash: ${hash}, Expected Hash: ${userData.password}`);
                    }
                    if (isServiceMatch) {
                      console.log("Service matches.");
                    } else {
                      console.log(`Service does not match. Entered: ${service}, Expected: ${userData.selectedService}`);
                    }
                    return isBusinessIdMatch && isUsernameMatch && isPasswordMatch ;
                });
                if (matchingUser) {

                    console.log('Data from API:', matchingUser);
                    toast.success('ログインに成功しました。');

                //    console.log('Data from API:', matchingUser);
                    toast.success('Login successful!');

                    localStorage.setItem('username', matchingUser.name);

                    navigate('/modules');
                    window.location.reload()
                } else {
                    toast.error('ログインに失敗しました。もう一度お試しください。');
                }
            } else {
                console.error('Unexpected API response format.');
                toast.error('データの取得中にエラーが発生しました。');
            }
        } catch (error) {
            console.error('Error fetching data from API:', error);
            toast.error('データの取得中にエラーが発生しました。');
        }
    };
    const hashPassword = async (password) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
        return hashHex;
      };
    return (
        <>
            <ToastContainer />
            {/* Follow a similar style to the previous pages */}
            <div className="flex flex-col items-center justify-center min-h-screen pt-12">
                <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                    <div className="flex items-center mb-8">
                        <div className="flex items-center justify-center w-10 h-10 mr-2 border-2 rounded-full">
                            <img src={lock} className="" alt="ロックアイコン" />
                        </div>
                        <h2 className="text-2xl font-semibold">ログイン</h2>
                    </div>

                    <p className="mb-6 text-gray-600">ログイン情報を入力してください。もしご登録いただいたばかりの場合は、電子メールでお送りした情報をご参照ください。</p>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div className="relative">
                                <select
                                    className="w-full p-3 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={service}
                                    onChange={(e) => setService(e.target.value)}
                                >
                                    <option value="サービスを選択">サービスを選択</option>
                                    <option value="サインタ・業務">サインタ・業務</option>
                                    <option value="サインタ・ラボ">サインタ・ラボ</option>
                                </select>
                                <ChevronDown className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 pointer-events-none right-3 top-1/2" />
                            </div>

                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="サインタ・ビジネスID"
                                    className="w-full p-3 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={businessId}
                                    onChange={handleBusinessIdChange}
                                />
                                <Building2 className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                            </div>

                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="ユーザー名"
                                    className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <User className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                            </div>

                            <div className="relative">
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    placeholder="パスワード"
                                    className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        </div>

                        <button
                            type="submit"
                            className="w-full px-4 py-2 mt-4 font-semibold text-black border-[#007AAFF7] border-2 pt-4 pb-4 bg-white rounded-md hover:bg-[#007AAFF7] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#007AAFF7] focus:ring-offset-2"
                        >
                           Login
                        </button>
                    </form>


                    <div className="mt-4 text-end">
                      
                    </div>

                </div>
            </div>
        </>
    );
}
