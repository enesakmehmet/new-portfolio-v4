import { ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxSectionProps {
  children: ReactNode;
  backgroundUrl?: string;
  backgroundColor?: string;
  speed?: number;
  direction?: 'up' | 'down';
  overlayColor?: string;
  overlayOpacity?: number;
  height?: string;
  className?: string;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  backgroundUrl,
  backgroundColor = '#000',
  speed = 0.5,
  direction = 'up',
  overlayColor = 'rgba(0,0,0,0.5)',
  overlayOpacity = 0.5,
  height = '500px',
  className = '',
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });
  
  // Create parallax effect
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'up' ? ['0%', `${speed * 100}%`] : [`${speed * 100}%`, '0%']
  );
  
  // Create scaling effect for background
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1 + (speed * 0.2)]
  );
  
  return (
    <div
      ref={sectionRef}
      className={`parallax-section ${className}`}
      style={{
        position: 'relative',
        height,
        overflow: 'hidden',
        backgroundColor: backgroundUrl ? 'transparent' : backgroundColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {backgroundUrl && (
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${backgroundUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            y,
            scale,
            zIndex: 0
          }}
        />
      )}
      
      {/* Overlay */}
      {overlayOpacity > 0 && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: overlayColor,
            opacity: overlayOpacity,
            zIndex: 1
          }}
        />
      )}
      
      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ParallaxSection; 