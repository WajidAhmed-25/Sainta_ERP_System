import { useState } from "react";
import { AtSign, Lock, KeySquare } from "lucide-react";
import { toast, Toaster } from "sonner";

export default function LoginForm({ setUsername }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    pinCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "pinCode") {
      const numericValue = value.replace(/\D/g, '').slice(0, 6);
      if (value.replace(/\D/g, '').length > 6) {
        toast.error("Pin code must be 6 digits", {
          position: "top-center",
        });
      }
      setFormData(prev => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.pinCode.length !== 6) {
      toast.error("Pin code must be 6 digits", {
        position: "top-center",
      });
      return;
    }
    if (formData.username) {
      setUsername(formData.username); 
    }
  };

  const inputClasses = "w-full bg-black/80 border text-white  placeholder:text-gray-400 border-[#e6e7eb] rounded-xl px-16 py-2.5 pl-12 focus:outline-none";

  return (
    <>
      <Toaster richColors />
      <div className="flex items-center justify-center pt-6 pb-6">
        <div className="p-12 bg-[#e6e7eb] shadow-2xl w-[434px] rounded-3xl">
          <h1 className="mb-8 text-xl font-semibold text-center text-black">Login</h1>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="relative">
              <AtSign className="absolute z-10 w-5 h-5 text-white -translate-y-1/2 left-4 top-1/2" />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>
            <div className="relative">
              <Lock className="absolute z-10 w-5 h-5 text-white -translate-y-1/2 left-4 top-1/2" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>
            <div className="relative">
              <KeySquare className="absolute z-10 w-5 h-5 text-white -translate-y-1/2 left-4 top-1/2" />
              <input
                type="text"
                name="pinCode"
                placeholder="Pin Code"
                value={formData.pinCode}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>
            <div className="relative flex w-full pt-4"> 
              <button
                type="submit"
                className="w-[40%] py-2 mx-auto text-white bg-black border-gray-300 rounded-md hover:scale-110 hover:bg-black hover:border-gray-300 hover:text-white hover:duration-300 hover:transition-all hover:border"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}