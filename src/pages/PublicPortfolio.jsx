import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Typography,
  Avatar,
  Chip,
  CircularProgress,
  Stack,
  Button,
  Link,
  Container,
} from '@mui/material';
import { GitHub, LinkedIn } from '@mui/icons-material';
import { motion } from 'framer-motion';

const PublicPortfolio = () => {
  const { username } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [error, setError] = useState(null);
  const backendUrl = 'https://projectshelf-vvwo.onrender.com';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/portfolios`, { params: { username } });
        const data = res.data?.data?.portfolios?.find((p) => p.username === username);
        if (!data) throw new Error('No data found');
        setPortfolio(data);
      } catch (err) {
        setError('Error loading portfolio. Please check backend or username.');
        console.error(err);
      }
    };
    fetchData();
  }, [username]);

  if (error) {
    return <Box p={4}><Typography color="error">{error}</Typography></Box>;
  }

  if (!portfolio) {
    return <Box display="flex" justifyContent="center" mt={10}><CircularProgress /></Box>;
  }

  return (
    <Box sx={{ background: '#0a192f', color: '#ccd6f6', minHeight: '100vh' }}>
      <Container maxWidth="md" sx={{ py: 6 }}>

        {/* Hero Section */}
        <Box textAlign="center" component={motion.div} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Avatar
            src={portfolio.profileImage || ''}
            alt={portfolio.name}
            sx={{ 
              width: 120, 
              height: 120, 
              mx: 'auto', 
              mb: 2, 
              border: '3px solid #64ffda',
              bgcolor: portfolio.profileImage ? 'transparent' : '#64ffda'
            }}
          >
            {!portfolio.profileImage && portfolio.name?.charAt(0)}
          </Avatar>
          <Typography variant="h4" fontWeight="bold">{portfolio.name}</Typography>
          <Typography variant="h6" color="#8892b0">{portfolio.jobTitle}</Typography>
          <Stack direction="row" justifyContent="center" spacing={2} mt={2}>
            {portfolio.linkedinUrl && (
              <Link href={portfolio.linkedinUrl} target="_blank" rel="noopener">
                <LinkedIn sx={{ color: '#64ffda' }} />
              </Link>
            )}
            {portfolio.githubUrl && (
              <Link href={portfolio.githubUrl} target="_blank" rel="noopener">
                <GitHub sx={{ color: '#64ffda' }} />
              </Link>
            )}
          </Stack>
        </Box>

        {/* About */}
        {portfolio.summary && (
          <Section title="About Me">
            <Typography variant="body1" color="#8892b0">{portfolio.summary}</Typography>
          </Section>
        )}

        {/* Skills */}
        {portfolio.skills?.length > 0 && (
          <Section title="Skills">
            <Stack direction="row" flexWrap="wrap" gap={1}>
              {portfolio.skills.map((skill, i) => (
                <Chip key={i} label={skill} variant="outlined" sx={{ color: '#64ffda', borderColor: '#64ffda' }} />
              ))}
            </Stack>
          </Section>
        )}

        {/* Experience */}
        {portfolio.experience && (
          <Section title="Experience">
            <Typography whiteSpace="pre-line" color="#8892b0">{portfolio.experience}</Typography>
          </Section>
        )}

        {/* Education */}
        {portfolio.education && (
          <Section title="Education">
            <Typography whiteSpace="pre-line" color="#8892b0">{portfolio.education}</Typography>
          </Section>
        )}

        {/* Project */}
        {(portfolio.projectTitle || portfolio.projectDescription) && (
          <Section title="Featured Project">
            <Typography variant="h6" color="#ccd6f6">{portfolio.projectTitle}</Typography>
            <Typography color="#8892b0" mt={1}>{portfolio.projectDescription}</Typography>
            <Stack direction="row" spacing={1} mt={1}>
              {portfolio.projectRole && <Chip label={`Role: ${portfolio.projectRole}`} />}
              {portfolio.projectDuration && <Chip label={`Duration: ${portfolio.projectDuration}`} />}
            </Stack>
          </Section>
        )}

        {/* Contact */}
        {(portfolio.email || portfolio.phone || portfolio.location) && (
          <Section title="Contact">
            {portfolio.email && <Typography>Email: {portfolio.email}</Typography>}
            {portfolio.phone && <Typography>Phone: {portfolio.phone}</Typography>}
            {portfolio.location && <Typography>Location: {portfolio.location}</Typography>}
          </Section>
        )}

      </Container>
    </Box>
  );
};

const Section = ({ title, children }) => (
  <Box component={motion.div} mt={6} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
    <Typography variant="h5" gutterBottom sx={{ color: '#64ffda', fontWeight: 'bold', mb: 2 }}>
      {title}
    </Typography>
    {children}
  </Box>
);

export default PublicPortfolio;
