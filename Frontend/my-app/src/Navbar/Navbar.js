import { useTranslation } from 'react-i18next';
import Logo from '../assets/img/landing/mainlogo.png';
import LogoSmall from '../assets/img/landing/logosmall.png';

// Use react browser router to navigate to different pages
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const Navbar = ({ setCurrentElement }) => {
  const toggleMenu = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredElement, setHoveredElement] = useState("");
  const { t } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if 'username' exists in local storage
    const username = localStorage.getItem('username');
    if (username) {
      setIsAuthenticated(true);
    }
  }, []);

  const Dropdown = ({ isOpen, items, setCurrentElement, handleMouseLeave, targetElement }) => (

    isOpen && (
      <div
        className="absolute left-0 mt-2 w-70 bg-white shadow-lg rounded-md border border-gray-200"
        onMouseLeave={() => {
          handleMouseLeave();
        }
        }
      >
        {items.map((item, index) => (
          <a
            key={index}
            href={`#${item.id}`}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white"
            onClick={() => {
              setCurrentElement(targetElement);
              navigate('./');
            }}
          >
            {item.label}
          </a>
        ))}
      </div>
    )
  );

  const handleMouseEnter = (e) => {
    setHoveredElement(e.target.innerText);
  };

  const handleMouseLeave = () => {
    setHoveredElement("");
  };

  const dropdownHome = [
    { id: 'h1', label: 'サインタとは？' },
    { id: 'h3', label: '企業資源計画とは？' },
    { id: 'h4', label: '多機能性と汎用性' },
    { id: 'h5', label: 'ユーザー向け'} ,
    { id: 'h6', label: '一緒に未来を実現しましょう'}
  ];

  const dropdownStrengths = [
    { id: 's1', label: '我々の強み' },
    { id: 's2', label: '最新技術' },
    { id: 's3', label: '使い勝手の良さ' },
    { id: 's4', label: '常に進化中' }
  ];

  const dropdownSupport = [
    { id: 'r1', label: '登録・相談・サポート' },
    { id: 'r2', label: '購入前と購入後' },
    { id: 'r3', label: 'サインタ・フォーラム' },
  ];

  // Return to the homepage when any of the navbar items are clicked

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
              <a className="px-4 py-2 text-gray-700 hover:text-blue-500 transition-colors duration-300 flex items-center cursor-pointer" onClick={() => setCurrentElement("default")}>
                <img src={LogoSmall} alt="Logo Small" className="h-7 mr-2" />
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
              <a className="px-4 py-2 text-gray-700 hover:text-blue-500 transition-colors duration-300 flex items-center cursor-pointer" onClick={() => {
                setCurrentElement("strengths");
                navigate('./');
              }}>
                <img src={LogoSmall} alt="Logo Small" className="h-7 mr-2" />
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
            <a className="px-4 py-2 text-gray-700 hover:text-blue-500 transition-colors duration-300 flex items-center cursor-pointer" onClick={() => {
              setCurrentElement("register");
              navigate('./');
            }}>
              <img src={LogoSmall} alt="Logo Small" className="h-7 mr-2" />
              登録・相談・サポート
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <Dropdown isOpen={hoveredElement === "登録・相談・サポート"} items={dropdownSupport} setCurrentElement={setCurrentElement} handleMouseLeave={handleMouseLeave} targetElement="register" />
          </div>
  
          <a href="/login" className="px-4 py-2 text-gray-700 hover:text-blue-500 transition-colors duration-300" onClick={() => setCurrentElement("login")}>
            <div className="flex items-center">
              <img src={LogoSmall} alt="Logo Small" className="h-7 mr-2" />
              ログイン
            </div>
          </a>
  
          <a href="/register" className="px-4 py-2 text-gray-700 hover:text-blue-500 transition-colors duration-300" onClick={() => {
            setCurrentElement("register");
            navigate('./');
          }}>
            <div className="flex items-center">
              <img src={LogoSmall} alt="Logo Small" className="h-7 mr-2" />
              登録
            </div>
          </a>
        </div>
      </div>

    </nav>
  );
};

export default Navbar;