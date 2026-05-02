import React, { useState } from 'react';
import { signUp } from '../services/api.js';
import './Signup.css';

const Signup = ({ onSignupComplete, onShowLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const response = await signUp({ username, email, password });
      if (response.data?.success) {
        setSuccess('Account created successfully. Please log in.');
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setTimeout(() => {
          onSignupComplete();
        }, 1000);
      } else {
        setError(response.data?.message || 'Sign up failed. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Sign up failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card signup">
        <h2 className="auth-title">Create your account</h2>
        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <label className="auth-label">Name</label>
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="auth-input"
              required
            />
          </div>
          <div className="auth-field">
            <label className="auth-label">Email</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
              required
            />
          </div>
          <div className="auth-field">
            <label className="auth-label">Password</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
              required
            />
          </div>
          <div className="auth-field">
            <label className="auth-label">Confirm Password</label>
            <input
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="auth-input"
              required
            />
          </div>

          {(error || success) && (
            <div className={`auth-message ${error ? 'error' : 'success'}`}>
              {error || success}
            </div>
          )}

          <button
            type='submit'
            disabled={loading}
            className={`auth-button${loading ? ' disabled' : ''}`}
          >
            {loading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?{' '}
          <button type='button' onClick={onShowLogin} className="auth-link">
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
