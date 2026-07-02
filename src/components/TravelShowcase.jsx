import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './TravelShowcase.css';

gsap.registerPlugin(ScrollTrigger);

export default function TravelShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const containerRef = useRef(null);
  
  // Track Mouse movement relative to the container center
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    
    // Set custom CSS properties for mouse-driven parallax
    containerRef.current.style.setProperty('--mouse-x', x);
    containerRef.current.style.setProperty('--mouse-y', y);
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    // Smoothly return to center
    containerRef.current.style.setProperty('--mouse-x', 0);
    containerRef.current.style.setProperty('--mouse-y', 0);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Staggered Scroll Parallax for the outer wrappers
      gsap.to('.showcase-img-outer.img-1', {
        y: -90,
        ease: 'none',
        scrollTrigger: {
          trigger: '.travel-showcase-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });

      gsap.to('.showcase-img-outer.img-2', {
        y: 90,
        ease: 'none',
        scrollTrigger: {
          trigger: '.travel-showcase-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });

      gsap.to('.showcase-img-outer.img-3', {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: '.travel-showcase-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });

      // 2. Entrance Animation for elements when entering viewport
      gsap.from('.travel-showcase-left > *', {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.travel-showcase-section',
          start: 'top 80%',
        }
      });

      gsap.from('.showcase-img-outer', {
        opacity: 0,
        scale: 0.85,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.travel-showcase-section',
          start: 'top 80%',
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const journeyData = [
    {
      num: '01',
      title: 'Lounge',
      desc: 'Enable passengers to start their entertainment at the airport, helping them fill their time and stay informed before boarding.',
      imgSrc: '/assets/banner/IMG-20260630-WA0003.jpg.jpeg',
    },
    {
      num: '02',
      title: 'Inflight',
      desc: 'Engage and entertain passengers onboard, connecting them with your brand throughout their travel experience.',
      imgSrc: '/assets/banner/IMG-20260630-WA0004.jpg.jpeg',
    },
    {
      num: '03',
      title: 'Destination',
      desc: 'Deliver personalized, local content and travel guides, keeping your travelers inspired and engaged even after they arrive.',
      imgSrc: '/assets/banner/IMG-20260630-WA0005.jpg.jpeg',
    }
  ];

  return (
    <section 
      ref={containerRef}
      className="section travel-showcase-section"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="travel-showcase-decor-left"></div>
      <div className="travel-showcase-decor-right"></div>
      
      <div className="container">
        <div className="travel-showcase-grid">
          {/* Left Column: Interactive Steps */}
          <div className="travel-showcase-left">
            <span className="showcase-label-pill">Entertainment Experience</span>
            <h2 className="showcase-heading">
              INTEGRATION AT <span className="text-highlight-red">EVERY TOUCHPOINT</span>
            </h2>
            <p className="showcase-intro-text">
              We design digital content ecosystems that transition seamlessly, ensuring continuous brand engagement throughout the passenger journey.
            </p>
            
            <div className="showcase-steps-list">
              {journeyData.map((item, idx) => (
                <div 
                  key={idx}
                  className={`showcase-step-card ${activeIdx === idx ? 'active' : ''}`}
                  onMouseEnter={() => setActiveIdx(idx)}
                >
                  <div className="step-card-num">{item.num}</div>
                  <div className="step-card-content">
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Column: Floating Overlapping Canvas */}
          <div className="travel-showcase-right">
            <div className="showcase-canvas-wrapper">
              {journeyData.map((item, idx) => (
                <div 
                  key={idx}
                  className={`showcase-img-outer img-${idx + 1} ${activeIdx === idx ? 'focused' : 'dimmed'}`}
                  onClick={() => setSelectedImage(item.imgSrc)}
                  style={{ cursor: 'pointer' }}
                  title="Click to view full image"
                >
                  <div className="showcase-img-mouse-wrapper">
                    <div className="showcase-img-inner">
                      <img src={item.imgSrc} alt={item.title} />
                      <div className="showcase-img-overlay">
                        <span className="overlay-step">{item.num}</span>
                        <span className="overlay-title">{item.title}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="showcase-lightbox-backdrop" 
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="showcase-lightbox-content" 
            onClick={(e) => e.stopPropagation()}
          >
            <img src={selectedImage} alt="Fullscreen View" className="showcase-lightbox-img" />
            <button 
              className="showcase-lightbox-close" 
              onClick={() => setSelectedImage(null)}
              aria-label="Close light box"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
