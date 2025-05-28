import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';

const HeroModel = () => {
  const sphereRef = useRef<any>();

  useFrame(({ clock }) => {  // clock is automatically typed by @react-three/fiber
    const elapsedTime = clock.getElapsedTime();
    
    if (sphereRef.current) {
      sphereRef.current.rotation.x = elapsedTime * 0.2;
      sphereRef.current.rotation.y = elapsedTime * 0.3;
    }
  });

  return (
    <Sphere
      ref={sphereRef}
      args={[1, 100, 100]}
      scale={3}
      position={[0, 0, 0]}
    >
      <MeshDistortMaterial
        color="#8a2be2"
        attach="material"
        distort={0.6}
        speed={2}
        roughness={0}
      />
    </Sphere>
  );
};

export default HeroModel;
