import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="spinner"></div>
      <p>Yükleniyor...</p>
    </div>
  );
};

export default LoadingScreen;
