import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Verify token by fetching user profile
          const response = await fetch('http://localhost:5000/api/user/profile', {
            credentials: 'include',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            const data = await response.json();
            setUser(data.user);
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem('token');
            setIsAuthenticated(false);
          }
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const register = async (name, email, password, confirmPassword) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.register({ name, email, password, confirmPassword });
      setUser(response.user);
      setIsAuthenticated(true);
      if (response.token) {
        localStorage.setItem('token', response.token);
      }
      return response;
    } catch (err) {
      const errorMessage = err.message === 'Failed to fetch'
        ? 'Unable to connect to the backend API. Make sure the backend server is running and the frontend origin is allowed.'
        : err.message || 'Registration failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.login({ email, password });
      setUser(response.user);
      setIsAuthenticated(true);
      if (response.token) {
        localStorage.setItem('token', response.token);
      }
      return response;
    } catch (err) {
      const errorMessage = err.message === 'Failed to fetch'
        ? 'Unable to connect to the backend API. Make sure the backend server is running and the frontend origin is allowed.'
        : err.message || 'Login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authAPI.logout();
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('token');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    isAuthenticated,
    register,
    login,
    logout,
    setError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
