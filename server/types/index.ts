import { Request } from 'express';

// Server-side type definitions

export interface UserDocument {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface ProjectDocument {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactDocument {
  _id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthRequest extends Request {
  user?: {
    _id: string;
    username: string;
    email: string;
    role: string;
  };
}

export interface JwtPayload {
  id: string;
  username: string;
  email: string;
  role: string;
}
