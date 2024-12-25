import { useTranslation } from 'react-i18next';
import Logo from '../assets/img/landing/mainlogo.png';
import LogoSmall from '../assets/img/landing/logosmall.png';

// Use react browser router to navigate to different pages
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const Navbar = ({ setCurrentElement }) => {
  // const toggleMenu = () => setIsOpen(!isOpen);
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

    <nav className="bg-white shadow-md">
        <div className="container flex items-center justify-between p-4 mx-auto">
          <a href="/" className="flex items-center" onClick={() => setCurrentElement("default")}>
            <img src={Logo} alt="Logo" className="h-14" />
          </a>
  
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
          <div className={`lg:flex lg:items-center lg:w-auto ${isOpen ? 'block' : 'hidden'}`}>
            <div
              className="relative group"
              onMouseEnter={() => {
                // Keep the dropdown open
                setIsOpen(true);
                handleMouseEnter({ target: { innerText: "サインタとは？" } });
  
                // Close the dropdown after 2 seconds
                setTimeout(() => {
                  setIsOpen(false);
                }
                , 2000);
              }
              }
            >
              <a className="flex items-center px-4 py-2 text-gray-700 transition-colors duration-300 cursor-pointer hover:text-blue-500" onClick={() => setCurrentElement("default")}>
                <img src={LogoSmall} alt="Logo Small" className="mr-2 h-7" />
                サインタとは？
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
              <Dropdown isOpen={hoveredElement === "サインタとは？"} items={dropdownHome} setCurrentElement={setCurrentElement} handleMouseLeave={handleMouseLeave} targetElement="default" />
            </div>
  
            <div
              className="relative group"
              onMouseEnter={() => {
                // Keep the dropdown open
                setIsOpen(true);
                handleMouseEnter({ target: { innerText: "我々の強み" } });
  
                // Close the dropdown after 2 seconds
                setTimeout(() => {
                  setIsOpen(false);
                }
                , 2000);
              }
              }
            >
              <a className="flex items-center px-4 py-2 text-gray-700 transition-colors duration-300 cursor-pointer hover:text-blue-500" onClick={() => {
                setCurrentElement("strengths");
                navigate('./');
              }}>
                <img src={LogoSmall} alt="Logo Small" className="mr-2 h-7" />
                我々の強み
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
              <Dropdown isOpen={hoveredElement === "我々の強み"} items={dropdownStrengths} setCurrentElement={setCurrentElement} handleMouseLeave={handleMouseLeave} targetElement="strengths" />
            </div>
          <div
            className="relative group"
            onMouseEnter={() => {
              setIsOpen(true);
              handleMouseEnter({ target: { innerText: "登録・相談・サポート" } });
              setTimeout(() => {
                setIsOpen(false);
              }, 2000);
            }}
          >
            <a className="flex items-center px-4 py-2 text-gray-700 transition-colors duration-300 cursor-pointer hover:text-blue-500" onClick={() => {
              setCurrentElement("register");
              navigate('./');
            }}>
              <img src={LogoSmall} alt="Logo Small" className="mr-2 h-7" />
              登録・相談・サポート
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <Dropdown isOpen={hoveredElement === "登録・相談・サポート"} items={dropdownSupport} setCurrentElement={setCurrentElement} handleMouseLeave={handleMouseLeave} targetElement="register" />
          </div>
  
          <a href="/login" className="px-4 py-2 text-gray-700 transition-colors duration-300 hover:text-blue-500" onClick={() => setCurrentElement("login")}>
            <div className="flex items-center">
              <img src={LogoSmall} alt="Logo Small" className="mr-2 h-7" />
              ログイン
            </div>
          </a>
  
          <a href="/register" className="px-4 py-2 text-gray-700 transition-colors duration-300 hover:text-blue-500" onClick={() => {
            setCurrentElement("register");
            navigate('./');
          }}>
            <div className="flex items-center">
              <img src={LogoSmall} alt="Logo Small" className="mr-2 h-7" />
              登録
            </div>
          </a>
        </div>
      </div>

    </nav>
  );
};

export default Navbar;