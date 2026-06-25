import React from 'react';
import { MapPin, X, Maximize, Award, Check, Minus, MessageSquare } from 'lucide-react';
import './Comparison.css';

export default function Comparison({ comparisonList, onRemoveFromCompare, onSelectProject, onEnquire, onBackToProjects }) {
  const getEMI = (priceLakhs) => {
    // Basic EMI calculation: 8.5% for 20 years on 80% loan value
    const loanAmount = priceLakhs * 100000 * 0.8;
    const monthlyRate = 8.5 / 12 / 100;
    const months = 240;
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(emi);
  };

  return (
    <div className="comparison-page container">
      <div className="comparison-header">
        <span className="font-accent">Victoria Realtors tools</span>
        <h2>Property Comparison Matrix</h2>
        <p>Compare prices, specs, areas, and key features of your selected developments side-by-side.</p>
        <button onClick={onBackToProjects} className="btn btn-secondary btn-sm" style={{ marginTop: '1rem' }}>
          ← Back to Properties Portfolio
        </button>
      </div>

      {comparisonList.length === 0 ? (
        <div className="comparison-empty glass-card text-center">
          <Award size={48} className="text-muted" style={{ marginBottom: '1.25rem' }} />
          <h3>Comparison Basket is Empty</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            Browse our catalog and click the "Compare" checkbox on up to 3 properties to evaluate their specifications side-by-side.
          </p>
          <button onClick={onBackToProjects} className="btn btn-primary">
            Explore Properties Portfolio
          </button>
        </div>
      ) : (
        <div className="comparison-matrix-wrapper glass-card">
          <table className="comparison-table">
            <thead>
              <tr>
                <th className="feature-col">Specification</th>
                {comparisonList.map(property => (
                  <th key={property.id} className="property-header-col">
                    <div className="compare-card-header">
                      <button 
                        className="remove-compare-btn" 
                        onClick={() => onRemoveFromCompare(property.id)}
                        title="Remove from comparison"
                      >
                        <X size={16} />
                      </button>
                      <img 
                        src={`/assets/properties/${property.img}`} 
                        alt={property.name} 
                        className="compare-header-img" 
                      />
                      <h4>{property.name}</h4>
                      <span className="location-span">
                        <MapPin size={12} /> {property.location}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="feature-label">Project Status</td>
                {comparisonList.map(property => (
                  <td key={property.id}>
                    <span className={`status-tag ${property.status === 'sold' ? 'sold' : 'active'}`}>
                      {property.status === 'sold' ? 'Sold Out' : 'Active Listing'}
                    </span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="feature-label">Price Bracket</td>
                {comparisonList.map(property => (
                  <td key={property.id} className="highlight-cell font-sans">
                    <strong>{property.priceText ? property.priceText : `${property.price} Lakhs Onwards`}</strong>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="feature-label">Property Type</td>
                {comparisonList.map(property => (
                  <td key={property.id} style={{ textTransform: 'capitalize' }}>
                    {property.type}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="feature-label">Built-up Area</td>
                {comparisonList.map(property => (
                  <td key={property.id}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <Maximize size={14} className="text-primary" /> {property.area}
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="feature-label">Estimated Monthly EMI</td>
                {comparisonList.map(property => (
                  <td key={property.id}>
                    <strong>₹{getEMI(property.price).toLocaleString()} /mo</strong>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      * Based on 20Y @ 8.5%
                    </span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="feature-label">Premium Amenities</td>
                {comparisonList.map(property => {
                  const ams = property.amenities || ['Security', 'Water Supply', 'Car Parking'];
                  return (
                    <td key={property.id}>
                      <ul className="compare-amenities-list">
                        {ams.map((am, idx) => (
                          <li key={idx}>
                            <Check size={12} className="text-primary" /> {am}
                          </li>
                        ))}
                      </ul>
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td className="feature-label">AI Smart Match Score</td>
                {comparisonList.map(property => (
                  <td key={property.id}>
                    <span className="compare-match-score">
                      🤖 96% Match
                    </span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="feature-label">Actions</td>
                {comparisonList.map(property => (
                  <td key={property.id}>
                    <div className="compare-actions-cell">
                      <button 
                        onClick={() => onSelectProject(property.id)} 
                        className="btn btn-secondary btn-sm"
                        style={{ width: '100%' }}
                      >
                        Explore Project
                      </button>
                      {property.status !== 'sold' && (
                        <button 
                          onClick={() => onEnquire(property.name)} 
                          className="btn btn-primary btn-sm"
                          style={{ width: '100%', gap: '4px' }}
                        >
                          <MessageSquare size={14} /> Enquire
                        </button>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
