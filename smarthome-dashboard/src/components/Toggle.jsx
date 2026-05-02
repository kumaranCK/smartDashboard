import React from 'react';
import './Toggle.css';

const Toggle = ({ on, onChange, deviceId }) => (
  <div
    onClick={() => onChange(deviceId)}
    className={`toggle${on ? ' on' : ''}`}
  >
    <div className="toggle-thumb" />
  </div>
);

export default Toggle;