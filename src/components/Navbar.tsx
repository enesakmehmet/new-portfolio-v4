import { useState, useContext, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ThemeContext from '../context/ThemeContext'
import { MdDarkMode, MdLightMode } from 'react-icons/md'
import './Navbar.css'

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className="navbar gradient-navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo gradient-logo">
          𝓔𝓷𝓮𝓼 𝓐𝓴𝓶𝓮𝓱𝓶𝓮𝓽
        </Link>

        <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <Link to="/" className={`nav-link${location.pathname === '/' ? ' active' : ''}`}>Anasayfa</Link>
          <Link to="/about" className={`nav-link${location.pathname === '/about' ? ' active' : ''}`}>Hakkımda</Link>
          <Link to="/projects" className={`nav-link${location.pathname.startsWith('/projects') ? ' active' : ''}`}>Projeler</Link>
          <Link to="/skills" className={`nav-link${location.pathname === '/skills' ? ' active' : ''}`}>Yetenekler</Link>
          <Link to="/contact" className={`nav-link${location.pathname === '/contact' ? ' active' : ''}`}>İletişim</Link>
          <Link to="/admin" className="admin-button gradient-btn">Admin</Link>
          <button 
            className="theme-toggle-btn" 
            onClick={toggleTheme}
            aria-label={darkMode ? 'Açık tema' : 'Koyu tema'}
          >
            {darkMode ? <MdLightMode /> : <MdDarkMode />}
          </button>
        </div>

        <div 
          className={`hamburger ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar