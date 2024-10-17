import React, { useState, useEffect } from 'react';
import { Menu, X, Home, ShoppingCart, Calendar, User, FileText, Table, Settings, BarChart, Layers, Lock } from 'lucide-react';

import CustomerTable from './Modules_Data/Customer_Data';
import Employee_Data from './Modules_Data/Employee_Data';
import Department_Data from './Modules_Data/Department_Data';
import TimeSheet_Data from './Modules_Data/TimeSheet_Data';

// import admin_profile from './profile.png';

const MenuItem = ({ icon: Icon, text, isActive }) => (
  <li className={`flex items-center p-2 rounded-lg ${isActive ? 'bg-gray-700 text-white' : 'text-white  hover:bg-gray-700 hover:text-white'}`}>
    <Icon className="w-6 h-6 mr-2" />
    <span className="hidden md:inline">{text}</span>
  </li>
);

const Admin_Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const [openFaq, setOpenFaq] = useState(null);
  const [customerData, setCustomerData] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  useEffect(() => {
    if (openFaq === 0) {  // Assuming the first FAQ is the "Customer Management Data"
      fetchCustomerData();
    }
  }, [openFaq]);

  const fetchCustomerData = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/customers/2');
      const data = await response.json();
      setCustomerData(data);
    } catch (error) {
      console.error("Error fetching customer data:", error);
    } finally {
      setLoading(false);
    }
  };

  const faqs = [
    {
      question: "Customer Management Data",
      content: (
 <div className='w-full'>

<CustomerTable/>
 </div>
      )
    },
    {
      question: "Employee Management Data",
      content: (
        <div className='w-full '>

       <Employee_Data/>
         </div>
      )
    },
    {
      question: "Department Management Data",
      content: (
        <div>
        <Department_Data/>
        </div>
      )
    },
    {
      question: "TimeSheet Management Data",
      content: (
        <div>
       <TimeSheet_Data/>
        </div>
      )
    },
  ];

  return (
    <div className="flex bg-gray-100">
      {/* Sidebar */}
      <aside className={`bg-[#007AAF] text-white w-16 md:w-64 ${sidebarOpen ? 'block' : 'hidden'} md:block transition-all duration-300 ease-in-out`}>
        <div className="flex items-center justify-between p-4">
          <h1 className="hidden text-2xl font-bold md:block">Sante Admin</h1>
          <button onClick={toggleSidebar} className="md:hidden">
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav>
          <ul className="p-2 space-y-2">
            <MenuItem icon={Home} text="Dashboard" isActive={true} />
            <MenuItem icon={ShoppingCart} text="eCommerce" />
            <MenuItem icon={Calendar} text="Calendar" />
            <MenuItem icon={User} text="Profile" />
            <MenuItem icon={FileText} text="Forms" />
            <MenuItem icon={Table} text="Tables" />
            <MenuItem icon={Settings} text="Settings" />
          </ul>
          <div className="p-2 mt-4">
            <h2 className="hidden mb-2 text-xs font-semibold text-white uppercase md:block">Others</h2>
            <ul className="space-y-2">
              <MenuItem icon={BarChart} text="Chart" />
              <MenuItem icon={Layers} text="UI Elements" />
              <MenuItem icon={Lock} text="Authentication" />
            </ul>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="w-full bg-white shadow-2xl ">
          <div className="flex items-center justify-between p-4">
            <button onClick={toggleSidebar} className="md:hidden">
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex justify-between w-full ">
              <input type="text" placeholder="Type to search..." className="w-[30%] p-2 mr-2  border-[#007AAF] border rounded-lg placeholder:text-[#007AAF]" />
              <div className='flex flex-row gap-4 '>
                <div className="relative -ml-6 ">
                  <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full">2</span>
                  <button className="p-2">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                  </button>
                </div>
                <div className="flex items-center ml-4">
                  <img src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?size=338&ext=jpg&ga=GA1.1.1880011253.1728864000&semt=ais_hybrid-rr-similar" alt="User avatar" className="w-12 h-12 rounded-full" />
                  <span className="hidden ml-2 font-bold md:inline">Rishi</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container px-6 py-8 mx-auto">
            <h3 className="text-3xl font-bold text-[#007AAF]">Sante ERP</h3>
            <div className="w-full mt-8 bg-white rounded-md shadow-lg">
              {/* FAQ Section */}
              <div className="p-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200">
                    {/* Question */}
                    <button
                      className="flex items-center justify-between w-full py-4 text-lg  text-left text-[#007AAF] font-semibold"
                      onClick={() => toggleFaq(index)}
                    >
                      {faq.question}
                      <span>{openFaq === index ? '-' : '+'}</span>
                    </button>
                    {/* Answer */}
                    {openFaq === index && (
                      <div className="p-4 bg-gray-50">
                        {faq.content}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin_Dashboard;
