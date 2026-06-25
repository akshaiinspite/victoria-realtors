import React from 'react';
import { Quote, Star } from 'lucide-react';

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
    <section className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-header">
          <span>Client Stories</span>
          <h2>What Our Homeowners Say</h2>
          <p>Read about the experiences of our valued clients who found their perfect homes and gated communities with us.</p>
        </div>

        <div className="testimonials-slider">
          {testimonials.map((test, index) => (
            <div key={index} className="testimonial-card glass-card">
              <Quote className="quote-icon" size={64} />
              
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>

              <p className="testimonial-text">"{test.text}"</p>

              <div className="client-info">
                <div className="client-avatar">
                  {test.initials}
                </div>
                <div className="client-text">
                  <div className="client-name">{test.name}</div>
                  <div className="client-property">{test.project}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
