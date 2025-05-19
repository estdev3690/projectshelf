import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography } from '@mui/material';

const PortfolioView = () => {
  const { id } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const backendUrl = process.env.REACT_APP_API_URL || 'https://projectshelf-vvwo.onrender.com';

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/portfolios/${id}`);
        setPortfolio(response.data);
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      }
    };
    fetchPortfolio();
  }, [id]);

  if (!portfolio) return <div>Loading...</div>;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3">{portfolio.name}</Typography>
      <Typography variant="h5">{portfolio.jobTitle}</Typography>
      <Typography>{portfolio.summary}</Typography>

    </Box>
  );
};

export default PortfolioView;