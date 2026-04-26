import React from 'react';
import { deviceTabs } from '../constants.js';
import { LampIcon } from './icons.jsx';
import Toggle from './Toggle.jsx';

const DeviceGrid = ({ activeTab, setActiveTab, deviceStates, toggleDevice }) => {
  return (
    <>
      {/* Devices section */}
      <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 14 }}>Devices</h3>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
        {deviceTabs.map((tab, i) => (
          <button key={i} onClick={() => setActiveTab(tab + i)} style={{
            padding: "7px 16px", borderRadius: 20, border: "none", cursor: "pointer",
            background: (activeTab === tab + i || (i === 0 && activeTab === "Lights")) ? "#6366f1" : "#1e2130",
            color: (activeTab === tab + i || (i === 0 && activeTab === "Lights")) ? "white" : "#9ca3af",
            fontSize: 13, fontWeight: 500, transition: "all 0.2s",
            display: "flex", alignItems: "center", gap: 5,
          }}>
            <span style={{ fontSize: 12 }}>💡</span> {tab}
          </button>
        ))}
      </div>

      {/* Device cards grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {deviceStates.map(device => (
          <div key={device.id} style={{
            background: "#1e2130", borderRadius: 14, padding: "16px",
            display: "flex", flexDirection: "column", gap: 10,
            border: device.on ? "1px solid rgba(99,102,241,0.3)" : "1px solid transparent",
            transition: "border 0.2s",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 10, color: "#6b7280", marginBottom: 3 }}>lightheads</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#e5e7eb" }}>{device.name}</div>
              </div>
              <LampIcon color={device.on ? device.color : "#374151"} size={38} />
            </div>
            <Toggle on={device.on} onChange={() => toggleDevice(device.id)} />
          </div>
        ))}
      </div>
    </>
  );
};

export default DeviceGrid;