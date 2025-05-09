import React, { useState, useEffect, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import LoadingScreen from './components/LoadingScreen'
import './index.css'

// Lazy load the entire App component
const App = React.lazy(() => import('./App'));

// Kritik olmayan stilleri asenkron olarak yükleyelim
const loadNonCriticalStyles = () => {
  const nonCriticalStyles: string[] = [
    // Burada yüklenecek stil dosyalarının listesi
    // Örneğin animasyon stilleri, ikon stilleri, vs.
  ];

  nonCriticalStyles.forEach(styleUrl => {
    if (!styleUrl) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = styleUrl;
    link.media = 'print';
    link.onload = () => {
      link.media = 'all';
    };
    document.head.appendChild(link);
  });
};

const Root: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [resources, setResources] = useState<boolean>(false);

  // Performans metriklerini izlemek için
  useEffect(() => {
    // Web Vitals metriklerini yaplandırmak için ideal yer
    if ('performance' in window && 'measure' in performance) {
      performance.mark('app-start');
    }
  }, []);

  // Preload key resources
  useEffect(() => {
    const preloadResources = async () => {
      try {
        // Priority resources first
        // Load critical CSS/fonts
        const links = document.querySelectorAll('link');
        const fontPromises = Array.from(links)
          .filter(link => link.rel === 'preload' && link.as === 'font')
          .map(link => new Promise((resolve) => {
            try {
              const font = new FontFace(
                link.getAttribute('data-font-family') || 'preloaded-font',
                `url(${link.href})`
              );
              font.load()
                .then(() => {
                  document.fonts.add(font);
                  resolve(true);
                })
                .catch(() => resolve(false));
            } catch (e) {
              resolve(false);
            }
          }));

        // Wait for fonts to load or timeout after 800ms (daha kısa timeout)
        await Promise.race([
          Promise.all(fontPromises),
          new Promise(resolve => setTimeout(resolve, 800))
        ]);

        // Yüklemeler tamamlandıktan sonra kritik olmayan kaynakları yükle
        if ('requestIdleCallback' in window) {
          (window as any).requestIdleCallback(loadNonCriticalStyles);
        } else {
          setTimeout(loadNonCriticalStyles, 1000);
        }
        
        setResources(true);
      } catch (err) {
        console.warn('Error preloading resources:', err);
        // Hata olsa bile devam et
        setResources(true);
      }
    };

    preloadResources();
  }, []);

  // Start the app after resources are loaded with minimum loading time
  useEffect(() => {
    if (resources) {
      // Minimum yükleme süresini azaltalım
      const minLoadTime = 500; // 800ms'den 500ms'e düşürüldü
      const startTime = performance.now();
      const timeElapsed = performance.now() - startTime;
      
      const remainingTime = Math.max(0, minLoadTime - timeElapsed);
      
      const timer = setTimeout(() => {
        setIsLoading(false);
        
        // Ölçüm tamamlandı
        if ('performance' in window && 'measure' in performance) {
          performance.mark('app-loaded');
          performance.measure('app-load-time', 'app-start', 'app-loaded');
        }
      }, remainingTime);
      
      return () => clearTimeout(timer);
    }
  }, [resources]);

  return (
    <React.StrictMode>
      {isLoading ? <LoadingScreen /> : (
        <Suspense fallback={<LoadingScreen />}>
          <App />
        </Suspense>
      )}
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<Root />)
