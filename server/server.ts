import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import contactRoutes from './routes/contactRoutes';
import projectRoutes from './routes/projectRoutes';

// Create require function for ES modules
const require = createRequire(import.meta.url);
// Get process from Node.js
const process = require('process');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// ES modules fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the public directory
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/projects', projectRoutes);

const PORT: number = parseInt(process.env.PORT || '5000', 10);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
