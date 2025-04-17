import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  technologies: [{
    type: String
  }],
  liveUrl: {
    type: String
  },
  githubUrl: {
    type: String
  }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

export default Project;
