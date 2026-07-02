import React, { useState, useEffect } from 'react';
import { Mail, Phone, Menu, X, ChevronDown, MapPin } from 'lucide-react';

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
);

const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
);

const PinterestIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.42 7.62 11.16-.1-.95-.2-2.4.04-3.44.22-.94 1.4-5.9 1.4-5.9s-.35-.7-.35-1.74c0-1.63.95-2.85 2.13-2.85 1 0 1.49.75 1.49 1.65 0 1.01-.64 2.52-.97 3.92-.28 1.17.58 2.12 1.73 2.12 2.08 0 3.67-2.19 3.67-5.36 0-2.8-2.01-4.76-4.89-4.76-3.33 0-5.29 2.5-5.29 5.09 0 1 .39 2.08.88 2.68.1.12.11.23.08.35-.09.37-.29 1.18-.33 1.34-.05.22-.17.27-.4.16-1.5-.7-2.44-2.88-2.44-4.63 0-3.77 2.74-7.23 7.9-7.23 4.14 0 7.36 2.95 7.36 6.89 0 4.12-2.6 7.43-6.2 7.43-1.21 0-2.35-.63-2.74-1.37l-.75 2.85c-.27 1.04-1 2.35-1.49 3.16C9.04 23.75 10.48 24 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z"/></svg>
);

const TelegramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0C5.344 0 0 5.344 0 12c0 6.656 5.344 12 11.944 12 6.656 0 12-5.344 12-12 0-6.656-5.344-12-12-12zm5.82 8.358l-1.956 9.225c-.146.653-.532.814-1.077.508l-2.985-2.201-1.44 1.386c-.16.16-.293.293-.6.293l.213-3.033 5.518-4.98c.24-.213-.053-.333-.373-.12l-6.825 4.298-2.94-.919c-.64-.2-.653-.64.133-.946l11.492-4.43c.533-.2.998.12.89.919z"/></svg>
);

const WhatsappIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.248 5.308 0 11.766 0c3.13 0 6.073 1.218 8.285 3.43 2.21 2.21 3.425 5.15 3.423 8.279-.005 6.463-5.253 11.71-11.71 11.71-2.01-.002-3.987-.517-5.744-1.497L0 24zm6.49-4.321c1.654.982 3.284 1.498 4.965 1.503 5.183 0 9.402-4.21 9.404-9.393.001-2.511-.976-4.87-2.753-6.647C16.386 3.364 14.032 2.385 11.53 2.385c-5.185 0-9.405 4.21-9.407 9.395-.001 1.792.474 3.542 1.382 5.093l-.973 3.55 3.63-.951.386.229c1.558.924 3.037 1.378 4.499 1.378zm9.524-7.291c-.27-.135-1.597-.788-1.845-.878-.247-.09-.427-.135-.607.135-.18.27-.697.878-.854 1.058-.158.18-.315.202-.585.067-.27-.135-1.14-.42-2.172-1.34-1.03-.92-1.724-2.056-1.768-2.146-.045-.09-.047-.139-.06-.178-.014-.038-.027-.089-.04-.139s-.044-.112-.067-.157c-.023-.045-.067-.09-.112-.135-.045-.045-.09-.09-.135-.135-.09-.09-.135-.18-.18-.315s-.023-.247.045-.382c.068-.135.607-.675.764-.81.157-.135.247-.202.337-.36.09-.158.045-.315-.022-.45-.068-.135-.607-1.463-.832-2.003-.22-.53-.46-.45-.63-.45-.162 0-.348-.02-.535-.02-.187 0-.49.07-.747.348-.257.278-.983.96-.983 2.34s1.002 2.72 1.14 2.91c.138.19 1.972 3.01 4.777 4.22.667.288 1.189.46 1.597.59.67.213 1.278.183 1.76.111.537-.08 1.597-.653 1.822-1.283.225-.63.225-1.17.157-1.283-.067-.113-.247-.18-.517-.315z"/></svg>
);

