import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Projects.css';
import gameImg from '../assets/game.png';
import waterImg from '../assets/water.png';
import petsImg from '../assets/pets.png';
import movieImg from '../assets/movie.png';


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
      setLoading(true);
      try {
        let projectsData = [];
        
        // Try to fetch from API first
        if (API_URL) {
          try {
            const response = await axios.get(`${API_URL}/api/projects`);
            if (response.data) {
              projectsData = response.data;
            }
          } catch (apiError) {
            console.log('API fetch failed, using localStorage:', apiError.message);
          }
        }
        
        // Get projects from localStorage
        const localProjects = JSON.parse(localStorage.getItem('projects') || '[]');
        
        // Combine API and localStorage projects, giving priority to localStorage versions
        // Create a map to track projects by ID to avoid duplicates
        const projectMap = new Map();
        
        // First add API projects to the map
        projectsData.forEach(project => {
          const projectId = project._id || project.id;
          projectMap.set(projectId.toString(), project);
        });
        
        // Then override with localStorage projects (these are more up-to-date)
        localProjects.forEach(project => {
          const projectId = project._id || project.id;
          projectMap.set(projectId.toString(), project);
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

  const handleProjectClick = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  const getProjectImage = (project) => {
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
    return fallbackImages[project._id] || fallbackImages[project.id] || fallbackImages[1];
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
                <img 
                  src={getProjectImage(project)} 
                  alt={project.title} 
                  onError={(e) => {
                    console.error('Image failed to load:', e.target.src);
                    e.target.src = fallbackImages[1]; // Use a default fallback image
                  }}
                />
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