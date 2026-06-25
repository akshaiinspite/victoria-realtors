import React, { useState, useEffect } from 'react';
import './Careers.css';

// SVG Icons for Careers Page
const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/>
    <line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);

const BriefcaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
);

const AwardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7"/>
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
  </svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

export default function Careers() {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    dob: '',
    phone: '',
    email: '',
    location: '',
    department: '',
    resume: null
  });
  const [fileName, setFileName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, resume: file }));
      setFileName(file.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Simulate successful leads handling
    setTimeout(() => {
      alert(`Application received! Thank you, ${formData.name}. Our recruitment team will review your application for the ${formData.department} department.`);
      setSubmitted(false);
      setFormData({
        name: '',
        gender: '',
        dob: '',
        phone: '',
        email: '',
        location: '',
        department: '',
        resume: null
      });
      setFileName('');
    }, 1500);
  };

  return (
    <div className="careers-page">
      {/* Hero Header */}
      <section className="careers-hero">
        <div className="careers-hero-content">
          <span className="careers-hero-subtitle">Careers</span>
          <h1 className="careers-hero-title">Realize Your Ambitions With Us</h1>
        </div>
      </section>

      {/* Main Careers Content & Form Split */}
      <section className="careers-content-section">
        <div className="container careers-grid">
          
          {/* Left panel: General Info & Support Contacts */}
          <div className="careers-info">
            <span className="careers-tag">Join the Team</span>
            <h2 className="careers-title">Who We Are Looking For</h2>
            <p className="careers-desc">
              A career with Victoria Realtors is your opportunity to make a mark in the real estate sector. 
              We are looking for enthusiastic individuals to work amidst an environment that facilitates 
              the growth of zealous and creative professionals. With industry best compensation packages 
              and other associated benefits, a career with us gets you an identity you always wished for 
              and that too in the fast track lane.
            </p>

            <div className="careers-contact-card">
              <h3>Careers Support Desk</h3>
              <div className="careers-contact-list">
                
                <div className="careers-contact-item">
                  <div className="careers-contact-icon">
                    <MailIcon />
                  </div>
                  <div>
                    <h4>Mail Your Resume</h4>
                    <a href="mailto:careers@victoria.com">careers@victoria.com</a>
                  </div>
                </div>

                <div className="careers-contact-item">
                  <div className="careers-contact-icon">
                    <PhoneIcon />
                  </div>
                  <div>
                    <h4>Call Careers Desk</h4>
                    <a href="tel:+918089032282">(+91) 80890 32282</a>
                    <span style={{ display: 'block', fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-dark)', marginTop: '0.25rem' }}>
                      <a href="tel:+918297103286">(+91) 82971 03286</a>
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right panel: Application Form */}
          <div className="careers-form-container">
            <h3>Apply For A Position</h3>
            <p>Please fill out the form below to submit your details and resume.</p>
            
            <form onSubmit={handleSubmit} className="careers-form">
              
              {/* Full Name */}
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="Your Full Name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              {/* Gender Radio Row */}
              <div className="gender-group">
                <label>Gender *</label>
                <div className="gender-options">
                  <label className="gender-option">
                    <input 
                      type="radio" 
                      name="gender" 
                      value="Male" 
                      checked={formData.gender === 'Male'} 
                      onChange={handleChange} 
                      required 
                    />
                    Male
                  </label>
                  <label className="gender-option">
                    <input 
                      type="radio" 
                      name="gender" 
                      value="Female" 
                      checked={formData.gender === 'Female'} 
                      onChange={handleChange} 
                      required 
                    />
                    Female
                  </label>
                  <label className="gender-option">
                    <input 
                      type="radio" 
                      name="gender" 
                      value="Other" 
                      checked={formData.gender === 'Other'} 
                      onChange={handleChange} 
                      required 
                    />
                    Other
                  </label>
                </div>
              </div>

              {/* DOB Picker */}
              <div className="form-group">
                <label htmlFor="dob">Date of Birth *</label>
                <input 
                  type="date" 
                  id="dob" 
                  name="dob" 
                  value={formData.dob} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              {/* Phone & Email Row */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone *</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    placeholder="Phone Number" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email ID *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="Email Address" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </div>

              {/* Location & Department */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="location">Location</label>
                  <input 
                    type="text" 
                    id="location" 
                    name="location" 
                    placeholder="Current Location" 
                    value={formData.location} 
                    onChange={handleChange} 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="department">Department</label>
                  <select 
                    id="department" 
                    name="department" 
                    value={formData.department} 
                    onChange={handleChange}
                  >
                    <option value="">Select a Department</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                    <option value="HR">Human Resources</option>
                    <option value="Engineering">Engineering / Construction</option>
                    <option value="Operations">Operations</option>
                    <option value="Finance">Finance</option>
                  </select>
                </div>
              </div>

              {/* Upload Resume Custom */}
              <div className="file-upload-wrapper">
                <label>Upload Resume *</label>
                <input 
                  type="file" 
                  id="resume-upload" 
                  name="resume" 
                  accept=".pdf,.doc,.docx" 
                  className="file-upload-input" 
                  onChange={handleFileChange} 
                  required
                />
                <label htmlFor="resume-upload" className="file-upload-label">
                  <UploadIcon /> {fileName ? 'Change Resume File' : 'Choose Resume File'}
                </label>
                {fileName ? (
                  <div className="file-name-display">Selected file: {fileName}</div>
                ) : (
                  <div className="file-name-display">No file chosen (PDF, DOC, DOCX)</div>
                )}
              </div>

              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ padding: '0.85rem 2rem', marginTop: '1rem', alignSelf: 'flex-start' }}
                disabled={submitted}
              >
                {submitted ? 'Submitting...' : 'Submit Application'}
              </button>

            </form>
          </div>

        </div>
      </section>

      {/* Perks / Culture Section */}
      <section className="perks-section">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <span>Why Join Us</span>
            <h2>Work Culture & Perks</h2>
            <p>We nurture ambition, reward accomplishments, and build career trajectories on the fast track.</p>
          </div>

          <div className="perks-grid">
            <div className="perk-card">
              <div className="perk-icon-container">
                <BriefcaseIcon />
              </div>
              <h3>Growth Environment</h3>
              <p>Work amongst a dedicated crew that facilitates the growth of zealous, creative, and out-of-the-box professional thinkers.</p>
            </div>
            <div className="perk-card">
              <div className="perk-icon-container">
                <AwardIcon />
              </div>
              <h3>Best Compensation</h3>
              <p>Get recognized for your contributions with industry-best salary packages, allowances, and multiple career progression benefits.</p>
            </div>
            <div className="perk-card">
              <div className="perk-icon-container">
                <UsersIcon />
              </div>
              <h3>Professional Identity</h3>
              <p>Establish a prominent career signature with one of South India's most trusted real estate and villa development brands.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
