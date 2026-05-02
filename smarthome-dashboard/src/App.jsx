import React, { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./App.css";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authMode, setAuthMode] = useState('login');

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

  const showLogin = () => setAuthMode('login');
  const showSignup = () => setAuthMode('signup');

  if (loading) {
    return <div className="page-loading">Loading...</div>;
  }

  if (isAuthenticated) {
    return <Dashboard onLogout={handleLogout} />;
  }

  return authMode === 'signup'
    ? <Signup onSignupComplete={showLogin} onShowLogin={showLogin} />
    : <Login onLogin={handleLogin} onShowSignup={showSignup} />;
}