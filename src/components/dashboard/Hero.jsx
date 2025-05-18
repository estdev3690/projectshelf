import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Templateprofile from '../../public/tw.png'

const Hero = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleCreatePortfolio = () => {
    if (user) {
      navigate('/dashboard/create-case-study');
    } else {
      navigate('/register');
    }
  };

  const handleViewExample = () => {
    const demoSection = document.getElementById('demo-portfolios');
    if (demoSection) {
      // Add a small timeout to ensure the element is available
      setTimeout(() => {
        demoSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    } else {
      console.error('Could not find demo portfolios section');
    }
  };

  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>Create Your Portfolio in Minutes</h1>
        <p>Transform your projects into impressive case studies with our powerful portfolio builder</p>
        <div className="hero-buttons" style={{marginBottom:"10px"}}>
          <button 
            className="btn btn-primary" 
            onClick={handleCreatePortfolio}
          >
            {user ? 'Create Portfolio' : 'Get Started'}
          </button>
          <button 
            className="btn btn-secondary"
            onClick={handleViewExample}
          >
            View Example Portfolio
          </button>
        </div>
      </div>
      <div className="hero-image">
        <img 
          src={Templateprofile} 
          alt="Portfolio Preview" 
          style={{ width: '300px', height: 'auto' }}
        />
      </div>
    </div>
  );
};

export default Hero;