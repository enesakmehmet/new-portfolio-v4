import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Projects.css';
import gameImg from '../assets/game.png';
import waterImg from '../assets/water.png';
import petsImg from '../assets/pets.png';
import movieImg from '../assets/movie.png';

const projects = [
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

const Projects = () => {
  const navigate = useNavigate();

  const handleProjectClick = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <h2>Projelerim</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.map((tech, index) => (
                    <span key={index}>{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer">GitHub</a>
                  <button 
                    onClick={() => handleProjectClick(project.id)}
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