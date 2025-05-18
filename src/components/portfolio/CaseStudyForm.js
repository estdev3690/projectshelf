import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

const CaseStudyForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    overview: '',
    media: [],
    timeline: [],
    technologies: [],
    outcomes: ''
  });

  const { createPortfolio } = usePortfolio();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPortfolio(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields for each case study section */}
    </form>
  );
};

export default CaseStudyForm;