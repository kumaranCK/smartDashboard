import React from 'react';

export const LampIcon = ({ color = "#22c55e", size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    <ellipse cx="20" cy="34" rx="8" ry="2.5" fill={color} opacity="0.3" />
    <rect x="18" y="22" width="4" height="12" rx="2" fill={color} opacity="0.7" />
    <path d="M10 20 Q10 8 20 8 Q30 8 30 20 Q30 26 24 28 L16 28 Q10 26 10 20Z" fill={color} opacity="0.85" />
    <ellipse cx="20" cy="10" rx="6" ry="3" fill="white" opacity="0.15" />
  </svg>
);

export const PowerIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M12 2v6" />
    <path d="M5.6 5.6A9 9 0 1 0 18.4 5.6" />
  </svg>
);

export const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

export const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);