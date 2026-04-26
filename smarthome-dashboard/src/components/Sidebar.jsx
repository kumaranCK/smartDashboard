import React from 'react';
import { navItems, actionItems, moreItems } from '../constants.js';

const Sidebar = ({ activeNav, setActiveNav, onLogout }) => {
  return (
    <div style={{
      width: 200,
      background: "#13151f",
      display: "flex",
      flexDirection: "column",
      padding: "24px 16px",
      borderRight: "1px solid #1f2235",
      flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 36 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16, fontWeight: 700, color: "white",
        }}>B</div>
        <span style={{ fontWeight: 700, fontSize: 18, color: "white" }}>Bems</span>
      </div>

      {/* Menu */}
      <div style={{ marginBottom: 8 }}>
        <p style={{ fontSize: 11, color: "#6b7280", fontWeight: 600, letterSpacing: "0.08em", marginBottom: 8, textTransform: "uppercase" }}>Menu</p>
        {navItems.map(item => (
          <button key={item.label} onClick={() => setActiveNav(item.label)} style={{
            display: "flex", alignItems: "center", gap: 10, width: "100%",
            padding: "9px 12px", borderRadius: 8, border: "none", cursor: "pointer",
            background: activeNav === item.label ? "linear-gradient(90deg, #6366f1, #8b5cf6)" : "transparent",
            color: activeNav === item.label ? "white" : "#9ca3af",
            fontWeight: activeNav === item.label ? 600 : 400,
            fontSize: 14, marginBottom: 2, textAlign: "left",
            transition: "all 0.2s",
          }}>
            <span style={{ fontSize: 16 }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>

      <div style={{ marginTop: 16, marginBottom: 8 }}>
        <p style={{ fontSize: 11, color: "#6b7280", fontWeight: 600, letterSpacing: "0.08em", marginBottom: 8, textTransform: "uppercase" }}>Actions</p>
        {actionItems.map(item => (
          <button key={item.label} onClick={item.label === 'Logout' ? onLogout : undefined} style={{
            display: "flex", alignItems: "center", gap: 10, width: "100%",
            padding: "9px 12px", borderRadius: 8, border: "none", cursor: "pointer",
            background: "transparent", color: "#9ca3af", fontSize: 14, marginBottom: 2, textAlign: "left",
          }}>
            <span style={{ fontSize: 16 }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>

      <div style={{ marginTop: "auto" }}>
        <p style={{ fontSize: 11, color: "#6b7280", fontWeight: 600, letterSpacing: "0.08em", marginBottom: 8, textTransform: "uppercase" }}>More</p>
        {moreItems.map(item => (
          <button key={item.label} style={{
            display: "flex", alignItems: "center", gap: 10, width: "100%",
            padding: "9px 12px", borderRadius: 8, border: "none", cursor: "pointer",
            background: "transparent", color: "#9ca3af", fontSize: 14, marginBottom: 2, textAlign: "left",
          }}>
            <span style={{ fontSize: 16 }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;