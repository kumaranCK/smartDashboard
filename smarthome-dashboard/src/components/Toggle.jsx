import React from 'react';

const Toggle = ({ on, onChange }) => (
  <div
    onClick={() => onChange(!on)}
    style={{
      width: 36,
      height: 20,
      borderRadius: 10,
      background: on ? "#a78bfa" : "#374151",
      position: "relative",
      cursor: "pointer",
      transition: "background 0.25s",
      flexShrink: 0,
    }}
  >
    <div style={{
      width: 14,
      height: 14,
      borderRadius: "50%",
      background: "white",
      position: "absolute",
      top: 3,
      left: on ? 19 : 3,
      transition: "left 0.25s",
      boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
    }} />
  </div>
);

export default Toggle;