import React, { useState } from 'react';
// import Add_Stock_Type from '../Modules/Product_Management/Add_Stock_Type';
// import Add_Stock from '../Modules/Product_Management/Add_Stock';
import Stock from './Stock';

const ProductPage = ({ onBack }) => (
  <div className="flex items-center justify-between w-full h-full p-8 bg-white rounded-lg shadow-lg">

<button
      className="flex flex-row px-4 py-2 mt-4 space-x-2 text-white bg-blue-600 rounded hover:bg-blue-500 focus:outline-none"
      onClick={onBack}
    >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18">
            </path>
        </svg>
    <span> Back</span> 
    </button>


    <h2 className="mb-4 text-2xl font-bold text-center">Product Page</h2>

  </div>
);

const StockPage = ({ onBack }) => (

  <div className="flex flex-col items-center justify-between w-full h-full p-2 bg-white rounded-lg ">


  <div className='flex justify-between w-full '>
  <button
        className="flex flex-row px-4 py-2 mt-2 space-x-2 text-white bg-[#017ab0] rounded hover:bg-[#0179b0b4] focus:outline-none"
        onClick={onBack}
      >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18">
              </path>
          </svg>
      <span> Back</span> 
      </button>
  
  
      </div>
   <div className='w-full '>
<Stock/>
</div>

</div>
);

const TransactionPage = ({ onBack }) => (
  
  <div className="flex items-center justify-between w-full h-full p-8 bg-white rounded-lg shadow-lg">
  

<button
      className="flex flex-row px-4 py-2 mt-4 space-x-2 text-white bg-blue-600 rounded hover:bg-blue-500 focus:outline-none"
      onClick={onBack}
    >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18">
            </path>
        </svg>
    <span> Back</span> 
    </button>


    <h2 className="mb-4 text-2xl font-bold text-center">Product Page</h2>

  </div>
);

const SuppliersPage = ({ onBack }) => (
  <div className="flex items-center justify-between w-full h-full p-8 bg-white rounded-lg shadow-lg">


<button
      className="flex flex-row px-4 py-2 mt-4 space-x-2 text-white bg-blue-600 rounded hover:bg-blue-500 focus:outline-none"
      onClick={onBack}
    >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18">
            </path>
        </svg>
    <span> Back</span> 
    </button>
    

    <h2 className="mb-4 text-2xl font-bold text-center">Product Page</h2>

  </div>
);

const Model_Management = () => {
  const [selected, setSelected] = useState(null);

  const handleClick = (page) => {
    setSelected(page);
  };

  const handleBack = () => {
    setSelected(null);
  };

  const renderContent = () => {
    switch (selected) {
      case 'Product':
        return <ProductPage onBack={handleBack} />;
      case 'Stock':
        return <StockPage onBack={handleBack} />;
      case 'Transaction':
        return <TransactionPage onBack={handleBack} />;
      case 'Suppliers':
        return <SuppliersPage onBack={handleBack} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      {selected ? (
        <div className="w-full max-w-8xl h-[90%]">{renderContent()}</div>
      ) : (
        <div className="grid gap-16 mt-8 sm:-mt-20 sm:grid-cols-2 lg:grid-cols-4">
          {['Product', 'Stock', 'Transaction', 'Suppliers'].map((item) => (
            <div
              key={item}
              onClick={() => handleClick(item)}
              className="flex flex-col items-center justify-center w-32 h-32 transition-all duration-300 ease-in-out bg-white rounded-full shadow-lg cursor-pointer sm:w-40 sm:h-40 lg:w-48 lg:h-48 hover:bg-blue-100"
            >
              <div className="mb-2 text-3xl text-blue-600 sm:text-4xl lg:text-5xl">
                {item === 'Product' && '📦'}
                {item === 'Stock' && '📈'}
                {item === 'Transaction' && '💳'}
                {item === 'Suppliers' && '👨‍💼'}
              </div>
              <span className="pt-2 text-base font-medium text-gray-700 sm:text-lg lg:text-xl">{item}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Model_Management;
