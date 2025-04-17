import { useInView } from 'react-intersection-observer';
import { useAnimation, AnimationControls } from 'framer-motion';
import { useEffect } from 'react';

interface UseAnimateOnScrollOptions {
  threshold?: number;
  triggerOnce?: boolean;
}

interface UseAnimateOnScrollReturn {
  ref: React.Ref<any>;
  controls: AnimationControls;
  inView: boolean;
}

/**
 * Hook that animates elements when they come into view
 */
export const useAnimateOnScroll = (
  options: UseAnimateOnScrollOptions = {}
): UseAnimateOnScrollReturn => {
  const { threshold = 0.1, triggerOnce = true } = options;
  
  const controls = useAnimation();
  const [ref, inView] = useInView({ 
    threshold, 
    triggerOnce 
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else if (!triggerOnce) {
      controls.start('hidden');
    }
  }, [controls, inView, triggerOnce]);

  return { ref, controls, inView };
}; 