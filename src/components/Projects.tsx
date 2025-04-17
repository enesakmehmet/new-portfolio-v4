import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Projects.css';
import gameImg from '../assets/game.png';
import waterImg from '../assets/water.png';
import petsImg from '../assets/pets.png';
import movieImg from '../assets/movie.png';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

interface Project {
  _id?: string;
  id?: number | string;
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  imageUrl?: string;
  githubUrl?: string;
  githubLink?: string;
  liveUrl?: string;
}

const fallbackProjects: Project[] = [
  {
    id: 1,
    title: "E-Ticaret Oyun Key Satış Platformu",
    description: "Modern bir e-ticaret platformu. Kullanıcılar ürünleri görüntüleyebilir, sepete ekleyebilir ve satın alabilir. Admin paneli ile ürün yönetimi, sipariş takibi ve kullanıcı yönetimi yapılabilir.",
    technologies: ["JavaScript", "Node.js", "PostgreSQL", "Express.js"],
    image: gameImg,
    githubLink: "https://github.com/enesakmehmet/game-web-v3"
  },
  {
    id: 2,
    title: "OpenWeatherMap",
    description: "OpenWeatherMap API'sini kullanarak anlık hava durumu, hava tahmini, hava kalitesi ve UV endeksi gibi bilgileri alıyor.",
    technologies: ["React", "Tailwind CSS", "Prisma", "PostgreSQL"],
    image: waterImg,
    githubLink: "https://github.com/"
  },
  {
    id: 3,
    title: "Happy Pets",
    description: "Bu proje, Happy Pets isimli bir online pet shop platformunu içeren kapsamlı bir web sitesi geliştirmeyi amaçlamaktadır.",
    technologies: ["React", "Socket.io", "Node.js", "MongoDB"],
    image: petsImg,
    githubLink: "https://github.com/"
  },
  {
    id: 4,
    title: "Movie App",
    description: "Bu proje, Film Dünyası adında bir film keşfetme ve yönetme platformudur.",
    technologies: ["React", "NestJS", "PostgreSQL", "Docker"],
    image: movieImg,
    githubLink: "https://github.com/"
  }
];

const fallbackImages: Record<string | number, string> = {
  1: gameImg,
  2: waterImg,
  3: petsImg,
  4: movieImg
};

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Projects: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const projectsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        let projectsData: Project[] = [];
        
        // Try to fetch from API first
        if (API_URL) {
          try {
            const response = await axios.get(`${API_URL}/api/projects`);
            if (response.data) {
              projectsData = response.data;
            }
          } catch (apiError) {
            console.log('API fetch failed, using localStorage:', (apiError as Error).message);
          }
        }
        
        // Get projects from localStorage
        const localProjects = JSON.parse(localStorage.getItem('projects') || '[]') as Project[];
        
        // Combine API and localStorage projects, giving priority to localStorage versions
        const projectMap = new Map<string, Project>();
        
        // First add API projects to the map
        projectsData.forEach(project => {
          const projectId = project._id || project.id;
          if (projectId) projectMap.set(projectId.toString(), project);
        });
        
        // Then override with localStorage projects (these are more up-to-date)
        localProjects.forEach(project => {
          const projectId = project._id || project.id;
          if (projectId) projectMap.set(projectId.toString(), project);
        });
        
        // Convert map back to array
        const combinedProjects = Array.from(projectMap.values());
        
        // If no projects found, use fallback data
        if (combinedProjects.length === 0) {
          setProjects(fallbackProjects);
        } else {
          setProjects(combinedProjects);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Projeler yüklenirken bir hata oluştu');
        // Use fallback data on error
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    // Set up Intersection Observer for lazy loading images
    if (projectsRef.current.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target.querySelector('img');
          if (img && img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    projectsRef.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });
    
    return () => observer.disconnect();
  }, [projects]);

  const handleProjectClick = (projectId: string | number) => {
    navigate(`/projects/${projectId}`);
  };

  const getProjectImage = (project: Project): string => {
    // If project has imageUrl, use it
    if (project.imageUrl) {
      // Check if it's a blob URL (created by URL.createObjectURL)
      if (project.imageUrl.startsWith('blob:')) {
        return project.imageUrl;
      }
      
      // Check if it's a full URL (starts with http)
      if (project.imageUrl.startsWith('http')) {
        return project.imageUrl;
      }
      
      // Otherwise, it's a relative path from the API
      return `${API_URL}${project.imageUrl}`;
    }
    
    // If project has image property (from fallback), use it
    if (project.image) {
      return project.image;
    }
    
    // Otherwise use fallback image based on id
    const id = project._id || project.id;
    return id ? (fallbackImages[id] || fallbackImages[1]) : fallbackImages[1];
  };

  if (loading) {
    return (
      <section id="projects" className="projects-section">
        <div className="projects-container">
          <h2>Projelerim</h2>
          <div className="loading-projects">Projeler yükleniyor...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="projects-section">
      <motion.h2 
        className="projects-title gradient-title"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Projelerim
      </motion.h2>
      <div className="projects-container">
        <div className="projects-grid">
          {projects.map((project, idx) => (
            <motion.div
              className="project-card gradient-card"
              key={project.id || idx}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.7, type: 'spring' }}
              whileHover={{ scale: 1.04, boxShadow: "0 12px 40px #ff4ecd60" }}
            >
              <div className="project-image">
                <img 
                  src={getProjectImage(project)} 
                  alt={project.title}
                  className="project-img"
                />
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tech-list">
                  {project.technologies.map((tech, i) => (
                    <span className="project-tech gradient-border" key={i}>{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-link github">
                      <FaGithub className="icon" />
                      <span>Github</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link live">
                      <FaExternalLinkAlt className="icon" />
                      <span>Canlı</span>
                    </a>
                  )}
                  <button onClick={() => handleProjectClick(project._id || project.id || 0)}>
                    Detayları Gör
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;