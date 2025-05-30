import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const { login, loading } = useAuth();
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState(0);
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCountdown(20);
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    const userData = {
      email: formData.emailOrUsername.includes('@') ? formData.emailOrUsername.trim() : undefined,
      username: !formData.emailOrUsername.includes('@') ? formData.emailOrUsername.trim() : undefined,
      password: formData.password.trim()
    };
    console.log('Sending data:', userData);
    try {
      const response = await login(userData);
      clearInterval(countdownInterval);
      console.log('Login successful:', response); // Debugging line
      console.log('Navigating to dashboard'); // Debugging line
      navigate('/'); // Redirect to dashboard on success
    } catch (err) {
      clearInterval(countdownInterval);
      console.error('Login error:', err); // Debugging line
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="form-group">
            <label htmlFor="emailOrUsername">Email or Username</label>
            <input
              type="text"
              id="emailOrUsername"
              name="emailOrUsername"
              placeholder="Enter your email or username"
              value={formData.emailOrUsername}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? `Logging In...${countdown > 0 ? `(${countdown}s)` : ''}` : 'Login'}
          </button>
          <div className="auth-option" style={{ marginTop: '1rem', textAlign: 'center' }}>
            Don't have an account?{' '}
            <a href="/signup" style={{ color: '#1976d2', textDecoration: 'none' }}>
              Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;