import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
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
    linkedinUrl: String,
    githubUrl: String,
    skills: [String],
    theme: String,
    selectedLayout: Number,
    profileImage: String,
    coverImage: String,
    media: [String]
}, { timestamps: true });

// Change from:
export const Portfolio = mongoose.model('Portfolio', portfolioSchema);

// To:
export default mongoose.model('Portfolio', portfolioSchema);