import React, { useState, useEffect } from 'react';
import { X, Gift, Percent, PhoneCall, Sparkles } from 'lucide-react';
import './ExitIntentPopup.css';

export default function ExitIntentPopup({ onSubmitLead }) {
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Check if user already saw the popup in this session
    const seen = sessionStorage.getItem('vr_exit_popup_seen');
    if (seen) return;

    const handleMouseLeave = (e) => {
      // Trigger when mouse moves off the top of the viewport (indicating intent to close or type URL)
      if (e.clientY < 20) {
        setIsVisible(true);
        sessionStorage.setItem('vr_exit_popup_seen', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone) return;

    if (onSubmitLead) {
      onSubmitLead({
        name,
        email: 'N/A (Exit Popup)',
        phone,
        location: location || 'Not Specified',
        message: 'Claimed ₹1 Lakh Exclusive Booking Discount & Pre-Approved Loan Offer.',
        source: 'Exit Intent Popup'
      });
    }

    setSubmitted(true);
    setTimeout(() => {
      const text = `Hi, I want to claim the ₹1 Lakh Booking Discount and Pre-Approved Home Loan offer!
Name: ${name}
Phone: ${phone}
Location: ${location || 'Not Specified'}`;
      window.open(`https://wa.me/919159165893?text=${encodeURIComponent(text)}`, '_blank');
      setIsVisible(false);
      setSubmitted(false);
      setName('');
      setPhone('');
      setLocation('');
    }, 2000);
  };

  if (!isVisible) return null;

  return (
    <div className="exit-popup-overlay" onClick={handleClose}>
      <div className="exit-popup-card glass-card" onClick={(e) => e.stopPropagation()}>
        <button className="exit-close-btn" onClick={handleClose}>
          <X size={20} />
        </button>

        <div className="exit-badge font-accent">
          <Gift size={16} /> Exclusive Web Offer
        </div>

        <div className="exit-content">
          <h2 className="exit-title">Wait! Before You Leave...</h2>
          <p className="exit-subtitle">Get a **₹1 Lakh Exclusive Booking Discount** + Pre-Approved Home Loan at **8.4%** Interest Rate!</p>

          <div className="exit-offer-bullets">
            <div className="bullet-item">
              <Percent className="bullet-icon" size={16} />
              <span>Flat ₹1 Lakh Discount on instant booking</span>
            </div>
            <div className="bullet-item">
              <PhoneCall className="bullet-icon" size={16} />
              <span>Free VIP site visit & consultancy</span>
            </div>
            <div className="bullet-item">
              <Sparkles className="bullet-icon" size={16} />
              <span>Prioritized allocation on new luxury villa launches</span>
            </div>
          </div>

          {submitted ? (
            <div className="exit-success">
              <h4>Offer Claimed!</h4>
              <p>Routing you to our WhatsApp desk for confirmation details...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="exit-form">
              <div className="form-group-exit">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group-exit">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="form-group-exit">
                <select value={location} onChange={(e) => setLocation(e.target.value)}>
                  <option value="">Select Preferred Location</option>
                  <option value="Thrissur">Thrissur</option>
                  <option value="Palakkad">Palakkad</option>
                  <option value="Ottapalam">Ottapalam</option>
                  <option value="Trivandrum">Trivandrum</option>
                  <option value="Coimbatore">Coimbatore</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary btn-block exit-submit">
                Claim My Discount Now
              </button>
            </form>
          )}

          <div className="exit-no-commitment">
            *No obligation required. Promotion is active today only.
          </div>
        </div>
      </div>
    </div>
  );
}
