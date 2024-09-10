import logo from './logo.svg';
import './App.css';


import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Sainta_Homepage from './HomePage/HomePage';
import Footer from './Footer/Footer';

function App() {









  return (
   

    
        

<Router>
<Navbar/>

    <Routes>
        <Route path="/" element={<Sainta_Homepage />} />
      </Routes>

 
 <Footer/>
</Router>

  
  // <Sainta_Homepage/>


  );
}

export default App;
