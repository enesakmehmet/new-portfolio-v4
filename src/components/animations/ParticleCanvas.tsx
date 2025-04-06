import { useRef, useEffect, useState } from 'react';
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
  
  // Initialize canvas and particles
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    
    if (!canvas || !ctx) return;
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      setDimensions({ width: canvas.width, height: canvas.height });
      
      // Re-initialize particles on resize
      initParticles();
    };
    
    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      const numberOfParticles = Math.min(Math.floor(canvas.width * canvas.height / 9000), 100);
      const particleColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)';
      
      for (let i = 0; i < numberOfParticles; i++) {
        const radius = Math.random() * 3 + 1;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        
        particlesRef.current.push({
          x,
          y,
          radius,
          color: particleColor,
          baseX: x,
          baseY: y,
          density: (Math.random() * 30) + 1,
          vx: (Math.random() - 0.5) * 1,
          vy: (Math.random() - 0.5) * 1
        });
      }
    };
    
    // Handle mouse move
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.x;
      mouseRef.current.y = e.y;
    };
    
    // Handle touch move
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
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
    
    handleResize();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      
      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current);
      }
    };
  }, [theme]);
  
  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    
    if (!canvas || !ctx || !particlesRef.current.length) return;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach(particle => {
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Check mouse interaction
        if (mouseRef.current.x !== undefined) {
          // Calculate distance between mouse and particle
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouseRef.current.radius + particle.radius) {
            // Repel particles away from mouse
            const forceX = dx / distance * particle.density;
            const forceY = dy / distance * particle.density;
            
            const maxDistance = mouseRef.current.radius;
            const force = (maxDistance - distance) / maxDistance;
            
            const dirX = dx / distance;
            const dirY = dy / distance;
            
            particle.x -= dirX * force * 5;
            particle.y -= dirY * force * 5;
          }
        }
        
        // Move particles & handle collision with edges
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Slowly return to base position
        if (mouseRef.current.x === undefined || particle.x !== particle.baseX) {
          const dx = particle.baseX - particle.x;
          particle.x += dx * 0.02;
        }
        
        if (mouseRef.current.y === undefined || particle.y !== particle.baseY) {
          const dy = particle.baseY - particle.y;
          particle.y += dy * 0.02;
        }
        
        // Edge detection
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -1;
        }
        
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -1;
        }
        
        // Connect particles with lines if they're close enough
        connectParticles(particle);
      });
      
      requestIdRef.current = requestAnimationFrame(animate);
    };
    
    // Connect particles with lines
    const connectParticles = (particle: Particle) => {
      for (const otherParticle of particlesRef.current) {
        if (particle === otherParticle) continue;
        
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 120) {
          ctx.beginPath();
          ctx.strokeStyle = theme === 'dark' 
            ? `rgba(255, 255, 255, ${1 - distance / 120})` 
            : `rgba(0, 0, 0, ${1 - distance / 120})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.stroke();
        }
      }
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

export default ParticleCanvas; 