import React, { useState, useEffect } from 'react';
import { MapPin, Maximize, Award, Heart, Search, SlidersHorizontal, Eye } from 'lucide-react';
import { allProperties } from '../data/properties';
import { parseNaturalQuery } from '../utils/nlp';
import './Projects.css';

export default function Projects({ filters: initialFilters, setFilters: setAppFilters, onSelectProject, onEnquire, comparisonList = [], onToggleCompare, properties = allProperties }) {
  const [favorites, setFavorites] = useState({});
  const [searchQuery, setSearchQuery] = useState(initialFilters?.search || '');
  const [selectedLocation, setSelectedLocation] = useState(initialFilters?.location || 'All');
  const [selectedType, setSelectedType] = useState(initialFilters?.type || 'All');
  const [selectedStatus, setSelectedStatus] = useState(initialFilters?.status || 'All');
  const [maxPrice, setMaxPrice] = useState(initialFilters?.maxPrice || 300); // in Lakhs, default 3 Cr

  const locationsList = ['All', 'Palakkad', 'Thrissur', 'Ottapalam', 'Trivandrum', 'Coimbatore', 'Tiruppur', 'Irinjalakuda'];
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

  // Synchronize local filter changes to App level (so home filters remain synced if desired)
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

  // Trigger app state change on filter changes
  const handleLocationChange = (loc) => {
    setSelectedLocation(loc);
    updateAppFilters({ location: loc === 'All' ? '' : loc });
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

      {/* Filter Sidebar & Listings Section */}
      <section className="projects-content-section section" style={{ background: 'var(--bg-secondary)', paddingTop: '4rem' }}>
        <div className="container">
          <div className="projects-layout">
            
            {/* Filter Panel (Sidebar) */}
            <aside className="filters-sidebar glass-card">
              <div className="filter-header">
                <SlidersHorizontal size={18} className="text-primary" />
                <h3>Filter Properties</h3>
              </div>

              <div className="filter-body">
                {/* Search Input */}
                 <div className="filter-group">
                  <label htmlFor="proj-search" className="ai-search-label">AI Natural Search ⚡</label>
                  <div className="filter-input-wrapper">
                    <Search size={16} className="filter-icon" />
                    <input 
                      type="text" 
                      id="proj-search"
                      placeholder="e.g. villas in Thrissur under 1 Cr..."
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                    />
                  </div>
                  <div className="ai-search-chips">
                    <button type="button" className="ai-search-chip" onClick={() => applyQueryChip('villas in Palakkad under 80 Lakhs')}>Palakkad under 80L</button>
                    <button type="button" className="ai-search-chip" onClick={() => applyQueryChip('apartments in Coimbatore under 35 Lakhs')}>Coimbatore under 35L</button>
                  </div>
                </div>

                {/* Location Filter */}
                <div className="filter-group">
                  <label htmlFor="proj-location">Location</label>
                  <select 
                    id="proj-location"
                    value={selectedLocation}
                    onChange={(e) => handleLocationChange(e.target.value)}
                  >
                    {locationsList.map(loc => (
                      <option key={loc} value={loc}>{loc === 'All' ? 'All Locations' : loc}</option>
                    ))}
                  </select>
                </div>

                {/* Type Filter */}
                <div className="filter-group">
                  <label htmlFor="proj-type">Property Type</label>
                  <select 
                    id="proj-type"
                    value={selectedType}
                    onChange={(e) => handleTypeChange(e.target.value)}
                  >
                    {typesList.map(t => (
                      <option key={t} value={t}>{t === 'All' ? 'All Types' : t.charAt(0).toUpperCase() + t.slice(1)}</option>
                    ))}
                  </select>
                </div>

                {/* Status Filter */}
                <div className="filter-group">
                  <label htmlFor="proj-status">Availability</label>
                  <select 
                    id="proj-status"
                    value={selectedStatus}
                    onChange={(e) => handleStatusChange(e.target.value)}
                  >
                    {statusList.map(s => (
                      <option key={s} value={s}>{s === 'All' ? 'All Statuses' : s === 'active' ? 'Active / For Sale' : 'Sold Out'}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range Filter */}
                <div className="filter-group">
                  <div className="price-slider-header">
                    <label>Max Price</label>
                    <span className="price-value">
                      {maxPrice === 300 ? 'Any Price' : maxPrice >= 100 ? `${(maxPrice / 100).toFixed(1)} Cr` : `${maxPrice} Lakhs`}
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="20" 
                    max="300" 
                    step="5"
                    value={maxPrice}
                    onChange={(e) => handlePriceChange(Number(e.target.value))}
                    className="range-slider"
                  />
                  <div className="price-slider-limits">
                    <span>20L</span>
                    <span>1.5 Cr</span>
                    <span>3 Cr+</span>
                  </div>
                </div>

                {/* Clear Button */}
                <button 
                  className="btn btn-secondary btn-clear"
                  onClick={clearFilters}
                  style={{ width: '100%', marginTop: '1rem' }}
                >
                  Clear Filters
                </button>
              </div>
            </aside>

            {/* Listings Grid */}
            <main className="projects-listings">
              <div className="listings-header">
                <p>Showing <strong>{filteredProperties.length}</strong> properties matching your search</p>
                <div className="locations-quick-tabs desktop-only">
                  {['All', 'Palakkad', 'Thrissur', 'Ottapalam'].map(loc => (
                    <button 
                      key={loc}
                      className={`quick-tab ${selectedLocation === loc ? 'active' : ''}`}
                      onClick={() => handleLocationChange(loc)}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>

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
                            style={{ display: 'inline-flex', gap: '0.4rem' }}
                          >
                            <Eye size={14} /> View Details
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
                  <div className="no-properties-found" style={{ gridColumn: '1 / -1', padding: '6rem 2rem' }}>
                    <p style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>No properties match your current search filters.</p>
                    <button 
                      className="btn btn-primary"
                      onClick={clearFilters}
                    >
                      Reset All Filters
                    </button>
                  </div>
                )}
              </div>
            </main>

          </div>
        </div>
      </section>
    </div>
  );
}
