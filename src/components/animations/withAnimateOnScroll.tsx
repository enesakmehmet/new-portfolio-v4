import { ComponentType } from 'react';
import { motion, Variants, HTMLMotionProps } from 'framer-motion';
import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';

export interface WithAnimateOnScrollOptions {
  threshold?: number;
  triggerOnce?: boolean;
  variants?: Variants;
  rootMargin?: string;
  initial?: Record<string, any>;
  transition?: Record<string, any>;
}

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export function withAnimateOnScroll<P extends object>(
  Component: ComponentType<P>,
  options: WithAnimateOnScrollOptions = {}
) {
  const {
    threshold = 0.1,
    triggerOnce = true,
    variants = defaultVariants,
    rootMargin,
    initial = "hidden",
    transition
  } = options;
  
  return function WithAnimateOnScroll(props: P & HTMLMotionProps<"div">) {
    const { ref, controls } = useAnimateOnScroll({
      threshold,
      triggerOnce
    });
    
    return (
      <motion.div
        ref={ref}
        initial={initial}
        animate={controls}
        variants={variants}
        transition={transition}
        style={{ width: '100%' }}
      >
        <Component {...props} />
      </motion.div>
    );
  };
} 