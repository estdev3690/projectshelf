import React from 'react';
import { Box, Typography, Avatar, Stack, Chip } from '@mui/material';


const ProfileCard = ({ formData }) => {
  const categories = ['Resume', 'Developer', 'Biography', 'Personal'];

  return (
    <Box
      sx={{
        maxWidth: 900,
        margin: 'auto',
        mt: 8,
        p: 5,
        boxShadow: 3,
        borderRadius: 4,
        textAlign: 'center',
        bgcolor: '#fff',
      }}
    >
      {/* Profile Image */}
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

      {/* Name and Summary */}
      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
        {formData.name || 'Your Name'}
      </Typography>
      <Typography sx={{ mt: 1, color: 'text.secondary' }}>
        A Bit About Me
      </Typography>
      <Typography sx={{ mt: 2, maxWidth: 600, mx: 'auto', fontSize: 16 }}>
        {formData.summary ||
          'I am a passionate developer based in ' +
            (formData.location || 'your location') +
            ', working on creative and impactful digital experiences.'}
      </Typography>

      {/* Category Tags */}
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
        {categories.map((label, idx) => (
          <Chip
            key={idx}
            label={label}
            color="primary"
            sx={{
              backgroundColor: ['#d4e157', '#4fc3f7', '#81c784', '#ffb74d'][idx],
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 14,
              px: 2,
              py: 1.5,
            }}
          />
        ))}
      </Stack>

      {/* Footer Info */}
      <Box sx={{ mt: 6, borderTop: '1px solid #eee', pt: 3, fontSize: 14 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="center"
        >
          <Box>Email: {formData.email || 'your@email.com'}</Box>
          <Box>Phone: {formData.phone || '+91 98765 43210'}</Box>
          <Box>Address: {formData.location || 'City, Country'}</Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default ProfileCard;
