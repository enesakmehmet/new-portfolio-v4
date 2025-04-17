import { motion } from 'framer-motion';
import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';

interface Circle {
  id: number;
  initialX: number;
  initialY: number;
  initialOpacity: number;
  initialScale: number;
  animateX: number[];
  animateY: number[];
  animateOpacity: number[];
  duration: number;
  background: string;
  size: number;
}

const BackgroundAnimation = () => {
  const { theme } = useContext(ThemeContext);
  const [circles, setCircles] = useState<Circle[]>([]);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Get window size safely on client side
    const width = window.innerWidth;
    const height = window.innerHeight;
    setWindowSize({ width, height });

    // Generate circles data
    const circlesData = Array.from({ length: 10 }).map((_, i) => {
      // Daha büyük boyutlar
      const size = Math.random() * 250 + 150;
      
      // Her daire için hareket mesafesini sınırlandıralım
      // Böylece daha küçük ve yumuşak hareketler olacak
      const centerX = Math.random() * width;
      const centerY = Math.random() * height;
      const moveRadius = Math.random() * 100 + 50; // Hareket yarıçapı
      
      return {
        id: i,
        initialX: centerX,
        initialY: centerY,
        initialOpacity: Math.random() * 0.2 + 0.15,
        initialScale: Math.random() * 1.5 + 0.5,
        animateX: [
          centerX - moveRadius / 2,
          centerX + moveRadius / 2,
          centerX,
        ],
        animateY: [
          centerY + moveRadius / 2,
          centerY - moveRadius / 2,
          centerY,
        ],
        animateOpacity: [
          Math.random() * 0.1 + 0.15,
          Math.random() * 0.1 + 0.25,
          Math.random() * 0.1 + 0.15,
        ],
        // Daha uzun süreli, daha yavaş animasyon
        duration: Math.random() * 90 + 70,
        background: theme === 'dark' 
          ? `rgba(255, 255, 255, ${Math.random() * 0.1 + 0.03})`
          : `rgba(0, 0, 0, ${Math.random() * 0.1 + 0.03})`,
        size: size,
      };
    });
    
    setCircles(circlesData);

    // Handle window resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [theme]);

  if (windowSize.width === 0) return null; // Don't render until we have window size

  return (
    <div className="background-animation">
      {circles.map((circle) => (
        <motion.div
          key={circle.id}
          className="animated-circle"
          initial={{
            x: circle.initialX,
            y: circle.initialY,
            opacity: circle.initialOpacity,
            scale: circle.initialScale,
          }}
          animate={{
            x: circle.animateX,
            y: circle.animateY,
            opacity: circle.animateOpacity,
          }}
          transition={{
            duration: circle.duration,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          style={{
            position: 'absolute',
            borderRadius: '50%',
            background: circle.background,
            filter: 'blur(50px)', // Daha bulanık ve yumuşak
            width: `${circle.size}px`,
            height: `${circle.size}px`,
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundAnimation; 