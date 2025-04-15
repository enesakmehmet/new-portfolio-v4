import { motion } from 'framer-motion'
import './Hero.css'
import { useEffect, useRef, useState } from 'react'
import TypewriterText from './animations/TypewriterText'
import Lottie from 'lottie-react';
import heroAnimation from '../assets/hero-lottie.json';

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
      {/* Animated SVG/Lottie background */}
      <div className="hero-bg-animation">
        <Lottie animationData={heroAnimation} loop autoPlay style={{ width: '100%', height: '100%' }} />
      </div>
      <motion.div 
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="hero-title gradient-title"
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
              className="highlight gradient-highlight"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ 
                scale: 1.15,
                color: "#ff4ecd",
                textShadow: "0 0 16px #ff4ecd80",
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
          </>
        )}
        {/* CTA Buttons */}
        <div className="hero-buttons">
          <a href="#projects" className="cta-btn primary">Projelerim</a>
          <a href="#contact" className="cta-btn secondary">İletişim</a>
          <a href="/cv/Enes_CV.pdf" className="cta-btn secondary" download="Enes_CV.pdf">CV İndir</a>
        </div>
        {/* Profile photo with animated border */}
        <motion.div 
          className="hero-photo-container"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.7 }}
          whileHover={{ scale: 1.04, boxShadow: "0 8px 32px #ff4ecd40" }}
        >
          <img ref={imgRef} className="hero-photo" src="/images/profile-photo.jpeg" alt="Enes" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
