import { useContext } from 'react';
import { motion } from 'framer-motion';
import ThemeContext from '../../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  size?: number;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  size = 24
}) => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const theme = darkMode ? 'dark' : 'light';
  const isDark = theme === 'dark';

  // Sun/moon variants
  const variants = {
    initial: { scale: 0.6, rotate: 0 },
    animate: { scale: 1, rotate: isDark ? 0 : 180 },
    whileTap: { scale: 0.95, rotate: isDark ? 15 : 165 }
  };

  // Ray variants
  const rayVariants = {
    initial: { opacity: 0.6, scale: 1.5 },
    animate: { 
      opacity: isDark ? 0 : 0.8, 
      scale: isDark ? 0 : 1,
      transition: { duration: 0.3 }
    }
  };

  // Path variants
  const moonMaskVariants = {
    initial: { 
      translateX: 0,
      opacity: 0
    },
    animate: { 
      translateX: isDark ? -5 : 20, 
      opacity: isDark ? 1 : 0,
      transition: {
        duration: 0.3
      }
    }
  };
  
  return (
    <motion.button
      className={`theme-toggle ${className}`}
      onClick={toggleTheme}
      style={{
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4px',
        borderRadius: '50%',
        outline: 'none',
        position: 'relative',
        width: `${size + 10}px`,
        height: `${size + 10}px`
      }}
      initial="initial"
      animate="animate"
      whileTap="whileTap"
      whileHover={{ scale: 1.05 }}
      transition={{ 
        duration: 0.5, 
        type: 'spring', 
        stiffness: 400, 
        damping: 20
      }}
    >
      {/* Background glow effect */}
      <motion.div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: isDark 
            ? 'radial-gradient(circle, rgba(45,55,72,0.4) 0%, rgba(45,55,72,0) 70%)' 
            : 'radial-gradient(circle, rgba(251,211,141,0.3) 0%, rgba(251,211,141,0) 70%)',
          zIndex: 0
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: 'reverse'
        }}
      />
      
      {/* Sun/Moon */}
      <svg 
        width={size} 
        height={size}
        viewBox="0 0 24 24" 
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'relative', zIndex: 1 }}
      >
        {/* Sun rays */}
        <motion.g
          variants={rayVariants}
          style={{ originX: '12px', originY: '12px' }}
        >
          {[45, 90, 135, 180, 225, 270, 315, 360].map(angle => (
            <motion.line
              key={angle}
              x1="12"
              y1="4"
              x2="12"
              y2="2"
              stroke={isDark ? '#FDB813' : '#FFD700'}
              strokeWidth="2"
              strokeLinecap="round"
              style={{ 
                transformOrigin: 'center', 
                transform: `rotate(${angle}deg) translateY(-5px)` 
              }}
            />
          ))}
        </motion.g>
        
        {/* Sun/Moon circle */}
        <motion.circle
          cx="12"
          cy="12"
          r="6"
          fill={isDark ? '#C4C9D1' : '#FFD700'}
          variants={variants}
        />
        
        {/* Moon mask */}
        <motion.circle
          cx="15"
          cy="10"
          r="5"
          fill={isDark ? '#1A202C' : '#FFFFFF'}
          variants={moonMaskVariants}
        />
      </svg>
    </motion.button>
  );
};

export default ThemeToggle; 