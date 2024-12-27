import React, { useState, useEffect } from 'react';
// import Add_Stock_Type from '../Modules/Product_Management/Add_Stock_Type';
// import Add_Stock from '../Modules/Product_Management/Add_Stock';
import Stock from './Stock';
import AddProductType from '../Modules/Product_Management/product_page';
import Expense from '../Modules/Product_Management/Expense';

// Download //

import { Download } from "lucide-react";

// Images //

import stock_img from './stock.png';
import product_img from './product.png';
import transaction_img from './transaction.png';


// Animation //

import AOS from "aos";
import "aos/dist/aos.css";
import Supplier from '../Modules/Product_Management/Supplier';


// Download CSV //

import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

// --------------------------------- Product Page -------------------------------- //

const ProductPage = ({ onBack }) => {
  const handleDownload = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/products");
      if (!response.ok) {
        throw new Error("Failed to fetch product data");
      }
      const data = await response.json();

      // Format data for Excel
      const formattedData = data.map((item) => ({
        "Product ID": item.product_id,
        "Product Name": item.product_name,
        "Product Type": item.product_type?.type_name || "N/A",
        "Unit Quantity": item.unit_quantity,
        "Unit Type": item.unit_type,
        "Description": item.product_description,
        "Cost": item.cost,
        "Stock Name": item.stock?.stock_name || "N/A",
        "Stock Location": item.stock?.location || "N/A",
        "Supplier Name": item.supplier?.supplier_name || "N/A",
        "Supplier Contact": item.supplier?.contact_details || "N/A",
        "Registration Date": item.registration_date,
        "Calculation Method": item.calculation_method,
        "Created At": item.created_at,
        "Updated At": item.updated_at,
      }));

      // Create Excel worksheet
      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

      // Convert to binary and save as file
      const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
      saveAs(blob, "Products.xlsx");
    } catch (error) {
      console.error("Error downloading products:", error);
      alert("Failed to download products");
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
          <span>Download Products</span>
        </button>
      </div>

      <div className="w-full mt-2">
        <AddProductType />
      </div>
    </div>
  );
};

// --------------------------------- Stock Page -------------------------------- //

const StockPage = ({ onBack }) => {
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

// --------------------------------- Expense Page -------------------------------- //

const ExpensePage = ({ onBack }) => {
  const handleDownload = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/expenses");
      if (!response.ok) {
        throw new Error("Failed to fetch Expense data");
      }
      const data = await response.json();
      console.log(data)
      // Format data for Excel
      const formattedData = data.map((item) => ({
        "ID": item.id,
        "Expense Name": item.expenseName,
        "Expense Cost": item.expenseCost,
        "Recorder Name": item.expenseRecorderName,
        "Expense Date": item.expenseDate,
        "Expense Type": item.expenseType,
        "Created At": item.created_at,
        "Updated At": item.updated_at,
      }));

      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");

      const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
      saveAs(blob, "Expenses.xlsx");
    } catch (error) {
      console.error("Error downloading Expenses:", error);
      alert("Failed to download Expenses");
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
          <span>Download Expenses</span>
        </button>
      </div>
      <div className="w-full mt-8">
        <Expense />
      </div>
    </div>
  );
};


const Model_Management = () => {

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

      case 'Stock':
        return <StockPage onBack={handleBack} />;
      case 'Product':
        return <ProductPage onBack={handleBack} />;
      case 'Expense':
        return <ExpensePage onBack={handleBack} />;
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
          {['Stock', 'Product', 'Expense'].map((item) => (
            <div
              key={item}
              onClick={() => handleClick(item)}
              data-aos="fade-up"
              className="flex flex-col items-center justify-center w-48 h-48 transition-all duration-300 ease-in-out bg-white rounded-full shadow-lg cursor-pointer sm:w-56 sm:h-56 lg:w-64 lg:h-64 hover:bg-blue-100"
            >
              <div className="mb-2">
                {item === 'Stock' && (
                  <img src={stock_img} alt="Stock" className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28" />
                )}
                {item === 'Product' && (
                  <img src={product_img} alt="Product" className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28" />
                )}
                {item === 'Expense' && (
                  <img src={transaction_img} alt="Transaction" className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28" />
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

export default Model_Management;
