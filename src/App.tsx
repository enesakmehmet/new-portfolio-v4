import { Suspense, lazy, useState, ReactNode, useEffect } from 'react'
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion';
import './App.css'
import './styles/themes.css'
import Navbar from './components/Navbar'
import LoadingScreen from './components/LoadingScreen'
import BackgroundAnimation from './components/BackgroundAnimation'
import ParticleCanvas from './components/animations/ParticleCanvas'
import { ThemeProvider } from './context/ThemeContext'
import ThemeToggle from './components/animations/ThemeToggle'

// Pre-load Hero component for faster initial load
const Hero = lazy(() => 
  import('./components/Hero').then(module => ({
    default: module.default
  }))
);

// Lazily load other components
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));
const ProjectDetails = lazy(() => import('./components/ProjectDetails'));
const AdminLogin = lazy(() => import('./components/admin/AdminLogin'));
const Dashboard = lazy(() => import('./components/admin/Dashboard'));

// Preload main route components after initial load
const preloadMainComponents = () => {
  const componentsToPreload = [
    import('./components/About'),
    import('./components/Skills'),
    import('./components/Projects')
  ];

  Promise.all(componentsToPreload).catch(err => 
    console.warn('Failed to preload some components:', err)
  );
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('userToken'));
  const [showParticles, setShowParticles] = useState<boolean>(true);

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
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setShowParticles(false);
      } else {
        setShowParticles(true);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <BackgroundAnimation />
          {showParticles && <ParticleCanvas />}
          <div className="theme-toggle-wrapper" style={{ 
            position: 'fixed', 
            top: '80px', 
            right: '20px', 
            zIndex: 1000 
          }}>
            <ThemeToggle />
          </div>
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
