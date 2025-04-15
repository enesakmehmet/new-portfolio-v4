import { Suspense, lazy, useState } from 'react'
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'
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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('userToken'));

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/admin" />;
  };

  PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired
  };

  return (
    <ThemeProvider>
      <Router>
        <div className={`app ${window.location.hash.includes('/admin') ? 'admin-page' : ''}`}>
          {/* Navbar'ı admin sayfalarında gösterme */}
          {!window.location.hash.includes('/admin') && <Navbar />}
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
