import React, { useState } from 'react'
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
      <div className="container">
        <h2>İletişim</h2>
        <div className="contact-content">
          <div className="contact-info">
            <div className="info-item">
              <i className="fas fa-envelope"></i>
              <h3>Email</h3>
              <p>enesakmehmet7@gmail.com</p>
            </div>
            <div className="info-item">
              <i className="fas fa-phone"></i>
              <h3>Telefon</h3>
              <p>+90 507 003 24 84</p>
            </div>
            <div className="info-item">
              <i className="fas fa-map-marker-alt"></i>
              <h3>Konum</h3>
              <p>Rize, Türkiye</p>
            </div>
          </div>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">İsim</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
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
              ></textarea>
            </div>
            
            <button type="submit" className="submit-btn">Gönder</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact 