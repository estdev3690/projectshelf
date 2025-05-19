import React from 'react';
import { Box, Typography, Avatar, Button, Stack } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';

const HeroCard = ({ formData }) => {
  return (
    <Box
      sx={{
        bgcolor: '#111',
        color: '#fff',
        p: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        minHeight: '80vh',
        textAlign: { xs: 'center', md: 'left' },
      }}
    >
      {/* Left Section - Text */}
     
      <Box sx={{ maxWidth: 500 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
          {formData.name || 'Your Name Here'}
        </Typography>
        <Typography sx={{ mt: 2, fontSize: 16 }}>
          {formData.summary ||
            'Passionate developer working on smart, autonomous, and real-time systems using cutting-edge tech.'}
        </Typography>
        <Button
          variant="contained"
          color="success"
          sx={{ mt: 4, fontWeight: 'bold', px: 4, py: 1 }}
        >
          Let’s Get Started
        </Button>
        {/* Icons / Tags */}
        <Stack
          direction="row"
          spacing={3}
          sx={{ mt: 4, justifyContent: { xs: 'center', md: 'flex-start' } }}
        >
          <GitHubIcon fontSize="large" />
          <LinkedInIcon fontSize="large" />
          <LanguageIcon fontSize="large" />
        </Stack>
      </Box>

      {/* Right Section - Profile Image */}
      <Avatar
            src={formData.profileImage || ''}
            alt={formData.name}
            sx={{ 
              width: 120, 
              height: 120, 
              mx: 'auto', 
              mb: 2, 
              border: '3px solid #64ffda',
              bgcolor: formData.profileImage ? 'transparent' : '#64ffda'
            }}
          >
            {!formData.profileImage && formData.name?.charAt(0)}
          </Avatar>
    </Box>
  );
};

export default HeroCard;
