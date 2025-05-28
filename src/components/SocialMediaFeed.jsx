import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import './SocialMediaFeed.css';
import { FaInstagram, FaTwitter, FaLinkedin, FaGithub, FaFacebook, FaYoutube, FaGlobe } from 'react-icons/fa';

const SocialMediaFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  // Platform icons
  const platformIcons = {
    instagram: <FaInstagram className="instagram-icon" />,
    twitter: <FaTwitter className="twitter-icon" />,
    linkedin: <FaLinkedin className="linkedin-icon" />,
    github: <FaGithub className="github-icon" />,
    facebook: <FaFacebook className="facebook-icon" />,
    youtube: <FaYoutube className="youtube-icon" />,
    other: <FaGlobe className="other-icon" />
  };

  // Fetch social media posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('/api/social-media');
        setPosts(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching social media posts:', err);
        setError('Sosyal medya gönderileri yüklenirken bir hata oluştu.');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts by platform
  const filteredPosts = activeFilter === 'all' 
    ? posts 
    : posts.filter(post => post.platform === activeFilter);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  };

  // Handle platform filter click
  const handleFilterClick = (platform) => {
    setActiveFilter(platform);
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('tr-TR', options);
  };

  if (loading) {
    return (
      <div className="social-media-feed-container">
        <h2 className="section-title">Sosyal Medya</h2>
        <div className="loading-spinner">Yükleniyor...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="social-media-feed-container">
        <h2 className="section-title">Sosyal Medya</h2>
        <div className="error-message">{error}</div>
        
        {/* Direct Social Media Links */}
        <div className="direct-social-links">
          <a href="https://www.linkedin.com/in/enesakmehmet" target="_blank" rel="noopener noreferrer" className="social-link linkedin">
            <FaLinkedin size={32} />
            <span>LinkedIn</span>
          </a>
          <a href="https://www.instagram.com/enesakmehmet" target="_blank" rel="noopener noreferrer" className="social-link instagram">
            <FaInstagram size={32} />
            <span>Instagram</span>
          </a>
          <a href="https://github.com/enesakmehmet" target="_blank" rel="noopener noreferrer" className="social-link github">
            <FaGithub size={32} />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <section className="social-media-feed-section">
      <div className="container">
        <h2 className="section-title">Sosyal Medyada Ben</h2>
        
        {/* Direct Social Media Links */}
        <div className="direct-social-links">
          <a href="https://www.linkedin.com/in/enesakmehmet" target="_blank" rel="noopener noreferrer" className="social-link linkedin">
            <FaLinkedin size={32} />
            <span>LinkedIn</span>
          </a>
          <a href="https://www.instagram.com/enesakmehmet" target="_blank" rel="noopener noreferrer" className="social-link instagram">
            <FaInstagram size={32} />
            <span>Instagram</span>
          </a>
          <a href="https://github.com/enesakmehmet" target="_blank" rel="noopener noreferrer" className="social-link github">
            <FaGithub size={32} />
            <span>GitHub</span>
          </a>
        </div>
        
        {/* Platform filters */}
        <div className="platform-filters">
          <button 
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => handleFilterClick('all')}
          >
            Tümü
          </button>
          {Object.keys(platformIcons).map(platform => (
            <button 
              key={platform}
              className={`filter-btn ${activeFilter === platform ? 'active' : ''}`}
              onClick={() => handleFilterClick(platform)}
            >
              {platformIcons[platform]}
              {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </button>
          ))}
        </div>

        {/* Posts grid */}
        {filteredPosts.length === 0 ? (
          <p className="no-posts-message">Bu filtreye uygun gönderi bulunamadı.</p>
        ) : (
          <motion.div 
            className="social-media-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredPosts.map(post => (
              <motion.div 
                key={post._id} 
                className="social-media-card"
                variants={itemVariants}
                whileHover={{ 
                  y: -5, 
                  boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                  transition: { duration: 0.3 }
                }}
              >
                <div className="card-image">
                  <img src={post.imageUrl} alt={post.content} />
                  <div className="platform-badge">
                    {platformIcons[post.platform]}
                  </div>
                </div>
                <div className="card-content">
                  <p className="post-text">{post.content}</p>
                  <div className="post-meta">
                    <span className="post-date">{formatDate(post.date)}</span>
                    <div className="post-stats">
                      <span className="likes">{post.likes} beğeni</span>
                      <span className="comments">{post.comments} yorum</span>
                    </div>
                  </div>
                  <a 
                    href={post.postUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="view-post-btn"
                  >
                    Gönderiye Git
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default SocialMediaFeed;
