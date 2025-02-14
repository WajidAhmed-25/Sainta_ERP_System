import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Sainta_Homepage from './HomePage/HomePage';
import Footer from './Footer/Footer';
import Testing_Class from './Testing/Test';
import Registration from './Registration/Registration';
import Login from './Login/Login';
import Module from './Modules/Module';

import Customer_Management from './Modules/Customer_Management/Customer_Management';
import Customer_Management1 from './Modules/Customer_Management/Backup';
import Employee_Management from './Modules/Employee_Management/Employee_Management';
import Add_Employee from './Modules/Employee_Management/Add_Employee';
import Employee_Management1 from './Modules/Employee_Management/Backup_EM';
import TimeSheet_Management from './Modules/TimeSheet_Management/TimeSheet_Management';
import Download_TimeSheet from './Modules/TimeSheet_Management/Download_TimeSheet';
import TimeSheet_Management2 from './Modules/TimeSheet_Management/Add_Attendance';
import Admin_Login from './Admin_Portal/Admin_Login/Admin_Login';
import Admin_Dashboard from './Admin_Portal/Admin_Dashboard/Admin_Dashboard';


import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Product_Management from './Modules/Product_Management/Product_Management';


import { useState } from 'react';
import Model_Management from './Model_Management/Model_Management';
import Inventory_Model_Management from './Inventory_Model_Management/Inventory_Model_Management';
import Sales_Management from './Modules/Sales_Management';

import Expense_Module from './Modules/Expense/index';


import Invoices from './Modules/Invoice/index';


import Otp from './Modules/Expense/Internal Pages/All Expense/OtpPage'
import DropFileAndUpload from './Modules/Expense/Internal Pages/All Expense/DropFile_and_Upload';

function App() {

  // Current LandingPage Element
  const [currentElement, setCurrentElement] = useState("default");

  return (
    <I18nextProvider i18n={i18n}>
      
<Router>
<Navbar/>

{/* <Navbar setCurrentElement={setCurrentElement} currentElement={currentElement}/> */}
    <Routes>
        <Route path="/" element={<Sainta_Homepage currentElement={currentElement} />} />
        <Route path="/test" element={<Testing_Class/>}/>
        <Route path="/register" element={<Registration/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path="/modules" element={<Module/>}/>
     
        <Route path='/customer_management' element={<Customer_Management/>}/>
        <Route path='/employee_management' element={<Employee_Management/>}/>
        <Route path='/timesheet_management' element={<TimeSheet_Management/>}/>
        <Route path='/product_management' element={<Product_Management/>}/>
        <Route path="/inventory-management" element={<Inventory_Model_Management/>}/>
        

        <Route path='/sales-management' element={<Sales_Management/>}/>

        <Route path='/invoice' element={<Invoices/>} />

        <Route path='/expenses' element={<Expense_Module/>}/>



        <Route path='/create_excel' element={<Download_TimeSheet/>}/>
        <Route path='/add_attendance' element={<TimeSheet_Management2/>}/>
        <Route path='/add_employee' element={<Add_Employee/>}/>




        <Route path='/admin_login' element={<Admin_Login/>}/>
        <Route path='/admin_dashboard' element={<Admin_Dashboard/>}/>


<Route path='/model_management' element={<Model_Management/>}/>

<Route path='/review_otp' element={<Otp/>}/>
<Route path='/upload_files' element={<DropFileAndUpload/>}/>

      </Routes>
    <Footer/>
  </Router>

  </I18nextProvider>
  );
}

export default App;
