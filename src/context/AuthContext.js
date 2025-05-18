import React, { createContext, useState, useContext ,useEffect} from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Add error state
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      console.log('Loaded token:', token);
  
      if (token) {
        try {
          const response = await axios.get('http://localhost:8000/api/v1/users/current-user', {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
  
          console.log('Full user response:', response);
  
          if (response.data.success) {
            setUser(response.data.data); // ✅ Corrected line
          } else {
            setUser(null);
          }
        } catch (error) {
          console.error('Token verification failed:', error);
          localStorage.removeItem('token');
          setUser(null);
        }
      } else {
        console.log('No token found in localStorage');
      }
  
      setLoading(false);
    };
  
    verifyToken();
  }, []);
  
  
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      console.log('Token from storage:', token);
  
      if (!token) {
        setLoading(false);
        setUser(null);
        return;
      }
  
      try {
        const response = await axios.get('http://localhost:8000/api/v1/users/current-user', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        console.log('User data response:', response.data);
        
        if (response.data?.success) {
          // Handle both response structures
          const userData = response.data.data.user || response.data.data;
          setUser(userData);
        } else {
          throw new Error('Invalid user data');
        }
      } catch (error) {
        console.error('Token verification error:', error);
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
  
    verifyToken();
  }, []);

  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await axios.post(
        'http://localhost:8000/api/v1/users/register',
        userData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.data.success) {
        setUser(response.data.data);
        return response.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
};

  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await axios.post(
        'http://localhost:8000/api/v1/users/login', 
        credentials,
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      
      if (response.data.success) {
        const userData = response.data.data.user || response.data.data;
        setUser(userData);
        localStorage.setItem('token', response.data.data.accessToken);
        return response.data;
      }
      throw new Error(response.data.message);
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      error, // Now properly defined
      register, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
