import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import waterImg from '../assets/water.png';
import anaImg from '../assets/1.proje detay resim/ana.png'
import gameImg from '../assets/1.proje detay resim/game.png'
import game1Img from '../assets/1.proje detay resim/game1.png'
import game2Img from '../assets/1.proje detay resim/game2.png'
import anaopen from '../assets/2.proje detay resim/anaopen.png'
import open2 from '../assets/2.proje detay resim/open2.png'
import open3 from '../assets/2.proje detay resim/open3.png'
import open4 from '../assets/2.proje detay resim/open4.png'
import happy from '../assets/3.proje detay resim/happyana.png'
import happy1 from '../assets/3.proje detay resim/happy1.png'
import happy2 from '../assets/3.proje detay resim/happy2.png'
import happy3 from '../assets/3.proje detay resim/happy3.png'
import movie from '../assets/4.proje detay resim/movieana.png'
import movie1 from '../assets/4.proje detay resim/movie1.png'
import movie2 from '../assets/4.proje detay resim/movie2.png'

// Fallback project data
const fallbackProjects = [
  {
    id: 1,
    title: "E-Ticaret Oyun Key Satış Platformu",
    mainImage: anaImg,
    description: "Modern bir e-ticaret platformu. Kullanıcılar ürünleri görüntüleyebilir, sepete ekleyebilir ve satın alabilir. Admin paneli ile ürün yönetimi, sipariş takibi ve kullanıcı yönetimi yapılabilir.",
    gallery: [
      gameImg,
      game1Img,
      game2Img,
    ],
    technologies: ["JavaScript", "Node.js", "PostgreSQL", "Express.js"]
  },
  {
    id: 2,
    title: "OpenWeatherMap",
    mainImage: waterImg,
    description: "OpenWeatherMap API'sini kullanarak anlık hava durumu, hava tahmini, hava kalitesi ve UV endeksi gibi bilgileri alıyor.",
    gallery: [
     anaopen,
      open2,
      open3,
     open4
    ],
    technologies: ["React", "Tailwind CSS", "Prisma", "PostgreSQL"]
  },
  {
    id: 3,
    title: "Happy Pets",
    mainImage: happy,
    description: "Bu proje, Happy Pets isimli bir online pet shop platformunu içeren kapsamlı bir web sitesi geliştirmeyi amaçlamaktadır. Kullanıcılar, kedi, köpek ve diğer evcil hayvanlar için mama, oyuncak, aksesuar gibi ürünleri inceleyebilir, satın alabilir ve veteriner hizmetleri hakkında bilgi alabilirler.",
    gallery: [
      happy,
      happy1,
      happy2,
      happy3
    ],
    technologies: ["React", "Socket.io", "Node.js", "MongoDB", "TypeScript"]
  },
  {
    id: 4,
    title: "Movie App",
    mainImage: movie,
    description: "Bu proje, Film Dünyası adında bir film keşfetme ve yönetme platformudur. Kullanıcılar, popüler ve klasik filmleri keşfedebilir, favorilerine ekleyebilir, izleme listesi oluşturabilir, film puanlayabilir ve yorum yapabilir.",
    gallery: [
      movie,
      movie1,
      movie2,
    ],
    technologies: ["React", "NestJS", "PostgreSQL", "Docker", "JWT"]
  }
];

// Image fallbacks for each project
const fallbackImages = {
  1: anaImg,
  2: waterImg,
  3: happy,
  4: movie
};

