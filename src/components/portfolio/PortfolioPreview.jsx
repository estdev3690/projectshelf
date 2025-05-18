import React from 'react';
import { Box, Typography, Button, Avatar, LinearProgress, Stack } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';

const DarkPortfolio = ({ formData }) => {
  return (
    <Box sx={{ bgcolor: '#0a0a0a', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', py: 10 }}>
        <Stack direction="row" spacing={2} justifyContent="center" mb={2}>
          <TwitterIcon />
          <LinkedInIcon />
          <GitHubIcon />
        </Stack>
        <Typography variant="h2" fontWeight="bold">
          I'm {formData.role || 'a Developer'}
        </Typography>
        <Typography sx={{ mt: 2, maxWidth: 600, mx: 'auto' }}>
          {formData.bio || 'I build smart interfaces and AI-powered systems for next-gen solutions.'}
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button variant="contained" sx={{ mx: 1, bgcolor: '#1976d2' }}>
            My Work
          </Button>
          <Button variant="outlined" sx={{ mx: 1, color: '#fff', borderColor: '#fff' }}>
            Hire Me
          </Button>
        </Box>
      </Box>

      {/* About + Skills Section */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          p: 4,
          bgcolor: '#111',
        }}
      >
        {/* Left - Skills */}
        <Box sx={{ width: 300 }}>
          <Avatar
            src={formData.profileImage ? URL.createObjectURL(formData.profileImage) : ''}
            alt="Profile"
            sx={{ width: 200, height: 200, mb: 3 }}
          />
          <Typography variant="h6">MY SKILLS</Typography>
          <Typography>React</Typography>
          <LinearProgress variant="determinate" value={90} sx={{ mb: 2 }} />
          <Typography>Python</Typography>
          <LinearProgress variant="determinate" value={85} sx={{ mb: 2 }} />
          <Typography>ROS</Typography>
          <LinearProgress variant="determinate" value={80} sx={{ mb: 2 }} />
        </Box>

        {/* Right - About */}
        <Box sx={{ maxWidth: 400, mt: { xs: 4, md: 0 } }}>
          <Typography variant="h6" gutterBottom>
            ABOUT ME
          </Typography>
          <Typography sx={{ mb: 2 }}>
            {formData.about ||
              'Experienced full-stack developer with a focus on autonomous systems, smart navigation, and real-time data interfaces.'}
          </Typography>
          <Typography>
            <strong>Name:</strong> {formData.name || 'Your Name'}
          </Typography>
          <Typography>
            <strong>Email:</strong> {formData.email || 'you@example.com'}
          </Typography>
          <Typography>
            <strong>Phone:</strong> {formData.phone || '+91-98765-43210'}
          </Typography>
          <Typography>
            <strong>Twitter:</strong> @{formData.twitter || 'yourhandle'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default DarkPortfolio;
