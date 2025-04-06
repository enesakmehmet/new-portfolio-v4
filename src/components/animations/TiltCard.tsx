import { ReactNode, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  scale?: number;
  rotateIntensity?: number;
  perspective?: number;
  glareOpacity?: number;
  border?: boolean;
  shadow?: boolean;
}

const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  scale = 1.05,
  rotateIntensity = 15,
  perspective = 800,
  glareOpacity = 0.3,
  border = false,
  shadow = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Motion values for card rotation
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Spring configs for smoother animation
  const springConfig = { damping: 20, stiffness: 300 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);
  
  // Transform values for rotation
  const rotateX = useTransform(ySpring, [-0.5, 0.5], [rotateIntensity, -rotateIntensity]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-rotateIntensity, rotateIntensity]);
  
  // Transform for glare effect
  const glareX = useTransform(xSpring, [-0.5, 0.5], ['20%', '80%']);
  const glareY = useTransform(ySpring, [-0.5, 0.5], ['20%', '80%']);
  
  // Handle mouse move event
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate mouse position as values from -0.5 to 0.5
    const xValue = (e.clientX - rect.left) / rect.width - 0.5;
    const yValue = (e.clientY - rect.top) / rect.height - 0.5;
    
    // Update motion values
    x.set(xValue);
    y.set(yValue);
  };
  
  // Reset card position when mouse leaves
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };
  
  return (
    <motion.div
      ref={cardRef}
      className={`tilt-card ${className} ${border ? 'border border-solid border-gray-200 dark:border-gray-800' : ''} 
        ${shadow ? 'shadow-lg hover:shadow-xl' : ''}`}
      style={{
        perspective: perspective,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        scale: isHovered ? scale : 1
      }}
      transition={{
        scale: { type: 'spring', stiffness: 300, damping: 20 }
      }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          position: 'relative',
          zIndex: 1,
          transformStyle: 'preserve-3d',
          height: '100%',
          width: '100%',
        }}
      >
        {children}
        
        {/* Glare effect */}
        {isHovered && (
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,${glareOpacity}), transparent 70%)`,
              zIndex: 2,
              pointerEvents: 'none',
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export default TiltCard; 