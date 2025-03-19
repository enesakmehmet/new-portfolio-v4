import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Projects.css';
import gameImg from '../assets/game.png';
import waterImg from '../assets/water.png';
import petsImg from '../assets/pets.png';
import movieImg from '../assets/movie.png';

// Fallback projects data in case API fails
const fallbackProjects = [
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

// Map of fallback images to use if a project doesn't have an image URL
const fallbackImages = {
  1: gameImg,
  2: waterImg,
  3: petsImg,
  4: movieImg
};

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Projects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/projects`);
        if (response.data && response.data.length > 0) {
          setProjects(response.data);
        } else {
          // If no projects from API, use fallback data
          setProjects(fallbackProjects);
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setProjects(fallbackProjects);
        setError('Failed to fetch projects from server. Showing sample projects instead.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectClick = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  const getProjectImage = (project) => {
    // If project has an imageUrl from the API
    if (project.imageUrl) {
      return project.imageUrl.startsWith('http') 
        ? project.imageUrl 
        : `${API_URL}${project.imageUrl}`;
    }
    
    // Otherwise use fallback image based on index or default to first fallback
    return fallbackImages[project._id] || fallbackImages[1];
  };

  if (loading) {
    return (
      <section id="projects" className="projects-section">
        <div className="projects-container">
          <h2>Projelerim</h2>
          <div style={{ textAlign: 'center', padding: '2rem' }}>Projeler yükleniyor...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <h2>Projelerim</h2>
        {error && (
          <div style={{ color: 'orange', marginBottom: '1rem', textAlign: 'center' }}>
            {error}
          </div>
        )}
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project._id || project.id} className="project-card">
              <div className="project-image">
                <img src={project.image || getProjectImage(project)} alt={project.title} />
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-technologies">
                  {(project.technologies || []).map((tech, index) => (
                    <span key={index}>{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  {(project.githubUrl || project.githubLink) && (
                    <a 
                      href={project.githubUrl || project.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                  )}
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Demo
                    </a>
                  )}
                  <button 
                    onClick={() => handleProjectClick(project._id || project.id)}
                    style={{
                      padding: '10px 20px',
                      background: 'linear-gradient(45deg, #6a11cb, #2575fc)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: '600',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    Detayları Gör
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;