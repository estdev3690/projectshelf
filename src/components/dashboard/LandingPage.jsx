import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Hero from './Hero';
import Benefits from '../Benefits';
import DemoPortfolios from '../DemoPortfolios';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { Logout } from '@mui/icons-material'; // Add this import
import './LandingPage.css'; // Import the CSS file for the

const LandingPage = () => {
  const navigate = useNavigate();
  const { user, logout, loading } = useAuth();
  const [userPortfolios, setUserPortfolios] = useState([]);
  const backendUrl = process.env.REACT_APP_API_URL || 'http://localhost:7000';

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/portfolios`, {
          params: { username: user?.email }
        });
        // Update to access response.data.data.portfolios
        setUserPortfolios(response.data.data?.portfolios || []);
      } catch (error) {
        console.error('Error fetching portfolios:', error);
      }
    };
    
    if (user) {
      fetchPortfolios();
    }
  }, [user]);

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  // Add this right before the return statement
  console.log('Current user:', user);
  console.log('Portfolios data structure:', userPortfolios);
  console.log('Portfolios array:', Array.isArray(userPortfolios) ? userPortfolios : 'Not an array');

  return (
    <div className="landing-page">
      <nav className="main-nav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
        <div className="logo">ProjectShelf</div>
        
        {loading ? null : user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Typography variant="subtitle1" style={{ marginRight: '1rem' }}>
              Welcome {user.fullName}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                logout();
                navigate('/');
              }}
              style={{
                minWidth: '30px',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                padding: 0
              }}
            >
              <Logout />
            </Button>
          </div>
        ) : (
          <div className="nav-buttons">
            <Button
              variant="outlined"
              onClick={() => navigate('/login')}
              style={{ marginRight: '1rem' }}
            >
              Login
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate('/register')}
            >
              Sign Up
            </Button>
          </div>
        )}
      </nav>
      <Hero />
      <Benefits />
      <DemoPortfolios />

      {/* User Portfolios Section */}
      {user && userPortfolios.length > 0 && (
        <section className="user-portfolios" style={{ padding: '2rem', fontFamily: "rajdhani,sans-serif" }}>
          <Typography variant="h4" gutterBottom style={{ textAlign: 'center', marginBottom: '2rem', fontFamily: 'rajdhani,sans-serif', fontWeight: 'bold' }}>
            Public Portfolios ({userPortfolios.length})
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            {userPortfolios.map((portfolio) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={portfolio._id}>
                <Card sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  minHeight: '300px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  background:'linear-gradient(to bottom,rgb(229, 235, 243) 0%,rgb(222, 230, 243))',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    background:'linear-gradient(to top, #f5f7fa 10%,rgb(214, 227, 247))',
                  }
                }}>
                  <CardContent sx={{ 
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <Typography gutterBottom variant="h5" component="h2" sx={{fontFamily:'rajdhani,sans-serif', fontWeight: 'bold'}}>
                        {portfolio.name}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" sx={{fontFamily:'rajdhani,sans-serif', mb: 2}}>
                        {portfolio.jobTitle}
                      </Typography>
                      <Typography variant="body2" paragraph sx={{fontFamily:'rajdhani,sans-serif'}}>
                        {portfolio.summary}
                      </Typography>
                    </div>
                    <Button 
                      variant="contained"
                      size="small" 
                      onClick={() => navigate(`/${portfolio.username}`)} 
                      sx={{
                        fontFamily:'rajdhani,sans-serif',
                        alignSelf: 'flex-start',
                        mt: 2
                      }}
                    >
                      View Portfolio
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </section>
      )}
    </div>
  );
};

export default LandingPage;