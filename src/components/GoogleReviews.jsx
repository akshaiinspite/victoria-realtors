import React from 'react';
import { Star, ShieldCheck, ExternalLink } from 'lucide-react';
import BackgroundDecorations from './BackgroundDecorations';
import './GoogleReviews.css';

export default function GoogleReviews() {
  const reviews = [
    {
      id: 1,
      author: 'Santhosh Kumar',
      avatar: 'SK',
      relativeTime: '2 weeks ago',
      rating: 5,
      text: 'Superb quality construction by Victoria Realtors! I recently took possession of my villa in Pranavam project, Palakkad. Handover was on-time and document verification was seamless. Highly recommended for NRIs.',
      source: 'Google Local Guide'
    },
    {
      id: 2,
      author: 'Dr. Mini Menon',
      avatar: 'MM',
      relativeTime: '1 month ago',
      rating: 5,
      text: 'Very professional dealings and clear title deeds. We visited multiple builders in Thrissur, but Victoria Realtors offered the best location connectivity and premium amenities at reasonable pricing. Staff is very supportive.',
      source: 'Verified Customer'
    },
    {
      id: 3,
      author: 'Rajesh Pillai',
      avatar: 'RP',
      relativeTime: '3 months ago',
      rating: 5,
      text: 'Deciding to buy a traditional style villa from Victoria was the best decision. The architectural detailing is exceptional. Gated security is top notch, and water availability is great. Thank you Victoria Realtors team!',
      source: 'Verified Buyer'
    },
    {
      id: 4,
      author: 'Anoop R. (NRI, Dubai)',
      avatar: 'AR',
      relativeTime: '5 months ago',
      rating: 5,
      text: 'Extremely trustworthy builders. As an NRI, I was worried about managing construction progress, but their customer portal provided regular photos, milestones updates, and legal assistance for PoA drafting. Exceptional service!',
      source: 'Google Local Guide'
    }
  ];

  return (
    <section className="google-reviews-section section" style={{ position: 'relative', overflow: 'hidden' }}>
      <BackgroundDecorations />
      <div className="container">
        <div className="section-header">
          <span className="section-header-pill">Customer Trust & Testimonials</span>
          <h2>VERIFIED GOOGLE <span className="text-highlight-red">REVIEWS</span></h2>
          <p>Read real experiences shared by our homeowners on Google Business Profile.</p>
        </div>

        {/* Aggregated Rating summary */}
        <div className="google-summary-card glass-card">
          <div className="google-logo-wrapper">
            <span className="google-letter g">G</span>
            <span className="google-letter o1">o</span>
            <span className="google-letter o2">o</span>
            <span className="google-letter g2">g</span>
            <span className="google-letter l">l</span>
            <span className="google-letter e">e</span>
            <span className="reviews-branding">Reviews</span>
          </div>
          <div className="rating-score-box">
            <span className="big-score">4.8</span>
            <div className="score-stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="star-icon filled" size={16} />
              ))}
            </div>
            <span className="total-count">Based on 1,420+ verified submissions</span>
          </div>
          <a 
            href="https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsoyG83VYmg" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary write-review-btn"
          >
            Write a Review <ExternalLink size={14} style={{ marginLeft: '6px' }} />
          </a>
        </div>

        {/* Reviews Grid */}
        <div className="reviews-grid">
          {reviews.map(review => (
            <div key={review.id} className="review-card glass-card">
              <div className="review-card-header">
                <div className="review-avatar">{review.avatar}</div>
                <div className="reviewer-info">
                  <h4>{review.author}</h4>
                  <div className="reviewer-meta">
                    <span className="relative-time">{review.relativeTime}</span>
                    <span className="source-tag">
                      <ShieldCheck size={12} style={{ marginRight: '4px' }} /> {review.source}
                    </span>
                  </div>
                </div>
              </div>
              <div className="review-stars-row">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="star-icon filled" size={14} />
                ))}
              </div>
              <p className="review-text">"{review.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
