declare module 'lottie-react';
declare module '@react-three/fiber';
declare module '@react-three/drei';
declare module 'three';
declare module 'react-intersection-observer';
declare module '*.json' {
  const value: any;
  export default value;
}

// Add Vite-specific type definitions
interface ImportMeta {
  env: {
    VITE_API_URL?: string;
    [key: string]: string | undefined;
  };
}
