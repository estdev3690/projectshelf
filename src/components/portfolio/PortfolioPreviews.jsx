import React, { useState, useEffect } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import PortfolioPreview1 from './PortfolioPreview';
import PortfolioPreview2 from './PortfolioOption2';
import PortfolioPreview3 from './PortfolioOptions3';
import ErrorBoundary from '../ErrorBoundary';

const PortfolioPreviews = ({ formData, onSelect }) => {
  const [currentPreview, setCurrentPreview] = useState(1);
  const [safeFormData, setSafeFormData] = useState(formData);
  const [objectUrls, setObjectUrls] = useState([]);

  useEffect(() => {
    return () => {
      // Clean up object URLs when component unmounts
      objectUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [objectUrls]);

  useEffect(() => {
    const processedData = {
      ...formData,
      profileImage: getSafeImageUrl(formData.profileImage)
    };
    setSafeFormData(processedData);
  }, [formData]);

  const getSafeImageUrl = (image) => {
    if (!image) return '';
    try {
      // Handle string URLs
      if (typeof image === 'string') {
        if (image.startsWith('data:') || image.startsWith('http') || image.startsWith('blob:')) {
          return image;
        }
        return '';
      }
      
      // Handle Blob/File objects
      if ((image instanceof Blob || image instanceof File) && 
          image.size > 0 && 
          image.type.startsWith('image/')) {
        const url = URL.createObjectURL(image);
        setObjectUrls(prev => [...prev, url]);
        return url;
      }
      
      return '';
    } catch (error) {
      console.error('Error processing image:', error);
      return '';
    }
  };

  const previewComponents = {
    1: (
      <ErrorBoundary>
        <PortfolioPreview3 formData={safeFormData} />
      </ErrorBoundary>
    ),
    2: (
      <ErrorBoundary>
        <PortfolioPreview2 formData={safeFormData} />
      </ErrorBoundary>
    ),
    3: (
      <ErrorBoundary>
        <PortfolioPreview1 formData={safeFormData} />
      </ErrorBoundary>
    )
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Typography variant="h5" gutterBottom>Portfolio Preview</Typography>
      
      <Paper elevation={3} sx={{ p: 4 }}>
        {previewComponents[currentPreview]}
      </Paper>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button 
          variant={currentPreview === 1 ? 'contained' : 'outlined'}
          onClick={() => setCurrentPreview(1)}
        >
          Layout 1
        </Button>
        <Button 
          variant={currentPreview === 2 ? 'contained' : 'outlined'}
          onClick={() => setCurrentPreview(2)}
        >
          Layout 2
        </Button>
        <Button 
          variant={currentPreview === 3 ? 'contained' : 'outlined'}
          onClick={() => setCurrentPreview(3)}
        >
          Layout 3
        </Button>
      </Box>

      <Button 
        variant="contained" 
        fullWidth
        onClick={() => onSelect(currentPreview)}
      >
        Select This Layout
      </Button>
    </Box>
  );
};

export default PortfolioPreviews;