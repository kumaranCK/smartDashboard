import React from 'react';
import { rooms as defaultRooms } from '../constants.js';
import { PowerIcon, SearchIcon } from './icons.jsx';

const RoomPanel = ({ selectedRoom, setSelectedRoom, rooms = defaultRooms }) => {
  return (
    <div style={{
      width: 220, background: "#13151f", padding: "24px 16px",
      borderLeft: "1px solid #1f2235", display: "flex", flexDirection: "column", gap: 20, overflowY: "auto",
    }}>
      {/* One Touch */}
      <div style={{
        border: "1.5px solid #6366f1", borderRadius: 14, padding: "14px",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span style={{ color: "#818cf8", fontWeight: 700, fontSize: 15 }}>One touch</span>
          <div style={{
            width: 30, height: 30, borderRadius: "50%", background: "#6366f1",
            display: "flex", alignItems: "center", justifyContent: "center", color: "white", cursor: "pointer",
          }}>
            <PowerIcon />
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              height: 50, background: "#1e2130", borderRadius: 10,
              display: "flex", alignItems: "center", justifyContent: "center",
              gridColumn: i === 2 ? "span 1" : "span 1",
            }} />
          ))}
          <div style={{
            height: 50, background: "#1e2130", borderRadius: 10,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#6b7280", fontSize: 22, cursor: "pointer",
          }}>+</div>
        </div>
        <div style={{ fontSize: 11, color: "#6b7280", textAlign: "center", marginTop: 8 }}>+3 other devices</div>
      </div>

      {/* Rooms */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span style={{ fontWeight: 700, fontSize: 16 }}>Rooms</span>
          <div style={{
            background: "#1e2130", borderRadius: 8, padding: "5px 8px",
            display: "flex", alignItems: "center", gap: 5, color: "#6b7280",
          }}>
            <SearchIcon />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {rooms.map((room, i) => (
            <div key={room.id || room._id} onClick={() => setSelectedRoom(i)} style={{
              background: selectedRoom === i ? "#1e2a45" : "#1e2130",
              borderRadius: 10, padding: "10px 12px",
              display: "flex", alignItems: "center", gap: 10,
              cursor: "pointer", transition: "background 0.2s",
              border: selectedRoom === i ? "1px solid #3b82f6" : "1px solid transparent",
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                background: selectedRoom === i ? "#3b82f6" : "#374151",
                flexShrink: 0, transition: "background 0.2s",
              }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#e5e7eb" }}>{room.name}</div>
                <div style={{ fontSize: 11, color: "#6b7280" }}>{room.devices || room.devices?.length || 0} devices</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomPanel;