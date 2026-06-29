import React from 'react';
import { ShieldCheck, Compass, HeartHandshake, Key, CheckSquare } from 'lucide-react';
import BackgroundDecorations from './BackgroundDecorations';

export default function CompanyIntro() {
  return (
    <>
      {/* About Section */}
      <section id="about" className="section about-section-v2">
        <BackgroundDecorations />
        <div className="container">
          <div className="about-grid-v2">
            {/* Image Showcase — Stacked with accent overlap */}
            <div className="about-images-v2">
              <div className="about-img-primary">
                <img src="/assets/general/img-a.jpg" alt="Victoria Realtors Team" className="about-img" />
              </div>
              <div className="about-img-secondary">
                <img src="/assets/general/img-b-new.png" alt="Victoria Realtors Key Handover" className="about-img" />
              </div>
              <div className="about-experience-badge">
                <span className="about-badge-number">20+</span>
                <span className="about-badge-text">Years of Legacy</span>
              </div>
            </div>

            {/* Text Content */}
            <div className="about-content-v2">
              <div className="about-label-wrapper">
                <span className="about-accent-line"></span>
                <span className="about-label">About Victoria Realtors</span>
              </div>
              <h3 className="about-heading-v2">
                Committed Towards Setting A New Benchmark In Customer Satisfaction
              </h3>
              <p className="about-text-primary">
                Having entered the real estate sector over two decades ago, Victoria Realtors has redefined the market and to this day continues to deliver state-of-the-art projects at affordable rates.
              </p>
              <p className="about-text-secondary">
                At Victoria Realtors, we take great pride in honouring the commitments made to our clients. From delivering projects on time to providing dedicated post sales services, we always strive to ensure complete customer satisfaction.
              </p>
              
              <div className="about-ctas-v2">
                <a href="https://victoriarealtors.in/key-handingover/" target="_blank" rel="noreferrer" className="about-cta-primary">
                  <Key size={16} />
                  <span>Key Handing Over</span>
                </a>
                <a href="https://victoriarealtors.in/fully-sold-out-projects" target="_blank" rel="noreferrer" className="about-cta-secondary">
                  <CheckSquare size={16} />
                  <span>Fully Sold Out</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Value Pillars (Quality, Service, Price) */}
      <section className="section pillars-section-custom">
        <BackgroundDecorations />
        <div className="container">
          <div className="section-header">
            <span>Our Core Pillars</span>
            <h2>Redefining Property Standards</h2>
            <p>We build communities with three fundamental standards: unparalleled quality, reliable post-sales service, and honest pricing.</p>
          </div>

          <div className="features-grid">
            {/* Quality Pillar */}
            <article className="feature-card glass-card">
              <div className="feature-icon-box">
                <ShieldCheck size={28} />
              </div>
              <img 
                src="/assets/general/quality_new.png" 
                alt="Quality Pillar" 
                style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem' }} 
              />
              <h3>Uncompromised Quality</h3>
              <p style={{ fontSize: '0.9rem' }}>
                The development team at Victoria Realtors understand that a home should be as safe and secure as possible. The team incorporates only high-end construction materials from global brands and follows the most stringent safety standards for each and every project.
              </p>
            </article>

            {/* Service Pillar */}
            <article className="feature-card glass-card">
              <div className="feature-icon-box">
                <HeartHandshake size={28} />
              </div>
              <img 
                src="/assets/general/service_new.png" 
                alt="Service Pillar" 
                style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem' }} 
              />
              <h3>Dedicated Service</h3>
              <p style={{ fontSize: '0.9rem' }}>
                With over 20 years of experience in the real estate sector, mostly invested in a range of projects in Palakkad, Victoria Realtors is one of the most trusted brands down South. The company constantly aims towards developing projects for the masses and has completed many milestone projects so far.
              </p>
            </article>

            {/* Price Pillar */}
            <article className="feature-card glass-card">
              <div className="feature-icon-box">
                <Compass size={28} />
              </div>
              <img 
                src="/assets/general/price_new.png" 
                alt="Price Pillar" 
                style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem' }} 
              />
              <h3>Affordable Pricing</h3>
              <p style={{ fontSize: '0.9rem' }}>
                Each project designed and developed by Victoria Realtors is aimed towards providing quality living spaces at affordable rates. The concept for each project is to ensure that the end consumer is not troubled by the ever increasing rates and to make the process of owning a house as pleasant as possible and not filled with hassles.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Villa Developers in Kerala Copy (SEO/Long-form content) */}
      <section className="section seo-split-section">
        <BackgroundDecorations />
        <div className="container">
          <div className="seo-split-grid" style={{ position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '4rem', alignItems: 'center' }}>
            {/* Text Side */}
            <div className="seo-content" style={{ textAlign: 'left' }}>
              <span className="hero-subtitle" style={{ fontSize: '0.85rem' }}>Trusted Villa Builders</span>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)' }}>Villa Developers in Kerala</h2>
              <div style={{ color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '1.25rem', lineHeight: '1.75', fontSize: '0.95rem' }}>
                <p>
                  <strong>Victoria Realtors</strong>, one of the best villa builders in Kerala, aspires to serve home seekers with the best of the kind of home living experience with a luxurious abundance and elite magnificence. Victoria Realtors promises a symbiosis of style and quality in creating homes for you. We do not only create houses but homes that can nurture passion, vigour, spirit, liveliness, togetherness and moreover love.
                </p>
                <p>
                  In the villas of Victoria Realtors, you get the priceless enjoyment of the transcendental emotion of family life in the calm and tranquil living spaces that can feed on your inner positivity and guide your thought forces. With projects that spanned over prime locations in Palakkad, Ottappalam and Thrissur, Victoria Realtors marked a legacy of spectacular living.
                </p>
                <p>
                  Victoria Realtors caters to the need of urban souls who yearn for comfortable and calm living amidst the amenities that are easily accessible. The locations are chosen after a thorough cross-check to affirm the proximity to nearby spots and that the essential requirements are easily available. With a wide variety of world-class amenities and pristine green spaces for ample relaxation, Victoria Villas provide a life that is exuberant and enthralling. We offer a safe and secure life in a gated community with luscious natural landscapes, unimaginable comfort and luxurious amenities.
                </p>
              </div>
            </div>

            {/* ThreeJS Image Side */}
            <div className="seo-image-wrapper" style={{ position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border-color)' }}>
              <img 
                src="/assets/general/threejs_render.png" 
                alt="ThreeJS 3D Villa Render" 
                style={{ width: '100%', height: 'auto', display: 'block', transform: 'scale(1.02)' }} 
              />
              <div style={{
                position: 'absolute',
                bottom: '1rem',
                right: '1rem',
                background: 'rgba(17, 24, 39, 0.85)',
                color: '#fff',
                padding: '0.4rem 0.8rem',
                borderRadius: '50px',
                fontSize: '0.75rem',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                border: '1px solid rgba(255, 255, 255, 0.15)'
              }}>
                <span className="live-dot" style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', display: 'inline-block' }}></span>
                3D CAD Interactive Model
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
