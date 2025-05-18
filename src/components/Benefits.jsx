import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import axios from 'axios';

const Benefits = () => {
  const [portfolioStats, setPortfolioStats] = useState([]);
  const backendUrl = process.env.REACT_APP_API_URL || 'https://projectshelf-vvwo.onrender.com';

  useEffect(() => {
    const fetchPortfolioStats = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/portfolios`);
        if (response.data.success) {
          const portfolios = response.data.data.portfolios;
          const stats = [
            { name: 'Portfolios', value: portfolios.length },
            { name: 'Most Views', value: Math.max(...portfolios.map(p => p.views || 0)) },
            { name: 'Avg Views', value: Math.round(portfolios.reduce((sum, p) => sum + (p.views || 0), 0) / portfolios.length) }
          ];
          setPortfolioStats(stats);
        }
      } catch (err) {
        console.error('Error fetching portfolio stats:', err);
      }
    };
    fetchPortfolioStats();
  }, []);

  const benefits = [
    {
      title: "Modular Design",
      description: (
        <div>
          Build your portfolio piece by piece with our flexible components:
          <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
            <li><strong>Project Overview:</strong> Start with a clear summary, title, objectives, and a compelling cover image.</li>
            <li><strong>Media Gallery:</strong> Showcase images, GIFs, and embedded videos to visually represent your work.</li>

            <li><strong>Outcomes & Impact:</strong> Display results using metrics, success highlights, and key performance indicators.</li>
            <li><strong>Testimonials & Reflections:</strong> Include client feedback or personal takeaways to build authenticity and trust.</li>
          </ul>
        </div>
      ),
      icon: "📦"
    },
    {
      title: "Media Support",
      description: (<div>
        Upload and showcase images, videos, and documents with ease
        <ul>
          <li><strong>Image Uploads:</strong> Add high-resolution images to your case studies with drag-and-drop support.</li>
          <li><strong>Video Embeds:</strong> Seamlessly embed YouTube, Vimeo, or Loom videos to demonstrate your process or results.</li>
          <li><strong>Document Attachments:</strong> Upload PDFs, slide decks, or reports for deeper insights and downloads.</li>
        </ul>
      </div>
      ),
      icon: "🖼️"
    },
    {
      title: "Analytics Dashboard",
      description: (
        <div className="analytics-preview">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={portfolioStats.length > 0 ? portfolioStats : [
                  { name: 'Portfolios', value: 0 },
                  { name: 'Most Views', value: 0 },
                  { name: 'Avg Views', value: 0 }
                ]}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {portfolioStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="metrics-description">
            Platform statistics overview
          </div>
        </div>
      ),
      icon: "📊"
    }
  ];

  return (
    <div className="benefits-section">
      <h2>Why Choose Us?</h2>
      <div className="benefits-grid">
        {benefits.map((benefit, index) => (
          <div key={index} className="benefit-card">
            <div className="benefit-icon">{benefit.icon}</div>
            <h3>{benefit.title}</h3>
            <p>{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default Benefits;