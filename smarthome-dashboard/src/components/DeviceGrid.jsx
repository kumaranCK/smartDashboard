import React from 'react';
import { deviceTabs } from '../constants.js';
import { LampIcon } from './icons.jsx';
import Toggle from './Toggle.jsx';
import './DeviceGrid.css';

const DeviceGrid = ({ activeTab, setActiveTab, deviceStates, toggleDevice }) => {
  // Filter devices based on active tab
  const filteredDevices = deviceStates.filter(device => {
    // Extract the base tab name (remove the index suffix)
    const baseTab = activeTab.replace(/\d+$/, '');
    // For now, show all devices if tab is "Lights" (default), otherwise filter by category if available
    if (baseTab === 'Lights') return true;
    if (baseTab === 'Fans') return device.category === 'FAN' || device.type === 'Fan';
    return true; // Show all for other tabs for now
  });

  return (
    <>
      {/* Devices section */}
      <h3 className="device-grid-heading">Devices</h3>

      {/* Tabs */}
      <div className="device-tabs">
        {deviceTabs.map((tab, i) => {
          const tabId = tab + i;
          const isActive = activeTab === tabId || (i === 0 && activeTab === 'Lights');
          return (
            <button
              key={i}
              onClick={() => setActiveTab(tabId)}
              className={`device-tab${isActive ? ' active' : ''}`}
            >
              <span className="device-tab-icon">💡</span> {tab}
            </button>
          );
        })}
      </div>

      {/* Device cards grid */}
      <div className="device-cards">
        {filteredDevices.map(device => (
          <div key={device.id} className={`device-card${device.on ? ' on' : ''}`} onClick={() => toggleDevice(device.id)}>
            <div className="device-card-header">
              <div>
                <div className="device-card-subtitle">lightheads</div>
                <div className="device-card-title">{device.name}</div>
              </div>
              <LampIcon color={device.on ? device.color : '#374151'} size={38} />
            </div>
            <Toggle on={device.on} onChange={toggleDevice} deviceId={device.id} />
          </div>
        ))}
      </div>
    </>
  );
};

export default DeviceGrid;