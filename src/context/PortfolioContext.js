import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createPortfolio = async (portfolioData) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/v1/portfolios', portfolioData);
      setPortfolio(response.data.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create portfolio');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getPortfolioByUsername = async (username) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/v1/portfolios/${username}`);
      setPortfolio(response.data.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Portfolio not found');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <PortfolioContext.Provider value={{
      portfolio,
      loading,
      error,
      createPortfolio,
      getPortfolioByUsername
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);