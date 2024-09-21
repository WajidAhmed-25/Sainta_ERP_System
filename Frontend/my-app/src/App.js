import logo from './logo.svg';
import './App.css';


import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Sainta_Homepage from './HomePage/HomePage';
import Footer from './Footer/Footer';
import Testing_Class from './Testing/Test';
import Registration from './Registration/Registration';
import Login from './Login/Login';

function App() {









  return (
   

    
        

<Router>
<Navbar/>

    <Routes>
        <Route path="/" element={<Sainta_Homepage />} />
        <Route path="/test" element={<Testing_Class/>}/>
        <Route path="/register" element={<Registration/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>

 
 <Footer/>
</Router>

  
  // <Sainta_Homepage/>


  );
}

export default App;
