// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function for API calls
const apiCall = async (endpoint, method = 'GET', data = null) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
    credentials: 'include', // Include cookies for authentication
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'API request failed');
    }

    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Authentication API
export const authAPI = {
  register: (userData) => apiCall('/auth/register', 'POST', userData),
  login: (credentials) => apiCall('/auth/login', 'POST', credentials),
  logout: () => apiCall('/auth/logout', 'POST'),
};

// User API
export const userAPI = {
  getProfile: () => apiCall('/user/profile', 'GET'),
  updateProfile: (userData) => apiCall('/user/profile', 'PUT', userData),
};

// Crypto API
export const cryptoAPI = {
  getAllCryptos: () => apiCall('/crypto', 'GET'),
  getTopGainers: () => apiCall('/crypto/gainers', 'GET'),
  getNewListings: () => apiCall('/crypto/new', 'GET'),
  getCryptoById: (id) => apiCall(`/crypto/${id}`, 'GET'),
  createCrypto: (data) => apiCall('/crypto', 'POST', data),
  updateCrypto: (id, data) => apiCall(`/crypto/${id}`, 'PUT', data),
  deleteCrypto: (id) => apiCall(`/crypto/${id}`, 'DELETE'),
};

// Health check
export const healthCheck = () => apiCall('/health', 'GET');

export default apiCall;
