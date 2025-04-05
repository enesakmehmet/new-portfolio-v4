import { Suspense, lazy, useState, ReactNode, useEffect } from 'react'
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import './styles/themes.css'
import Navbar from './components/Navbar'
import LoadingScreen from './components/LoadingScreen'
import { ThemeProvider } from './context/ThemeContext'

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

interface PrivateRouteProps {
  children: ReactNode;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('userToken'));

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
  }, []);

  const PrivateRoute = ({ children }: PrivateRouteProps) => {
    return isAuthenticated ? children : <Navigate to="/admin" />;
  };

  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <Navbar />
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
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
                <PrivateRoute>
                  <Dashboard setIsAuthenticated={setIsAuthenticated} />
                </PrivateRoute>
              } />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
