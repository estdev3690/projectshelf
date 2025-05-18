import express from 'express';
const router = express.Router();

router.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK',
    message: 'Backend is healthy',
    timestamp: new Date().toISOString()
  });
});

export default router;