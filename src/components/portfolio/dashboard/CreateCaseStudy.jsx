import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, TextField, Box, Grid } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

const steps = [
  'Project Overview',
  'Media Gallery',
  'Development Timeline',
  'Tools & Technologies',
  'Outcomes',
  'Select Theme'
];

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const CreateCaseStudy = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    coverImage: null,
    media: [],
    timeline: [],
    tools: [],
    outcomes: '',
    metrics: '',
    testimonials: '',
    theme: 'minimal'
  });

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (activeStep === 0) {
      setFormData({ ...formData, coverImage: files[0] });
    } else {
      setFormData({ ...formData, media: [...formData.media, ...files] });
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Project Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Project Summary"
              name="summary"
              value={formData.summary}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              sx={{ mt: 2 }}
            >
              Upload Cover Image
              <VisuallyHiddenInput type="file" onChange={handleFileUpload} />
            </Button>
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mt: 2 }}>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              sx={{ mb: 2 }}
            >
              Upload Media
              <VisuallyHiddenInput type="file" multiple onChange={handleFileUpload} />
            </Button>
            {/* Media preview grid would go here */}
          </Box>
        );
      // Additional case statements for other steps
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ mt: 4 }}>
        {getStepContent(activeStep)}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
          >
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateCaseStudy;