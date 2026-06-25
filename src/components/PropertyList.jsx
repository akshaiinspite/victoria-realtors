import React, { useState } from 'react';
import { MapPin, ArrowRight, Heart, Maximize, ShieldAlert, Award } from 'lucide-react';
import { allProperties } from '../data/properties';

export default function PropertyList({ filters, onEnquire, onSelectProject, comparisonList = [], onToggleCompare, properties = allProperties }) {
  const [favorites, setFavorites] = useState({});
  const [activeTab, setActiveTab] = useState('All');

  const locationsList = ['All', 'Palakkad', 'Thrissur', 'Ottapalam', 'Trivandrum', 'Coimbatore', 'Tiruppur', 'Irinjalakuda'];

  const toggleFavorite = (id) => {
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Filter listings based on location tabs + search widgets from Hero panel
  const filteredProperties = properties.filter(property => {
    // Tab filter
    if (activeTab !== 'All') {
      if (property.location !== activeTab) return false;
    } else {
      // Respect status filter from search panel only when viewing all locations
      if (filters.status && property.status !== filters.status) return false;
    }
    
    // Search keyword filter
    if (filters.search) {
      const query = filters.search.toLowerCase();
      const matchName = property.name.toLowerCase().includes(query);
      const matchLoc = property.location.toLowerCase().includes(query);
      if (!matchName && !matchLoc) return false;
    }
    
    // Location filter from dropdown
    if (filters.location && property.location !== filters.location) return false;
    
    // Type filter from dropdown
    if (filters.type && property.type !== filters.type) return false;
    
    // Price filter
    if (filters.maxPrice) {
      if (property.minPriceVal > filters.maxPrice) return false;
    }

    return true;
  });

  const getPriceLabel = (property) => {
    if (property.priceText) return property.priceText;
    const val = property.price;
    if (val >= 100) {
      return `${(val / 100).toFixed(2)} Cr Onwards`;
    }
    return `${val} Lakhs Onwards`;
  };

  return (
    <section id="properties" className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-header">
          <span>Our Portfolio</span>
          <h2>Featured Properties</h2>
          <p>Explore our exclusive collection of luxury villas, traditional style nalukettus, and modern apartments across Southern India.</p>
        </div>

        {/* Location Filtering Tabs */}
        <div className="property-tabs-container">
          {locationsList.map(tab => (
            <button 
              key={tab} 
              className={`property-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Properties Grid */}
        <div className="properties-grid">
          {filteredProperties.length > 0 ? (
            filteredProperties.map(property => (
              <article key={property.id} className="property-card glass-card">
                <div className="property-image-container">
                  <img 
                    src={`/assets/properties/${property.img}`} 
                    alt={property.name} 
                    className="property-img"
                    loading="lazy"
                  />
                  <div className="property-image-overlay">
                    {property.status === 'sold' ? (
                      <span className="property-badge-sold">Sold Out</span>
                    ) : (
                      <span className="property-badge-active">Active</span>
                    )}
                    <button 
                      className={`property-fav-btn ${favorites[property.id] ? 'active' : ''}`}
                      onClick={() => toggleFavorite(property.id)}
                      aria-label="Add to favorites"
                    >
                      <Heart size={18} fill={favorites[property.id] ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                </div>

                <div className="property-details">
                  <div className="property-location">
                    <MapPin size={14} className="text-primary" />
                    <span>{property.location}, India</span>
                  </div>
                  <h3 className="property-title">{property.name}</h3>
                  <div className="property-price">{getPriceLabel(property)}</div>

                  <div className="property-specs">
                    <div className="spec-item">
                      <Maximize size={16} />
                      <span>{property.area}</span>
                    </div>
                    <div className="spec-item">
                      {property.type === 'apartment' ? (
                        <Award size={16} />
                      ) : (
                        <Heart size={16} />
                      )}
                      <span style={{ textTransform: 'capitalize' }}>{property.type}</span>
                    </div>
                  </div>

                  <div className="property-actions">
                    <button 
                      onClick={() => onSelectProject(property.id)}
                      className="btn btn-secondary"
                    >
                      View Details
                    </button>
                    {property.status !== 'sold' && (
                      <button 
                        className="btn btn-primary"
                        onClick={() => onEnquire(property.name)}
                      >
                        Enquire Now
                      </button>
                    )}
                  </div>

                  {/* Add to Compare checkbox */}
                  <div className="property-compare-wrapper" style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'center' }}>
                    <label className="compare-checkbox-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                      <input 
                        type="checkbox"
                        checked={comparisonList.some(p => p.id === property.id)}
                        onChange={() => onToggleCompare(property)}
                        disabled={comparisonList.length >= 3 && !comparisonList.some(p => p.id === property.id)}
                        style={{ cursor: 'pointer', accentColor: 'var(--primary)' }}
                      />
                      {comparisonList.some(p => p.id === property.id) ? '✓ Added to Compare' : 'Add to Compare (Max 3)'}
                    </label>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="no-properties-found">
              <p>No properties match your current search filters.</p>
              <button 
                className="btn btn-primary"
                onClick={() => setActiveTab('All')}
              >
                Clear Location Filter
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
