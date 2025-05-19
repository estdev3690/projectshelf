import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  });

  const [passwordError, setPasswordError] = useState('');

    const handleChange = (e) => {
      if (e.target.name === 'password') {
        const value = e.target.value;
        if (/[^a-zA-Z]/.test(value)) {
          setPasswordError('Password must contain only letters (a-z, A-Z)');
        } else {
          setPasswordError('');
        }
        setFormData({ ...formData, password: value.replace(/[^a-zA-Z]/g, '') });
      } else {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      }
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
      fullName: formData.name.trim(),
      email: formData.email.trim(),
      username: formData.username.trim(),
      password: formData.password.trim()
    };
    console.log('Sending data:', userData);
    try {
      await register(userData);
      clearInterval(countdownInterval);
      // Change navigation from dashboard to login
      navigate('/login');
    } catch (err) {
      clearInterval(countdownInterval);
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Create a password (letters only)"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
              />
              {passwordError && (
                <div 
                  className="error-message" 
                  style={{ 
                    color: 'red', 
                    fontSize: '0.8rem', 
                    marginTop: '5px',
                    fontStyle: 'italic'
                  }}
                >
                  {passwordError}
                </div>
              )}
            </div>
       
 
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? `Creating Account... ${countdown > 0 ? `(${countdown}s)` : ''}` : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;