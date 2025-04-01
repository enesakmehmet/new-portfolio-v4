import { motion } from 'framer-motion'
import './Hero.css'
import profilePhoto from '../assets/images/1740750293644.jpeg'

const Hero = () => {
  return (
    <section className="hero">
      <motion.div 
        className="hero-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Full-Stack Developer & UI/UX Designer
        </motion.p>
        <motion.p 
          className="hero-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Modern ve kullanıcı dostu web uygulamaları geliştiriyorum.
          Yaratıcı çözümler ve etkileyici kullanıcı deneyimleri sunuyorum.
        </motion.p>
        <motion.div 
          className="hero-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
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
          <motion.img 
            src={profilePhoto} 
            alt="Enes'in profil fotoğrafı"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero