import React, { useState, useEffect } from 'react';
import Stock from './Stock';
import Transactions from '../Modules/Product_Management/Transaction';

// Download //

import { Download } from "lucide-react";

// Images //

// import warehouse_img from '../../Icons/sainta inventory-management warehouse.png';
// import transaction_img from '../../Icons/sainta inventory.png';
// import supplier_img from '../../Icons/sainta inventory-management supplier.png';

import warehouse_img from '../Icons/sainta inventory-management warehouse.png';
import transaction_img from '../Icons/sainta inventory.png';
import supplier_img from '../Icons/sainta inventory-management supplier.png';



// Animation //

import AOS from "aos";
import "aos/dist/aos.css";
import Supplier from '../Modules/Product_Management/Supplier';


// Download CSV //

import { saveAs } from "file-saver";
import * as XLSX from "xlsx";


// --------------------------------- warehouse Page -------------------------------- //

const WarehousePage = ({ onBack }) => {
  const handleDownload = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/stocks");
      if (!response.ok) {
        throw new Error("Failed to fetch stock data");
      }
      const data = await response.json();

      // Format data for Excel
      const formattedData = data.map((item) => ({
        "Stock ID": item.stock_id,
        "Stock Name": item.stock_name,
        "Stock Type": item.stock_type?.type_name || "N/A",
        Quantity: item.quantity,
        Location: item.location,
        "Stocked Date": item.stocked_date,
        "Type Description": item.stock_type?.description || "N/A",
        "Created At": item.created_at,
        "Updated At": item.updated_at,
      }));

      // Create Excel worksheet
      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Stocks");

      // Convert to binary and save as file
      const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
      saveAs(blob, "Stocks.xlsx");
    } catch (error) {
      console.error("Error downloading stocks:", error);
      alert("Failed to download stocks");
    }
  };

  return (
    <div className="flex flex-col items-center justify-between w-full h-full p-2 rounded-lg">
      <div className="flex justify-between w-full">
        <button
          className="flex flex-row px-4 py-2 mt-2 space-x-2 text-white bg-[#017ab0] rounded hover:bg-[#0179b0b4] focus:outline-none"
          onClick={onBack}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          <span>Back</span>
        </button>

        <button
          className="flex flex-row px-4 py-2 mt-2 space-x-2 text-white bg-[#017ab0] rounded hover:bg-[#0179b0b4] focus:outline-none"
          onClick={handleDownload}
        >
          <Download className="w-6 h-6" />
          <span>Download Stocks</span>
        </button>
      </div>

      <div className="w-full">
        <Stock />
      </div>
    </div>
  );
};

// --------------------------------- Transaction Page -------------------------------- //

const TransactionPage = ({ onBack }) => {
  const handleDownload = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/transactions");
      if (!response.ok) {
        throw new Error("Failed to fetch transaction data");
      }
      const data = await response.json();


      const formattedData = data.map((item) => ({
        "Transaction ID": item.transaction_id,
        "Product ID": item.product_id,
        "Transaction Date": item.transaction_date,
        "Product Name": item.product.product_name,
        "Product Type": item.product.product_type_id,
        "Unit Quantity": item.product.unit_quantity,
        "Unit Type": item.product.unit_type,
        "Cost": item.product.cost,
        "Registration Date": item.product.registration_date,
        // "Supplier ID": item.product.supplier_id,
      }));

      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");

      const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
      saveAs(blob, "Transactions.xlsx");
    } catch (error) {
      console.error("Error downloading transactions:", error);
      alert("Failed to download transactions");
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen rounded-lg">
      <div className="flex items-center justify-between w-full">
        <button
          className="flex flex-row px-4 py-2 mt-6 space-x-2 text-white bg-[#017ab0] rounded hover:bg-[#0179b0b4] focus:outline-none"
          onClick={onBack}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          <span> Back</span>
        </button>
        <button
          className="flex flex-row px-4 py-2 mt-6 space-x-2 text-white bg-[#017ab0] rounded hover:bg-[#0179b0b4] focus:outline-none"
          onClick={handleDownload}
        >
          <Download className="w-6 h-6" />
          <span>Download Transactions</span>
        </button>
      </div>
      <div className="w-full mt-8">
        <Transactions />
      </div>
    </div>
  );
};

// --------------------------------- Suppliers Page -------------------------------- //

const SuppliersPage = ({ onBack }) => {
  const handleDownload = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/suppliers");
      if (!response.ok) {
        throw new Error("Failed to fetch supplier data");
      }
      const data = await response.json();

      // Transform data for Excel
      const formattedData = data.map((item) => ({
        "Supplier ID": item.supplier_id,
        "Supplier Name": item.supplier_name,
        "Contact Details": item.contact_details,
        Address: item.address,
        "Created At": item.created_at,
        "Updated At": item.updated_at,
      }));

      // Create worksheet
      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Suppliers");

      // Convert to binary and save
      const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
      saveAs(blob, "Suppliers.xlsx");
    } catch (error) {
      console.error("Error downloading suppliers:", error);
      alert("Failed to download suppliers");
    }
  };

  return (
    <div className="flex flex-col min-h-screen rounded-lg">
      <div className="flex flex-row justify-between w-full mt-6 space-x-2 ">
        <button
          className="px-4 py-2 flex flex-row space-x-2 text-white bg-[#017ab0] rounded hover:bg-[#0179b0b4] focus:outline-none"
          onClick={onBack}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          <span> Back</span>
        </button>
        <button
          className="flex flex-row px-4 py-2 mt-6 space-x-2 text-white bg-[#017ab0] rounded hover:bg-[#0179b0b4] focus:outline-none"
          onClick={handleDownload}
        >
          <Download className="w-6 h-6" />
          <span>Download Suppliers</span>
        </button>
      </div>
      <div className="w-full mt-8 ">
        <Supplier />
      </div>
    </div>
  );
};






const Inventory_Model_Management = () => {

  const [selected, setSelected] = useState(null);

  const handleClick = (page) => {
    setSelected(page);
  };

  const handleBack = () => {
    setSelected(null);
  };

  // Effect to load Animation //

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const renderContent = () => {
    switch (selected) {

      case 'Warehouse':
        return <WarehousePage onBack={handleBack} />;
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
        <div className="grid gap-24 mt-8 sm:-mt-20 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {['Warehouse', 'Transaction', 'Suppliers'].map((item) => (
            <div
              key={item}
              onClick={() => handleClick(item)}
              data-aos="fade-up"
              className="flex flex-col items-center justify-center w-48 h-48 transition-all duration-300 ease-in-out bg-white rounded-full shadow-lg cursor-pointer sm:w-56 sm:h-56 lg:w-64 lg:h-64 hover:bg-blue-100"
            >
              <div className="mb-2">
                {item === 'Warehouse' && (
                  <img src={warehouse_img} alt="Warehouse" className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28" />
                )}

                {item === 'Transaction' && (
                  <img src={transaction_img} alt="Transaction" className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28" />
                )}
                {item === 'Suppliers' && (
                  <img src={supplier_img} alt="Suppliers" className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28" />
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

export default Inventory_Model_Management;
