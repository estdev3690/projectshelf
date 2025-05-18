const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  location: String,
  jobTitle: String,
  summary: String,
  experience: String,
  education: String,
  projectTitle: String,
  projectDescription: String,
  projectRole: String,
  projectDuration: String,
  profileImageUrl: String,
  coverImageUrl: String,
  mediaUrls: [String],
  linkedinUrl: String,
  githubUrl: String,
  skills: [String],
  theme: String,
  selectedLayout: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Portfolio', portfolioSchema);