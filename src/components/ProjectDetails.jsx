import React from 'react';
import { useParams } from 'react-router-dom';
import gameImg from '../assets/game.png';
import waterImg from '../assets/water.png';
import petsImg from '../assets/pets.png';
import movieImg from '../assets/movie.png';

// Proje verilerini içeri aktaralım
const projects = [
  {
    id: 1,
    title: "E-Ticaret Oyun Key Satış Platformu",
    mainImage: gameImg,
    description: "Modern bir e-ticaret platformu. Kullanıcılar ürünleri görüntüleyebilir, sepete ekleyebilir ve satın alabilir. Admin paneli ile ürün yönetimi, sipariş takibi ve kullanıcı yönetimi yapılabilir.",
    gallery: [
      gameImg,
      waterImg,
      petsImg,
      movieImg
    ],
    technologies: ["JavaScript", "Node.js", "PostgreSQL", "Express.js"]
  },
  {
    id: 2,
    title: "OpenWeatherMap",
    mainImage: waterImg,
    description: "OpenWeatherMap API'sini kullanarak anlık hava durumu, hava tahmini, hava kalitesi ve UV endeksi gibi bilgileri alıyor.",
    gallery: [
      waterImg,
      gameImg,
      petsImg,
      movieImg
    ],
    technologies: ["React", "Tailwind CSS", "Prisma", "PostgreSQL"]
  },
  {
    id: 3,
    title: "Happy Pets",
    mainImage: petsImg,
    description: "Bu proje, Happy Pets isimli bir online pet shop platformunu içeren kapsamlı bir web sitesi geliştirmeyi amaçlamaktadır. Kullanıcılar, kedi, köpek ve diğer evcil hayvanlar için mama, oyuncak, aksesuar gibi ürünleri inceleyebilir, satın alabilir ve veteriner hizmetleri hakkında bilgi alabilirler.",
    gallery: [
      petsImg,
      gameImg,
      waterImg,
      movieImg
    ],
    technologies: ["React", "Socket.io", "Node.js", "MongoDB", "TypeScript"]
  },
  {
    id: 4,
    title: "Movie App",
    mainImage: movieImg,
    description: "Bu proje, Film Dünyası adında bir film keşfetme ve yönetme platformudur. Kullanıcılar, popüler ve klasik filmleri keşfedebilir, favorilerine ekleyebilir, izleme listesi oluşturabilir, film puanlayabilir ve yorum yapabilir.",
    gallery: [
      movieImg,
      gameImg,
      waterImg,
      petsImg
    ],
    technologies: ["React", "NestJS", "PostgreSQL", "Docker", "JWT"]
  }
];

export default function ProjectDetails() {
  const { id } = useParams();
  const project = projects.find(p => p.id === parseInt(id));

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
        {project.technologies.map((tech, index) => (
          <span key={index} style={{
            padding: '8px 16px',
            backgroundColor: '#e2e8f0',
            borderRadius: '20px',
            fontSize: '0.9rem',
            color: '#4a5568'
          }}>
            {tech}
          </span>
        ))}
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
          {project.gallery.map((image, index) => (
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
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
