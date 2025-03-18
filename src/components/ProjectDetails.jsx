import React from 'react';
import { useParams } from 'react-router-dom';
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

// Proje verileri burada kalsın unutma!!! 
const projects = [
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
