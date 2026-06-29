import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Building, Users, Award } from 'lucide-react';

function CountUp({ end, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime = null;
          
          // Extract numbers
          const numericString = end.replace(/[^0-9]/g, '');
          const target = parseInt(numericString, 10) || 0;
          
          const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            
            // Easing function: easeOutExpo
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const currentCount = Math.floor(easeProgress * target);
            
            setCount(currentCount);
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(target);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [end, duration]);

  // Extract suffix (e.g. "+", "%")
  const suffix = end.replace(/[0-9,]/g, '');
  
  // Format count
  const formattedCount = count.toLocaleString('en-US');

  return (
    <span ref={elementRef} className="count-up-number">
      {formattedCount}
      <span className="stat-suffix">{suffix}</span>
    </span>
  );
}

export default function Stats() {
  const statsData = [
    { 
      number: '20+', 
      title: 'Years of Trust', 
      desc: 'Established Legacy',
      icon: <ShieldCheck size={24} className="stat-icon" /> 
    },
    { 
      number: '40+', 
      title: 'Delivered Projects', 
      desc: 'Architectural Excellence',
      icon: <Building size={24} className="stat-icon" /> 
    },
    { 
      number: '1,500+', 
      title: 'Happy Families', 
      desc: 'Delighted Homeowners',
      icon: <Users size={24} className="stat-icon" /> 
    },
    { 
      number: '99%', 
      title: 'Customer Satisfaction', 
      desc: 'Industry-Leading Trust',
      icon: <Award size={24} className="stat-icon" /> 
    }
  ];

  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {statsData.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <div className="stat-icon-wrapper">
                {stat.icon}
              </div>
              <div className="stat-number">
                <CountUp end={stat.number} />
              </div>
              <div className="stat-title">{stat.title}</div>
              <div className="stat-desc">{stat.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

