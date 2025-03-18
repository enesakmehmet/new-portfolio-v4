import { motion } from 'framer-motion'
import { useState } from 'react'
import './Skills.css'
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaVuejs, FaGitAlt, FaNodeJs, FaSass, FaGithub } from 'react-icons/fa'
import { SiTypescript, SiAdobexd, SiFigma, SiPostman, SiReacthookform, SiExpress, SiPassport, SiPostgresql, SiPrisma, SiNestjs } from 'react-icons/si'
import { MdDevices, MdStorage } from 'react-icons/md'
import { BsBrushFill } from 'react-icons/bs'
import { TbBrandReactNative } from 'react-icons/tb'

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("Frontend");

  const skills = [
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
  ]

  const getActiveSkillGroup = () => {
    return skills.find(group => group.category === activeCategory);
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
      transition: { duration: 1, ease: "easeOut" }
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
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  }

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      rotateX: 20
    },
    visible: { 
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
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
        stiffness: 260,
        damping: 20
      }
    },
    hover: { 
      scale: 1.2,
      rotate: 10,
      transition: { 
        duration: 0.3,
        type: "spring",
        stiffness: 300
      }
    }
  }

  return (
    <section id="skills" className="skills-section">
      <motion.div 
        className="skills-header"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="skills-title">Yeteneklerim</h2>
        <p className="skills-subtitle">Profesyonel olarak kullandığım teknolojiler ve araçlar</p>
      </motion.div>

      <div className="skills-tabs-container">
        <motion.div 
          className="skills-tabs"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
        >
          {skills.map((skillGroup, index) => (
            <motion.div
              key={index}
              className={`skill-tab ${activeCategory === skillGroup.category ? 'active' : ''}`}
              onClick={() => setActiveCategory(skillGroup.category)}
              variants={tabVariants}
              initial="inactive"
              animate={activeCategory === skillGroup.category ? "active" : "inactive"}
              whileHover={{ scale: 1.05 }}
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

      <motion.div 
        className="skills-content"
        key={activeCategory}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="skills-category-info"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="category-icon-large">
            {getActiveSkillGroup().icon}
          </div>
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
        >
          {getActiveSkillGroup().items.map((skill, index) => (
            <motion.div 
              className="skill-item-card"
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              whileHover={{ 
                scale: 1.03, 
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
                transition: { duration: 0.3 }
              }}
            >
              <div className="skill-item-header">
                <motion.div 
                  className="skill-item-icon"
                  variants={iconVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                >
                  {skill.icon}
                </motion.div>
                <h4 className="skill-item-name">{skill.name}</h4>
              </div>
              
              <div className="skill-progress-container">
                <div className="skill-level-label">
                  <span>Uzmanlık</span>
                  <span className="skill-percentage">{skill.level}%</span>
                </div>
                <div className="skill-progress-bar">
                  <motion.div 
                    className="skill-progress-fill"
                    custom={skill.level}
                    variants={skillBarVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Skills