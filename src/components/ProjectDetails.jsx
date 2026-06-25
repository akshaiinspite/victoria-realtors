import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, Maximize, Award, Heart, ArrowLeft, Shield, CheckCircle, 
  ChevronRight, Phone, Send, Info, Eye, ArrowRight, Compass, Navigation, Landmark, Plane,
  // Amenity icons
  ShieldCheck, Video, ShieldAlert, Grid, Droplet, Smile, Lightbulb, Zap,
  ArrowUpDown, Car, Dumbbell, PhoneCall, CloudRain, Trees, Sun
} from 'lucide-react';
import { getPropertyById, getPropertyDetails, allProperties } from '../data/properties';
import './ProjectDetails.css';

// Map icon names to lucide components
const IconMap = {
  ShieldCheck: ShieldCheck,
  Video: Video,
  ShieldAlert: ShieldAlert,
  Grid: Grid,
  Droplet: Droplet,
  Smile: Smile,
  Lightbulb: Lightbulb,
  Zap: Zap,
  ArrowUpDown: ArrowUpDown,
  Car: Car,
  Dumbbell: Dumbbell,
  PhoneCall: PhoneCall,
  CloudRain: CloudRain,
  Trees: Trees,
  Sun: Sun
};

export default function ProjectDetails({ projectId, onBack, onEnquire, onSelectProject, trackEngagement, properties = allProperties }) {
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
  const [virtualTourTab, setVirtualTourTab] = useState('360');

  // Interactive 360 Walkthrough States
  const [activeWalkthroughRoom, setActiveWalkthroughRoom] = useState('living');
  const [panAngle, setPanAngle] = useState(-150); // Starts at center center
  const [isDraggingPano, setIsDraggingPano] = useState(false);
  const startXRef = useRef(0);
  const lastAngleRef = useRef(-150);

  const handlePanoMouseDown = (e) => {
    setIsDraggingPano(true);
    startXRef.current = e.clientX;
    lastAngleRef.current = panAngle;
  };
  const handlePanoMouseMove = (e) => {
    if (!isDraggingPano) return;
    const dx = e.clientX - startXRef.current;
    setPanAngle(lastAngleRef.current + dx);
    if (trackEngagement) trackEngagement(0.2);
  };
  const handlePanoMouseUp = () => {
    setIsDraggingPano(false);
  };
  const handlePanoTouchStart = (e) => {
    setIsDraggingPano(true);
    startXRef.current = e.touches[0].clientX;
    lastAngleRef.current = panAngle;
  };
  const handlePanoTouchMove = (e) => {
    if (!isDraggingPano) return;
    const dx = e.touches[0].clientX - startXRef.current;
    setPanAngle(lastAngleRef.current + dx);
    if (trackEngagement) trackEngagement(0.2);
  };

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
    
    // Simulate inquiry submit
    setIsSubmitted(true);
    setTimeout(() => {
      // Open WhatsApp with form details
      const text = `Hi, I am interested in ${property.name} (${property.location}).\nMy Name: ${formData.name}\nPhone: ${formData.mobile}\nEmail: ${formData.email || 'N/A'}`;
      const whatsappUrl = `https://wa.me/919159165893?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');
      
      // Reset form
      setFormData({ name: '', email: '', mobile: '' });
      setIsSubmitted(false);
    }, 1500);
  };

  const toggleSpec = (index) => {
    setExpandedSpec(prev => (prev === index ? -1 : index));
  };

  // Sticky sub-nav click scroll handler
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

      {/* Project Hero Banner */}
      <section className="project-detail-hero" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(/assets/properties/${property.img})` }}>
        <div className="container">
          <div className="hero-details-container">
            <div className="hero-left">
              <span className="badge badge-primary" style={{ marginBottom: '1rem', background: 'rgba(210, 38, 45, 0.2)', color: '#fff', borderColor: '#ff5c62' }}>
                {property.type}
              </span>
              <h1 className="detail-title">{property.name}</h1>
              <div className="detail-meta">
                <span className="meta-item">
                  <MapPin size={18} /> {property.location}, India
                </span>
                <span className="meta-item">
                  <Shield size={18} /> RERA: {details.rera}
                </span>
              </div>
            </div>
            
            <div className="hero-right">
              <div className="price-tag-large">
                <span className="price-label">Starting from</span>
                <span className="price-val">
                  {property.priceText ? property.priceText.replace(' Onwards', '') : `${property.price} Lakhs`}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                {property.status !== 'sold' && (
                  <button onClick={() => onEnquire(property.name)} className="btn btn-primary btn-lg">
                    Enquire Now
                  </button>
                )}
                <span className={`status-pill ${property.status === 'sold' ? 'sold' : 'active'}`}>
                  {property.status === 'sold' ? 'Sold Out' : 'Active Listing'}
                </span>
              </div>
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
            <button onClick={() => scrollToSection('virtual-tour')}>Virtual Tour</button>
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
                        {/* Outer wall */}
                        <rect x="10" y="10" width="280" height="160" rx="4" stroke="var(--primary)" strokeWidth="2" fill="var(--bg-primary)" />
                        
                        {/* Room partitions */}
                        <line x1="110" y1="10" x2="110" y2="170" stroke="var(--border-color)" strokeWidth="2" />
                        <line x1="110" y1="90" x2="290" y2="90" stroke="var(--border-color)" strokeWidth="2" />
                        <line x1="200" y1="90" x2="200" y2="170" stroke="var(--border-color)" strokeWidth="2" />
                        <line x1="10" y1="100" x2="110" y2="100" stroke="var(--border-color)" strokeWidth="2" />
                        
                        {/* Doors (arc representation) */}
                        <path d="M 110,40 A 30,30 0 0,0 80,10" fill="none" stroke="var(--primary)" strokeWidth="1" strokeDasharray="3,3" />
                        <path d="M 200,120 A 30,30 0 0,1 230,90" fill="none" stroke="var(--primary)" strokeWidth="1" strokeDasharray="3,3" />
                        
                        {/* Room labels */}
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
                    const SpecificIcon = IconMap[amenity.icon] || Info;
                    return (
                      <div key={idx} className="amenity-item-card">
                        <div className="amenity-icon-wrapper">
                          <SpecificIcon size={22} />
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

              {/* Virtual Tours / Matterport Integration */}
              <section id="virtual-tour" className="details-card glass-card">
                <div className="section-title-tabs">
                  <h2>Virtual 3D Experience</h2>
                  <div className="tour-toggle-tabs">
                    <button 
                      className={`tour-tab-btn ${virtualTourTab === '360' ? 'active' : ''}`}
                      onClick={() => { setVirtualTourTab('360'); if (trackEngagement) trackEngagement(10); }}
                    >
                      Interactive 360° Walkthrough
                    </button>
                    <button 
                      className={`tour-tab-btn ${virtualTourTab === 'matterport' ? 'active' : ''}`}
                      onClick={() => { setVirtualTourTab('matterport'); if (trackEngagement) trackEngagement(15); }}
                    >
                      Matterport 3D Space
                    </button>
                  </div>
                </div>
                <div className="card-divider"></div>
                
                {virtualTourTab === '360' ? (
                  <div className="virtual-360-container">
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                      Drag or swipe left/right across the viewport below to rotate and view the spaces from different angles. Use the hotkeys to jump between rooms.
                    </p>
                    
                    {/* Room Selector */}
                    <div className="room-selector-row">
                      {[
                        { id: 'living', name: 'Living Room', asset: 'featured.jpg' },
                        { id: 'bedroom', name: 'Master Bedroom', asset: 'punyam.jpg' },
                        { id: 'garden', name: 'Terrace Garden', asset: 'Top-Builders-in-Palakkad.jpg' }
                      ].map(room => (
                        <button
                          key={room.id}
                          className={`room-select-chip ${activeWalkthroughRoom === room.id ? 'active' : ''}`}
                          onClick={() => {
                            setActiveWalkthroughRoom(room.id);
                            setPanAngle(-150); // reset position
                            if (trackEngagement) trackEngagement(10);
                          }}
                        >
                          {room.name}
                        </button>
                      ))}
                    </div>

                    {/* Viewport Frame */}
                    <div 
                      className="pano-viewport"
                      onMouseDown={handlePanoMouseDown}
                      onMouseMove={handlePanoMouseMove}
                      onMouseUp={handlePanoMouseUp}
                      onMouseLeave={handlePanoMouseUp}
                      onTouchStart={handlePanoTouchStart}
                      onTouchMove={handlePanoTouchMove}
                      onTouchEnd={handlePanoMouseUp}
                    >
                      <div 
                        className="pano-canvas"
                        style={{
                          backgroundImage: `url(/assets/properties/${
                            activeWalkthroughRoom === 'living' ? 'featured.jpg' :
                            activeWalkthroughRoom === 'bedroom' ? 'punyam.jpg' : 'Top-Builders-in-Palakkad.jpg'
                          })`,
                          backgroundPosition: `${panAngle}px center`,
                          cursor: isDraggingPano ? 'grabbing' : 'grab'
                        }}
                      >
                        {/* Hotspots overlay */}
                        <div className="pano-hotspot" style={{ left: '20%', top: '60%' }}>
                          <Compass className="hotspot-pulse-icon" />
                          <span className="hotspot-tooltip">Kitchen Access</span>
                        </div>
                        <div className="pano-hotspot" style={{ left: '70%', top: '55%' }}>
                          <Compass className="hotspot-pulse-icon" />
                          <span className="hotspot-tooltip">Walk to Master Bed</span>
                        </div>
                      </div>
                      
                      <div className="pano-controls-overlay">
                        <button onClick={() => setPanAngle(prev => prev + 50)} className="pano-btn">◀ Rotate Left</button>
                        <span className="pano-indicator-bubble">Compass Heading: {Math.abs(panAngle % 360)}°</span>
                        <button onClick={() => setPanAngle(prev => prev - 50)} className="pano-btn">Rotate Right ▶</button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="virtual-matterport-container">
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                      Explore a real-time Matterport 3D digital twin of a premium villa. Access high-resolution dollhouse views, measure clearances, and take guided walkthroughs.
                    </p>
                    <div className="matterport-iframe-wrapper">
                      <iframe 
                        src="https://my.matterport.com/show/?m=JGPnGqyB6q9&play=1&qs=1"
                        frameBorder="0" 
                        allowFullScreen 
                        allow="xr-spatial-tracking"
                        title="Matterport 3D Gated Villa Showcase"
                        className="matterport-iframe"
                      ></iframe>
                    </div>
                  </div>
                )}
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

              {/* Specifications Section */}
              <section id="specifications" className="details-card glass-card">
                <h2>Technical Specifications</h2>
                <div className="card-divider"></div>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  Examine our detailed building specifications below. Click on each category to expand details:
                </p>
                
                <div className="specs-accordion">
                  {details.specs.map((spec, idx) => {
                    const isExpanded = expandedSpec === idx;
                    return (
                      <div key={idx} className={`accordion-item ${isExpanded ? 'expanded' : ''}`}>
                        <button 
                          className="accordion-trigger" 
                          onClick={() => toggleSpec(idx)}
                        >
                          <span>{spec.title}</span>
                          <span className="accordion-icon">{isExpanded ? '-' : '+'}</span>
                        </button>
                        
                        {isExpanded && (
                          <div className="accordion-content">
                            <div className="specs-table-wrapper">
                              <table className="specs-table">
                                <thead>
                                  <tr>
                                    <th>Feature</th>
                                    <th>Advantage</th>
                                    <th>Benefit</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {spec.details.map((detail, dIdx) => (
                                    <tr key={dIdx}>
                                      <td data-label="Feature" className="spec-feat"><strong>{detail.feature}</strong></td>
                                      <td data-label="Advantage" className="spec-adv">{detail.advantage}</td>
                                      <td data-label="Benefit" className="spec-ben">{detail.benefit}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Approved Banking Partners */}
              <section className="details-card glass-card">
                <h2>Approved Banking Partners</h2>
                <div className="card-divider"></div>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  This project has been pre-approved for home loans by major Indian banking and financial institutions.
                </p>
                <div className="banks-grid">
                  {['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'LIC Housing Finance', 'Federal Bank', 'Axis Bank'].map((bank, bIdx) => (
                    <div key={bIdx} className="bank-logo-card">
                      <div className="bank-logo-placeholder">
                        <span>{bank.split(' ').map(w => w[0]).join('')}</span>
                      </div>
                      <span>{bank}</span>
                    </div>
                  ))}
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
                  <a href="tel:+919159165893" className="phone-link">
                    +91 91591 65893
                  </a>
                </div>
              </aside>
            </div>

          </div>
        </div>
      </div>

      {/* AI Recommended Matches Section */}
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
          <div className="lightbox-content animate-scale-up" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightboxImage(null)}>&times;</button>
            <img src={lightboxImage} alt="Expanded project gallery view" className="lightbox-img" />
          </div>
        </div>
      )}
    </div>
  );
}
