import { useState } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Components/Home.jsx';
import Navbar from './Components/Navbar.jsx';
import Products from './Components/Products.jsx';



import './App.css'
import Contact from './Components/Contact.jsX';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div className="App">
     <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
