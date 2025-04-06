import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypewriterTextProps {
  text: string;
  delay?: number;
  typingSpeed?: number;
  className?: string;
  onComplete?: () => void;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  delay = 0,
  typingSpeed = 50,
  className = '',
  onComplete
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    // Initial delay before starting
    if (!isTyping && currentIndex === 0) {
      timeout = setTimeout(() => {
        setIsTyping(true);
      }, delay);
      return () => clearTimeout(timeout);
    }
    
    // Typing effect
    if (isTyping && currentIndex < text.length) {
      timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, typingSpeed);
      
      return () => clearTimeout(timeout);
    } else if (isTyping && currentIndex >= text.length) {
      // Typing completed
      setIsTyping(false);
      onComplete?.();
    }
  }, [text, delay, typingSpeed, currentIndex, isTyping, onComplete]);
  
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {displayText}
      {isTyping && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ 
            duration: 0.8, 
            repeat: Infinity,
            repeatType: 'loop' 
          }}
        >
          |
        </motion.span>
      )}
    </motion.span>
  );
};

export default TypewriterText; 