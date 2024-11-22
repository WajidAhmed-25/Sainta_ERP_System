

// import React, { useState,useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
// import Trans_Btn from './Trans_Btn';
// import { useNavigate } from 'react-router-dom';

// const Navbar = ({ setCurrentElement }) => {
// const navigate = useNavigate();
// const [isOpen, setIsOpen] = useState(false);
// const [hoveredElement, setHoveredElement] = useState("");
// const { t } = useTranslation();
// const [isAuthenticated, setIsAuthenticated] = useState(false);

// useEffect(() => {
//   // Check if 'username' exists in local storage
//   const username = localStorage.getItem('username');
//   if (username) {
//     setIsAuthenticated(true);
//   }
// }, []);

// const Dropdown = ({ isOpen, items, setCurrentElement, handleMouseLeave, targetElement }) => (

// isOpen && (
// <div
// className="absolute left-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg w-70"
// onMouseLeave={() => {
// handleMouseLeave();
// }
// }
// >
// {items.map((item, index) => (
// <a
// key={index}
// href={`#${item.id}`}
// className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white"
// onClick={() => {
// setCurrentElement(targetElement);
// navigate('./');
// }}
// >
// {item.label}
// </a>
// ))}
// </div>
// )
// );

// const handleMouseEnter = (e) => {
// setHoveredElement(e.target.innerText);
// };

// const handleMouseLeave = () => {
// setHoveredElement("");
// };

// const dropdownHome = [
// { id: 'h1', label: 'サインタとは？' },
// { id: 'h3', label: '企業資源計画とは？' },
// { id: 'h4', label: '多機能性と汎用性' },
// { id: 'h5', label: 'ユーザー向け'} ,
// { id: 'h6', label: '一緒に未来を実現しましょう'}
// ];

// const dropdownStrengths = [
// { id: 's1', label: '我々の強み' },
// { id: 's2', label: '最新技術' },
// { id: 's3', label: '使い勝手の良さ' },
// { id: 's4', label: '常に進化中' }
// ];

// const dropdownSupport = [
// { id: 'r1', label: '登録・相談・サポート' },
// { id: 'r2', label: '購入前と購入後' },
// { id: 'r3', label: 'サインタ・フォーラム' },
// ];

// // Return to the homepage when any of the navbar items are clicked


// const toggleMenu = () => {
//   setIsOpen(!isOpen);
// };




// return (
// <div className=''>
// <nav className="p-4 shadow-xl" style={{ background: 'linear-gradient(to right, #f4fcfe 0%, #f4fcfe 100%)' }}>
// <div className="container flex flex-col items-center justify-between mx-auto lg:flex-row">
// <div className={` ${isAuthenticated ? 'text-3xl ' : 'text-2xl'} ${isAuthenticated ? 'ml-0 ' : 'ml-4'} font-bold text-[#007AAF] hover:cursor-pointer`}>
//             {isAuthenticated ? 'Sainta ERP' : t('navbar.brand')}
//           </div>

// {/* Burger Button */}
// <div className="lg:hidden">
// <button
// onClick={toggleMenu}
// className="text-[#007AAF] focus:outline-none"
// aria-label="Toggle menu"
// >
// <svg
// className="w-6 h-6"
// fill="none"
// stroke="currentColor"
// viewBox="0 0 24 24"
// xmlns="http://www.w3.org/2000/svg"
// >
// <path
// strokeLinecap="round"
// strokeLinejoin="round"
// strokeWidth="2"
// d="M4 6h16M4 12h16m-7 6h7"
// ></path>
// </svg>
// </button>
// </div>

