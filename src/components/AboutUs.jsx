import React, { useEffect } from 'react';
import { Eye, Trophy } from 'lucide-react';
import './AboutUs.css';

// SVG Icons for Core Values
const FlameIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
  </svg>
);

const AwardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7"/>
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
  </svg>
);

const CompassIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
  </svg>
);

const ShieldCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);

const QuoteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor" className="vision-quote-icon">
    <path d="M11.192 15.757c0-.962-.399-1.849-1.043-2.483.666-.893 1.076-2.001 1.076-3.207 0-3.031-2.447-5.49-5.462-5.49-.374 0-.742.039-1.099.112v1.942c.356-.053.722-.082 1.099-.082 1.956 0 3.541 1.583 3.541 3.518 0 1.258-.667 2.355-1.666 2.977l-.117.066c-.347.199-.684.444-.997.729-.636.577-1.036 1.405-1.036 2.327 0 1.777 1.437 3.223 3.207 3.223 1.768 0 3.493-1.446 3.493-3.223zm12.808 0c0-.962-.399-1.849-1.043-2.483.666-.893 1.076-2.001 1.076-3.207 0-3.031-2.447-5.49-5.462-5.49-.374 0-.742.039-1.099.112v1.942c.356-.053.722-.082 1.099-.082 1.956 0 3.541 1.583 3.541 3.518 0 1.258-.667 2.355-1.666 2.977l-.117.066c-.347.199-.684.444-.997.729-.636.577-1.036 1.405-1.036 2.327 0 1.777 1.437 3.223 3.207 3.223 1.768 0 3.493-1.446 3.493-3.223z"/>
  </svg>
);

export default function AboutUs({ onBackToHome }) {
  // Scroll to top when mounted
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      {/* Hero Banner Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="about-hero-subtitle">Dedicated To Delivering Quality Living Spaces</span>
          <h1 className="about-hero-title">Revolutionising The Real Estate Sector In Kerala</h1>
        </div>
      </section>

      {/* Main About Intro Section */}
      <section className="about-intro-section">
        <div className="container about-intro-grid">
          <div className="about-intro-left">
            <span className="about-tag">About Us</span>
            <h2 className="about-title">Pioneering Premium Living Spaces down South</h2>
            <p className="about-desc">
              The Kerala real estate sector has been undergoing a paradigm shift in terms of the number of projects being developed and the state-of-the-art facilities being offered within them. <strong>Victoria Realtors</strong> is proud to be part of this revolution and has played a vital role in giving the city an identity as one of the major real estate hubs in Kerala.
            </p>
            <p className="about-desc">
              Having completed numerous projects in Palakkad and with an ever expanding customer base, Victoria Realtors is today the most preferred and accepted real estate promoters in the Palakkad real estate sector.
            </p>
            <p className="about-desc">
              With an unrivaled track record in the real estate sector in Palakkad, Ottapalam, Thrissur, Thiruvananthapuram, Irinjalakuda and a strong technical team handling all the developmental aspects associated with the projects, Victoria Realtors continues to deliver international-class living spaces for each and every customer to cherish.
            </p>
            <p className="about-desc">
              Victoria Realtors’ award-winning portfolio is a true testament to the dedication and customer-oriented work ethic followed by each individual at the firm. The exploration of form and space, aimed towards delivering quality abodes, forms the core basis of each project designed by Victoria Realtors.
            </p>
          </div>
          <div className="about-intro-right animate-fade-in">
            <div className="about-img-frame">
              <img src="/assets/banner/IMG-20260630-WA0005.jpg.jpeg" alt="Victoria Realtors Luxury Villa Design" />
              <div className="about-badge">
                <span className="about-badge-num">20+</span>
                <span className="about-badge-txt">Years Legacy</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="values-section">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <span>Our Principles</span>
            <h2>Our Core Values</h2>
            <p>The foundations upon which we build lifelong relationships and deliver uncompromising quality.</p>
          </div>

          <div className="values-grid">
            {/* Passion */}
            <div className="value-card">
              <div className="value-icon-container">
                <FlameIcon />
              </div>
              <h3>Passion</h3>
              <p>We are fuelled by the never-ending passion for perfection and the indomitable spirit to pursue it.</p>
            </div>

            {/* Quality */}
            <div className="value-card">
              <div className="value-icon-container">
                <AwardIcon />
              </div>
              <h3>Quality</h3>
              <p>Whether it's the Product, Process, Service or People, we have an uncompromising stand when it come to quality.</p>
            </div>

            {/* Leadership */}
            <div className="value-card">
              <div className="value-icon-container">
                <CompassIcon />
              </div>
              <h3>Leadership</h3>
              <p>We lead based on principles both in thought and in business leadership.</p>
            </div>

            {/* Trust */}
            <div className="value-card">
              <div className="value-icon-container">
                <ShieldCheckIcon />
              </div>
              <h3>Trust</h3>
              <p>We believe that great relationships are built with great trust. We will always be trustworthy in all our interactions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="vision-section">
        <div className="container vision-container">
          <div className="vision-philosophy-card">
            <QuoteIcon />
            <span className="vision-heading">The Vision & Mission</span>
            <p className="vision-philosoph">
              "Our philosophy – To Create A Positive Paradigm Shift In The Indian Real Estate Sector By Redefining The Standards Through Unmatched Quality, Value Addition, Trust And Service – is what drives the team at Victoria Realtors."
            </p>
          </div>

          <div className="vision-details-grid">
            <div className="vision-detail-item">
              <div className="vision-icon-wrap">
                <Eye size={28} />
              </div>
              <h4>A Vision for 2023 & Beyond</h4>
              <p>
                Going forward, by 2023, we aim to deliver quality living spaces all over India and in turn become one of the few billion-dollar real estate enterprises in the nation.
              </p>
            </div>
            <div className="vision-detail-item">
              <div className="vision-icon-wrap">
                <Trophy size={28} />
              </div>
              <h4>Steps to Milestones</h4>
              <p>
                Our projects in Palakkad is only the stepping stone towards achieving this milestone and our ever expanding customer base is a true reflection of the quality and dedicated service we offer to the masses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action about */}
      <section className="about-cta-section">
        <div className="container">
          <div className="about-cta-card">
            <h2>Ready to Find Your Dream Home?</h2>
            <p>Explore our premium active villa listings across Kerala & Coimbatore and experience unmatched living spaces.</p>
            <div className="about-cta-buttons">
              <button onClick={onBackToHome} className="btn btn-primary">Browse Projects</button>
              <a 
                href="https://wa.me/917907878203?text=Hi,%20I%20visited%20your%20About%20Us%20page%20and%20would%20like%20to%20know%20more%20about%20your%20villas." 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-secondary"
              >
                Contact Agent
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
