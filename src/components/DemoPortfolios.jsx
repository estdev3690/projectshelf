import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Grid, Card, Box,CardMedia, CardContent, Typography, Button } from '@mui/material';
import image1 from '../public/template2.jpg';
import image2 from '../public/tw.png';
import image3 from '../public/arcus-personal-portfolio-bootstrap-html-template_351051-original.webp';
import image4 from '../public/alime-free-template-353x278.jpg';
import image5 from '../public/1600w-vzScEqAI__M.webp';
import image6 from '../public/template3.jpg';
import image7 from '../public/a2c4d747-4bfc-4bbd-9735-bf880b4573b4-cover.png';
import image8 from '../public/sp_slide_h_1.webp';
import image9 from '../public/UX-Case-Study-Generator.png';
import image10 from '../public/a274f800-ed9c-4fe2-9734-c13d2e11b1c2.png'
import './DemoPortfolios.css'

const DemoPortfolios = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const backendUrl = process.env.REACT_APP_API_URL || 'http://localhost:7000'; // Changed from 8000 to 7000

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/portfolios`);
        console.log('API Response:', response.data);
        
        if (response.data.success) {
          if (response.data.data?.portfolios?.length > 0) {
            setPortfolios(response.data.data.portfolios);
          } else {
            setError('No portfolios found in database');
          }
        } else {
          setError(response.data.message || 'Failed to load portfolios');
        }
      } catch (err) {
        console.error('API Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolios();
  }, []);

  const handleCreateFirstPortfolio = () => {
    if (user) {
      navigate('/dashboard/create-case-study');
    } else {
      navigate('/register');
    }
  };

  if (loading) return <div>Loading portfolios...</div>;
  if (error) return <div>Error loading portfolios: {error}</div>;
  
  // Example portfolio templates
  const exampleTemplates = [
    { id: 1, name: 'Modern', image: image10},
    { id: 2, name: 'Creative', image: image2 },
    { id: 3, name: 'Elegant', image: image3 },
    { id: 4, name: 'Minimal', image:  image4 },
    { id: 5, name: 'Professional', image: image5},
    { id: 6, name: 'Clean', image: image6},
    { id: 7, name: 'Fancy', image: image7},
    { id: 8, name: 'Minimalist', image: image8},
    { id: 9, name: 'Sophisticated', image: image9},
  
  ];

  const handleTemplateSelect = (templateId) => {
    navigate('/dashboard/create-case-study', { state: { templateId } });
  };

  return (
    <section id="demo-portfolios" className="demo-portfolios" style={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 ,textAlign:"center",fontFamily:"rajdhani,sans-serif",fontWeight:"bold"}} >
        Choose a Portfolio Template
      </Typography>
      
      <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
        {exampleTemplates.map((template) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={template.id}>
            <Card sx={{ 
              cursor: 'pointer',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'scale(1.03)'
              }
            }} onClick={() => handleTemplateSelect(template.id)}>
              <CardMedia
                component="img"
                sx={{ 
                  height: 200,
                  objectFit: 'cover',
                  width: '100%'
                }}
                image={template.image}
                alt={template.name}
              />
              <CardContent sx={{ flexGrow: 1 ,fontFamily:"rajdhani,sans-serif"}}>
                <Typography variant="h6" align="center" sx={{fontFamily:"rajdhani,sans-serif"}}>
                  {template.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </section>
  );
};

export default DemoPortfolios;