// Gallery fallbacks for each project
const fallbackGalleries = {
  1: [gameImg, game1Img, game2Img],
  2: [anaopen, open2, open3, open4],
  3: [happy, happy1, happy2, happy3],
  4: [movie, movie1, movie2]
};

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const API_URL = import.meta.env.VITE_API_URL || '';

  // Helper function to get the correct image URL
  const getProjectImage = useCallback((project) => {
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
  }, [API_URL]);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        // First check localStorage for projects
        const localProjects = JSON.parse(localStorage.getItem('projects') || '[]');
        
        // Find the project in localStorage first
        let foundProject = localProjects.find(p => 
          (p._id === id || p.id === id || p._id === parseInt(id) || p.id === parseInt(id))
        );
        
        // If not found in localStorage, try to fetch from API
        if (!foundProject && API_URL) {
          try {
            const response = await axios.get(`${API_URL}/api/projects/${id}`);
            if (response.data) {
              foundProject = response.data;
            }
          } catch (apiError) {
            console.log('API fetch failed, using fallback data:', apiError.message);
          }
        }
        
        // If still not found, use fallback data
        if (!foundProject) {
          foundProject = fallbackProjects.find(p => p.id === parseInt(id));
        }
        
        if (foundProject) {
          // Process the project to ensure it has all required properties
          const processedProject = {
            ...foundProject,
            // Ensure the project has a gallery
            gallery: foundProject.gallery || fallbackGalleries[parseInt(id)] || [],
            // Ensure the project has a mainImage
            mainImage: getProjectImage(foundProject)
          };
          
          setProject(processedProject);
          setError(null);
        } else {
          setError('Proje bulunamadı');
        }
      } catch (err) {
        console.error('Error fetching project:', err);
        setError('Proje yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProject();
  }, [id, API_URL, getProjectImage]);
  
  if (loading) {
    return <div className="text-center py-10">Proje yükleniyor...</div>;
  }

  if (error) {
    return <div className="text-center py-10">{error}</div>;
  }

  if (!project) {
    return <div className="text-center py-10">Proje bulunamadı</div>;
  }

  return (
    <div className="project-details" style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px',
      backgroundColor: '#fff'
    }}>
      {/* Proje Başlığı */}
      <h1 style={{
        fontSize: '2.5rem',
        marginTop: '40px',
        marginBottom: '30px',
        color: '#2d3748',
        textAlign: 'center'
      }}>{project.title}</h1>

      {/* Ana Proje Görseli */}
      <div style={{
        width: '100%',
        height: '400px',
        marginBottom: '40px',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <img 
          src={project.mainImage} 
          alt={project.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
          onError={(e) => {
            console.error('Image failed to load:', e.target.src);
            e.target.src = fallbackImages[parseInt(id)] || fallbackImages[1];
          }}
        />
      </div>

      {/* Teknolojiler */}
      <div style={{
        marginBottom: '30px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        justifyContent: 'center'
      }}>
        {Array.isArray(project.technologies) ? (
          project.technologies.map((tech, index) => (
            <span key={index} style={{
              padding: '8px 16px',
              backgroundColor: '#e2e8f0',
              borderRadius: '20px',
              fontSize: '0.9rem',
              color: '#4a5568'
            }}>
              {tech}
            </span>
          ))
        ) : (
          <span style={{
            padding: '8px 16px',
            backgroundColor: '#e2e8f0',
            borderRadius: '20px',
            fontSize: '0.9rem',
            color: '#4a5568'
          }}>
            Teknoloji bilgisi bulunamadı
          </span>
        )}
      </div>

      {/* Proje Açıklaması */}
      <div style={{
        backgroundColor: '#f7fafc',
        padding: '30px',
        borderRadius: '12px',
        marginBottom: '40px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
      }}>
        <h2 style={{
          fontSize: '1.8rem',
          marginBottom: '20px',
          color: '#2d3748'
        }}>Proje Hakkında</h2>
        <p style={{
          fontSize: '1.1rem',
          lineHeight: '1.8',
          color: '#4a5568'
        }}>{project.description}</p>
      </div>

      {/* Resim Galerisi */}
      <div>
        <h2 style={{
          fontSize: '1.8rem',
          marginBottom: '20px',
          color: '#2d3748'
        }}>Proje Görselleri</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          marginTop: '20px'
        }}>
          {(project.gallery && project.gallery.length > 0) ? (
            project.gallery.map((image, index) => (
              <div key={index} style={{
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease',
                cursor: 'pointer',
                ':hover': {
                  transform: 'scale(1.02)'
                }
              }}>
                <img 
                  src={image} 
                  alt={`Proje görsel ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '220px',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    console.error('Gallery image failed to load:', e.target.src);
                    const fallbackGallery = fallbackGalleries[parseInt(id)];
                    if (fallbackGallery && fallbackGallery[index]) {
                      e.target.src = fallbackGallery[index];
                    } else {
                      e.target.src = fallbackImages[parseInt(id)] || fallbackImages[1];
                    }
                  }}
                />
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', gridColumn: '1 / -1' }}>
              <p>Bu proje için galeri görselleri bulunmamaktadır.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
