import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Logo from '../assets/img/landing/mainlogo.png';
import LogoSmall from '../assets/img/landing/logosmall.png';

const Dropdown = ({ isOpen, items, setCurrentElement, handleMouseLeave }) => (
  isOpen && (
    <div
      className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-md border border-gray-200"
      onMouseLeave={() => {
        handleMouseLeave();
      }
      }
    >
      {items.map((item, index) => (
        <a
          key={index}
          href={`#${item.id}`}
          className="block px-8 py-4 text-sm text-gray-700 hover:bg-gray-100"
          onClick={() => setCurrentElement("default")}
        >
          {item.label}
        </a>
      ))}
    </div>
  )
);

const Navbar = ({ setCurrentElement }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredElement, setHoveredElement] = useState("");
  const { t } = useTranslation();

  const handleMouseEnter = (e) => {
    setHoveredElement(e.target.innerText);
  };

  const handleMouseLeave = () => {
    setHoveredElement("");
  };

  const dropdownItems = [
    { id: 'about1', label: t('about1') },
    { id: 'about2', label: t('about2') },
    { id: 'about3', label: t('about3') },
    { id: 'about4', label: t('about4') },
    { id: 'about5', label: t('about5') },
  ];

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
            <a className="px-4 py-2 text-gray-700 hover:text-blue-500 transition-colors duration-300 flex items-center cursor-pointer" onClick={() => setCurrentElement("about")}>
              <img src={LogoSmall} alt="Logo Small" className="h-7 mr-2" />
              サインタとは？
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <Dropdown isOpen={hoveredElement === "サインタとは？"} items={dropdownItems} setCurrentElement={setCurrentElement} handleMouseLeave={handleMouseLeave} />
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
            <a className="px-4 py-2 text-gray-700 hover:text-blue-500 transition-colors duration-300 flex items-center cursor-pointer" onClick={() => setCurrentElement("strengths")}>
              <img src={LogoSmall} alt="Logo Small" className="h-7 mr-2" />
              我々の強み
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <Dropdown isOpen={hoveredElement === "我々の強み"} items={dropdownItems} setCurrentElement={setCurrentElement} handleMouseLeave={handleMouseLeave} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
