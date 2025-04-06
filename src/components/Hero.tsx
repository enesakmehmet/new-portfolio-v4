import { motion } from 'framer-motion'
import './Hero.css'
import { useEffect, useRef, useState } from 'react'
import TypewriterText from './animations/TypewriterText'

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
  const [typewriterComplete, setTypewriterComplete] = useState(false);
  const [showTitles, setShowTitles] = useState(false);

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
          <TypewriterText 
            text="Merhaba, Ben " 
            typingSpeed={40} 
            delay={500}
            onComplete={() => setTypewriterComplete(true)}
          />
          {typewriterComplete && (
            <motion.span 
              className="highlight"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ 
                scale: 1.1,
                color: "#007bff",
                transition: { duration: 0.2 }
              }}
              onAnimationComplete={() => setShowTitles(true)}
            >
              Enes
            </motion.span>
          )}
        </motion.h1>
        
        {showTitles && (
          <>
            <motion.p 
              className="hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <TypewriterText 
                text="Full-Stack Developer & UI/UX Designer" 
                typingSpeed={30} 
              />
            </motion.p>
            <motion.p 
              className="hero-description"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.5 }}
            >
              Modern ve kullanıcı dostu web uygulamaları geliştiriyorum.
              Yaratıcı çözümler ve etkileyici kullanıcı deneyimleri sunuyorum.
            </motion.p>
            <motion.div 
              className="hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2 }}
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
          </>
        )}
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
