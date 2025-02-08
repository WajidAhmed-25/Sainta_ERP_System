import React, { useState, useEffect } from 'react';
import { Download } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

// Images
import sales_img from '../../Icons/sainta sales-management.png';
import payment_img from '../../Icons/sainta sales-management.png';

// Pages //

import Payment_Page from './payment'
import Sales_Page from './sales'

// --------------------------------- Sales Page -------------------------------- //
const SalesPage = ({ onBack }) => {
  return (
    <div className="flex flex-col items-center justify-between w-full h-full p-2 rounded-lg">
      <div className="flex flex-row justify-between w-full mt-6 space-x-2">
        <button
          className="px-4 py-2 flex flex-row space-x-2 text-white bg-[#017ab0] rounded hover:bg-[#0179b0b4] focus:outline-none"
          onClick={onBack}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          <span>Back</span>
        </button>
      </div>

      <div className="w-full mt-8 text-center">
     <Sales_Page/>
        </div>
    </div>
  );
};


// --------------------------------- Payments Page -------------------------------- //
const PaymentsPage = ({ onBack }) => {
  return (
    <div className="flex flex-col min-h-screen rounded-lg">
      <div className="flex flex-row justify-between w-full mt-6 space-x-2">
        <button
          className="px-4 py-2 flex flex-row space-x-2 text-white bg-[#017ab0] rounded hover:bg-[#0179b0b4] focus:outline-none"
          onClick={onBack}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          <span>Back</span>
        </button>
      </div>
      
      <div className="w-full mt-8 text-center">
  <Payment_Page/>
      </div>
    </div>
  );
};

const Sales_Management = () => {
  const [selected, setSelected] = useState(null);

  const handleClick = (page) => {
    setSelected(page);
  };

  const handleBack = () => {
    setSelected(null);
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const renderContent = () => {
    switch (selected) {
      case 'Sales':
        return <SalesPage onBack={handleBack} />;
      case 'Payments':
        return <PaymentsPage onBack={handleBack} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      {selected ? (
        <div className="w-full max-w-8xl h-[90%]">{renderContent()}</div>
      ) : (
        <div className="grid mt-8 gap-60 sm:-mt-20 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
          {['Sales', 'Payments'].map((item) => (
            <div
              key={item}
              onClick={() => handleClick(item)}
              data-aos="fade-up"
              className="flex flex-col items-center justify-center w-48 h-48 transition-all duration-300 ease-in-out bg-white rounded-full shadow-lg cursor-pointer sm:w-56 sm:h-56 lg:w-64 lg:h-64 hover:bg-blue-100"
            >
              <div className="mb-2">
                {item === 'Sales' && (
                  <img src={sales_img} alt="Sales" className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28" />
                )}
           
                {item === 'Payments' && (
                  <img src={payment_img} alt="Payments" className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28" />
                )}
              </div>
              <span className="pt-2 text-base font-medium text-gray-700 sm:text-lg lg:text-xl">{item}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sales_Management;