// src/components/Navbar.jsx
import { useTranslation } from 'react-i18next';
import Logo from '../assets/img/landing/mainlogo.png';
import LogoSmall from '../assets/img/landing/logosmall.png';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

// Define dropdown items
const dropdownHome = [
  { label: "About Us", path: "/about" },
  { label: "Our Mission", path: "/mission" }
];

const dropdownStrengths = [
  { label: "Features", path: "/features" },
  { label: "Benefits", path: "/benefits" }
];

const dropdownSupport = [
  { label: "Help Center", path: "/help" },
  { label: "Contact Us", path: "/contact" }
];

// Dropdown component
const Dropdown = ({ isOpen, items, setCurrentElement = () => {}, handleMouseLeave, targetElement }) => {
  const navigate = useNavigate();
  
  if (!isOpen) return null;
  
  return (
    <div 
      className="absolute left-0 w-48 py-2 mt-2 bg-white rounded-lg shadow-xl"
      onMouseLeave={handleMouseLeave}
    >
      {items.map((item, index) => (
        <a
          key={index}
          href={item.path}
          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
          onClick={(e) => {
            e.preventDefault();
            if (setCurrentElement) {
              setCurrentElement(targetElement);
            }
            navigate(item.path);
          }}
        >
          {item.label}
        </a>
      ))}
    </div>
  );
};

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredElement, setHoveredElement] = useState("");
  const { t } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleMouseEnter = (event) => {
    setHoveredElement(event.target.innerText);
  };

  const handleMouseLeave = () => {
    setHoveredElement("");
  };

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleElementClick = (element, path = '/') => {
    navigate(path);
  };

  // Authenticated user navbar
  if (isAuthenticated) {
    return (
      <nav className="bg-white shadow-md">
        <div className="container p-4 mx-auto">
          <div className="flex justify-center">
            <a href="/" className="flex items-center" onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}>
              <img src={Logo} alt="Logo" className="h-14" />
            </a>
          </div>
        </div>
      </nav>
    );
  }

  // Non-authenticated user navbar
  return (
    <nav className="bg-white shadow-md">
      <div className="container flex items-center justify-between p-4 mx-auto">
        <a href="/" className="flex items-center" onClick={(e) => {
          e.preventDefault();
          handleElementClick("default", "/");
        }}>
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
              setIsOpen(true);
              handleMouseEnter({ target: { innerText: "サインタとは？" } });
              setTimeout(() => {
                setIsOpen(false);
              }, 2000);
            }}
          >
            <a className="flex items-center px-4 py-2 text-gray-700 transition-colors duration-300 cursor-pointer hover:text-blue-500">
              <img src={LogoSmall} alt="Logo Small" className="mr-2 h-7" />
              サインタとは？
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <Dropdown 
              isOpen={hoveredElement === "サインタとは？"} 
              items={dropdownHome}
              handleMouseLeave={handleMouseLeave}
              targetElement="default"
            />
          </div>

          <div
            className="relative group"
            onMouseEnter={() => {
              setIsOpen(true);
              handleMouseEnter({ target: { innerText: "我々の強み" } });
              setTimeout(() => {
                setIsOpen(false);
              }, 2000);
            }}
          >
            <a className="flex items-center px-4 py-2 text-gray-700 transition-colors duration-300 cursor-pointer hover:text-blue-500">
              <img src={LogoSmall} alt="Logo Small" className="mr-2 h-7" />
              我々の強み
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <Dropdown 
              isOpen={hoveredElement === "我々の強み"} 
              items={dropdownStrengths}
              handleMouseLeave={handleMouseLeave}
              targetElement="strengths"
            />
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
            <a className="flex items-center px-4 py-2 text-gray-700 transition-colors duration-300 cursor-pointer hover:text-blue-500">
              <img src={LogoSmall} alt="Logo Small" className="mr-2 h-7" />
              登録・相談・サポート
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <Dropdown 
              isOpen={hoveredElement === "登録・相談・サポート"} 
              items={dropdownSupport}
              handleMouseLeave={handleMouseLeave}
              targetElement="register"
            />
          </div>

          <a 
            href="/login" 
            className="px-4 py-2 text-gray-700 transition-colors duration-300 hover:text-blue-500"
            onClick={(e) => {
              e.preventDefault();
              handleElementClick("login", "/login");
            }}
          >
            <div className="flex items-center">
              <img src={LogoSmall} alt="Logo Small" className="mr-2 h-7" />
              ログイン
            </div>
          </a>

          <a 
            href="/register" 
            className="px-4 py-2 text-gray-700 transition-colors duration-300 hover:text-blue-500"
            onClick={(e) => {
              e.preventDefault();
              handleElementClick("register", "/register");
            }}
          >
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