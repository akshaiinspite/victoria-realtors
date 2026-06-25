import React from 'react';

export default function Stats() {
  const statsData = [
    { number: '20+', title: 'Years of Trust' },
    { number: '40+', title: 'Delivered Projects' },
    { number: '1,500+', title: 'Happy Families' },
    { number: '99%', title: 'Customer Satisfaction' }
  ];

  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {statsData.map((stat, idx) => (
            <div key={idx} className="stat-item">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-title">{stat.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
