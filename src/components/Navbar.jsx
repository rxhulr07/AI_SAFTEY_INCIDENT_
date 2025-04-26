import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LOGO from '../assets/profile.png'
import Company from '../assets/company.webp'
import './Navbar.css';

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`navbar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="navbar-inner">
        <div className="logo">
          <img src={Company} alt="Company Logo" className="logo-img" />
          {!isCollapsed && <div className="logo-text">Company</div>}
        </div>

        <ul className="nav-menu">
          <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
            <Link to="/" className="nav-link">
              <i className="nav-icon">🏠</i>
              {!isCollapsed && <span className="nav-text">Dashboard</span>}
            </Link>
          </li>
          <li className={`nav-item ${location.pathname === '/chart' ? 'active' : ''}`}>
            <Link to="/chart" className="nav-link">
              <i className="nav-icon">📈</i>
              {!isCollapsed && <span className="nav-text">Chart</span>}
            </Link>
          </li>
  
         
        </ul>

        <div className="profile-section">
          <img src={LOGO} alt="Profile" className="profile-pic" />
          {!isCollapsed && (
            <div className="profile-info">
              <div className="profile-name">Your Name</div>
              <div className="profile-role">UI Designer</div>
            </div>
          )}
        </div>
      </div>

      <div className="collapse-arrow" onClick={toggleSidebar}>
        <span>
          ⮜
        </span>
      </div>
    </div>
  );
};

export default Navbar;