export default function Navbar({ currentPage, setCurrentPage, setFilters, comparisonList = [] }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '#' },
    { name: 'About', path: '#about' },
    { name: 'Projects', path: '#projects' },
    // { name: `Compare (${comparisonList.length})`, path: '#compare' },
    { name: 'Reels', path: '#reels' },
    // { name: 'NRI Investment', path: '#nri' },
    { name: 'Careers', path: '#careers' },
    // { name: 'Blog', path: '#blog' },
    { name: 'Contact', path: '#contact' }
  ];

  return (
    <>
      {/* Top Contact Bar */}
      <div className="topbar">
        <div className="container topbar-container">
          <div className="topbar-info">
            <span className="topbar-item">
              <MapPin size={14} className="text-primary" />
              <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>Victoria Realtors, Palakkad</span>
            </span>
            <span className="topbar-item">
              <Mail size={14} className="text-primary" />
              <a href="mailto:Victoriasooraj@gmail.com">Victoriasooraj@gmail.com</a>
            </span>
            <span className="topbar-item">
              <Phone size={14} className="text-primary" />
              <a href="tel:+917907878203">+91 79078 78203</a>
            </span>
          </div>
          <div className="topbar-social">
            <a href="https://www.facebook.com/VictoriaDevelopers/" target="_blank" rel="noreferrer" className="topbar-social-link fb" title="Facebook"><FacebookIcon /></a>
            <a href="https://www.instagram.com/victoriarealtors/" target="_blank" rel="noreferrer" className="topbar-social-link ig" title="Instagram"><InstagramIcon /></a>
            <a href="https://twitter.com/VictoriaRealto5" target="_blank" rel="noreferrer" className="topbar-social-link tw" title="Twitter/X"><TwitterIcon /></a>
            <a href="https://www.youtube.com/channel/UCRZOMvcLoaUOiAygHR-mMXQ" target="_blank" rel="noreferrer" className="topbar-social-link yt" title="YouTube"><YoutubeIcon /></a>
            <a href="https://www.linkedin.com/in/victoriarealtors/" target="_blank" rel="noreferrer" className="topbar-social-link ln" title="LinkedIn"><LinkedinIcon /></a>
            <a href="https://in.pinterest.com/victoriadevelopers/boards/" target="_blank" rel="noreferrer" className="topbar-social-link pin" title="Pinterest"><PinterestIcon /></a>
            <a href="https://t.me/Vrpkd" target="_blank" rel="noreferrer" className="topbar-social-link tg" title="Telegram"><TelegramIcon /></a>
            <a href="https://wa.me/917907878203" target="_blank" rel="noreferrer" className="topbar-social-link wa" title="WhatsApp"><WhatsappIcon /></a>
          </div>
        </div>
      </div>

      {/* Main Header / Navigation */}
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container header-container">
          <a 
            href="#" 
            className="logo-link"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage('home');
            }}
          >
            <img 
              src="/assets/logo/logo.png" 
              alt="Victoria Realtors Logo" 
              className="logo-img"
            />
          </a>

          {/* Navigation Links */}
          <nav>
            <ul className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
              {navLinks.map((link) => (
                <li 
                  key={link.name} 
                  className={`nav-item ${link.dropdown ? 'nav-item-dropdown' : ''}`}
                  onMouseEnter={() => link.dropdown && setIsDropdownOpen(true)}
                  onMouseLeave={() => link.dropdown && setIsDropdownOpen(false)}
                >
                  {link.dropdown ? (
                    <>
                      <a 
                        href={link.path} 
                        className={`nav-link ${currentPage === 'projects' || currentPage === 'project-details' ? 'active' : ''}`}
                        onClick={(e) => {
                          e.preventDefault();
                          setIsDropdownOpen(!isDropdownOpen);
                          setCurrentPage('projects');
                          if (setFilters) {
                            setFilters(prev => ({ ...prev, location: '' }));
                          }
                        }}
                      >
                        {link.name} <ChevronDown size={14} style={{ display: 'inline', marginLeft: '2px' }} />
                      </a>
                      <ul className={`dropdown-menu ${isDropdownOpen ? 'open' : ''}`}>
                        {link.dropdown.map((sublink) => (
                          <li key={sublink.name}>
                            <a 
                               href={sublink.path} 
                               className="dropdown-link"
                               onClick={(e) => {
                                 e.preventDefault();
                                 setIsMobileMenuOpen(false);
                                 setIsDropdownOpen(false);
                                 setCurrentPage('projects');
                                 if (setFilters) {
                                   setFilters(prev => ({ ...prev, location: sublink.name }));
                                 }
                               }}
                            >
                              {sublink.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <a 
                      href={link.path} 
                      className={`nav-link ${
                        (link.name === 'Home' && currentPage === 'home') || 
                        (link.name === 'About' && currentPage === 'about') ||
                        (link.name === 'Projects' && (currentPage === 'projects' || currentPage === 'project-details')) ||
                        (link.name === 'Careers' && currentPage === 'careers') ||
                        (link.name === 'Reels' && currentPage === 'reels') ||
                        (link.name === 'NRI Investment' && currentPage === 'nri') ||
                        (link.name === 'Lead Manager' && currentPage === 'admin') ||
                        (link.name.startsWith('Compare') && currentPage === 'compare') ||
                        (link.name === 'Blog' && (currentPage === 'blog' || currentPage === 'blog-details')) ||
                        (link.name === 'Contact' && currentPage === 'contact') ? 'active' : ''
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMobileMenuOpen(false);
                        setCurrentPage(
                          link.name === 'Home' ? 'home' : 
                          link.name === 'About' ? 'about' : 
                          link.name === 'Projects' ? 'projects' : 
                          link.name === 'Careers' ? 'careers' : 
                          link.name === 'Reels' ? 'reels' : 
                          link.name === 'NRI Investment' ? 'nri' : 
                          link.name === 'Lead Manager' ? 'admin' : 
                          link.name.startsWith('Compare') ? 'compare' :
                          link.name === 'Blog' ? 'blog' : 'contact'
                        );
                      }}
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
              <li className="mobile-only" style={{ marginTop: '2rem', display: isMobileMenuOpen ? 'block' : 'none' }}>
                <a 
                  href="#contact" 
                  className="btn btn-primary" 
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    setCurrentPage('contact');
                  }}
                >
                  Enquire Now
                </a>
              </li>
            </ul>
          </nav>

          {/* Call To Action */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <a 
              href="#contact" 
              className="btn btn-primary btn-sm desktop-only" 
              style={{ display: 'inline-flex', padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage('contact');
              }}
            >
              Schedule Tour
            </a>
            <button 
              className="hamburger" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
