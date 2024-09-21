// import React, { useState } from 'react';
// import { ChevronDown, Building2, User, Lock, Eye, EyeOff } from 'lucide-react';
// import lock from './zc.png';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// export default function Login() {
//     const [service, setService] = useState('');
//     const [businessId, setBusinessId] = useState('');
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [passwordVisible, setPasswordVisible] = useState(false); 

//     const togglePasswordVisibility = () => {
//       setPasswordVisible(!passwordVisible);
//   };

//     const handleBusinessIdChange = (e) => {
//         const value = e.target.value;

//         if (!/^\d*$/.test(value) || value.length > 6) {
//             toast.error("Please enter a valid 6-digit integer for BUSINESS ID.");
//             return;
//         }
        
//         setBusinessId(value);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault(); 

  
//         const hash = await hashPassword(password);
//         setHashedPassword(hash);
        
//         if (!service || !businessId || !username || !password) {
//             toast.error("Please fill all fields.");
//             return;
//         }

//         console.log(hash)
  

//         console.log({
//             service,
//             businessId,
//             username,
//             password:hash
//         });
//     };


//     const [hashedPassword, setHashedPassword] = useState('');


//     const hashPassword = async (password) => {
//        const encoder = new TextEncoder();
//        const data = encoder.encode(password);
//        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
//        const hashArray = Array.from(new Uint8Array(hashBuffer));
//        const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
//        return hashHex;
//      };

//     return (
//         <>
//             <ToastContainer />
//             <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//                 <div className='text-black bg-green-300 w-[46%] font-semibold p-4 -mt-4 mb-8'>
//                     <p>Enter the Credentials you received on the email you entered. And Login to the System!!!</p>
//                 </div>
//                 <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
//                     <div className="flex items-center mb-6">
//                         <div className="flex items-center justify-center w-10 h-10 mr-2 border-2 rounded-full">
//                             <img src={lock} className="" alt="Lock Icon" />
//                         </div>
//                         <h2 className="text-2xl font-semibold">Login</h2>
//                     </div>
//                     <p className="mb-6 text-gray-600">Enter your login details.</p>
//                     <form onSubmit={handleSubmit}>
//                         <div className="space-y-4">
//                             <div className="relative">
//                                 <select
//                                     className="w-full p-3 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     value={service}
//                                     onChange={(e) => setService(e.target.value)}
//                                 >
//                                     <option value="">YOUR SERVICE</option>
//                                     <option value="service1">Business</option>
//                                     <option value="service2">Recruitment</option>
//                                     <option value="service3">Lab</option>
//                                 </select>
//                                 <ChevronDown className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 pointer-events-none right-3 top-1/2" />
//                             </div>
//                             <div className="relative">
//                                 <input
//                                     type="text"
//                                     placeholder="BUSINESS ID"
//                                     className="w-full p-3 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     value={businessId}
//                                     onChange={handleBusinessIdChange}
//                                 />
//                                 <Building2 className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
//                             </div>
//                             <div className="relative">
//                                 <input
//                                     type="email"
//                                     placeholder="USERNAME"
//                                     className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     value={username}
//                                     onChange={(e) => setUsername(e.target.value)}
//                                 />
//                                 <User className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
//                             </div>
//                             <div className="relative">
//                                 <input
//                                     type={passwordVisible ? "text" : "password"} 
//                                     placeholder="PASSWORD"
//                                     className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                 />
//                                 <Lock className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
//                                 <button
//                                     type="button"
//                                     onClick={togglePasswordVisibility}
//                                     className="absolute transform -translate-y-1/2 right-3 top-1/2"
//                                 >
//                                     {passwordVisible ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
//                                 </button>
//                             </div>
//                         </div>
//                         <button
//                             type="submit"
//                             className="w-full px-4 py-2 mt-4 font-semibold text-black border-[#007AAFF7] border-2 pt-4 pb-4 bg-white rounded-md hover:bg-[#007AAFF7] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#007AAFF7] focus:ring-offset-2"
//                         >
//                             LOGIN
//                         </button>
//                     </form>
//                     <div className="mt-4 text-end">
//                         <a href="#" className="text-blue-500 hover:underline">Forgot Password?</a>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }












