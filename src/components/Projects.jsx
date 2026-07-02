import React, { useState, useEffect } from 'react';
import { MapPin, Maximize, Award, Heart, Search, SlidersHorizontal, Eye, ArrowRight } from 'lucide-react';
import { allProperties } from '../data/properties';
import { parseNaturalQuery } from '../utils/nlp';
import './Projects.css';

const districtsList = [
  { name: 'Palakkad', label: 'Palakkad', image: '/assets/districts/palakkad.png' },
  { name: 'Thrissur', label: 'Thrissur', image: '/assets/districts/thrissur.png' },
  { name: 'Ottapalam', label: 'Ottapalam', image: '/assets/districts/ottapalam.png' },
  { name: 'Trivandrum', label: 'Trivandrum', image: '/assets/districts/trivandrum.png' },
  { name: 'Coimbatore', label: 'Coimbatore', image: '/assets/districts/coimbatore.png' },
  { name: 'Tiruppur', label: 'Tiruppur', image: '/assets/districts/tiruppur.png' },
  { name: 'Irinjalakuda', label: 'Irinjalakuda', image: '/assets/districts/irinjalakuda.png' }
];

export default function Projects({ filters: initialFilters, setFilters: setAppFilters, onSelectProject, onEnquire, comparisonList = [], onToggleCompare, properties = allProperties }) {
  const [favorites, setFavorites] = useState({});
  const [searchQuery, setSearchQuery] = useState(initialFilters?.search || '');
  const [selectedLocation, setSelectedLocation] = useState(initialFilters?.location || 'All');
  const [selectedType, setSelectedType] = useState(initialFilters?.type || 'All');
  const [selectedStatus, setSelectedStatus] = useState(initialFilters?.status || 'All');
  const [maxPrice, setMaxPrice] = useState(initialFilters?.maxPrice || 300); // in Lakhs, default 3 Cr

  const typesList = ['All', 'villa', 'apartment', 'bungalow'];
  const statusList = ['All', 'active', 'sold'];

  // Update filters if they change from app state
  useEffect(() => {
    if (initialFilters) {
      setSearchQuery(initialFilters.search || '');
      setSelectedLocation(initialFilters.location || 'All');
      setSelectedType(initialFilters.type || 'All');
      setSelectedStatus(initialFilters.status || 'All');
      setMaxPrice(initialFilters.maxPrice || 300);
    }
  }, [initialFilters]);

  // Synchronize local filter changes to App level
  const updateAppFilters = (updatedFilters) => {
    if (setAppFilters) {
      setAppFilters(prev => ({
        ...prev,
        ...updatedFilters
      }));
    }
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedLocation('All');
    setSelectedType('All');
    setSelectedStatus('All');
    setMaxPrice(300);
    updateAppFilters({
      search: '',
      location: '',
      type: '',
      status: '',
      maxPrice: 300
    });
  };

  // Filter properties based on controls
  const filteredProperties = properties.filter(property => {
    // Search keyword filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchName = property.name.toLowerCase().includes(query);
      const matchLoc = property.location.toLowerCase().includes(query);
      if (!matchName && !matchLoc) return false;
    }

    // Location filter
    if (selectedLocation !== 'All' && property.location !== selectedLocation) {
      return false;
    }

    // Type filter
    if (selectedType !== 'All' && property.type !== selectedType) {
      return false;
    }

    // Status filter
    if (selectedStatus !== 'All' && property.status !== selectedStatus) {
      return false;
    }

    // Price filter
    if (maxPrice && property.minPriceVal > maxPrice) {
      return false;
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

  const handleLocationChange = (loc) => {
    setSelectedLocation(loc);
    updateAppFilters({ location: loc === 'All' ? '' : loc });
    
    // Smooth scroll down to results section when clicking a district
    const resultsElement = document.getElementById('listings-results');
    if (resultsElement) {
      resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    updateAppFilters({ type: type === 'All' ? '' : type });
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    updateAppFilters({ status: status === 'All' ? '' : status });
  };

  const handlePriceChange = (price) => {
    setMaxPrice(price);
    updateAppFilters({ maxPrice: price });
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    const parsed = parseNaturalQuery(query);
    if (parsed) {
      setSelectedLocation(parsed.location || 'All');
      setSelectedType(parsed.type || 'All');
      setMaxPrice(parsed.maxPrice !== 300 ? parsed.maxPrice : 300);
      
      updateAppFilters({
        search: query,
        location: parsed.location || '',
        type: parsed.type || '',
        maxPrice: parsed.maxPrice !== 300 ? parsed.maxPrice : 300
      });
    } else {
      updateAppFilters({ search: query });
    }
  };

  const applyQueryChip = (queryText) => {
    handleSearchChange(queryText);
    const resultsElement = document.getElementById('listings-results');
    if (resultsElement) {
      resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getCountForLocation = (locName) => {
    if (locName === 'All') return properties.length;
    return properties.filter(p => p.location === locName).length;
  };

  return (
    <div className="projects-page animate-fade-in">
      {/* Hero Banner */}
      <section className="projects-hero">
        <div className="container">
          <div className="projects-hero-content">
            <span className="projects-subtitle">Discover Your Dream Home</span>
            <h1 className="projects-title">Our Premium Properties</h1>
            <p className="projects-description">
              Browse through our collection of premium villas, traditional style nalukettus, and modern apartments across South India's prime locations.
            </p>
          </div>
        </div>
      </section>

      {/* Explore Locations section — rendered first */}
      <section className="projects-locations-section">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <span className="section-subtitle-gold">Explore Locations</span>
            <h2 className="section-title-large">Where We Build Dreams</h2>
            <p className="section-desc">Click on a location below to instantly display all premium projects and villas in that area.</p>
          </div>

          <div className="projects-district-cards-grid">
            {districtsList.map((district) => {
              const isActive = selectedLocation === district.name;
              const count = getCountForLocation(district.name);
              return (
                <button
                  key={district.name}
                  className={`projects-district-card ${isActive ? 'active' : ''}`}
                  onClick={() => handleLocationChange(district.name)}
                  aria-label={`View projects in ${district.label}`}
                >
                  <div className="district-card-image-wrapper">
                    <img
                      src={district.image}
                      alt={`${district.label} - Victoria Realtors`}
                      className="district-card-image"
                      loading="lazy"
                    />
                    <div className="district-card-overlay">
                      <ArrowRight size={18} />
                    </div>
                  </div>
                  <div className="district-card-info">
                    <span className="district-card-name">{district.label}</span>
                    <span className="district-card-count">{count} {count === 1 ? 'Project' : 'Projects'}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Filters & Listings Results Section */}
      <section id="listings-results" className="projects-listings-section section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          
          {/* Modern Combined Horizontal Filter Bar */}
          <div className="modern-filter-bar glass-card">
            
            {/* Search Input Box */}
            <div className="modern-filter-search">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="AI Natural Search (e.g. villas in Thrissur under 1 Cr)"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>

            {/* Property Type Selector */}
            <div className="modern-filter-type">
              {typesList.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`type-pill ${selectedType === t ? 'active' : ''}`}
                  onClick={() => handleTypeChange(t)}
                >
                  {t === 'All' ? 'All Types' : t.charAt(0).toUpperCase() + t.slice(1) + 's'}
                </button>
              ))}
            </div>

            {/* Price Slider Filter */}
            <div className="modern-filter-price">
              <div className="price-label-row">
                <span>Max Price:</span>
                <span className="price-tag">
                  {maxPrice === 300 ? 'Any' : maxPrice >= 100 ? `${(maxPrice / 100).toFixed(1)} Cr` : `${maxPrice}L`}
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="300"
                step="5"
                value={maxPrice}
                onChange={(e) => handlePriceChange(Number(e.target.value))}
                className="modern-range-slider"
              />
            </div>

            {/* Clear Button */}
            {(searchQuery || selectedLocation !== 'All' || selectedType !== 'All' || maxPrice !== 300) && (
              <button className="btn btn-secondary btn-clear-filters" onClick={clearFilters}>
                Clear
              </button>
            )}
          </div>

          {/* AI Search Assistant Chip Row */}
          <div className="ai-chips-container">
            <span className="ai-label">Try AI Search:</span>
            <button type="button" className="ai-chip" onClick={() => applyQueryChip('villas in Palakkad under 80 Lakhs')}>villas in Palakkad under 80 Lakhs</button>
            <button type="button" className="ai-chip" onClick={() => applyQueryChip('apartments in Coimbatore under 35 Lakhs')}>apartments in Coimbatore under 35 Lakhs</button>
            <button type="button" className="ai-chip" onClick={() => applyQueryChip('villas in Trivandrum under 1.2 Cr')}>villas in Trivandrum under 1.2 Cr</button>
          </div>

          <div className="listings-header-meta">
            <h3>
              Currently Showing: <span>{selectedLocation === 'All' ? 'All Locations' : selectedLocation}</span>
            </h3>
            <p>We found <strong>{filteredProperties.length}</strong> matching properties</p>
          </div>

          {/* Aligned Buildings / Properties Grid */}
          <div className="properties-grid">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property, index) => {
                const isBento = index % 5 === 0;
                return (
                  <article key={property.id} className={`property-card glass-card ${isBento ? 'featured-bento' : ''}`}>
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
                          <Award size={16} />
                          <span style={{ textTransform: 'capitalize' }}>{property.type}</span>
                        </div>
                      </div>

                      <div className="property-actions">
                        <button 
                          onClick={() => onSelectProject(property.id)}
                          className="btn btn-secondary"
                          style={{ display: 'inline-flex', gap: '0.4rem', flex: 1, justifyContent: 'center' }}
                        >
                          <Eye size={14} /> View Details
                        </button>
                        {property.status !== 'sold' ? (
                          <button 
                            className="btn btn-primary"
                            style={{ flex: 1 }}
                            onClick={() => onEnquire(property.name)}
                          >
                            Enquire Now
                          </button>
                        ) : (
                          <button 
                            className="btn btn-primary" 
                            style={{ flex: 1, opacity: 0.6, cursor: 'not-allowed' }}
                            disabled
                          >
                            Sold Out
                          </button>
                        )}
                      </div>

                      {/* Add to Compare checkbox */}
                      <div className="property-compare-wrapper">
                        <label className="compare-checkbox-label">
                          <input 
                            type="checkbox"
                            checked={comparisonList.some(p => p.id === property.id)}
                            onChange={() => onToggleCompare(property)}
                            disabled={comparisonList.length >= 3 && !comparisonList.some(p => p.id === property.id)}
                          />
                          {comparisonList.some(p => p.id === property.id) ? '✓ Added to Compare' : 'Add to Compare (Max 3)'}
                        </label>
                      </div>
                    </div>
                  </article>
                );
              })
            ) : (
              <div className="no-properties-found" style={{ gridColumn: '1 / -1', padding: '6rem 2rem', textAlign: 'center' }}>
                <p style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>No properties match your current search filters.</p>
                <button 
                  className="btn btn-primary"
                  onClick={clearFilters}
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
