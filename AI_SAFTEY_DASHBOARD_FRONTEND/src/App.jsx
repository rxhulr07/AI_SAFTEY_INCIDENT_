// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AISafetyDashboard from './components/AISafetyDashboard';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<AISafetyDashboard />} />
            {/* Add more routes here as needed */}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;