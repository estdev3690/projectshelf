import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:7000',
});

export const savePortfolio = (portfolioData) => {
  return api.post('/portfolios', portfolioData, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
};

// Add other API calls as needed