import React from 'react';
import { navItems, actionItems, moreItems } from '../constants.js';
import './Sidebar.css';

const Sidebar = ({ activeNav, setActiveNav, onLogout }) => {
  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo-row">
        <div className="sidebar-logo">B</div>
        <span className="sidebar-logo-text">Bems</span>
      </div>

      {/* Menu */}
      <div className="sidebar-section">
        <p className="sidebar-section-label">Menu</p>
        {navItems.map(item => (
          <button
            key={item.label}
            onClick={() => setActiveNav(item.label)}
            className={`sidebar-button${activeNav === item.label ? ' active' : ''}`}
          >
            <span>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>

      <div className="sidebar-section">
        <p className="sidebar-section-label">Actions</p>
        {actionItems.map(item => (
          <button
            key={item.label}
            onClick={item.label === 'Logout' ? onLogout : undefined}
            className="sidebar-button"
          >
            <span>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>

      <div className="sidebar-section">
        <p className="sidebar-section-label">More</p>
        {moreItems.map(item => (
          <button key={item.label} className="sidebar-button">
            <span>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;