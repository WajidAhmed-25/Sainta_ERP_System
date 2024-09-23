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
      </Routes>

 
 <Footer/>
</Router>

  
  // <Sainta_Homepage/>


  );
}

export default App;
