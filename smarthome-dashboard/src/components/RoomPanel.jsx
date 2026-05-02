import React from 'react';
import { rooms as defaultRooms } from '../constants.js';
import { PowerIcon, SearchIcon } from './icons.jsx';
import './RoomPanel.css';

const RoomPanel = ({ selectedRoom, setSelectedRoom, rooms = defaultRooms }) => {
  return (
    <div className="room-panel">
      {/* One Touch */}
      <div className="room-panel-touch">
        <div className="room-panel-touch-header">
          <span className="room-panel-touch-title">One touch</span>
          <div className="room-panel-touch-action">
            <PowerIcon />
          </div>
        </div>
        <div className="room-panel-touch-grid">
          {[0, 1, 2].map(i => (
            <div key={i} className="room-panel-touch-tile" />
          ))}
          <div className="room-panel-touch-tile room-panel-touch-add">+</div>
        </div>
        <div className="room-panel-touch-note">+3 other devices</div>
      </div>

      {/* Rooms */}
      <div>
        <div className="room-panel-rooms-header">
          <span className="room-panel-rooms-title">Rooms</span>
          <div className="room-panel-rooms-search">
            <SearchIcon />
          </div>
        </div>
        <div className="room-panel-list">
          {rooms.map((room, i) => {
            const deviceCount = Array.isArray(room.devices)
              ? room.devices.length
              : typeof room.devices === 'number'
                ? room.devices
                : 0;

            return (
              <div
                key={room.id || room._id}
                onClick={() => setSelectedRoom(i)}
                className={`room-panel-room${selectedRoom === i ? ' active' : ''}`}
              >
                <div className="room-panel-room-dot" />
                <div>
                  <div className="room-panel-room-name">{room.name}</div>
                  <div className="room-panel-room-count">{deviceCount} devices</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RoomPanel;