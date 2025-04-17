import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';

interface AnimatedSvgProps {
  paths: Array<{
    d: string;
    stroke?: string;
    strokeWidth?: number;
    fill?: string;
    duration?: number;
    delay?: number;
  }>;
  width?: number;
  height?: number;
  viewBox?: string;
}

const AnimatedSvg: React.FC<AnimatedSvgProps> = ({
  paths,
  width = 300,
  height = 300,
  viewBox = '0 0 100 100'
}) => {
  const { ref, controls, inView } = useAnimateOnScroll({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const [pathLengths, setPathLengths] = useState<Array<number | null>>(
    Array(paths.length).fill(null)
  );
  
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRefs = useRef<Array<SVGPathElement | null>>(
    Array(paths.length).fill(null)
  );
  
  // Calculate path lengths
  useEffect(() => {
    if (svgRef.current && pathRefs.current) {
      const newPathLengths = pathRefs.current.map(pathEl => 
        pathEl ? pathEl.getTotalLength() : 0
      );
      
      setPathLengths(newPathLengths);
    }
  }, [paths]);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
      }}
    >
      <svg
        ref={svgRef}
        width={width}
        height={height}
        viewBox={viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {paths.map((pathData, index) => (
          <motion.path
            key={index}
            ref={el => (pathRefs.current[index] = el)}
            d={pathData.d}
            stroke={pathData.stroke || '#000000'}
            strokeWidth={pathData.strokeWidth || 1}
            fill={pathData.fill || 'none'}
            initial={{ 
              pathLength: 0,
              opacity: pathData.fill ? 0 : 1
            }}
            animate={controls}
            variants={{
              hidden: { 
                pathLength: 0,
                opacity: pathData.fill ? 0 : 1
              },
              visible: { 
                pathLength: 1,
                opacity: 1,
                transition: {
                  pathLength: {
                    duration: pathData.duration || 2,
                    delay: pathData.delay || index * 0.5,
                    ease: "easeInOut"
                  },
                  opacity: {
                    duration: 0.2,
                    delay: (pathData.delay || index * 0.5) + (pathData.duration || 2) - 0.2
                  }
                }
              }
            }}
            style={{
              strokeDasharray: pathLengths[index] || 1,
              strokeDashoffset: pathLengths[index] || 1,
            }}
          />
        ))}
      </svg>
    </motion.div>
  );
};

export default AnimatedSvg; 