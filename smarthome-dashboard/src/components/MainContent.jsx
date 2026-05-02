import React from 'react';
import DeviceGrid from './DeviceGrid.jsx';
import './MainContent.css';

const MainContent = ({ activeTab, setActiveTab, deviceStates, toggleDevice, rooms, currentHome, selectedRoom }) => {
  const currentRoom = rooms[selectedRoom] || rooms[0] || { name: "Living Room" };

  return (
    <div className="main-content">
      <h2 className="main-heading">{currentRoom.name}</h2>

      {/* Room hero + stats */}
      <div className="room-hero-row">
        {/* Room visual */}
        <div className="room-hero-preview" />

        {/* Stats */}
        <div className="room-stat-row">
          <div className="room-stat-group">
            <div className="room-stat-card">
              <span className="room-stat-icon">🌡️</span>
              <div>
                <div className="room-stat-label">Temperature</div>
                <div className="room-stat-value">28°<span className="room-stat-unit">C</span></div>
              </div>
            </div>
            <div className="room-stat-card">
              <span className="room-stat-icon">☁️</span>
              <div>
                <div className="room-stat-label">Humidity</div>
                <div className="room-stat-value">76<span className="room-stat-unit">%</span></div>
              </div>
            </div>
          </div>
          <div className="room-summary">
            <div className="room-summary-info">
              <span className="room-summary-icon">💡</span>
              <span className="room-summary-text">Devices</span>
              <span className="room-summary-tag">+{deviceStates.length} devices</span>
              <span className="room-summary-tag">{deviceStates.filter(d => d.on).length} on</span>
            </div>
            <div className="room-summary-switch">
              <div className="room-summary-switch-thumb" />
            </div>
          </div>
        </div>
      </div>

      <DeviceGrid activeTab={activeTab} setActiveTab={setActiveTab} deviceStates={deviceStates} toggleDevice={toggleDevice} />
    </div>
  );
};

export default MainContent;