// ------------------------------------------------------------------------------------------------------------------------//

import React, { useState } from 'react';
import { ChevronDown, Building2, User, Lock, Eye, EyeOff } from 'lucide-react';
import lock from './zc.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
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
            toast.error("Please enter a valid 6-digit integer for BUSINESS ID.");
            return;
        }
        setBusinessId(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
    
        // Hash the password first
        const hash = await hashPassword(password);
    
    
        // Check if any field is missing
        if (!service || !businessId || !username || !password) {
            toast.error("Please fill all fields.");
            return;
        }
    
        // Fetch data from the API
        try {
            const response = await fetch('http://localhost:8000/api/admin-info');
            const apiData = await response.json();
    
            // Ensure the response contains an array and use the first object
            if (Array.isArray(apiData) && apiData.length > 0) {
                const userData = apiData[0]; // Assuming the first user in the array is the one you're validating
    
                console.log('Data from API:', userData);
    
                // Match data from the form with the API data
                const isBusinessIdMatch = userData.business_id.toString() === businessId;
                const isUsernameMatch = userData.email === username;
                const isPasswordMatch = userData.password === hash;
                const isServiceMatch = userData.selectedService === service;
    
                // Print individual match results
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
                    console.log("Entered Password:",hash)
                    console.log("DB Password: ",userData.password)
                } else {
                    console.log(`Password does not match. Entered Hash: ${hash}, Expected Hash: ${userData.password}`);
                }
    
                if (isServiceMatch) {
                    console.log("Service matches.");
                } else {
                    console.log(`Service does not match. Entered: ${service}, Expected: ${userData.selectedService}`);
                }
    
            
                if (isBusinessIdMatch && isUsernameMatch && isPasswordMatch && isServiceMatch) {
                    toast.success('Login successful!');
                    
                } else {
                    toast.error('Invalid credentials. Please check your input.');
                }
            } else {
                console.error('Unexpected API response format.');
                toast.error('Invalid API response.');
            }
    
        } catch (error) {
            console.error('Error fetching data from API:', error);
            toast.error('An error occurred while fetching data.');
        }
    };
    
    
    

    // Function to hash the password
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
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <div className='text-black bg-green-300 w-[46%] font-semibold p-4 -mt-4 mb-8'>
                    <p>Enter the Credentials you received on the email you entered. And Login to the System!!!</p>
                </div>
                <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                    <div className="flex items-center mb-6">
                        <div className="flex items-center justify-center w-10 h-10 mr-2 border-2 rounded-full">
                            <img src={lock} className="" alt="Lock Icon" />
                        </div>
                        <h2 className="text-2xl font-semibold">Login</h2>
                    </div>
                    <p className="mb-6 text-gray-600">Enter your login details.</p>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div className="relative">
                                <select
                                    className="w-full p-3 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={service}
                                    onChange={(e) => setService(e.target.value)}
                                >
                                    <option value="">YOUR SERVICE</option>
                                    <option value="Business">Business</option>
                                    <option value="Recruitment">Recruitment</option>
                                    <option value="Lab">Lab</option>
                                </select>
                                <ChevronDown className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 pointer-events-none right-3 top-1/2" />
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="BUSINESS ID"
                                    className="w-full p-3 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={businessId}
                                    onChange={handleBusinessIdChange}
                                />
                                <Building2 className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                            </div>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="USERNAME"
                                    className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <User className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                            </div>
                            <div className="relative">
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    placeholder="PASSWORD"
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
                            LOGIN
                        </button>
                    </form>
                    <div className="mt-4 text-end">
                        <a href="#" className="text-blue-500 hover:underline">Forgot Password?</a>
                    </div>
                </div>
            </div>
        </>
    );
}















