const mongoose = require('mongoose');

const templateClickSchema = new mongoose.Schema({
  templateId: {
    type: Number,
    required: true,
    unique: true
  },
  clickCount: {
    type: Number,
    required: true,
    default: 0
  }
});

module.exports = mongoose.model('TemplateClick', templateClickSchema);