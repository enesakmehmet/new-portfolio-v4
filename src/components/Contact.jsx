import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
   
    console.log('Form data:', formData)
  }

  return (
    <section id="contact" className="contact-section">
      <motion.h2 
        className="contact-title gradient-title"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        İletişim
      </motion.h2>
      <div className="contact-content">
        <div className="contact-info">
          <motion.div className="info-item gradient-card"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            whileHover={{ scale: 1.06, boxShadow: "0 6px 24px #ff4ecd80" }}
          >
            <span className="info-icon gradient-bg"><FaEnvelope /></span>
            <h3>Email</h3>
            <p>enesakmehmet7@gmail.com</p>
          </motion.div>
          <motion.div className="info-item gradient-card"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            whileHover={{ scale: 1.06, boxShadow: "0 6px 24px #ff4ecd80" }}
          >
            <span className="info-icon gradient-bg"><FaPhone /></span>
            <h3>Telefon</h3>
            <p>+90 507 003 24 84</p>
          </motion.div>
          <motion.div className="info-item gradient-card"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ scale: 1.06, boxShadow: "0 6px 24px #ff4ecd80" }}
          >
            <span className="info-icon gradient-bg"><FaMapMarkerAlt /></span>
            <h3>Konum</h3>
            <p>Rize, Türkiye</p>
          </motion.div>
        </div>
        <motion.form 
          className="contact-form gradient-card"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="form-group">
            <label htmlFor="name">İsim</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="gradient-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="gradient-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Mesaj</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="gradient-input"
            ></textarea>
          </div>
          <motion.button 
            type="submit" 
            className="contact-btn gradient-btn"
            whileHover={{ scale: 1.06, boxShadow: "0 6px 24px #ff4ecd80" }}
            whileTap={{ scale: 0.97 }}
          >
            Gönder
          </motion.button>
        </motion.form>
      </div>
    </section>
  )
}

export default Contact