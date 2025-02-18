import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Budgets from './pages/Budgets';
import "bootstrap/dist/css/bootstrap.min.css";

function App() { 
  return (
    <Router>
      <Navbar/>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Transactions />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/budgets" element={<Budgets />} />
          </Routes>
        </div>
    </Router>
    
  )
}

export default App