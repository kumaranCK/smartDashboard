import React from 'react';
import { BellIcon } from './icons.jsx';
import './TopBar.css';

const TopBar = () => {
  return (
    <div className="topbar">
      <div className="topbar-title">Good morning ☀️</div>
      <div className="topbar-actions">
        <div className="topbar-home">
          Home 1 <span>▾</span>
        </div>
        <div className="topbar-icon-btn">
          <BellIcon />
        </div>
        <div className="topbar-user-btn">U</div>
      </div>
    </div>
  );
};

export default TopBar;