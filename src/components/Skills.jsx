import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import './Skills.css'
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaVuejs, FaGitAlt, FaNodeJs, FaSass, FaGithub } from 'react-icons/fa'
import { SiTypescript, SiAdobexd, SiFigma, SiPostman, SiReacthookform, SiExpress, SiPassport, SiPostgresql, SiPrisma, SiNestjs } from 'react-icons/si'
import { MdDevices, MdStorage } from 'react-icons/md'
import { BsBrushFill } from 'react-icons/bs'
import { TbBrandReactNative } from 'react-icons/tb'
import React from 'react'

// Particle component for background animation
const Particle = ({ active, color }) => {
  const size = Math.random() * 10 + 5;
  const duration = Math.random() * 10 + 10;
  const initialX = Math.random() * 100;
  const initialY = Math.random() * 100;
  const initialScale = Math.random() * 0.5 + 0.5;
  
  return (
    <motion.div
      className="particle"
      initial={{ 
        x: `${initialX}%`, 
        y: `${initialY}%`, 
        scale: initialScale,
        opacity: 0
      }}
      animate={{
        y: [`${initialY}%`, `${initialY - 30 + Math.random() * 60}%`],
        x: [`${initialX}%`, `${initialX - 20 + Math.random() * 40}%`],
        rotate: [0, Math.random() * 360],
        scale: [initialScale, initialScale * 0.7, initialScale * 1.2, initialScale],
        opacity: [0, 0.7, 0.7, 0]
      }}
      transition={{ 
        duration: duration,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut"
      }}
      style={{ 
        width: size, 
        height: size,
        background: color || 'var(--primary-color)',
        borderRadius: Math.random() > 0.5 ? '50%' : '30%',
        filter: 'blur(1px)',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,
        boxShadow: `0 0 10px ${color || 'var(--primary-color)'}`
      }}
    />
  );
};

