import logo from './logo.svg';
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

function App() {









  return (
   

    
        

<Router>
<Navbar/>

    <Routes>
        <Route path="/" element={<Sainta_Homepage />} />
        <Route path="/test" element={<Testing_Class/>}/>
        <Route path="/register" element={<Registration/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path="/modules" element={<Module/>}/>

        <Route path='/customer_management' element={<Customer_Management/>}/>
        <Route path='/employee_management' element={<Employee_Management/>}/>
        <Route path='/timesheet_management' element={<TimeSheet_Management/>}/>

        <Route path='/create_excel' element={<Download_TimeSheet/>}/>
        <Route path='/add_attendance' element={<TimeSheet_Management2/>}/>

        <Route path='/add_employee' element={<Add_Employee/>}/>



{/* Admin Login */}

        <Route path='/admin_login' element={<Admin_Login/>}/>

        <Route path='/admin_dashboard' element={<Admin_Dashboard/>}/>
        





        


{/*  <Route path='/back_employe' element={<Employee_Management1/>}/>
 <Route path='/Back' element={<Customer_Management1/>}/> */}
      </Routes>

 
 <Footer/>
</Router>

  
  // <Sainta_Homepage/>


  );
}

export default App;
