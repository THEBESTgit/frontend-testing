import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Reemplazamos Switch por Routes
import Order from './pages/Order'; 
import './App.css'; 

function App() {
  return (
    <Router>
      <Routes> 
        <Route path="/orders" element={<Order />} /> 
      </Routes>
    </Router>
  );
}

export default App;



