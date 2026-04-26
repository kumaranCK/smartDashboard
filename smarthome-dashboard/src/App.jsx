import React, { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsAuthenticated(false);
  };

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#0f1117', color: '#e5e7eb' }}>Loading...</div>;
  }

  return isAuthenticated ? <Dashboard onLogout={handleLogout} /> : <Login onLogin={handleLogin} />;
}