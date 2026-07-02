import React from 'react';
import { Quote, Star, ShieldCheck } from 'lucide-react';
import BackgroundDecorations from './BackgroundDecorations';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Mrs. Athira Raghunathan',
      project: 'Victoria Tanima | Thrissur',
      initials: 'AR',
      text: 'Victoria Tanima was the perfect choice for our family. The building quality is top-notch, and the gated community feels incredibly secure. From the initial inquiry to handing over the keys, the process was seamless.'
    },
    {
      name: 'Mr. Abhilash Das',
      project: 'Victoria Tanima | Thrissur',
      initials: 'AD',
      text: 'We take great pride in our new villa. Victoria Realtors kept their word on delivering our home on time, and their post-sales service team continues to be highly responsive and helpful whenever we reach out.'
    },
    {
      name: 'Mr. Syamkumar.S & Mrs. Tara.B',
      project: 'Victoria Ashirvaad | Ottapalam',
      initials: 'ST',
      text: 'Highly satisfied with our home at Victoria Ashirvaad. The tranquil location chosen by the builders offers the perfect escape from the bustle of the city, while keeping essential amenities easily accessible.'
    },
    {
      name: 'Mr. Rahul & Mrs. Vidhya',
      project: 'Victoria Ushas | Palakkad',
      initials: 'RV',
      text: 'The best investment we have made. The gated community features lush green landscapes, ample room for recreation, and premium fixtures. Thank you, Victoria Realtors, for making our dream home a reality!'
    }
  ];

  return (
    <section className="testimonials-section" id="testimonials">
      <BackgroundDecorations />
      <div className="container">
        <div className="section-header">
          <span className="section-header-pill">Client Stories</span>
          <h2>WHAT OUR <span className="text-highlight-red">HOMEOWNERS SAY</span></h2>
          <p>Read about the experiences of our valued clients who found their perfect homes and gated communities with us.</p>
        </div>

        <div className="testimonials-grid-v2 testimonials-slider">
          {testimonials.map((test, index) => (
            <div key={index} className="testimonial-card glass-card">
              <div className="testimonial-card-top">
                <div className="client-avatar">
                  {test.initials}
                </div>
                <div className="client-text">
                  <div className="client-name">{test.name}</div>
                  <div className="client-property">{test.project}</div>
                  <div className="verified-owner-badge">
                    <ShieldCheck size={12} fill="rgba(16, 185, 129, 0.1)" />
                    <span>Verified Homeowner</span>
                  </div>
                </div>
              </div>

              <div className="testimonial-divider"></div>

              <div className="testimonial-card-bottom">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="testimonial-text">"{test.text}"</p>
              </div>

              <Quote className="quote-icon" size={48} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
