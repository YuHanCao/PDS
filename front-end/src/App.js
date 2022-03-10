import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Plantio from './pages/Plantio';
import Menu from './components/Menu';
import Footer from './components/Footer';


function App() {
  return (
    <BrowserRouter> 
    <div> 
      <Menu/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Plantio" element={<Plantio/>}/>
      </Routes>
      <Footer/>
    </div>
  </BrowserRouter>  
  );
}

export default App;