// {/* Menu Items */}
// <div
// className={`lg:flex flex-col lg:flex-row lg:space-x-12 lg:mt-0 mt-4 mr-4 flex items-center sm:mr-0 text-xl ${
// isOpen ? '' : 'hidden'
// }`}
// >
// <button
// onClick={toggleMenu}
// className="absolute text-3xl text-[#007AAF] lg:hidden top-4 right-4"
// aria-label="Close menu"
// >
// <svg
// className="w-6 h-6"
// fill="none"
// stroke="currentColor"
// viewBox="0 0 24 24"
// xmlns="http://www.w3.org/2000/svg"
// >
// <path
// strokeLinecap="round"
// strokeLinejoin="round"
// strokeWidth="2"
// d="M6 18L18 6M6 6l12 12"
// ></path>
// </svg>
// </button>

// <a href="/" className="px-4 py-2 text-[#007AAF] hover:scale-110 transition-all duration-300">
// {t('navbar.strengths')}
// </a>
// <a href="#Projects" className="px-4 py-2 text-[#007AAF] hover:scale-110 transition-all duration-300">
// {t('navbar.features')}
// </a>
// <a href="/" className="px-4 py-2 text-[#007AAF] hover:scale-110 transition-all duration-300">
// {t('navbar.registration')}
// </a>
// <a href="/" className="px-4 py-2 text-[#007AAF] hover:scale-110 transition-all duration-300">
// {t('navbar.costs')}
// </a>
// </div>
// </div>
// </nav>
// {/* <Trans_Btn/> */}
// </div>


// );
// };

// export default Navbar;



























///////////////////////////////////////////////////////////                     /////////////////////////////////////////////////////////////////




import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ setCurrentElement }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredElement, setHoveredElement] = useState("");
  const { t } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Add console.log to debug
  useEffect(() => {
    const username = localStorage.getItem('username');
    console.log('Username from localStorage:', username); // Debug log
    if (username) {
      setIsAuthenticated(true);
      console.log('Authentication state set to:', true); // Debug log
    } else {
      setIsAuthenticated(false);
      console.log('Authentication state set to:', false); // Debug log
    }
  }, []); // Empty dependency array means this runs once on mount

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Add console.log to check current state
  console.log('Current authentication state:', isAuthenticated); // Debug log

  return (
    <div>
      <nav className="p-4 shadow-xl" style={{ background: 'linear-gradient(to right, #f4fcfe 0%, #f4fcfe 100%)' }}>
        <div className="container mx-auto">
          {isAuthenticated ? (
            // Authenticated view - only show the name in center
            <div className="flex items-center justify-center">
              <div className="text-3xl font-bold text-[#007AAF]">
                {'Sainta ERP' || 'Sainta ERP'}
              </div>
            </div>
          ) : (
            // Non-authenticated view - show full navbar
            <div className="flex flex-col items-center justify-between lg:flex-row">
              <div className="text-2xl ml-4 font-bold text-[#007AAF] hover:cursor-pointer">
                {t('navbar.brand')}
              </div>

              {/* Burger Button */}
              <div className="lg:hidden">
                <button
                  onClick={toggleMenu}
                  className="text-[#007AAF] focus:outline-none"
                  aria-label="Toggle menu"
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
                className={`lg:flex flex-col lg:flex-row lg:space-x-12 lg:mt-0 mt-4 mr-4 flex items-center sm:mr-0 text-xl ${
                  isOpen ? '' : 'hidden'
                }`}
              >
                <button
                  onClick={toggleMenu}
                  className="absolute text-3xl text-[#007AAF] lg:hidden top-4 right-4"
                  aria-label="Close menu"
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

                <a href="/" className="px-4 py-2 text-[#007AAF] hover:scale-110 transition-all duration-300">
                  {t('navbar.strengths')}
                </a>
                <a href="#Projects" className="px-4 py-2 text-[#007AAF] hover:scale-110 transition-all duration-300">
                  {t('navbar.features')}
                </a>
                <a href="/" className="px-4 py-2 text-[#007AAF] hover:scale-110 transition-all duration-300">
                  {t('navbar.registration')}
                </a>
                <a href="/" className="px-4 py-2 text-[#007AAF] hover:scale-110 transition-all duration-300">
                  {t('navbar.costs')}
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;




















