import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

const Admin_Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'Rishi52873@Sainta.com' && password === 'WaJId@1225') {
        toast.success('Login successful! Redirecting to dashboard...', {
          position: "top-right",
        });
      setTimeout(() => {
        navigate('/admin_dashboard'); // Navigate to admin dashboard after successful login
      }, 2000); // 2-second delay to allow the toast to show
    } else {

      toast.error('Invalid email or password!', {
        position: "top-right",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div>
      <ToastContainer />
      <div className="pb-32 pt-28">
        <div className="max-w-lg px-6 mx-auto overflow-hidden rounded shadow-xl py-7">
          <h2 className="mb-1 text-2xl font-medium uppercase text-[#007AAF]">Login</h2>
          <p className="mb-6 text-sm text-gray-600">Welcome! So good to have you back!</p>
          <form autoComplete="off" onSubmit={handleLogin}>
            <div className="space-y-2">
              <div>
                <label htmlFor="email" className="block mb-2 text-[#007AAF] font-semibold">Email address</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block w-full px-4 py-3 text-sm text-gray-600 placeholder-gray-400 border border-gray-300 rounded focus:ring-0 focus:border-teal-500"
                  placeholder="admin_email@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div>
                <label htmlFor="password" className="block mb-2 text-[#007AAF] font-semibold">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    id="password"
                    className="block w-full px-4 py-3 text-sm text-gray-600 placeholder-gray-400 border border-gray-300 rounded focus:ring-0 focus:border-teal-500"
                    placeholder="***********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div
                    className="absolute inset-y-0 right-0 flex items-center px-8 text-gray-600 border-l border-gray-300 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />} {/* Eye icons */}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="block w-full py-2 text-center bg-[#007AAF] border border-[#007AAF] rounded hover:bg-transparent transition uppercase text-white hover:text-[#007AAF] font-roboto font-medium"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin_Login;
