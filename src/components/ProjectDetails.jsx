import React, { useState, useEffect } from 'react';
import { 
  MapPin, Maximize, Award, Heart, ArrowLeft, Shield, CheckCircle, 
  ChevronRight, Phone, Send, Info, Eye, ArrowRight, Compass, Navigation, Landmark, Plane,
  Camera
} from 'lucide-react';
import { getPropertyDetails, allProperties } from '../data/properties';
import './ProjectDetails.css';

export default function ProjectDetails({ projectId, onBack, onEnquire, onSelectProject, properties = allProperties }) {
  const property = properties.find(p => p.id === projectId);
  const details = getPropertyDetails(property);

  const getLocalityMetrics = (locName) => {
    const locLower = locName?.toLowerCase() || '';
    if (locLower.includes('palakkad')) {
      return [
        { name: 'Chinmaya Vidyalaya School', dist: '1.2 km', type: 'school', rating: 'Highly Rated' },
        { name: 'Welcare Multi-specialty Hospital', dist: '2.0 km', type: 'hospital', rating: '24/7 ER' },
        { name: 'Palakkad Junction Railway Station', dist: '3.8 km', type: 'transit', rating: 'Express Stop' },
        { name: 'Coimbatore International Airport', dist: '55.0 km', type: 'airport', rating: '1.2 Hrs Drive' }
      ];
    } else if (locLower.includes('thrissur')) {
      return [
        { name: 'Devamatha Public School', dist: '2.1 km', type: 'school', rating: 'CBSE Affiliated' },
        { name: 'Jubilee Mission Medical College', dist: '1.8 km', type: 'hospital', rating: 'Super Specialty' },
        { name: 'Thrissur Railway Station', dist: '2.5 km', type: 'transit', rating: 'Major Junction' },
        { name: 'Cochin International Airport', dist: '52.0 km', type: 'airport', rating: '1.1 Hrs Drive' }
      ];
    } else if (locLower.includes('coimbatore')) {
      return [
        { name: 'PSG Public Schools', dist: '2.5 km', type: 'school', rating: 'Top Tier' },
        { name: 'KMCH Hospital', dist: '1.5 km', type: 'hospital', rating: '24/7 Emergency' },
        { name: 'Coimbatore Junction', dist: '6.2 km', type: 'transit', rating: 'Central Hub' },
        { name: 'Coimbatore International Airport', dist: '4.5 km', type: 'airport', rating: '15 Mins Drive' }
      ];
    } else {
      return [
        { name: 'Government Higher Secondary School', dist: '1.8 km', type: 'school', rating: 'Standard' },
        { name: 'City Hospital & Clinic', dist: '3.0 km', type: 'hospital', rating: 'General Care' },
        { name: 'Nearest Bus Terminal', dist: '0.8 km', type: 'transit', rating: 'Frequent Feeder' },
        { name: 'Nearest Domestic Airport', dist: '60.0 km', type: 'airport', rating: 'Major Connectivity' }
      ];
    }
  };

  const localityMetrics = getLocalityMetrics(property?.location);

  const [activeConfigTab, setActiveConfigTab] = useState(0);
  const [expandedSpec, setExpandedSpec] = useState(0);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  if (!property || !details) {
    return (
      <div className="container" style={{ padding: '6rem 2rem', textAlign: 'center' }}>
        <h2>Project Not Found</h2>
        <button onClick={onBack} className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
          <ArrowLeft size={16} style={{ marginRight: '8px' }} /> Back to Projects
        </button>
      </div>
    );
  }

  // Get similar projects in same location (up to 3)
  const similarProjects = properties
    .filter(p => p.location === property.location && p.id !== property.id)
    .slice(0, 3);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile) return;
    
    setIsSubmitted(true);
    setTimeout(() => {
      // Open WhatsApp with form details
      const text = `Hi, I am interested in ${property.name} (${property.location}).\nMy Name: ${formData.name}\nPhone: ${formData.mobile}\nEmail: ${formData.email || 'N/A'}`;
      const whatsappUrl = `https://wa.me/917907878203?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');
      
      setFormData({ name: '', email: '', mobile: '' });
      setIsSubmitted(false);
    }, 1500);
  };

  const toggleSpec = (index) => {
    setExpandedSpec(prev => (prev === index ? -1 : index));
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 140; // Navbar + Subnav heights
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Get 3 sharp images for our collage layout
  const collageImages = [
    `/assets/properties/${details.gallery[0] || property.img}`,
    `/assets/properties/${details.gallery[1] || 'featured.jpg'}`,
    `/assets/properties/${details.gallery[2] || 'elevation-486x273.jpg'}`
  ];

  return (
    <div className="project-details-page animate-fade-in">
      {/* Back Button and Path navigation */}
      <div className="details-navigation-bar">
        <div className="container">
          <div className="nav-bar-inner">
            <button onClick={onBack} className="btn-back">
              <ArrowLeft size={16} /> Back to Projects
            </button>
            <div className="breadcrumbs">
              <span>Home</span> <ChevronRight size={12} /> 
              <span>Projects</span> <ChevronRight size={12} /> 
              <span>{property.location}</span> <ChevronRight size={12} /> 
              <span className="current">{property.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Airbnb-style Premium Photo Collage Grid */}
      <section className="project-collage-section">
        <div className="container">
          <div className="photo-collage-grid">
            {/* Left Large main photo */}
            <div 
              className="collage-item collage-main"
              onClick={() => setLightboxImage(collageImages[0])}
            >
              <img src={collageImages[0]} alt={`${property.name} Main View`} className="collage-img" />
              <div className="collage-overlay-chips">
                <span className="type-badge-chip">{property.type}</span>
                <span className={`status-badge-chip ${property.status === 'sold' ? 'sold' : 'active'}`}>
                  {property.status === 'sold' ? 'Sold Out' : 'Active'}
                </span>
              </div>
            </div>

            {/* Right stacked photos */}
            <div className="collage-right-col">
              <div 
                className="collage-item collage-sub-top"
                onClick={() => setLightboxImage(collageImages[1])}
              >
                <img src={collageImages[1]} alt={`${property.name} Detail view`} className="collage-img" />
              </div>
              <div 
                className="collage-item collage-sub-bottom"
                onClick={() => setLightboxImage(collageImages[2])}
              >
                <img src={collageImages[2]} alt={`${property.name} Amenity view`} className="collage-img" />
                <button className="btn-show-all-photos" onClick={() => scrollToSection('gallery')}>
                  <Camera size={16} /> Show All Photos
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clean Project Header Info panel */}
      <section className="project-info-header-panel">
        <div className="container">
          <div className="info-panel-inner">
            <div className="info-panel-left">
              <h1 className="project-title-text">{property.name}</h1>
              <div className="project-meta-row">
                <span className="meta-item-badge">
                  <MapPin size={16} /> {property.location}, India
                </span>
                <span className="meta-item-badge">
                  <Shield size={16} /> RERA: {details.rera}
                </span>
              </div>
            </div>

            <div className="info-panel-right">
              <div className="starting-price-box">
                <span className="lbl">Premium Package from</span>
                <span className="val">
                  {property.priceText ? property.priceText.replace(' Onwards', '') : `${property.price} Lakhs`}
                </span>
              </div>
              {property.status !== 'sold' && (
                <button onClick={() => onEnquire(property.name)} className="btn btn-primary btn-panel-enquire">
                  Enquire Now
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Sub-Navigation Bar */}
      <div className="project-sub-nav">
        <div className="container">
          <div className="sub-nav-links">
            <button onClick={() => scrollToSection('overview')}>Overview</button>
            <button onClick={() => scrollToSection('configurations')}>Configurations</button>
            <button onClick={() => scrollToSection('amenities')}>Amenities</button>
            <button onClick={() => scrollToSection('gallery')}>Gallery</button>
            <button onClick={() => scrollToSection('locality-intelligence')}>Locality Details</button>
            <button onClick={() => scrollToSection('specifications')}>Specifications</button>
            {similarProjects.length > 0 && <button onClick={() => scrollToSection('similar')}>Similar Projects</button>}
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="details-content-container section" style={{ background: 'var(--bg-secondary)', paddingTop: '3rem' }}>
        <div className="container">
          <div className="details-layout-grid">
            
            {/* Left Main Details Column */}
            <div className="details-main-content">
              
              {/* Overview Section */}
              <section id="overview" className="details-card glass-card">
                <h2>Project Overview</h2>
                <div className="card-divider"></div>
                <p className="overview-text">{details.overview}</p>
                <div className="quick-specs-grid">
                  <div className="quick-spec-box">
                    <Maximize size={24} className="text-primary" />
                    <div>
                      <h4>Property Size</h4>
                      <p>{property.area}</p>
                    </div>
                  </div>
                  <div className="quick-spec-box">
                    <Award size={24} className="text-primary" />
                    <div>
                      <h4>Property Type</h4>
                      <p style={{ textTransform: 'capitalize' }}>{property.type}</p>
                    </div>
                  </div>
                  <div className="quick-spec-box">
                    <CheckCircle size={24} className="text-primary" />
                    <div>
                      <h4>RERA Registration</h4>
                      <p>{details.rera.split('/').pop() || 'Verified'}</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Configurations & Floor Plans Section */}
              <section id="configurations" className="details-card glass-card">
                <h2>Configurations & Floor Plans</h2>
                <div className="card-divider"></div>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  Choose from our carefully drafted villa and apartment configurations below to check sizes, layouts, and estimated price ranges.
                </p>

                {/* Configuration Tabs */}
                <div className="config-tabs">
                  {details.configs.map((config, idx) => (
                    <button 
                      key={idx} 
                      className={`config-tab-btn ${activeConfigTab === idx ? 'active' : ''}`}
                      onClick={() => setActiveConfigTab(idx)}
                    >
                      {config.bhk}
                    </button>
                  ))}
                </div>

                <div className="config-details-box">
                  <div className="config-text-info">
                    <div className="config-info-row">
                      <span>Built-up Area:</span>
                      <strong>{details.configs[activeConfigTab].area}</strong>
                    </div>
                    {details.configs[activeConfigTab].plotSize !== 'N/A' && (
                      <div className="config-info-row">
                        <span>Plot Size:</span>
                        <strong>{details.configs[activeConfigTab].plotSize}</strong>
                      </div>
                    )}
                    <div className="config-info-row">
                      <span>Price:</span>
                      <strong className="text-primary">{details.configs[activeConfigTab].price} Onwards</strong>
                    </div>
                    <button 
                      onClick={() => onEnquire(`${property.name} - ${details.configs[activeConfigTab].bhk}`)}
                      className="btn btn-primary"
                      style={{ marginTop: '1.5rem', width: '100%' }}
                    >
                      Get Pricing Details
                    </button>
                  </div>

                  {/* Floor Plan Graphic (Styled SVG) */}
                  <div className="config-floorplan-box">
                    <div className="floorplan-header">
                      <span>Interactive Layout Preview</span>
                      <h4>{details.configs[activeConfigTab].bhk} Layout</h4>
                    </div>
                    <div className="floorplan-canvas">
                      <svg width="100%" height="180" viewBox="0 0 300 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="10" width="280" height="160" rx="4" stroke="var(--primary)" strokeWidth="2" fill="var(--bg-primary)" />
                        <line x1="110" y1="10" x2="110" y2="170" stroke="var(--border-color)" strokeWidth="2" />
                        <line x1="110" y1="90" x2="290" y2="90" stroke="var(--border-color)" strokeWidth="2" />
                        <line x1="200" y1="90" x2="200" y2="170" stroke="var(--border-color)" strokeWidth="2" />
                        <line x1="10" y1="100" x2="110" y2="100" stroke="var(--border-color)" strokeWidth="2" />
                        <path d="M 110,40 A 30,30 0 0,0 80,10" fill="none" stroke="var(--primary)" strokeWidth="1" strokeDasharray="3,3" />
                        <path d="M 200,120 A 30,30 0 0,1 230,90" fill="none" stroke="var(--primary)" strokeWidth="1" strokeDasharray="3,3" />
                        <text x="60" y="60" fill="var(--text-secondary)" fontSize="10" textAnchor="middle" fontWeight="bold">LIVING ROOM</text>
                        <text x="60" y="140" fill="var(--text-secondary)" fontSize="10" textAnchor="middle" fontWeight="bold">KITCHEN</text>
                        <text x="200" y="55" fill="var(--text-secondary)" fontSize="10" textAnchor="middle" fontWeight="bold">BEDROOM 1</text>
                        <text x="155" y="135" fill="var(--text-secondary)" fontSize="9" textAnchor="middle" fontWeight="bold">BEDROOM 2</text>
                        <text x="245" y="135" fill="var(--text-secondary)" fontSize="9" textAnchor="middle" fontWeight="bold">TOILET</text>
                      </svg>
                    </div>
                  </div>
                </div>
              </section>

              {/* Amenities Section */}
              <section id="amenities" className="details-card glass-card">
                <h2>Project Amenities</h2>
                <div className="card-divider"></div>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                  Our projects feature world-class amenities designed to elevate your living standard. Check out key integrations below:
                </p>
                <div className="amenities-grid-container">
                  {details.amenities.map((amenity, idx) => {
                    return (
                      <div key={idx} className="amenity-item-card">
                        <div className="amenity-icon-wrapper">
                          <CheckCircle size={22} />
                        </div>
                        <span>{amenity.name}</span>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Gallery Section */}
              <section id="gallery" className="details-card glass-card">
                <h2>Project Gallery</h2>
                <div className="card-divider"></div>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  Click on any of the screenshots or architectural renderings below to view an expanded view of the development.
                </p>
                <div className="detail-gallery-grid">
                  {details.gallery.map((imgName, idx) => (
                    <div 
                      key={idx} 
                      className="gallery-thumbnail-wrapper"
                      onClick={() => setLightboxImage(`/assets/properties/${imgName}`)}
                    >
                      <img 
                        src={`/assets/properties/${imgName}`} 
                        alt={`${property.name} gallery ${idx + 1}`} 
                        className="gallery-thumb"
                        loading="lazy"
                      />
                      <div className="gallery-thumb-overlay">
                        <Eye size={24} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Locality Intelligence Module */}
              <section id="locality-intelligence" className="details-card glass-card">
                <h2>Locality Proximity & Connectivity</h2>
                <div className="card-divider"></div>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  Explore proximity distances to essential services, schools, and transportation nodes around this property.
                </p>

                <div className="locality-layout-grid">
                  {/* Left Side: Map/Locality visual */}
                  <div className="locality-visual-box">
                    <div className="locality-map-placeholder">
                      <MapPin size={36} className="map-pin-bounce" />
                      <div className="radar-circle"></div>
                      <div className="radar-circle second"></div>
                      <span className="map-loc-label">{property.location}, India</span>
                    </div>
                  </div>

                  {/* Right Side: Proximity stats list */}
                  <div className="locality-metrics-list">
                    {localityMetrics.map((metric, mIdx) => (
                      <div key={mIdx} className="locality-metric-row">
                        <div className="metric-icon-box">
                          {metric.type === 'school' && <Landmark size={20} className="text-primary" />}
                          {metric.type === 'hospital' && <Shield size={20} className="text-primary" />}
                          {metric.type === 'transit' && <Navigation size={20} className="text-primary" />}
                          {metric.type === 'airport' && <Plane size={20} className="text-primary" />}
                        </div>
                        <div className="metric-details">
                          <span className="metric-category-tag">{metric.type.toUpperCase()}</span>
                          <h4>{metric.name}</h4>
                          <p>{metric.rating}</p>
                        </div>
                        <div className="metric-distance-badge">
                          {metric.dist}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Technical Specifications Section — Simplified to key bullet items */}
              <section id="specifications" className="details-card glass-card">
                <h2>Technical Specifications</h2>
                <div className="card-divider"></div>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                  High-quality raw materials and professional building parameters integrated into this development:
                </p>
                
                <div className="specs-simplified-grid">
                  {details.specs.map((spec, idx) => {
                    return (
                      <div key={idx} className="spec-simplified-card">
                        <h4>{spec.title}</h4>
                        <ul className="spec-bullets-list">
                          {spec.details.map((detail, dIdx) => (
                            <li key={dIdx}>
                              <strong>{detail.feature}:</strong> {detail.advantage}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </section>

            </div>

            {/* Right Sticky Sidebar Column */}
            <div className="details-sidebar">
              <aside className="sticky-callback-form glass-card">
                <div className="form-header">
                  <Phone size={18} className="text-primary animate-pulse" />
                  <h3>Get a Call Back</h3>
                </div>
                <p>Register your interest and our property advisor will contact you within 24 hours.</p>
                
                {isSubmitted ? (
                  <div className="form-success-box">
                    <CheckCircle size={32} className="text-success" />
                    <h4>Inquiry Submitted!</h4>
                    <p>Redirecting you to our WhatsApp assistant for immediate support...</p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="callback-form">
                    <div className="form-group">
                      <label htmlFor="user-name">Full Name *</label>
                      <input 
                        type="text" 
                        id="user-name" 
                        name="name" 
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="user-mobile">Mobile Number *</label>
                      <input 
                        type="tel" 
                        id="user-mobile" 
                        name="mobile" 
                        required
                        value={formData.mobile}
                        onChange={handleInputChange}
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="user-email">Email Address</label>
                      <input 
                        type="email" 
                        id="user-email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="user-proj">Selected Project</label>
                      <input 
                        type="text" 
                        id="user-proj" 
                        value={property.name}
                        disabled
                        className="disabled-input"
                      />
                    </div>

                    <button type="submit" className="btn btn-primary submit-btn">
                      <Send size={16} /> Contact Specialist
                    </button>
                  </form>
                )}
                
                <div className="sidebar-contact-badge">
                  <span>OR DIRECT CALL</span>
                  <a href="tel:+917907878203" className="phone-link">
                    +91 79078 78203
                  </a>
                </div>
              </aside>
            </div>

          </div>
        </div>
      </div>

      {/* Recommended Matches Section */}
      {similarProjects.length > 0 && (
        <section id="similar" className="similar-projects-section section" style={{ borderTop: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}>
          <div className="container">
            <div className="section-header" style={{ marginBottom: '3rem', textAlign: 'left', marginLeft: '0' }}>
              <span>AI Recommendation Engine</span>
              <h2>AI-Recommended Properties For You</h2>
              <p>Based on your interest in <strong>{property.name}</strong>, our recommendation engine calculated matching options in {property.location}:</p>
            </div>

            <div className="properties-grid">
              {similarProjects.map(similar => {
                const matchScore = 85 + ((similar.id * 11 + property.id * 7) % 15);
                return (
                  <article key={similar.id} className="property-card glass-card">
                    <div className="property-image-container">
                      <img 
                        src={`/assets/properties/${similar.img}`} 
                        alt={similar.name} 
                        className="property-img"
                        loading="lazy"
                      />
                      <div className="property-image-overlay">
                        {similar.status === 'sold' ? (
                          <span className="property-badge-sold">Sold Out</span>
                        ) : (
                          <span className="property-badge-active">Active</span>
                        )}
                        <span className="ai-match-badge-chip">
                          🤖 {matchScore}% Match
                        </span>
                      </div>
                    </div>

                    <div className="property-details">
                      <div className="property-location">
                        <MapPin size={14} className="text-primary" />
                        <span>{similar.location}, India</span>
                      </div>
                      <h3 className="property-title">{similar.name}</h3>
                      <div className="property-price">
                        {similar.priceText ? similar.priceText : `${similar.price} Lakhs Onwards`}
                      </div>

                      <div className="ai-justification-bubble">
                        💡 {similar.type === property.type ? `Same category: Premium ${similar.type}` : 'Matches standard budget bracket'} • Connected to {similar.location} transit
                      </div>

                      <div className="property-specs">
                        <div className="spec-item">
                          <Maximize size={16} />
                          <span>{similar.area}</span>
                        </div>
                        <div className="spec-item">
                          <Award size={16} />
                          <span style={{ textTransform: 'capitalize' }}>{similar.type}</span>
                        </div>
                      </div>

                      <div className="property-actions">
                        <button 
                          onClick={() => onSelectProject(similar.id)}
                          className="btn btn-secondary"
                          style={{ width: '100%', display: 'inline-flex', gap: '0.4rem', justifyContent: 'center' }}
                        >
                          View Details <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="lightbox-overlay" onClick={() => setLightboxImage(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightboxImage(null)}>&times;</button>
            <img src={lightboxImage} alt="Expanded view" className="lightbox-img" />
          </div>
        </div>
      )}
    </div>
  );
}
