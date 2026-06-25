import React from 'react';
import { Search, MapPin, Home } from 'lucide-react';
import { parseNaturalQuery } from '../utils/nlp';

export default function Hero({ filters, setFilters }) {
  const locations = [
    { value: '', label: 'All Locations' },
    { value: 'Palakkad', label: 'Palakkad' },
    { value: 'Thrissur', label: 'Thrissur' },
    { value: 'Ottapalam', label: 'Ottapalam' },
    { value: 'Trivandrum', label: 'Trivandrum' },
    { value: 'Coimbatore', label: 'Coimbatore' },
    { value: 'Tiruppur', label: 'Tiruppur' },
    { value: 'Irinjalakuda', label: 'Irinjalakuda' }
  ];

  const propertyTypes = [
    { value: '', label: 'All Properties' },
    { value: 'villa', label: 'Villas' },
    { value: 'apartment', label: 'Apartments/Flats' },
    { value: 'bungalow', label: 'Bungalows' }
  ];

  const handleTabChange = (type) => {
    setFilters(prev => ({ ...prev, status: type }));
  };

  const handleSelectChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleNaturalSearchChange = (query) => {
    const parsed = parseNaturalQuery(query);
    if (parsed) {
      setFilters(prev => ({
        ...prev,
        search: query,
        location: parsed.location || prev.location,
        type: parsed.type || prev.type,
        maxPrice: parsed.maxPrice !== 300 ? parsed.maxPrice : prev.maxPrice
      }));
    } else {
      setFilters(prev => ({ ...prev, search: query }));
    }
  };

  const applyQueryChip = (queryText) => {
    handleNaturalSearchChange(queryText);
  };

  const formatPrice = (val) => {
    if (val >= 100) {
      return `${(val / 100).toFixed(1)} Cr`;
    }
    return `${val} Lakhs`;
  };

  return (
    <section className="hero-section">
      <div className="container hero-grid">
        <div className="hero-content animate-slide-up">
          <span className="hero-subtitle">Spectacular Living down South</span>
          <h1 className="hero-title">
            Crafting Homes of <span>Timeless Heritage</span> & Comfort
          </h1>
          <p className="hero-description">
            For over two decades, Victoria Realtors has been Kerala's trusted partner in designing state-of-the-art premium villas and apartments. Discover a sanctuary that nurtures togetherness, peace, and family life.
          </p>
          <div className="hero-ctas">
            <a href="#properties" className="btn btn-primary">Explore Properties</a>
            <a 
              href="https://wa.me/919159165893?text=Hi,%20I%20would%20like%20to%20enquire%20about%20Victoria%20Realtors%20properties." 
              target="_blank" 
              rel="noreferrer" 
              className="btn btn-secondary"
            >
              Enquire Now
            </a>
          </div>
        </div>
        <div className="hero-search-panel glass-card animate-fade-in">
          <div className="search-tabs">
            <button 
              className={`search-tab-btn ${filters.status === 'active' ? 'active' : ''}`}
              onClick={() => handleTabChange('active')}
            >
              For Sale
            </button>
            <button 
              className={`search-tab-btn ${filters.status === 'sold' ? 'active' : ''}`}
              onClick={() => handleTabChange('sold')}
            >
              Sold Out
            </button>
          </div>

          <div className="search-group">
            <div className="search-field">
              <label className="ai-search-label">AI Natural Search ⚡</label>
              <div className="search-input-wrapper">
                <Search size={14} className="search-icon" />
                <input 
                  type="text" 
                  placeholder="e.g. Villas in Thrissur under 1 Cr..." 
                  value={filters.search}
                  onChange={(e) => handleNaturalSearchChange(e.target.value)}
                />
              </div>
              <div className="ai-search-chips">
                <span className="chip-label">Try:</span>
                <button type="button" className="ai-search-chip" onClick={() => applyQueryChip('Villas in Thrissur under 1 Cr')}>Villas in Thrissur under 1 Cr</button>
                <button type="button" className="ai-search-chip" onClick={() => applyQueryChip('Apartment in Palakkad under 50 Lakhs')}>Apartment in Palakkad under 50 Lakhs</button>
              </div>
            </div>

            <div className="search-field">
              <label>Location</label>
              <div className="search-input-wrapper">
                <MapPin size={14} className="search-icon" />
                <select 
                  value={filters.location} 
                  onChange={(e) => handleSelectChange('location', e.target.value)}
                >
                  {locations.map(loc => (
                    <option key={loc.value} value={loc.value}>{loc.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="search-field">
              <label>Property Type</label>
              <div className="search-input-wrapper">
                <Home size={14} className="search-icon" />
                <select 
                  value={filters.type} 
                  onChange={(e) => handleSelectChange('type', e.target.value)}
                >
                  {propertyTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="search-field">
              <div className="calc-field-header">
                <label>Max Budget</label>
                <span className="calc-val">{formatPrice(filters.maxPrice)}</span>
              </div>
              <input 
                type="range" 
                min="20" 
                max="300" 
                step="5"
                value={filters.maxPrice} 
                className="range-slider"
                onChange={(e) => handleSelectChange('maxPrice', parseInt(e.target.value))}
              />
              <div className="price-range-info">
                <span>20 Lakhs</span>
                <span>3.0 Cr</span>
              </div>
            </div>

            <button 
              className="btn btn-primary btn-search" 
              onClick={() => {
                const element = document.getElementById('properties');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Find Properties
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
