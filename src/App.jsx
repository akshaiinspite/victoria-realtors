import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CompanyIntro from './components/CompanyIntro';
import Stats from './components/Stats';
import PropertyList from './components/PropertyList';
import MortgageCalculator from './components/MortgageCalculator';
import Testimonials from './components/Testimonials';
import BlogSection from './components/BlogSection';
import Footer from './components/Footer';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Careers from './components/Careers';
import Projects from './components/Projects';
import ProjectDetails from './components/ProjectDetails';
import Blog from './components/Blog';
import BlogDetails from './components/BlogDetails';
import Reels from './components/Reels';
import SmartNotes from './components/SmartNotes';
import ExitIntentPopup from './components/ExitIntentPopup';
import AIWebsiteAssistant from './components/AIWebsiteAssistant';
import NRIJourney from './components/NRIJourney';
import Comparison from './components/Comparison';
import GoogleReviews from './components/GoogleReviews';
import { allBlogs } from './data/blogs';
import { trackEvent } from './utils/tracking';
import { getOrganizationSchema, getProductSchema, getFAQAndArticleSchema, injectJSONLD } from './utils/seo';
import { allProperties } from './data/properties';
import './App.css';

export default function App() {
  // Page routing state: 'home', 'about', 'contact', 'careers', 'projects', 'project-details', 'blog', 'blog-details', 'reels', 'nri', or 'admin'
  const [currentPage, setCurrentPage] = useState(() => {
    const path = window.location.pathname;
    const hash = window.location.hash;
    if (path === '/admin' || hash === '#admin' || hash === '#/admin') {
      return 'admin';
    }
    return 'home';
  });

  const handleBackToHome = () => {
    setCurrentPage('home');
    if (window.location.pathname === '/admin') {
      window.history.pushState({}, '', '/');
    } else {
      window.location.hash = '';
    }
  };

  // Synchronize browser history navigation with state
  useEffect(() => {
    const handleRoute = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/admin' || hash === '#admin' || hash === '#/admin') {
        setCurrentPage('admin');
      } else if (hash === '#about') {
        setCurrentPage('about');
      } else if (hash === '#compare') {
        setCurrentPage('compare');
      } else if (hash === '#reels') {
        setCurrentPage('reels');
      } else if (hash === '#nri') {
        setCurrentPage('nri');
      } else if (hash === '#careers') {
        setCurrentPage('careers');
      } else if (hash === '#blog') {
        setCurrentPage('blog');
      } else if (hash === '#contact') {
        setCurrentPage('contact');
      }
    };

    window.addEventListener('hashchange', handleRoute);
    window.addEventListener('popstate', handleRoute);
    return () => {
      window.removeEventListener('hashchange', handleRoute);
      window.removeEventListener('popstate', handleRoute);
    };
  }, []);

  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedBlogId, setSelectedBlogId] = useState(null);

  // Property Comparison State
  const [comparisonList, setComparisonList] = useState([]);
  
  // Stateful properties list (dynamic creation)
  const [propertiesList, setPropertiesList] = useState(allProperties);

  const handleAddProperty = (newProperty) => {
    setPropertiesList(prev => [newProperty, ...prev]);
  };

  const handleToggleCompare = (property) => {
    setComparisonList(prev => {
      const exists = prev.some(p => p.id === property.id);
      if (exists) {
        return prev.filter(p => p.id !== property.id);
      }
      if (prev.length >= 3) {
        alert("You can compare a maximum of 3 properties at a time.");
        return prev;
      }
      return [...prev, property];
    });
    trackEngagement(5);
  };

  const handleRemoveFromCompare = (id) => {
    setComparisonList(prev => prev.filter(p => p.id !== id));
  };

  // Behavioral Lead Scoring System
  const [engagementScore, setEngagementScore] = useState(15);

  const trackEngagement = (points) => {
    setEngagementScore(prev => Math.min(prev + points, 100));
  };

  useEffect(() => {
    trackEngagement(5);
  }, [currentPage]);

  // Dynamic leads state with a fallback seed
  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem('vr_leads');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 1,
        name: 'Arjun Nair',
        email: 'arjun.nair@gmail.com',
        phone: '+91 9845012345',
        location: 'Thrissur',
        message: 'Looking for a 3 BHK gated community villa near Swaraj Round.',
        source: 'Contact Page Inquiry',
        date: new Date(Date.now() - 86400000 * 2).toISOString(),
        status: 'New',
        notes: [
          { date: new Date(Date.now() - 86400000 * 2).toISOString(), text: 'Lead created from Contact Page Inquiry' }
        ],
        reminder: null,
        score: 85
      },
      {
        id: 2,
        name: 'Meera Krishnan',
        email: 'meera.k@yahoo.com',
        phone: '+91 9447098765',
        location: 'Palakkad',
        message: 'Interested in traditional Nalukettu home layouts.',
        source: 'Quick Inquiry Form',
        date: new Date(Date.now() - 86400000 * 4).toISOString(),
        status: 'In Progress',
        notes: [
          { date: new Date(Date.now() - 86400000 * 4).toISOString(), text: 'Lead created from Quick Inquiry Form' },
          { date: new Date(Date.now() - 86400000 * 3).toISOString(), text: 'Called client. Prefers Palakkad bypass locations.' }
        ],
        reminder: null,
        score: 45
      }
    ];
  });

  // Dynamic blogs state initialized with static blogs
  const [dynamicBlogs, setDynamicBlogs] = useState(() => {
    const saved = localStorage.getItem('vr_dynamic_blogs');
    if (saved) return JSON.parse(saved);
    return allBlogs;
  });

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('vr_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('vr_dynamic_blogs', JSON.stringify(dynamicBlogs));
  }, [dynamicBlogs]);

  // Lead capture handler
  const handleAddLead = (leadData) => {
    const newLead = {
      id: Date.now(),
      name: leadData.name,
      email: leadData.email || 'N/A',
      phone: leadData.phone,
      location: leadData.location || 'Not Specified',
      message: leadData.message || '',
      source: leadData.source || 'General Inquiry',
      date: new Date().toISOString(),
      status: 'New',
      notes: [
        { date: new Date().toISOString(), text: `Lead captured via ${leadData.source || 'General Inquiry'}` }
      ],
      reminder: null,
      score: engagementScore
    };
    setLeads(prev => [newLead, ...prev]);

    // Dispatch GA4 & Meta Conversions API Server-Side events
    trackEvent('lead_submitted', {
      name: leadData.name,
      email: leadData.email || 'N/A',
      phone: leadData.phone,
      location: leadData.location || 'Not Specified',
      source: leadData.source || 'General Inquiry',
      score: engagementScore
    });

    setEngagementScore(15);
  };

  // Shared state for filtering properties
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    type: '',
    maxPrice: 300, // 3 Cr max default
    status: 'active' // 'active' (for sale) or 'sold' (sold out)
  });

  // Inject SEO / AEO / GEO dynamic JSON-LD tags on route change
  useEffect(() => {
    if (currentPage === 'project-details' && selectedProjectId) {
      const property = allProperties.find(p => p.id === selectedProjectId);
      if (property) {
        injectJSONLD(getProductSchema(property));
      }
    } else if (currentPage === 'blog-details' && selectedBlogId) {
      const blog = dynamicBlogs.find(b => b.id === selectedBlogId);
      if (blog) {
        injectJSONLD(getFAQAndArticleSchema(blog));
      }
    } else {
      injectJSONLD(getOrganizationSchema());
    }
  }, [currentPage, selectedProjectId, selectedBlogId, dynamicBlogs]);

  const handleEnquireProperty = (propertyName) => {
    const text = `Hi, I would like to enquire about ${propertyName} at Victoria Realtors.`;
    const whatsappUrl = `https://wa.me/919159165893?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');

    trackEvent('whatsapp_conversion', {
      property: propertyName,
      channel: 'WhatsApp Inquiry Button'
    });
    trackEngagement(10);
  };

  if (currentPage === 'admin') {
    return (
      <SmartNotes 
        leads={leads} 
        setLeads={setLeads} 
        setBlogs={setDynamicBlogs} 
        properties={propertiesList}
        setProperties={setPropertiesList}
        onAddProperty={handleAddProperty}
        onBackToHome={handleBackToHome}
      />
    );
  }

  return (
    <>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} setFilters={setFilters} comparisonList={comparisonList} />
      <main style={{ marginTop: 'calc(var(--header-height) + var(--topbar-height))' }}>
        {currentPage === 'about' ? (
          <AboutUs onBackToHome={() => setCurrentPage('home')} />
        ) : currentPage === 'contact' ? (
          <ContactUs onSubmitLead={handleAddLead} />
        ) : currentPage === 'careers' ? (
          <Careers />
        ) : currentPage === 'reels' ? (
          <Reels trackEngagement={trackEngagement} />
        ) : currentPage === 'nri' ? (
          <NRIJourney onSubmitLead={handleAddLead} trackEngagement={trackEngagement} />
        ) : currentPage === 'compare' ? (
          <Comparison 
            comparisonList={comparisonList} 
            onRemoveFromCompare={handleRemoveFromCompare}
            onSelectProject={(id) => { setSelectedProjectId(id); setCurrentPage('project-details'); }}
            onEnquire={handleEnquireProperty}
            onBackToProjects={() => setCurrentPage('projects')}
          />
        ) : currentPage === 'blog' ? (
          <Blog 
            blogs={dynamicBlogs} 
            onSelectBlog={(id) => { setSelectedBlogId(id); setCurrentPage('blog-details'); }} 
          />
        ) : currentPage === 'blog-details' ? (
          <BlogDetails 
            blogId={selectedBlogId} 
            blogs={dynamicBlogs} 
            onBack={() => setCurrentPage('blog')} 
            onSelectBlog={(id) => setSelectedBlogId(id)} 
            onSubmitLead={handleAddLead}
          />
        ) : currentPage === 'projects' ? (
          <Projects 
            filters={filters} 
            setFilters={setFilters} 
            onSelectProject={(id) => { setSelectedProjectId(id); setCurrentPage('project-details'); }}
            onEnquire={handleEnquireProperty}
            trackEngagement={trackEngagement}
            comparisonList={comparisonList}
            onToggleCompare={handleToggleCompare}
            properties={propertiesList}
          />
        ) : currentPage === 'project-details' ? (
          <ProjectDetails 
            projectId={selectedProjectId} 
            onBack={() => setCurrentPage('projects')} 
            onEnquire={handleEnquireProperty}
            onSelectProject={(id) => setSelectedProjectId(id)}
            trackEngagement={trackEngagement}
            properties={propertiesList}
          />
        ) : (
          <>
            <Hero filters={filters} setFilters={setFilters} trackEngagement={trackEngagement} />
            <Stats />
            <CompanyIntro />
            <PropertyList 
              filters={filters} 
              onEnquire={handleEnquireProperty} 
              onSelectProject={(id) => { setSelectedProjectId(id); setCurrentPage('project-details'); }}
              comparisonList={comparisonList}
              onToggleCompare={handleToggleCompare}
              properties={propertiesList}
            />
            <MortgageCalculator trackEngagement={trackEngagement} />
            <Testimonials />
            <GoogleReviews />
            <BlogSection 
              blogs={dynamicBlogs}
              onSelectBlog={(id) => { setSelectedBlogId(id); setCurrentPage('blog-details'); }}
              onViewAll={() => setCurrentPage('blog')}
            />
          </>
        )}
      </main>
      <Footer 
        setCurrentPage={setCurrentPage} 
        onSelectProject={(id) => { setSelectedProjectId(id); setCurrentPage('project-details'); }}
      />
      
      {/* Global Marketing & Engagement Systems */}
      <ExitIntentPopup onSubmitLead={handleAddLead} trackEngagement={trackEngagement} />
      <AIWebsiteAssistant onSubmitLead={handleAddLead} trackEngagement={trackEngagement} properties={propertiesList} />
    </>
  );
}
