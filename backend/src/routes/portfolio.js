import express from 'express';
import { Portfolio } from '../models/portfolio.model.js';

const router = express.Router();

// GET all portfolios
router.get('/portfolios', async (req, res) => {
  try {
    console.log('Fetching portfolios...');
    const portfolios = await Portfolio.find({});
    console.log('Portfolios found:', portfolios.length);
    
    if (portfolios.length === 0) {
      console.log('No portfolios in database');
      return res.json({
        success: true,
        message: 'No portfolios found',
        data: { portfolios: [] }
      });
    }

    res.json({
      success: true,
      data: { portfolios }
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({
      success: false,
      message: 'Database error',
      error: error.message
    });
  }
});

// POST endpoint for portfolio creation
router.post('/portfolio', async (req, res) => {
    try {
        const portfolioData = req.body;
        console.log('Received portfolio data:', portfolioData); // Log incoming data
        
        // Validate required fields
        if (!portfolioData.username || !portfolioData.name) {
            return res.status(400).json({
                success: false,
                message: 'Username and name are required'
            });
        }

        const portfolio = new Portfolio(portfolioData);
        const savedPortfolio = await portfolio.save();
        console.log('Saved portfolio:', savedPortfolio); // Log saved document

        res.status(201).json({
            success: true,
            message: 'Portfolio created successfully',
            data: savedPortfolio
        });
    } catch (error) {
        console.error('Save error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create portfolio',
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

export default router;