import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import BackgroundDecorations from './BackgroundDecorations';
import './DistrictLocations.css';

gsap.registerPlugin(ScrollTrigger);

const districts = [
  { name: 'Palakkad', image: '/assets/districts/palakkad.png', projects: '12+' },
  { name: 'Thrissur', image: '/assets/districts/thrissur.png', projects: '8+' },
  { name: 'Ottapalam', image: '/assets/districts/ottapalam.png', projects: '6+' },
  { name: 'Trivandrum', image: '/assets/districts/trivandrum.png', projects: '4+' },
  { name: 'Coimbatore', image: '/assets/districts/coimbatore.png', projects: '5+' },
  { name: 'Tiruppur', image: '/assets/districts/tiruppur.png', projects: '3+' },
  { name: 'Irinjalakuda', image: '/assets/districts/irinjalakuda.png', projects: '2+' }
];

export default function DistrictLocations({ onDistrictClick }) {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section heading animation
      gsap.from('.district-section-header', {
        scrollTrigger: {
          trigger: '.district-section-header',
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      // Stagger animation for district cards
      gsap.from('.district-card', {
        scrollTrigger: {
          trigger: '.district-cards-wrapper',
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        y: 60,
        opacity: 0,
        scale: 0.85,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.1
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleClick = (districtName) => {
    if (onDistrictClick) {
      onDistrictClick(districtName);
    }
  };

  return (
    <section className="district-section" ref={sectionRef}>
      <BackgroundDecorations />
      <div className="container">
        <div className="district-section-header">
          <span className="district-label">Explore Our Locations</span>
          <h2 className="district-heading">Where We Build Dreams</h2>
          <p className="district-subtext">
            From the serene landscapes of Kerala to the vibrant cities of Tamil Nadu — discover premium properties across Southern India.
          </p>
        </div>

        <div className="district-cards-wrapper">
          {districts.map((district, index) => (
            <button
              key={district.name}
              className="district-card"
              ref={el => cardsRef.current[index] = el}
              onClick={() => handleClick(district.name)}
              aria-label={`View projects in ${district.name}`}
            >
              <div className="district-card-image-wrapper">
                <img
                  src={district.image}
                  alt={`${district.name} - Victoria Realtors Projects`}
                  className="district-card-image"
                  loading="lazy"
                />
                <div className="district-card-overlay">
                  <ArrowRight size={20} />
                </div>
              </div>
              <div className="district-card-info">
                <span className="district-card-name">{district.name}</span>
                <span className="district-card-count">{district.projects} Projects</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
