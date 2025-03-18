import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
        𝓔𝓷𝓮𝓼 𝓐𝓴𝓶𝓮𝓱𝓶𝓮𝓽
        </Link>

        <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link">Anasayfa</Link>
          <Link to="/about" className="nav-link">Hakkımda</Link>
          <Link to="/projects" className="nav-link">Projeler</Link>
          <Link to="/skills" className="nav-link">Yetenekler</Link>
          <Link to="/contact" className="nav-link">İletişim</Link>
          <Link to="/admin" className="admin-button">Admin</Link>
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