// Background particles container
const ParticlesBackground = ({ category }) => {
  const count = 15; // Number of particles
  const particles = [];
  
  // Get category color for particles
  const color = (() => {
    switch(category) {
      case "Frontend": return "rgba(var(--frontend-color-rgb), 0.3)";
      case "UI/UX Tasarım": return "rgba(var(--design-color-rgb), 0.3)";
      case "Backend": return "rgba(var(--backend-color-rgb), 0.3)";
      default: return "rgba(var(--primary-rgb), 0.3)";
    }
  })();
  
  for (let i = 0; i < count; i++) {
    particles.push(
      <Particle key={i} active={true} color={color} />
    );
  }
  
  return (
    <div className="particles-container">
      {particles}
    </div>
  );
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("Frontend");
  const [skills, setSkills] = useState([]);
  const [counters, setCounters] = useState({});
  const skillsContainerRef = useRef(null);

  // Helper for circular progress animation
  const CircleProgress = ({ percentage, color }) => {
    const circleRef = useRef(null);
    const textRef = useRef(null);
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      if (circleRef.current) {
        const radius = circleRef.current.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;
        const offset = circumference - (percentage / 100) * circumference;
        circleRef.current.style.strokeDasharray = `${circumference} ${circumference}`;
        circleRef.current.style.strokeDashoffset = offset;
        circleRef.current.style.stroke = color || 'var(--primary-color)';
      }
      
      // Counter animation
      let startCount = 0;
      const duration = 1200;
      const step = percentage / (duration / 16); // 16ms per frame at 60fps
      
      const counter = setInterval(() => {
        startCount += step;
        if (startCount > percentage) {
          setCount(percentage);
          clearInterval(counter);
        } else {
          setCount(Math.floor(startCount));
        }
      }, 16);
      
      return () => clearInterval(counter);
    }, [percentage, color]);
    
    return (
      <div className="skill-progress-circle">
        <svg className="progress-ring" width="80" height="80">
          <circle 
            className="progress-ring__background"
            strokeWidth="8"
            r="34"
            cx="40"
            cy="40" 
          />
          <circle 
            ref={circleRef}
            className="progress-ring__circle"
            strokeWidth="8"
            r="34"
            cx="40"
            cy="40" 
          />
        </svg>
        <div ref={textRef} className="progress-text">{count}%</div>
      </div>
    );
  };
  
  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'FaHtml5': return <FaHtml5 />;
      case 'FaCss3Alt': return <FaCss3Alt />;
      case 'FaJs': return <FaJs />;
      case 'FaReact': return <FaReact />;
      case 'FaVuejs': return <FaVuejs />;
      case 'FaGitAlt': return <FaGitAlt />;
      case 'FaNodeJs': return <FaNodeJs />;
      case 'FaSass': return <FaSass />;
      case 'FaGithub': return <FaGithub />;
      case 'SiTypescript': return <SiTypescript />;
      case 'SiAdobexd': return <SiAdobexd />;
      case 'SiFigma': return <SiFigma />;
      case 'SiPostman': return <SiPostman />;
      case 'SiReacthookform': return <SiReacthookform />;
      case 'SiExpress': return <SiExpress />;
      case 'SiPassport': return <SiPassport />;
      case 'SiPostgresql': return <SiPostgresql />;
      case 'SiPrisma': return <SiPrisma />;
      case 'SiNestjs': return <SiNestjs />;
      case 'MdDevices': return <MdDevices />;
      case 'MdStorage': return <MdStorage />;
      case 'BsBrushFill': return <BsBrushFill />;
      case 'TbBrandReactNative': return <TbBrandReactNative />;
      default: return <FaReact />;
    }
  };

  const getCategoryIcon = (iconName) => {
    const icon = getIconComponent(iconName);
    return React.cloneElement(icon, { className: "category-icon" });
  };
  
  // Get category-specific color
  const getCategoryColor = (category) => {
    switch (category) {
      case "Frontend": return "var(--frontend-color)";
      case "UI/UX Tasarım": return "var(--design-color)";
      case "Backend": return "var(--backend-color)";
      default: return "var(--primary-color)";
    }
  };

  useEffect(() => {
    const savedSkills = localStorage.getItem('skillCategories');
    if (savedSkills) {
      const parsedSkills = JSON.parse(savedSkills);
      
      const transformedSkills = parsedSkills.map(category => ({
        ...category,
        icon: getCategoryIcon(category.icon),
        items: category.items.map(item => ({
          ...item,
          icon: getIconComponent(item.icon)
        }))
      }));
      
      setSkills(transformedSkills);
      
      if (transformedSkills.length > 0 && !transformedSkills.find(cat => cat.category === activeCategory)) {
        setActiveCategory(transformedSkills[0].category);
      }
    } else {
      const defaultSkills = [
        {
          category: "Frontend",
          icon: <FaReact className="category-icon" />,
          description: "Modern web teknolojileri ile kullanıcı deneyimi odaklı geliştirme",
          items: [
            { name: "HTML5", level: 90, icon: <FaHtml5 /> },
            { name: "CSS3", level: 85, icon: <FaCss3Alt /> },
            { name: "JavaScript", level: 85, icon: <FaJs /> },
            { name: "React", level: 80, icon: <FaReact /> },
            { name: "React Native", level: 75, icon: <TbBrandReactNative /> },
            { name: "Vue.js", level: 75, icon: <FaVuejs /> },
            { name: "Sass", level: 80, icon: <FaSass /> },
            { name: "Figma", level: 85, icon: <SiFigma /> },
            { name: "GitHub", level: 85, icon: <FaGithub /> },
            { name: "Postman", level: 75, icon: <SiPostman /> },
            { name: "Zustand", level: 75, icon: <MdStorage /> },
            { name: "React Hook Form", level: 80, icon: <SiReacthookform /> }
          ]
        },
        {
          category: "UI/UX Tasarım",
          icon: <BsBrushFill className="category-icon" />,
          description: "Kullanıcı odaklı arayüz tasarımı ve deneyim optimizasyonu",
          items: [
            { name: "Figma", level: 85, icon: <SiFigma /> },
            { name: "Adobe XD", level: 80, icon: <SiAdobexd /> },
            { name: "Responsive Tasarım", level: 90, icon: <MdDevices /> },
            { name: "UI Prensipleri", level: 85, icon: <BsBrushFill /> }
          ]
        },
        {
          category: "Backend",
          icon: <FaNodeJs className="category-icon" />,
          description: "Sunucu tarafı teknolojileri ve veritabanı yönetimi",
          items: [
            { name: "Node.js", level: 80, icon: <FaNodeJs /> },
            { name: "TypeScript", level: 75, icon: <SiTypescript /> },
            { name: "Express.js", level: 75, icon: <SiExpress /> },
            { name: "Passport.js", level: 70, icon: <SiPassport /> },
            { name: "PostgreSQL", level: 75, icon: <SiPostgresql /> },
            { name: "Prisma ORM", level: 70, icon: <SiPrisma /> },
            { name: "NestJS", level: 70, icon: <SiNestjs /> }
          ]
        }
      ];
      setSkills(defaultSkills);
    }
  }, [activeCategory]);

  // Animation for counter numbers
  useEffect(() => {
    const currentSkillGroup = getActiveSkillGroup();
    const newCounters = {};
    
    currentSkillGroup.items.forEach(skill => {
      let count = 0;
      const interval = setInterval(() => {
        count += 1;
        if (count > skill.level) {
          clearInterval(interval);
        } else {
          newCounters[skill.name] = count;
          setCounters({...newCounters});
        }
      }, 20);
    });
    
    return () => {
      currentSkillGroup.items.forEach(skill => {
        clearInterval(skill.name);
      });
    };
  }, [activeCategory]);

  const getActiveSkillGroup = () => {
    return skills.find(group => group.category === activeCategory) || { items: [] };
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const skillBarVariants = {
    hidden: { width: 0 },
    visible: width => ({
      width: `${width}%`,
      transition: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }
    })
  }

  const tabVariants = {
    inactive: { 
      scale: 0.95, 
      opacity: 0.7,
      y: 0
    },
    active: { 
      scale: 1, 
      opacity: 1,
      y: -10,
      transition: { type: "spring", stiffness: 400, damping: 20 }
    }
  }

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 30,
      rotateX: 10
    },
    visible: { 
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  }

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    },
    hover: { 
      scale: 1.2,
      rotate: 15,
      transition: { 
        duration: 0.3,
        type: "spring",
        stiffness: 400
      }
    }
  }

  // 3D Card Tilt Effect
  const handleCardTilt = (e, card) => {
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    
    const offsetX = ((x - midX) / midX) * 10;
    const offsetY = ((y - midY) / midY) * 10;
    
    card.style.transform = `perspective(1000px) rotateX(${-offsetY}deg) rotateY(${offsetX}deg) scale3d(1.02, 1.02, 1.02)`;
  };
  
  const resetCardTilt = (card) => {
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  // Attach event listeners for card tilt
  useEffect(() => {
    const cards = document.querySelectorAll('.skill-item-card');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => handleCardTilt(e, card));
      card.addEventListener('mouseleave', () => resetCardTilt(card));
    });
    
    return () => {
      cards.forEach(card => {
        card.removeEventListener('mousemove', (e) => handleCardTilt(e, card));
        card.removeEventListener('mouseleave', () => resetCardTilt(card));
      });
    };
  }, [activeCategory]);

  return (
    <section id="skills" className="skills-section" ref={skillsContainerRef}>
      <ParticlesBackground category={activeCategory} />
      <div className="container">
        <motion.div 
          className="skills-header"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          <h2 className="skills-title">Yeteneklerim</h2>
          <p className="skills-subtitle">Profesyonel olarak kullandığım teknolojiler ve araçlar</p>
        </motion.div>

        <div className="skills-tabs-container">
          <motion.div 
            className="skills-tabs"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            {skills.map((skillGroup, index) => (
              <motion.div
                key={index}
                className={`skill-tab ${activeCategory === skillGroup.category ? 'active' : ''}`}
                onClick={() => setActiveCategory(skillGroup.category)}
                variants={tabVariants}
                initial="inactive"
                animate={activeCategory === skillGroup.category ? "active" : "inactive"}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{ '--i': index }}
                data-category={skillGroup.category}
              >
                <motion.div 
                  className="skill-tab-icon"
                  variants={iconVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                >
                  {skillGroup.icon}
                </motion.div>
                <span>{skillGroup.category}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            className="skills-content"
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="skills-category-info"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              data-category={activeCategory}
            >
              <motion.div 
                className="category-icon-large"
                whileHover={{ 
                  scale: 1.1, 
                  rotate: 5,
                  transition: { duration: 0.3, type: "spring" } 
                }}
              >
                {getActiveSkillGroup().icon}
              </motion.div>
              <div className="category-details">
                <h3>{getActiveSkillGroup().category}</h3>
                <p>{getActiveSkillGroup().description}</p>
              </div>
            </motion.div>

            <motion.div 
              className="skills-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              data-category={activeCategory}
            >
              {getActiveSkillGroup().items.map((skill, index) => (
                <motion.div 
                  className="skill-item-card"
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: index * 0.08, 
                    duration: 0.6, 
                    ease: [0.43, 0.13, 0.23, 0.96] 
                  }}
                  style={{ '--i': index, transition: 'transform 0.2s ease-out' }}
                >
                  <div className="card-glow"></div>
                  <div className="skill-item-header">
                    <motion.div 
                      className="skill-item-icon"
                      variants={iconVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      style={{ '--i': index }}
                    >
                      {skill.icon}
                    </motion.div>
                    <h4 className="skill-item-name">{skill.name}</h4>
                  </div>
                  
                  <div className="skill-progress-container">
                    <div className="skill-level-label">
                      <span>Uzmanlık</span>
                      <span className="skill-percentage">
                        {counters[skill.name] || 0}%
                      </span>
                    </div>
                    <div className="skill-progress-bar">
                      <motion.div 
                        className="skill-progress-fill"
                        custom={skill.level}
                        variants={skillBarVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        style={{ '--i': index }}
                      />
                    </div>
                    <CircleProgress 
                      percentage={skill.level} 
                      color={getCategoryColor(activeCategory)} 
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Skills