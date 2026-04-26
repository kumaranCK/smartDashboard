import React from 'react';
import { BellIcon } from './icons.jsx';

const TopBar = () => {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "16px 28px", borderBottom: "1px solid #1f2235",
      background: "#13151f",
    }}>
      <div style={{ fontSize: 22, fontWeight: 700 }}>
        Good morning ☀️
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          background: "#1e2130", borderRadius: 20, padding: "6px 14px",
          fontSize: 13, cursor: "pointer", color: "#d1d5db",
        }}>
          Home 1 <span style={{ marginLeft: 4 }}>▾</span>
        </div>
        <div style={{
          width: 36, height: 36, borderRadius: "50%", background: "#1e2130",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", color: "#9ca3af",
        }}>
          <BellIcon />
        </div>
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          background: "linear-gradient(135deg, #f59e0b, #ef4444)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, fontWeight: 700, color: "white", cursor: "pointer",
        }}>U</div>
      </div>
    </div>
  );
};

export default TopBar;