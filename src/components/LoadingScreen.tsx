import React from 'react';
import './LoadingScreen.css';

interface LoadingScreenProps {
  isComponent?: boolean;
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  isComponent = false,
  message = 'Yükleniyor...'
}) => {
  return (
    <div className={isComponent ? "component-loading" : "loading-screen"}>
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  );
};

export default LoadingScreen;
