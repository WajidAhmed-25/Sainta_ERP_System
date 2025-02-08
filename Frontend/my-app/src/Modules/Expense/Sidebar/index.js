import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill, faStar, faChartBar, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ setSelectedPage }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedPage, setSelectedPageState] = useState(null); // State to track the selected page

  const menuItems = [
    { name: 'All Expense', icon: faMoneyBill },
    { name: 'Review', icon: faStar },
    { name: 'Submissions', icon: faChartBar },
  ];

  const handleSelectPage = (name) => {
    setSelectedPageState(name);
    setSelectedPage(name);
  };

  return (
    <div
      className={`transition-all duration-300 rounded-md bg-white shadow-2xl p-6  ${
        isOpen ? 'w-[240px]' : 'w-32'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <h2
          className={`text-lg font-semibold ${isOpen ? 'block' : 'hidden'} transition-all`}
        >
          Menu
        </h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-lg text-black focus:outline-none"
        >
          <FontAwesomeIcon icon={isOpen ? faChevronLeft : faChevronRight} />
        </button>
      </div>

      {/* Menu Items */}
      <ul className="mt-4 space-y-4">
        {menuItems.map((item, index) => (
          <li
            key={index}
            onClick={() => handleSelectPage(item.name)}
            className={`relative flex items-center p-2.5 text-center cursor-pointer rounded-md transition-all duration-200
              ${selectedPage === item.name ? 'bg-black text-white' : 'bg-gray-200 text-black hover:bg-black hover:text-white'} group`}
          >
            <FontAwesomeIcon icon={item.icon} className="mx-auto text-xl" />
            <span
              className={`ml-4 mx-auto ${isOpen ? 'block' : 'hidden'} transition-all`}
            >
              {item.name}
            </span>

            {!isOpen && (
              <span className="absolute px-2 py-1 text-sm text-white bg-gray-700 rounded-md opacity-0 left-16 group-hover:opacity-100">
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
