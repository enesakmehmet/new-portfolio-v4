import { motion } from 'framer-motion'
import './Hero.css'
import { useEffect, useRef } from 'react'

// Animate variants for more efficient animation reuse
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.2
    } 
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 } 
  }
}

const Hero: React.FC = () => {
  const imgRef = useRef<HTMLImageElement>(null);

  // Preload profile image for better performance
  useEffect(() => {
    const img = new Image();
    img.src = '/images/profile-photo.jpeg';
    img.onload = () => {
      if (imgRef.current) {
        imgRef.current.src = img.src;
        imgRef.current.classList.add('loaded');
      }
    };
  }, []);

  return (
    <section className="hero">
      <motion.div 
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="hero-title"
          variants={itemVariants}
        >
          Merhaba, Ben <motion.span 
            className="highlight"
            whileHover={{ 
              scale: 1.1,
              color: "#007bff",
              transition: { duration: 0.2 }
            }}
          >Enes</motion.span>
        </motion.h1>
        <motion.p 
          className="hero-subtitle"
          variants={itemVariants}
        >
          Full-Stack Developer & UI/UX Designer
        </motion.p>
        <motion.p 
          className="hero-description"
          variants={itemVariants}
        >
          Modern ve kullanıcı dostu web uygulamaları geliştiriyorum.
          Yaratıcı çözümler ve etkileyici kullanıcı deneyimleri sunuyorum.
        </motion.p>
        <motion.div 
          className="hero-buttons"
          variants={itemVariants}
        >
          <motion.a 
            href="#contact" 
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            İletişime Geç
          </motion.a>
          <motion.a 
            href="/cv/Enes_CV.pdf" 
            className="btn btn-outline"
            download="Enes_CV.pdf"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            CV İndir
          </motion.a>
          <motion.a 
            href="#projects" 
            className="btn btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Projelerimi Gör
          </motion.a>
        </motion.div>
      </motion.div>
      <motion.div 
        className="hero-image"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <motion.div 
          className="image-container"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <img 
            ref={imgRef}
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E" 
            alt="Enes'in profil fotoğrafı"
            loading="eager"
            className="profile-image"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
