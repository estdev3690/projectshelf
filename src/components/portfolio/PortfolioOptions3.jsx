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
      {formData.profileImage && (
        <Avatar
          src={URL.createObjectURL(formData.profileImage)}
          alt="Profile"
          sx={{
            width: 200,
            height: 200,
            border: '4px solid #444',
            mt: { xs: 4, md: 0 },
          }}
        />
      )}
    </Box>
  );
};

export default HeroCard;
