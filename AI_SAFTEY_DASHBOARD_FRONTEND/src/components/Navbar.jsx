// src/components/Navbar/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">AI Safety Monitor</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/reports">Reports</Link></li>
        <li><Link to="/analytics">Analytics</Link></li>
        <li><Link to="/settings">Settings</Link></li>
      </ul>
      <div className="user-section">
        <span>Admin User</span>
      </div>
    </nav>
  );
};

export default Navbar;