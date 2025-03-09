import { motion } from 'framer-motion'
import './Skills.css'
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaVuejs, FaGitAlt, FaNodeJs, FaSass, FaGithub } from 'react-icons/fa'
import { SiTypescript, SiAdobexd, SiFigma, SiPostman, SiReacthookform, SiExpress, SiPassport, SiPostgresql, SiPrisma, SiNestjs } from 'react-icons/si'
import { MdDevices, MdStorage } from 'react-icons/md'
import { BsBrushFill } from 'react-icons/bs'
import { TbBrandReactNative } from 'react-icons/tb'

const Skills = () => {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const skillItemVariants = {
    hidden: { 
      opacity: 0,
      x: -20
    },
    visible: { 
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 }
    }
  }

  return (
    <section id="skills" className="skills">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        Yeteneklerim
      </motion.h2>
      <motion.div 
        className="skills-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {skills.map((skillGroup, index) => (
          <motion.div 
            key={index} 
            className="skill-card"
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="skill-card-header"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div 
                className="skill-card-icon"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                {skillGroup.icon}
              </motion.div>
              <h3 className="skill-card-title">{skillGroup.category}</h3>
              <p className="skill-card-description">{skillGroup.description}</p>
            </motion.div>
            <div className="skill-card-content">
              {skillGroup.items.map((skill, skillIndex) => (
                <motion.div 
                  key={skillIndex} 
                  className="skill-item"
                  variants={skillItemVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="skill-item-header">
                    <motion.div 
                      className="skill-icon-wrapper"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {skill.icon}
                    </motion.div>
                    <span className="skill-name">{skill.name}</span>
                  </div>
                  <div className="skill-level">
                    <motion.div 
                      className="skill-circle-progress"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: skillIndex * 0.1 }}
                    >
                      <svg viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#eee"
                          strokeWidth="3"
                        />
                        <motion.path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="var(--primary-color)"
                          strokeWidth="3"
                          initial={{ strokeDasharray: "0, 100" }}
                          whileInView={{ strokeDasharray: `${skill.level}, 100` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: skillIndex * 0.1 }}
                        />
                      </svg>
                      <motion.span 
                        className="skill-percentage"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: skillIndex * 0.1 + 0.5 }}
                      >
                        {skill.level}%
                      </motion.span>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default Skills