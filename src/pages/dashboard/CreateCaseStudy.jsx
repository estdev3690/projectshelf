import React, { useState, useEffect } from 'react';
import {
  Stepper, Step, StepLabel, Button, TextField, Box, Grid,
  Paper, Typography, Avatar, Chip, Divider
} from '@mui/material';
// Add this import with other icon imports at the top
import { CloudUpload, LinkedIn, GitHub, Person } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import PortfolioPreview from '../../components/portfolio/PortfolioPreview';
import PortfolioPreviews from '../../components/portfolio/PortfolioPreviews';
import Preview1 from '../../components/OnlyPreviews/ModernTemplate'
import { Snackbar, Alert } from '@mui/material';
const steps = [
  'Personal Information',
  'Professional Details',
  'Project Showcase',
  'Media & Links',
  'Skills & Expertise',
  'Finalize'
];

const ColorButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

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
const ModernTemplatePreview = ({ formData }) => {
  const [currentImage, setCurrentImage] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  useEffect(() => {
    const img = formData.profileImage || localStorage.getItem('portfolioImage');
    setCurrentImage(img || '');
  }, [formData.profileImage, formData.theme]);

  const {
    name,
    email,
    phone,
    location,
    jobTitle,
    summary,
    experience,
    education,
    projectTitle,
    projectDescription,
    projectRole,
    projectDuration,
    linkedinUrl,
    githubUrl,
    skills,
    theme = 'professional',
    profileImage: formProfileImage // Renamed to avoid conflict
  } = formData;

  const profileImage = localStorage.getItem('portfolioImage') || formProfileImage;
  const projectImages = JSON.parse(localStorage.getItem('projectImages') || '[]');

  return (
    <Box sx={{
      p: 4,
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      bgcolor: '#f5f5f5',
      borderRadius: 2,
      overflow: 'auto'
    }}>
      <div className="modern-container">
        {/* Hero */}
        <section className="hero-section">
          <div className="overlay" />
          <div className="hero-content">
     
            <Avatar
              src={currentImage || ''}
              sx={{ 
                width: 150, 
                height: 150,
                fontSize: '3rem',
                bgcolor: 'primary.main'
              }}
              className="profile-img"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '';
                e.target.style.display = 'none';
              }}
            >
              {!currentImage && <Person fontSize="large" />}
            </Avatar>
            <h1 className="hero-name">{name || "Your Name"}</h1>
            <h2 className="hero-title">{jobTitle || "Creative Professional"}</h2>
            <p className="hero-summary">
              {summary || "I create beautiful digital experiences that make an impact."}
            </p>
            <div className="social-icons">
              {linkedinUrl && (
                <a href={linkedinUrl}><img src="https://cdn-icons-png.flaticon.com/32/145/145807.png" alt="LinkedIn" /></a>
              )}
              {githubUrl && (
                <a href={githubUrl}><img src="https://cdn-icons-png.flaticon.com/32/25/25231.png" alt="GitHub" /></a>
              )}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="projects-section">
          <h2>Featured Work</h2>
          <div className="projects-grid">
            <div className="project-card">
              <div className="project-header blue-bg" />
              <div className="project-body">
                <h3>{projectTitle || "Creative Project"}</h3>
                <p>{projectDescription || "A showcase of my creative work and design process"}</p>
                <div className="project-info">
                  <span>Role: {projectRole || "Designer & Developer"}</span>
                  <span>Duration: {projectDuration || "2 months"}</span>
                </div>
              </div>
            </div>
            <div className="project-card">
              <div className="project-header purple-bg" />
              <div className="project-header" style={{
                backgroundImage: projectImages[0] ? `url(${projectImages[0]})` : 'none'
              }}>
                {!projectImages[0] && <div className="blue-bg"></div>}
              </div>
              <div className="project-body">
                <h3>Interactive Experience</h3>
                <p>An immersive digital experience showcasing innovative design</p>
                <div className="project-info">
                  <span>Role: Creative Director</span>
                  <span>Duration: 3 months</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="skills-section">
          <h2>Skills & Expertise</h2>
          <div className="skills-list">
            {(skills.length > 0 ? skills : ["UI/UX Design", "Web Development"]).map((skill, index) => (
              <span className="skill-item" key={index}>{skill}</span>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="contact-section">
          <h2>Let's Connect</h2>
          <div className="contact-box">
            <div><strong>Email:</strong> {email || "your.email@example.com"}</div>
            <div><strong>Phone:</strong> {phone || "+1 (123) 456-7890"}</div>
            <div><strong>Location:</strong> {location || "San Francisco, CA"}</div>
          </div>
        </section>
      </div>
    </Box>
  );
};
const CreateCaseStudy = () => {
  // Change this line (around line 40 in your file)
  const backendUrl = process.env.REACT_APP_API_URL || 'https://projectshelf-vvwo.onrender.com'; // Changed from 8000 to 7000
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Info
    username: '', // Add this line
    name: '',
    email: '',
    phone: '',
    location: '',

    // Professional
    jobTitle: '',
    summary: '',
    experience: '',
    education: '',

    // Project
    projectTitle: '',
    projectDescription: '',
    projectRole: '',
    projectDuration: '',

    // Media
    profileImage: null,
    coverImage: null,
    media: [],
    linkedinUrl: '',
    githubUrl: '',

    // Skills
    skills: [],
    newSkill: '',

    // Theme
    theme: 'professional'
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      navigate('/'); // Navigate to dashboard on final step
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Move these functions inside the component
  const storeImage = (imageFile) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      localStorage.setItem('portfolioImage', e.target.result);
    };
    reader.readAsDataURL(imageFile);
  };

  // Add these near the top of your file with other imports
  // Change these lines
  const CLOUDINARY_CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  const CLOUDINARY_UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
  


  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (activeStep === 0) {
      const file = files[0];
      
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        console.log('Cloudinary URL:', data.secure_url);

        localStorage.setItem('portfolioImage', data.secure_url);
        setFormData(prevData => ({ ...prevData, profileImage: data.secure_url }));
      } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
      }
    } else {
      setFormData({ ...formData, media: [...formData.media, ...files] });
    }
  };

  const handleAddSkill = () => {
    if (formData.newSkill) {
      setFormData({
        ...formData,
        skills: [...formData.skills, formData.newSkill],
        newSkill: ''
      });
    }
  };





  const [selectedLayout, setSelectedLayout] = useState(null);

  const handleLayoutSelect = (layoutNumber) => {
    setSelectedLayout(layoutNumber);
    setShowPreview(false);
    // You can save the selected layout to formData if needed
    setFormData({ ...formData, selectedLayout: layoutNumber });
  };
  const togglePreview = () => {
    // Check if profileImage exists and is a File/Blob object
    if (formData.profileImage && formData.profileImage instanceof Blob) {
      try {
        // Create a safe object URL
        const objectUrl = URL.createObjectURL(formData.profileImage);
        setFormData(prev => ({
          ...prev,
          profileImage: objectUrl
        }));
        setShowPreview(true);
        
        // Revoke the object URL when component unmounts or preview is hidden
        return () => URL.revokeObjectURL(objectUrl);
      } catch (error) {
        console.error('Error creating image URL:', error);
        setFormData(prev => ({
          ...prev,
          profileImage: ''
        }));
        setShowPreview(true);
      }
    } else {
      setShowPreview(!showPreview);
    }
  };
  const getStepContent = (step) => {
    if (showPreview && step === 5) {
      return (
        <PortfolioPreviews
          formData={formData}
          onSelect={handleLayoutSelect}
        />
      );
    }

    const handleSubmit = async () => {
      try {
        if (!formData.username || !formData.name) {
          return;
        }

        const submissionData = {
          username: formData.username,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          jobTitle: formData.jobTitle,
          summary: formData.summary,
          experience: formData.experience,
          education: formData.education,
          projectTitle: formData.projectTitle,
          projectDescription: formData.projectDescription,
          projectRole: formData.projectRole,
          projectDuration: formData.projectDuration,
          linkedinUrl: formData.linkedinUrl,
          githubUrl: formData.githubUrl,
          skills: formData.skills,
          theme: formData.theme,
          selectedLayout: formData.selectedLayout,
          profileImage: formData.profileImage || localStorage.getItem('portfolioImage') // Add this line
        };

        const response = await axios.post(`${backendUrl}/api/portfolio`, submissionData);
        console.log('Save response:', response.data);

        if (response.data.success) {
          setOpenSnackbar(true);
          setTimeout(() => {
            navigate('/');
          }, 2000);
          
        } else {
          console.error('Save failed:', response.data.message);
        }
      } catch (error) {
        console.error('Save error:', error.response?.data || error.message);
      }
    };


    switch (step) {
      case 0: // Personal Information
        return (
          <Paper elevation={3} sx={{ p: 4, mt: 2 }}>
            <Typography variant="h6" gutterBottom>Personal Details</Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  
                  required
                  InputLabelProps={{
                    shrink: true // This keeps the label always visible
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    src={formData.profileImage || ''}
                    sx={{ width: 80, height: 80, mr: 2 }}
                  />
                  <Button
                    component="label"
                    variant="outlined"
                    startIcon={<CloudUpload />}
                  >
                    Upload Profile Photo
                    <VisuallyHiddenInput
                      type="file"
                      onChange={handleFileUpload}
                      accept="image/*"
                    />
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        );

      case 1: // Professional Details
        return (
          <Paper elevation={3} sx={{ p: 4, mt: 2 }}>
            <Typography variant="h6" gutterBottom>Professional Information</Typography>
            <Divider sx={{ mb: 3 }} />
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Job Title"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Professional Summary"
                  name="summary"
                  value={formData.summary}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Work Experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Education"
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
        );

      case 2: // Project Showcase
        return (
          <Paper elevation={3} sx={{ p: 4, mt: 2 }}>
            <Typography variant="h6" gutterBottom>Project Details</Typography>
            <Divider sx={{ mb: 3 }} />
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Project Title"
                  name="projectTitle"
                  value={formData.projectTitle}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  
                  rows={4}
                  label="Project Description"
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Your Role"
                  name="projectRole"
                  value={formData.projectRole}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Project Duration"
                  name="projectDuration"
                  value={formData.projectDuration}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
        );

      case 3: // Media & Links
        return (
          <Paper elevation={3} sx={{ p: 4, mt: 2 }}>
            <Typography variant="h6" gutterBottom>Media & Links</Typography>
            <Divider sx={{ mb: 3 }} />
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<CloudUpload />}
                  sx={{ mb: 2 }}
                >
                  Upload Project Media
                  <VisuallyHiddenInput
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                  />
                </Button>
                {/* Media preview would go here */}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="LinkedIn URL"
                  name="linkedinUrl"
                  value={formData.linkedinUrl}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true
                  }}
                  InputProps={{
                    startAdornment: <LinkedIn sx={{ mr: 1 }} />
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="GitHub URL"
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true
                  }}
                  InputProps={{
                    startAdornment: <GitHub sx={{ mr: 1 }} />
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
        );

      case 4: // Skills & Expertise
        return (
          <Paper elevation={3} sx={{ p: 4, mt: 2 }}>
            <Typography variant="h6" gutterBottom>Skills & Expertise</Typography>
            <Divider sx={{ mb: 3 }} />
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TextField
                    fullWidth
                    label="Add Skill"
                    name="newSkill"
                    value={formData.newSkill}
                    onChange={handleInputChange}
                    sx={{ mr: 2 }}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={handleAddSkill}
                  >
                    Add
                  </Button>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {formData.skills.map((skill, index) => (
                    <Chip key={index} label={skill} />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        );

      case 5: // Finalize
        return (
          <Paper elevation={3} sx={{ p: 4, mt: 2 }}>
            <Typography variant="h6" gutterBottom>Review and Submit</Typography>
            <Divider sx={{ mb: 3 }} />
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Button
                variant="outlined"
                onClick={togglePreview}
              >
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </Button>
            </Box>

            {formData.submitted ? (
              <Box sx={{ 
                p: 3, 
                bgcolor: 'success.light', 
                borderRadius: 1,
                textAlign: 'center'
              }}>
                <Typography variant="h6" color="success.dark">
                  Portfolio Submitted Successfully!
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  Your portfolio has been created and saved.
                </Typography>
              </Box>
            ) : (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={async () => {
                  await handleSubmit();
                  setFormData(prev => ({ ...prev, submitted: true }));
                }}
              >
                Submit Portfolio
              </Button>
            )}
             <Snackbar
      open={openSnackbar}
      autoHideDuration={2000}
      onClose={() => setOpenSnackbar(false)}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert 
        onClose={() => setOpenSnackbar(false)} 
        severity="success" 
        sx={{ width: '100%' }}
      >
        Portfolio saved successfully!
      </Alert>
    </Snackbar>
          </Paper>
        );

      default:
        return 'Portfolio saved successfully..';
    }
  };

  const location = useLocation();
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  useEffect(() => {
    if (location.state?.template) {
      setSelectedTemplate(location.state.template);
    }
  }, [location.state]);

  // Update the title section to show the template name
  // Add this new component at the top of the file


  // In the return statement, modify the layout:
  return (
    <Box sx={{ width: '100%', maxWidth: '1200px', mx: 'auto', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Create Your Professional Portfolio
        </Typography>
        
        {selectedTemplate && (
          <Typography variant="subtitle1" color="text.secondary">
            Selected Template: {selectedTemplate.name}
          </Typography>
        )}
      </Box>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' }, 
        gap: 4 
      }}>
        {/* Form Section - Full width on mobile, 40% on desktop */}
        <Box sx={{ width: { xs: '100%', md: '40%' } }}>
          {getStepContent(activeStep)}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="outlined"
              size="large"
            >
              Back
            </Button>
            <ColorButton
              variant="contained"
              onClick={handleNext}
              size="large"
            >
              {activeStep === steps.length - 1 ? 'Complete Portfolio' : 'Continue'}
            </ColorButton>
          </Box>
        </Box>

        {/* Template Preview Section - Full width on mobile, 60% on desktop */}
        <Box sx={{ 
          width: { xs: '100%', md: '60%' },
          mt: { xs: 4, md: 0 } // Add top margin on mobile only
        }}>
          <ModernTemplatePreview formData={formData} />
        </Box>
      </Box>
    </Box>
  );
};

export default CreateCaseStudy;
