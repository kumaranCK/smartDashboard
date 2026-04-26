import React, { useState } from 'react';
import { login } from '../services/api.js';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await login({ email, password });
      const { access_token, refresh_token } = response.data;
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      onLogin();
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: '#0f1117',
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      color: '#e5e7eb'
    }}>
      <div style={{
        background: '#1e2130',
        padding: '40px',
        borderRadius: '16px',
        width: '400px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '24px', fontWeight: '700' }}>
          Smart Home Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#9ca3af' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #374151',
                background: '#13151f',
                color: '#e5e7eb',
                fontSize: '16px'
              }}
              required
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#9ca3af' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #374151',
                background: '#13151f',
                color: '#e5e7eb',
                fontSize: '16px'
              }}
              required
            />
          </div>
          {error && (
            <div style={{ color: '#ef4444', marginBottom: '20px', fontSize: '14px' }}>
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              background: loading ? '#374151' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: 'white',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;