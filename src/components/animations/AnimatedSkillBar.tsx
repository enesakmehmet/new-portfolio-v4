import { motion } from 'framer-motion';
import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';

interface AnimatedSkillBarProps {
  name: string;
  percentage: number;
  color?: string;
  delay?: number;
}

const AnimatedSkillBar: React.FC<AnimatedSkillBarProps> = ({
  name,
  percentage,
  color = '#6b21a8',
  delay = 0
}) => {
  const { ref, controls } = useAnimateOnScroll({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const barVariants = {
    hidden: { width: 0 },
    visible: { 
      width: `${percentage}%`,
      transition: {
        duration: 1.5,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: delay * 0.2 + 0.2
      }
    }
  };
  
  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: delay * 0.2
      }
    }
  };
  
  const numberVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        delay: (delay * 0.2) + 1
      }
    }
  };
  
  return (
    <div ref={ref} className="skill-bar-wrapper" style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
        <motion.div
          variants={textVariants}
          initial="hidden"
          animate={controls}
        >
          <strong>{name}</strong>
        </motion.div>
        
        <motion.div
          variants={numberVariants}
          initial="hidden"
          animate={controls}
        >
          {percentage}%
        </motion.div>
      </div>
      
      <div
        className="skill-bar-bg"
        style={{
          height: '8px',
          backgroundColor: 'rgba(0,0,0,0.1)',
          borderRadius: '4px',
          overflow: 'hidden'
        }}
      >
        <motion.div
          className="skill-bar-fill"
          variants={barVariants}
          initial="hidden"
          animate={controls}
          style={{
            height: '100%',
            backgroundColor: color,
            borderRadius: '4px',
          }}
        />
      </div>
    </div>
  );
};

interface AnimatedSkillGroupProps {
  skills: Array<{
    name: string;
    percentage: number;
    color?: string;
  }>;
}

export const AnimatedSkillGroup: React.FC<AnimatedSkillGroupProps> = ({ skills }) => {
  const { ref, controls } = useAnimateOnScroll({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      className="skill-group"
    >
      {skills.map((skill, index) => (
        <AnimatedSkillBar
          key={skill.name}
          name={skill.name}
          percentage={skill.percentage}
          color={skill.color}
          delay={index}
        />
      ))}
    </motion.div>
  );
};

export default AnimatedSkillBar; 