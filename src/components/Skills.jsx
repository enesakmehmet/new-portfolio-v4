import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import './Skills.css'
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaVuejs, FaGitAlt, FaNodeJs, FaSass, FaGithub } from 'react-icons/fa'
import { SiTypescript, SiAdobexd, SiFigma, SiPostman, SiReacthookform, SiExpress, SiPassport, SiPostgresql, SiPrisma, SiNestjs } from 'react-icons/si'
import { MdDevices, MdStorage } from 'react-icons/md'
import { BsBrushFill } from 'react-icons/bs'
import { TbBrandReactNative } from 'react-icons/tb'
import React from 'react'

// Floating element decoration
const FloatingElement = ({ delay = 0, size = 30, color = "#fff", top, left, opacity = 0.2 }) => {
  return (
    <motion.div
      className="floating-element"
      style={{ 
        position: 'absolute',
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: '50%',
        top: top,
        left: left,
        filter: 'blur(8px)',
        opacity: opacity
      }}
      animate={{
        y: [0, -15, 0, 15, 0],
        x: [0, 10, 0, -10, 0],
        scale: [1, 1.05, 1, 0.95, 1],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut',
        delay: delay
      }}
    />
  );
}

// Background decoration
const BackgroundDecoration = () => {
  return (
    <div className="skills-bg-decoration">
      <FloatingElement size={100} top="10%" left="5%" color="rgba(var(--frontend-color-rgb), 0.2)" delay={0} />
      <FloatingElement size={60} top="25%" left="15%" color="rgba(var(--design-color-rgb), 0.2)" delay={2} />
      <FloatingElement size={80} top="60%" left="8%" color="rgba(var(--backend-color-rgb), 0.2)" delay={4} />
      <FloatingElement size={120} top="15%" left="85%" color="rgba(var(--frontend-color-rgb), 0.2)" delay={1} />
      <FloatingElement size={70} top="50%" left="90%" color="rgba(var(--design-color-rgb), 0.2)" delay={3} />
      <FloatingElement size={90} top="75%" left="80%" color="rgba(var(--backend-color-rgb), 0.2)" delay={5} />
    </div>
  );
}

// Eksik fonksiyon eklendi
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

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("Frontend");
  const [skills, setSkills] = useState([]);
  const skillsContainerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [activeSkill, setActiveSkill] = useState(null);

  useEffect(() => {
    const savedSkills = localStorage.getItem('skillCategories');
    if (savedSkills) {
      const parsedSkills = JSON.parse(savedSkills);
      
      const transformedSkills = parsedSkills.map(category => ({
        ...category,
        icon: getIconComponent(category.icon),
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
          icon: <FaReact />,
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
          icon: <BsBrushFill />,
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
          icon: <FaNodeJs />,
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

  const handleCategoryMouseEnter = (e, category) => {
    setActiveCategory(category);
  };

  const getActiveSkillGroup = () => {
    return skills.find(group => group.category === activeCategory) || { items: [] };
  }

  const handleMouseMove = (e) => {
    if (skillsContainerRef.current) {
      const bounds = skillsContainerRef.current.getBoundingClientRect();
      const x = (e.clientX - bounds.left) / bounds.width;
      const y = (e.clientY - bounds.top) / bounds.height;
      setHoverPosition({ x, y });
    }
  };

  const getCategoryGradient = (category) => {
    switch(category) {
      case "Frontend": return "linear-gradient(135deg, rgba(var(--frontend-color-rgb), 0.95), rgba(var(--primary-rgb), 0.95))";
      case "UI/UX Tasarım": return "linear-gradient(135deg, rgba(var(--design-color-rgb), 0.95), rgba(156, 136, 255, 0.95))";
      case "Backend": return "linear-gradient(135deg, rgba(var(--backend-color-rgb), 0.95), rgba(49, 151, 149, 0.95))";
      default: return "linear-gradient(135deg, rgba(var(--primary-rgb), 0.95), rgba(var(--secondary-rgb), 0.95))";
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Frontend": return "var(--frontend-color)";
      case "UI/UX Tasarım": return "var(--design-color)";
      case "Backend": return "var(--backend-color)";
      default: return "var(--primary-color)";
    }
  };

  return (
    <section id="skills" 
      className="skills-section" 
      ref={skillsContainerRef}
      onMouseMove={handleMouseMove}
      data-active-category={activeCategory}
    >
      <BackgroundDecoration />
      
      <motion.div 
        className="skills-header"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="skills-title gradient-title">Yeteneklerim</h2>
        <p className="skills-subtitle">Modern web teknolojileri, arayüz ve backend geliştirme konularında uzmanım.</p>
      </motion.div>
      
      <div className="skills-container">
        <div className="skill-category-list">
          {skills.map((category, idx) => (
            <motion.div
              className={`skill-category-card gradient-border${activeCategory === category.category ? ' active' : ''}`}
              key={category.category}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.7, type: 'spring' }}
              whileHover={{ scale: 1.04, boxShadow: "0 8px 32px #ff4ecd60" }}
              onClick={() => setActiveCategory(category.category)}
              onMouseEnter={(e) => handleCategoryMouseEnter(e, category.category)}
            >
              <div className="category-icon gradient-bg">
                {category.icon}
              </div>
              <div className="category-content">
                <h3>{category.category}</h3>
                <p>{category.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="skills-list-container"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="skills-list">
            {getActiveSkillGroup().items.map((skill, idx) => (
              <motion.div
                className="skill-card gradient-card"
                key={skill.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.07, duration: 0.6, type: 'spring' }}
                whileHover={{ scale: 1.06, boxShadow: "0 6px 24px #ff4ecd90" }}
              >
                <div className="skill-icon gradient-bg">
                  {skill.icon}
                </div>
                <div className="skill-info">
                  <span className="skill-name">{skill.name}</span>
                  <div className="skill-bar-bg">
                    <motion.div
                      className="skill-bar gradient-bar"
                      initial={{ width: 0 }}
                      animate={{ width: skill.level + '%' }}
                      transition={{ duration: 1.2, delay: 0.2 + idx * 0.05, type: 'spring' }}
                    />
                  </div>
                  <span className="skill-level-text">%{skill.level}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Skills