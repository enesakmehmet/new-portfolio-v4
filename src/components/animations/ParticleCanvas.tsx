import { useRef, useEffect, useState, useCallback, memo } from 'react';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  baseX: number;
  baseY: number;
  density: number;
  vx: number;
  vy: number;
}

const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const requestIdRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0, radius: 100 });
  const { theme } = useContext(ThemeContext);
  
  // Daha verimli parçacık oluşturma için memorize
  const initParticles = useCallback((canvas: HTMLCanvasElement, currentTheme: string) => {
    const particles: Particle[] = [];
    // Parçacık sayısını ekran boyutuna göre ölçekleyelim, maksimum 80 ile sınırlayalım
    const numberOfParticles = Math.min(Math.floor(canvas.width * canvas.height / 12000), 80);
    const particleColor = currentTheme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)';
    
    for (let i = 0; i < numberOfParticles; i++) {
      const radius = Math.random() * 2.5 + 0.5; // Parçacık boyutunu küçültelim
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      
      particles.push({
        x,
        y,
        radius,
        color: particleColor,
        baseX: x,
        baseY: y,
        density: (Math.random() * 30) + 1,
        vx: (Math.random() - 0.5) * 0.8, // Daha yavaş hareket
        vy: (Math.random() - 0.5) * 0.8  // Daha yavaş hareket
      });
    }
    return particles;
  }, []);
  
  // Initialize canvas and particles
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    
    if (!canvas || !ctx) return;
    
    let resizeTimer: ReturnType<typeof setTimeout>;
    
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        setDimensions({ width: canvas.width, height: canvas.height });
        
        // Re-initialize particles on resize
        particlesRef.current = initParticles(canvas, theme);
      }, 250); // 250ms debounce
    };
    
    // First init
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    setDimensions({ width: canvas.width, height: canvas.height });
    particlesRef.current = initParticles(canvas, theme);
    
    // Handle mouse move with throttling
    let lastMove = 0;
    const throttleDelay = 16; // ~60fps
    
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastMove > throttleDelay) {
        mouseRef.current.x = e.x;
        mouseRef.current.y = e.y;
        lastMove = now;
      }
    };
    
    // Handle touch move with throttling
    const handleTouchMove = (e: TouchEvent) => {
      const now = performance.now();
      if (now - lastMove > throttleDelay && e.touches.length > 0) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
        lastMove = now;
      }
    };
    
    // Handle mouse leave
    const handleMouseLeave = () => {
      mouseRef.current.x = undefined as any;
      mouseRef.current.y = undefined as any;
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      
      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current);
      }
      clearTimeout(resizeTimer);
    };
  }, [theme, initParticles]);
  
  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { alpha: true });
    
    if (!canvas || !ctx || !particlesRef.current.length) return;
    
    // Bağlantı mesafesini bir kere hesaplayalım
    const connectionDistance = dimensions.width < 768 ? 80 : 120;
    const connectionDistanceSq = connectionDistance * connectionDistance;
    const mouseRadius = dimensions.width < 768 ? 60 : 100;
    mouseRef.current.radius = mouseRadius;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Tüm parçacıkları bir kerede işleyelim
      const particles = particlesRef.current;
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Check mouse interaction
        if (mouseX !== undefined) {
          // Calculate distance between mouse and particle
          const dx = mouseX - particle.x;
          const dy = mouseY - particle.y;
          const distanceSq = dx * dx + dy * dy;
          const distance = Math.sqrt(distanceSq);
          
          if (distance < mouseRadius + particle.radius) {
            // Repel particles away from mouse more efficiently
            const force = (mouseRadius - distance) / mouseRadius;
            if (force > 0 && distance > 0) {
              const dirX = dx / distance;
              const dirY = dy / distance;
              
              particle.x -= dirX * force * 4;
              particle.y -= dirY * force * 4;
            }
          }
        }
        
        // Move particles & handle collision with edges
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Slowly return to base position with easing
        if (mouseX === undefined || particle.x !== particle.baseX) {
          particle.x += (particle.baseX - particle.x) * 0.02;
        }
        
        if (mouseY === undefined || particle.y !== particle.baseY) {
          particle.y += (particle.baseY - particle.y) * 0.02;
        }
        
        // Efficient edge detection using if/else
        if (particle.x < 0) {
          particle.vx = Math.abs(particle.vx);
        } else if (particle.x > canvas.width) {
          particle.vx = -Math.abs(particle.vx);
        }
        
        if (particle.y < 0) {
          particle.vy = Math.abs(particle.vy);
        } else if (particle.y > canvas.height) {
          particle.vy = -Math.abs(particle.vy);
        }
        
        // Connect particles only once
        for (let j = i + 1; j < particles.length; j++) {
          const otherParticle = particles[j];
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distanceSq = dx * dx + dy * dy;
          
          if (distanceSq < connectionDistanceSq) {
            const distance = Math.sqrt(distanceSq);
            ctx.beginPath();
            ctx.strokeStyle = theme === 'dark' 
              ? `rgba(255, 255, 255, ${1 - distance / connectionDistance})` 
              : `rgba(0, 0, 0, ${1 - distance / connectionDistance})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        }
      }
      
      requestIdRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    return () => {
      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current);
      }
    };
  }, [dimensions, theme]);
  
  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }}
    />
  );
};

// Gereksiz render'ları önlemek için memo
export default memo(ParticleCanvas); 