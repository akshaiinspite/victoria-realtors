import React, { useState, useEffect } from 'react';
import './ContactUs.css';

// SVG Icons for Contact Page
const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const MessageSquareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

// Social Media Icons
const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
);

const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
);

export default function ContactUs({ onSubmitLead }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const leadData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      location: formData.location || 'Not Specified',
      message: formData.message,
      source: 'Contact Page'
    };

    if (onSubmitLead) {
      onSubmitLead(leadData);
    }

    // Simulate submission and construct WhatsApp link for direct fallback lead routing
    const text = `Hi, I would like to get in touch. 
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Preferred Location: ${formData.location || 'Not Specified'}
Message: ${formData.message}`;
    
    setSubmitted(true);
    setTimeout(() => {
      const whatsappUrl = `https://wa.me/919159165893?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');
      setFormData({
        name: '',
        email: '',
        phone: '',
        location: '',
        message: ''
      });
      setSubmitted(false);
    }, 2000);
  };

  const offices = [
    {
      type: 'Registered Office',
      city: 'Coimbatore',
      address: '62-2, A.T.T Colony, Dr. Balasundaram Road, Coimbatore - 641018.',
      phone: '+91 91591 65893',
      phoneLink: 'tel:+919159165893',
      mapsSearch: 'https://www.google.com/maps/search/?api=1&query=Victoria+Realtors+Balasundaram+Road+Coimbatore'
    },
    {
      type: 'Branch Office',
      city: 'Coimbatore',
      address: '127, 1st Floor, Thirugnanasambandam Road, Opp. Bishop Appasamy College, Race Course, Coimbatore - 641018.',
      phone: '+91 95147 78788',
      phoneLink: 'tel:+919514778788',
      mapsSearch: 'https://www.google.com/maps/search/?api=1&query=Victoria+Realtors+Race+Course+Coimbatore'
    },
    {
      type: 'Branch Office',
      city: 'Palakkad',
      address: 'Near Head Post Office, Mettupalayam Street, Palakkad - 678001.',
      phone: '+91 91591 65893',
      phoneLink: 'tel:+919159165893',
      mapsSearch: 'https://www.google.com/maps/search/?api=1&query=Victoria+Realtors+Mettupalayam+Street+Palakkad'
    }
  ];

  return (
    <div className="contact-page">
      {/* Hero Banner Section */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <span className="contact-hero-subtitle">Get In Touch</span>
          <h1 className="contact-hero-title">We'd Love to Hear From You</h1>
        </div>
      </section>

      {/* Office Locations Addresses */}
      <section className="offices-section">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <span>Find Our Offices</span>
            <h2>Our Office Locations</h2>
            <p>Visit one of our branches or get in touch for face-to-face consultations with our villa experts.</p>
          </div>

          <div className="offices-grid">
            {offices.map((office, idx) => (
              <div key={idx} className="office-card">
                <div className="office-icon">
                  <MapPinIcon />
                </div>
                <span>{office.type}</span>
                <h3>{office.city}</h3>
                <p className="office-address">{office.address}</p>
                <div className="office-phone">
                  <PhoneIcon />
                  <a href={office.phoneLink}>{office.phone}</a>
                </div>
                <a 
                  href={office.mapsSearch} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="office-link"
                >
                  Get Directions <ExternalLinkIcon />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Panel Grid (Email, Phone, Socials vs Form) */}
      <section className="contact-panel-section">
        <div className="container contact-panel-grid">
          
          {/* Left panel: Info & Socials */}
          <div className="contact-info-card">
            <h3>Contact Information</h3>
            <div className="contact-list">
              
              <div className="contact-item">
                <div className="contact-item-icon">
                  <MailIcon />
                </div>
                <div className="contact-item-details">
                  <h4>Email Us</h4>
                  <a href="mailto:enquiry@victoriarealtors.in">enquiry@victoriarealtors.in</a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-item-icon">
                  <PhoneIcon />
                </div>
                <div className="contact-item-details">
                  <h4>Call Us</h4>
                  <a href="tel:+919159165893">+91 91591 65893</a>
                  <span style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-muted)' }}>+91 95147 78788</span>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-item-icon">
                  <MessageSquareIcon />
                </div>
                <div className="contact-item-details">
                  <h4>WhatsApp</h4>
                  <a 
                    href="https://wa.me/919159165893?text=Hi%20there,%20I'd%20like%20to%20know%20more%20about%20your%20properties." 
                    target="_blank" 
                    rel="noreferrer"
                  >
                    +91 91591 65893
                  </a>
                </div>
              </div>

            </div>

            {/* Social Links */}
            <div className="contact-social-box">
              <h4>Follow Us</h4>
              <div className="contact-social-links">
                <a href="https://www.facebook.com/VictoriaDevelopers" target="_blank" rel="noreferrer" className="contact-social-circle" aria-label="Facebook"><FacebookIcon /></a>
                <a href="https://www.instagram.com/victoriarealtors" target="_blank" rel="noreferrer" className="contact-social-circle" aria-label="Instagram"><InstagramIcon /></a>
                <a href="https://twitter.com/VictoriaRealto5" target="_blank" rel="noreferrer" className="contact-social-circle" aria-label="Twitter"><TwitterIcon /></a>
                <a href="https://www.linkedin.com/in/victoriarealtors" target="_blank" rel="noreferrer" className="contact-social-circle" aria-label="LinkedIn"><LinkedinIcon /></a>
                <a href="https://www.youtube.com/c/VictoriaRealtors" target="_blank" rel="noreferrer" className="contact-social-circle" aria-label="YouTube"><YoutubeIcon /></a>
              </div>
            </div>
          </div>

          {/* Right panel: Inquiry Form */}
          <div className="contact-form-container">
            <h3>Send us a Message</h3>
            <p>Fill out the form below and our team will get back to you within 24 hours.</p>
            
            {submitted ? (
              <div className="submit-success-msg">
                Connecting you to WhatsApp for direct chat routing...
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      placeholder="Your Name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      placeholder="Your Email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      placeholder="Your Phone Number" 
                      value={formData.phone} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="location">Preferred Location</label>
                    <select 
                      id="location" 
                      name="location" 
                      value={formData.location} 
                      onChange={handleChange}
                    >
                      <option value="">Select Location</option>
                      <option value="Palakkad">Palakkad</option>
                      <option value="Thrissur">Thrissur</option>
                      <option value="Ottapalam">Ottapalam</option>
                      <option value="Trivandrum">Trivandrum</option>
                      <option value="Coimbatore">Coimbatore</option>
                      <option value="Tiruppur">Tiruppur</option>
                      <option value="Irinjalakuda">Irinjalakuda</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    placeholder="Tell us about the property or villa details you are interested in..." 
                    value={formData.message} 
                    onChange={handleChange} 
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ padding: '0.85rem 2rem', alignSelf: 'flex-start' }}>
                  Send Message
                </button>
              </form>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
