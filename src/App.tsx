import { Suspense, lazy, useState, ReactNode, useEffect, useMemo, useCallback } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion';
import './App.css'
import './styles/themes.css'
import Navbar from './components/Navbar'
import LoadingScreen from './components/LoadingScreen'
import BackgroundAnimation from './components/BackgroundAnimation'
import { ThemeProvider } from './context/ThemeContext'
import ThemeToggle from './components/animations/ThemeToggle'

// Dinamik import ile lazy loading optimizasyonu
// ChunkLoadError'u önlemek için retry mekanizması ekleyelim
const lazyWithRetry = (componentImport: () => Promise<any>) => {
  return lazy(() => {
    const retry = (): Promise<any> => componentImport().catch(retry);
    return retry();
  });
};

// Pre-load Hero component for faster initial load
const Hero = lazyWithRetry(() => 
  import('./components/Hero').then(module => ({
    default: module.default
  }))
);

// Lazily load other components
const About = lazyWithRetry(() => import('./components/About'));
const Skills = lazyWithRetry(() => import('./components/Skills'));
const Projects = lazyWithRetry(() => import('./components/Projects'));
const Contact = lazyWithRetry(() => import('./components/Contact'));
const ProjectDetails = lazyWithRetry(() => import('./components/ProjectDetails'));
const AdminLogin = lazyWithRetry(() => import('./components/admin/AdminLogin'));
const Dashboard = lazyWithRetry(() => import('./components/admin/Dashboard'));
// Lazy load ParticleCanvas to improve initial load
const ParticleCanvas = lazyWithRetry(() => import('./components/animations/ParticleCanvas'));

// Preload main route components after initial load - route bazlı preloading
const preloadMainComponents = () => {
  // IntersectionObserver API kullanarak görünürlüğe göre preload yapalım
  // ya da requestIdleCallback ile tarayıcı boşta iken yükleyelim
  const preloadWithIdle = (importFn: () => Promise<any>) => {
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => importFn());
    } else {
      setTimeout(importFn, 2000);
    }
  };

  const componentsToPreload = [
    () => import('./components/About'),
    () => import('./components/Skills'),
    () => import('./components/Projects')
  ];

  componentsToPreload.forEach(preloadWithIdle);
};

// Wrap with Page Transitions
interface PrivateRouteProps {
  children: ReactNode;
  isAuthenticated: boolean;
}

const PrivateRoute = ({ children, isAuthenticated }: PrivateRouteProps) => {
  return isAuthenticated ? children : <Navigate to="/admin" />;
};

const AnimatedRoutes = ({ isAuthenticated, setIsAuthenticated }: { isAuthenticated: boolean, setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <>
            <Hero />
            <Suspense fallback={<LoadingScreen />}>
              <About />
              <Skills />
              <Projects />
              <Contact />
            </Suspense>
          </>
        } />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/admin/*" element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <Dashboard setIsAuthenticated={setIsAuthenticated} />
          </PrivateRoute>
        } />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => !!localStorage.getItem('userToken'));
  const [showParticles, setShowParticles] = useState<boolean>(true);

  // Kullanıcı arayüzü durumu güncellemelerini optimize edelim
  const handleResize = useCallback(() => {
    const isMobile = window.innerWidth < 768;
    setShowParticles(!isMobile);
  }, []);

  useEffect(() => {
    // Check if we're on the main page, then preload components
    if (window.location.hash === '#/' || window.location.hash === '') {
      // Use requestIdleCallback or setTimeout to defer non-critical work
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(preloadMainComponents);
      } else {
        setTimeout(preloadMainComponents, 2000);
      }
    }
    
    // Disable particles on mobile devices for better performance
    handleResize();
    
    // Resize olayını throttle edelim
    let resizeTimer: ReturnType<typeof setTimeout>;
    const throttledResize = () => {
      if (!resizeTimer) {
        resizeTimer = setTimeout(() => {
          resizeTimer = null as any;
          handleResize();
        }, 250);
      }
    };
    
    window.addEventListener('resize', throttledResize);
    
    return () => {
      window.removeEventListener('resize', throttledResize);
      clearTimeout(resizeTimer);
    };
  }, [handleResize]);

  // Memo kullanarak komponentin gereksiz yeniden render edilmesini önleyelim
  const themeToggle = useMemo(() => (
    <div className="theme-toggle-wrapper" style={{ 
      position: 'fixed', 
      top: '80px', 
      right: '20px', 
      zIndex: 1000 
    }}>
      <ThemeToggle />
    </div>
  ), []);

  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <BackgroundAnimation />
          {showParticles && (
            <Suspense fallback={null}>
              <ParticleCanvas />
            </Suspense>
          )}
          {themeToggle}
          <Navbar />
          <Suspense fallback={<LoadingScreen />}>
            <AnimatedRoutes isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
          </Suspense>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App;
