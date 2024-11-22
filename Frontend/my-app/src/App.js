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



        <Route path='/create_excel' element={<Download_TimeSheet/>}/>
        <Route path='/add_attendance' element={<TimeSheet_Management2/>}/>
        <Route path='/add_employee' element={<Add_Employee/>}/>




        <Route path='/admin_login' element={<Admin_Login/>}/>
        <Route path='/admin_dashboard' element={<Admin_Dashboard/>}/>


<Route path='/model_management' element={<Model_Management/>}/>

      </Routes>
 <Footer/>
</Router>

 </I18nextProvider>
  );
}

export default App;







///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





// // src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { AuthProvider } from './AuthContext';
// import ProtectedRoute from './PrivateRoute';

// import Navbar from './Navbar/Navbar';
// import Sainta_Homepage from './HomePage/HomePage';
// import Footer from './Footer/Footer';
// import Testing_Class from './Testing/Test';
// import Registration from './Registration/Registration';
// import Login from './Login/Login';
// import Module from './Modules/Module';
// import Customer_Management from './Modules/Customer_Management/Customer_Management';
// import Employee_Management from './Modules/Employee_Management/Employee_Management';
// import Add_Employee from './Modules/Employee_Management/Add_Employee';
// import TimeSheet_Management from './Modules/TimeSheet_Management/TimeSheet_Management';
// import Download_TimeSheet from './Modules/TimeSheet_Management/Download_TimeSheet';
// import TimeSheet_Management2 from './Modules/TimeSheet_Management/Add_Attendance';
// import Admin_Login from './Admin_Portal/Admin_Login/Admin_Login';
// import Admin_Dashboard from './Admin_Portal/Admin_Dashboard/Admin_Dashboard';
// import { I18nextProvider } from 'react-i18next';
// import i18n from './i18n';


// function App() {
//   return (
//     <AuthProvider>
//       <I18nextProvider i18n={i18n}>
//         <Router>
//           <Navbar />
//           <Routes>
//             <Route path="/" element={<Sainta_Homepage />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Registration />} />
//             <Route path="/test" element={<Testing_Class />} />
//             {/* Protected Routes */}
//             <Route path="/modules" element={<ProtectedRoute><Module /></ProtectedRoute>} />
//             <Route path="/customer_management" element={<ProtectedRoute><Customer_Management /></ProtectedRoute>} />
//             <Route path="/employee_management" element={<ProtectedRoute><Employee_Management /></ProtectedRoute>} />
//             <Route path="/add_employee" element={<ProtectedRoute><Add_Employee /></ProtectedRoute>} />
//             <Route path="/timesheet_management" element={<ProtectedRoute><TimeSheet_Management /></ProtectedRoute>} />
//             <Route path="/create_excel" element={<ProtectedRoute><Download_TimeSheet /></ProtectedRoute>} />
//             <Route path="/add_attendance" element={<ProtectedRoute><TimeSheet_Management2 /></ProtectedRoute>} />
//             <Route path="/admin_login" element={<Admin_Login />} />
//             <Route path="/admin_dashboard" element={<ProtectedRoute><Admin_Dashboard /></ProtectedRoute>} />
//           </Routes>
//           <Footer />
//         </Router>
//       </I18nextProvider>
//     </AuthProvider>
//   );
// }

// export default App;





















