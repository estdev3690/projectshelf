const express = require('express');
const router = express.Router();
const TemplateClick = require('../models/TemplateClick'); // You'll need to create this model

router.post('/click', async (req, res) => {
  try {
    const { templateId } = req.body;
    
    // Find and update or create a new click record
    await TemplateClick.findOneAndUpdate(
      { templateId },
      { $inc: { clickCount: 1 } },
      { upsert: true, new: true }
    );

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;