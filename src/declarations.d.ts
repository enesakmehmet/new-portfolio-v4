// This file contains declarations for modules without type definitions

// For CSS modules
declare module '*.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// For image files
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';
declare module '*.svg';
declare module '*.gif';

// For JSX files without type definitions
declare module '*.jsx' {
  import React from 'react';
  const Component: React.ComponentType<any>;
  export default Component;
}

// For JS files without type definitions
declare module '*.js';
