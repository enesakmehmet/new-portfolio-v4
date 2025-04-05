import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import LoadingScreen from './components/LoadingScreen'
import './index.css'

const Root: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [resources, setResources] = useState<boolean>(false);

  // Preload key resources
  useEffect(() => {
    const preloadResources = async () => {
      // Load critical CSS/fonts
      const links = document.querySelectorAll('link');
      const fontPromises = Array.from(links)
        .filter(link => link.rel === 'preload' && link.as === 'font')
        .map(link => new Promise(resolve => {
          const font = new FontFace(
            link.getAttribute('data-font-family') || 'preloaded-font',
            `url(${link.href})`
          );
          font.load().then(() => {
            document.fonts.add(font);
            resolve(true);
          }).catch(() => resolve(false));
        }));

      // Wait for fonts to load or timeout after 1 second
      await Promise.race([
        Promise.all(fontPromises),
        new Promise(resolve => setTimeout(resolve, 1000))
      ]);
      
      setResources(true);
    };

    preloadResources();
  }, []);

  // Start the app after resources are loaded with minimum loading time
  useEffect(() => {
    if (resources) {
      const minLoadTime = 800; // Minimum load time in ms for better UX
      const startTime = performance.now();
      const timeElapsed = performance.now() - startTime;
      
      const remainingTime = Math.max(0, minLoadTime - timeElapsed);
      
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, remainingTime);
      
      return () => clearTimeout(timer);
    }
  }, [resources]);

  return (
    <React.StrictMode>
      {isLoading ? <LoadingScreen /> : <App />}
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<Root />)
