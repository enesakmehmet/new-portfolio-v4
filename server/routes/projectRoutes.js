import express from 'express';
import Project from '../models/Project.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// @route   GET /api/projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/projects
// @access  Admin only
router.post('/', protect, admin, upload.single('image'), async (req, res) => {
  try {
    const { title, description, technologies, liveUrl, githubUrl } = req.body;
    
    // Check if image was uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image' });
    }

    // Create project with image URL
    const imageUrl = `/uploads/projects/${req.file.filename}`;
    
    // Parse technologies if it's a string
    const techArray = technologies ? 
      (typeof technologies === 'string' ? JSON.parse(technologies) : technologies) : 
      [];
    
    const project = await Project.create({
      title,
      description,
      imageUrl,
      technologies: techArray,
      liveUrl: liveUrl || '',
      githubUrl: githubUrl || ''
    });
    
    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/projects/:id
// @access  Admin only
router.put('/:id', protect, admin, upload.single('image'), async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    const { title, description, technologies, liveUrl, githubUrl } = req.body;
    
    // Update fields
    project.title = title || project.title;
    project.description = description || project.description;
    
    // Parse technologies if it's a string
    if (technologies) {
      project.technologies = typeof technologies === 'string' ? 
        JSON.parse(technologies) : technologies;
    }
    
    project.liveUrl = liveUrl !== undefined ? liveUrl : project.liveUrl;
    project.githubUrl = githubUrl !== undefined ? githubUrl : project.githubUrl;
    
    // Update image if a new one was uploaded
    if (req.file) {
      project.imageUrl = `/uploads/projects/${req.file.filename}`;
    }
    
    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/projects/:id
// @access  Admin only
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project) {
      await project.deleteOne();
      res.json({ message: 'Project removed' });
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
