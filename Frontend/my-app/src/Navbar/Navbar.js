import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="p-4 shadow-xl "  style={{ background: 'linear-gradient(to right, #f4fcfe 0%, #f4fcfe 100%)' }}>
        
              <div className="container flex flex-col items-center justify-between mx-auto lg:flex-row">
        <div className="mb-4 lg:pl-20 text-2xl font-bold  sm:pl-0 text-[#007AAF] lg:mb-0  hover:cursor-pointer ">
        Sante-ERP
        </div>

        {/* Burger Button */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-[#007AAF] focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        {/* Menu Items */}
        <div
          className={`lg:flex flex-col lg:flex-row  lg:space-x-12 lg:mt-0 mt-4 mr-4 flex items-center  sm:mr-0 text-xl ${isOpen ? '' : 'hidden'}`}
        >
          <button
            onClick={toggleMenu}
            className="absolute text-3xl text-[#007AAF] lg:hidden top-4 right-4"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          <a href="/" className="px-4 py-2  text-[#007AAF] hover:scale-110 transition-all duration-300">Our Strengths</a>
          <a href="#Projects" className="px-4 py-2  text-[#007AAF] hover:scale-110 transition-all duration-300">Our Features</a>
          <a href="/" className="px-4 py-2  text-[#007AAF] hover:scale-110 transition-all duration-300">Registration Process</a>
          <a href="/" className="px-4 py-2  text-[#007AAF] hover:scale-110 transition-all duration-300">Costs</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
