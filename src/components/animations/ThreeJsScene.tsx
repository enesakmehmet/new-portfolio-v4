import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { OrbitControls, PerspectiveCamera, Text } from '@react-three/drei';
import * as THREE from 'three';

interface AnimatedBoxProps {
  position: [number, number, number];
  color: string;
  hoverColor: string;
  size?: [number, number, number];
  rotationSpeed?: number;
}

// Single animated box
const AnimatedBox: React.FC<AnimatedBoxProps> = ({ 
  position, 
  color, 
  hoverColor,
  size = [1, 1, 1],
  rotationSpeed = 0.01 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  
  // Animation loop
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed;
      meshRef.current.rotation.y += rotationSpeed;
    }
  });
  
  return (
    <mesh
      position={position}
      ref={meshRef}
      scale={clicked ? 1.2 : 1}
      onClick={() => setClicked(!clicked)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={size} />
      <meshStandardMaterial 
        color={hovered ? hoverColor : color}
        metalness={0.5}
        roughness={0.2}
      />
    </mesh>
  );
};

// Floating text in 3D space
const FloatingText: React.FC<{ text: string, position: [number, number, number], color: string }> = ({ 
  text, 
  position, 
  color 
}) => {
  const textRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (textRef.current) {
      textRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime()) * 0.1;
    }
  });
  
  return (
    <Text
      ref={textRef}
      position={position}
      color={color}
      fontSize={0.5}
      maxWidth={5}
      lineHeight={1}
      letterSpacing={0.02}
      textAlign="center"
      anchorX="center"
      anchorY="middle"
    >
      {text}
    </Text>
  );
};

// Main scene
const Scene: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const { camera } = useThree();
  
  // Adjust camera on mount
  useEffect(() => {
    camera.position.z = 5;
  }, [camera]);
  
  // Theme colors
  const primaryColor = theme === 'dark' ? '#8A2BE2' : '#4169E1';
  const secondaryColor = theme === 'dark' ? '#9370DB' : '#6495ED';
  const textColor = theme === 'dark' ? '#ffffff' : '#333333';
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      <AnimatedBox 
        position={[-2, 0, 0]} 
        color={primaryColor} 
        hoverColor={secondaryColor} 
      />
      
      <AnimatedBox 
        position={[2, 0, 0]} 
        color={secondaryColor} 
        hoverColor={primaryColor} 
        size={[0.8, 0.8, 0.8]} 
        rotationSpeed={0.015} 
      />
      
      <FloatingText 
        text="Hover & Click" 
        position={[0, 2, 0]} 
        color={textColor} 
      />
      
      <OrbitControls enableZoom={false} />
    </>
  );
};

// Main component
const ThreeJsScene: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <div className="threejs-container" style={{ 
      height: '400px', 
      width: '100%', 
      background: theme === 'dark' ? '#1a1a1a' : '#f5f5f5',
      borderRadius: '10px',
      overflow: 'hidden'
    }}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <Scene />
      </Canvas>
    </div>
  );
};

export default ThreeJsScene; 