import React from 'react';
import DeviceGrid from './DeviceGrid.jsx';

const MainContent = ({ activeTab, setActiveTab, deviceStates, toggleDevice, rooms, currentHome, selectedRoom }) => {
  const currentRoom = rooms[selectedRoom] || rooms[0] || { name: "Living Room" };

  return (
    <div style={{ flex: 1, padding: "24px 28px", overflowY: "auto" }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>{currentRoom.name}</h2>

      {/* Room hero + stats */}
      <div style={{ display: "flex", gap: 16, marginBottom: 24, alignItems: "stretch" }}>
        {/* Room visual */}
        <div style={{
          width: 220, height: 140, borderRadius: 16,
          background: "linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #34d399 100%)",
          flexShrink: 0,
        }} />

        {/* Stats */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{
              flex: 1, background: "#1e2130", borderRadius: 12, padding: "14px 16px",
              display: "flex", alignItems: "center", gap: 10,
            }}>
              <span style={{ fontSize: 24 }}>🌡️</span>
              <div>
                <div style={{ fontSize: 11, color: "#6b7280" }}>Temperature</div>
                <div style={{ fontSize: 20, fontWeight: 700 }}>28°<span style={{ fontSize: 14 }}>C</span></div>
              </div>
            </div>
            <div style={{
              flex: 1, background: "#1e2130", borderRadius: 12, padding: "14px 16px",
              display: "flex", alignItems: "center", gap: 10,
            }}>
              <span style={{ fontSize: 24 }}>☁️</span>
              <div>
                <div style={{ fontSize: 11, color: "#6b7280" }}>Humidity</div>
                <div style={{ fontSize: 20, fontWeight: 700 }}>76<span style={{ fontSize: 14 }}>%</span></div>
              </div>
            </div>
          </div>
          <div style={{
            background: "#1e2130", borderRadius: 12, padding: "10px 14px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 16 }}>💡</span>
              <span style={{ fontSize: 13, color: "#9ca3af" }}>Devices</span>
              <span style={{ fontSize: 12, background: "#374151", borderRadius: 6, padding: "2px 7px", color: "#d1d5db" }}>+{deviceStates.length} devices</span>
              <span style={{ fontSize: 12, background: "#374151", borderRadius: 6, padding: "2px 7px", color: "#d1d5db" }}>{deviceStates.filter(d => d.on).length} on</span>
            </div>
            <div style={{
              width: 36, height: 20, borderRadius: 10, background: "#f59e0b",
              position: "relative", cursor: "pointer",
            }}>
              <div style={{
                width: 14, height: 14, borderRadius: "50%", background: "white",
                position: "absolute", top: 3, right: 3,
              }} />
            </div>
          </div>
        </div>
      </div>

      <DeviceGrid activeTab={activeTab} setActiveTab={setActiveTab} deviceStates={deviceStates} toggleDevice={toggleDevice} />
    </div>
  );
};

export default MainContent;