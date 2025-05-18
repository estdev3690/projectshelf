import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';

const PublicPortfolio = () => {
  const { username } = useParams();
  const { portfolio, loading, getPortfolioByUsername } = usePortfolio();

  useEffect(() => {
    getPortfolioByUsername(username);
  }, [username]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="portfolio-container">
      {/* Display portfolio data */}
    </div>
  );
};

export default PublicPortfolio;