import { Suspense, lazy, useState, ReactNode } from 'react'
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import './styles/themes.css'
import Navbar from './components/Navbar'
import LoadingScreen from './components/LoadingScreen'
import { ThemeProvider } from './context/ThemeContext'

const Hero = lazy(() => import('./components/Hero'))
const About = lazy(() => import('./components/About'))
const Skills = lazy(() => import('./components/Skills'))
const Projects = lazy(() => import('./components/Projects'))
const Contact = lazy(() => import('./components/Contact'))
const ProjectDetails = lazy(() => import('./components/ProjectDetails'))
const AdminLogin = lazy(() => import('./components/admin/AdminLogin'))
const Dashboard = lazy(() => import('./components/admin/Dashboard'))

interface PrivateRouteProps {
  children: ReactNode;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('userToken'));

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
                  <About />
                  <Skills />
                  <Projects />
                  <Contact />
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
