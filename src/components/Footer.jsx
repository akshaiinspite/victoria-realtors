import React from 'react';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { getPropertyByName } from '../data/properties';

export default function Footer({ setCurrentPage, onSelectProject }) {
  const quickLinks = [
    { name: 'About Us', path: '#about' },
    { name: 'Testimonials', path: 'https://victoriarealtors.in/testimonials/' },
    { name: 'Blog', path: '#blog' },
    { name: 'Privacy Policy', path: 'https://victoriarealtors.in/privacy-policy/' },
    { name: 'Contact', path: '#contact' }
  ];

  const palakkadVillas = [
    { name: 'Victoria Nayanam', path: 'https://victoriarealtors.in/victoria-nayanam/' },
    { name: 'Victoria Madhavam', path: 'https://victoriarealtors.in/victoria-madhavam/' },
    { name: 'Victoria Shisiram', path: 'https://victoriarealtors.in/victoria-shisiram/' },
    { name: 'Victoria Sangeetham', path: 'https://victoriarealtors.in/projects/villas-in-palakkad/victoria-sangeetham/' },
    { name: 'Victoria Prarthana', path: 'https://victoriarealtors.in/villas-in-pudur/' },
    { name: 'Chaithram Villas', path: 'https://victoriarealtors.in/villas-in-mundur/' },
    { name: 'Victoria Naadam', path: 'https://victoriarealtors.in/projects/villas-in-palakkad/victoria-naadam/' },
    { name: 'Victoria Spandhanam', path: 'https://victoriarealtors.in/victoria-spandhanam/' }
  ];

  const thrissurVillas = [
    { name: 'Victoria Swaram', path: 'https://victoriarealtors.in/victoria-swaram/' },
    { name: 'Victoria Tanima', path: 'https://victoriarealtors.in/victoria-tanima/' },
    { name: 'Vrinthavan Villas', path: 'https://victoriarealtors.in/vrinthavan-villas/' },
    { name: 'Victoria Vandhanam', path: 'https://victoriarealtors.in/victoria-vandhanam/' }
  ];

  const ottapalamVillas = [
    { name: 'Sayoojyam Villas', path: 'https://victoriarealtors.in/independent-house-at-ottapalam/' },
    { name: 'Victoria Ashirvaad', path: 'https://victoriarealtors.in/victoria-ashirvaad/' },
    { name: 'Geetham Villas', path: 'https://victoriarealtors.in/house-for-sale-in-ottapalam/' },
    { name: 'The Greens Villas', path: 'https://victoriarealtors.in/greens-villas/' },
    { name: 'Victoria Samrruddhi', path: 'https://victoriarealtors.in/victoria-samrruddhi/' }
  ];

  const supportLinks = [
    { name: 'NRI FAQ', path: 'https://victoriarealtors.in/faq' },
    { name: 'EMI Calculator', path: 'https://victoriarealtors.in/emi-calculator/' },
    { name: 'Unit Converter', path: 'https://victoriarealtors.in/unit-converter/' },
    { name: 'Bank Loan Eligibility Checker', path: 'https://victoriarealtors.in/loan-eligibility/' },
    { name: 'Banking Partners', path: 'https://victoriarealtors.in/banking-partners/' },
    { name: 'Refund policy', path: 'https://victoriarealtors.in/refund-policy/' }
  ];

  return (
    <footer className="footer animate-fade-in">
      <div className="container">
        {/* Main Footer Links */}
        <div className="footer-grid">
          
          {/* Brand Info */}
          <div className="footer-brand">
            <img 
              src="/assets/logo/logo_footer.png" 
              alt="Victoria Realtors Logo" 
              className="footer-brand-logo"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                if (setCurrentPage) {
                  setCurrentPage('home');
                  window.scrollTo(0, 0);
                }
              }}
            />
            <p>
              Having entered the real estate sector over two decades ago, Victoria Realtors has redefined the market and continues to deliver state-of-the-art villa projects in Kerala and Tamil Nadu.
            </p>
            <div className="footer-contact-info" style={{ marginTop: '1rem' }}>
              <div className="footer-contact-item">
                <Mail size={16} className="footer-contact-icon" />
                <div className="footer-contact-text">
                  <a href="mailto:Victoriasooraj@gmail.com">Victoriasooraj@gmail.com</a>
                </div>
              </div>
              <div className="footer-contact-item">
                <Phone size={16} className="footer-contact-icon" />
                <div className="footer-contact-text">
                  <a href="tel:+917907878203">+91 79078 78203</a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links & Support */}
          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.path}
                    onClick={(e) => {
                      if ((link.name === 'About Us' || link.name === 'Contact' || link.name === 'Blog') && setCurrentPage) {
                        e.preventDefault();
                        setCurrentPage(
                          link.name === 'About Us' ? 'about' :
                          link.name === 'Blog' ? 'blog' : 'contact'
                        );
                        window.scrollTo(0, 0);
                      }
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <h3 style={{ marginTop: '2rem' }}>Utilities</h3>
            <ul className="footer-links">
              {supportLinks.map((link, idx) => (
                <li key={idx}><a href={link.path}>{link.name}</a></li>
              ))}
            </ul>
          </div>

          {/* Villas by Location */}
          <div className="footer-col">
            <h3>Villas in Palakkad</h3>
            <ul className="footer-links">
              {palakkadVillas.map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.path}
                    onClick={(e) => {
                      if (onSelectProject) {
                        const prop = getPropertyByName(link.name);
                        if (prop) {
                          e.preventDefault();
                          onSelectProject(prop.id);
                          window.scrollTo(0, 0);
                        }
                      }
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Other Locations */}
          <div className="footer-col">
            <h3>Villas in Thrissur</h3>
            <ul className="footer-links" style={{ marginBottom: '2rem' }}>
              {thrissurVillas.map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.path}
                    onClick={(e) => {
                      if (onSelectProject) {
                        const prop = getPropertyByName(link.name);
                        if (prop) {
                          e.preventDefault();
                          onSelectProject(prop.id);
                          window.scrollTo(0, 0);
                        }
                      }
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <h3>Villas in Ottapalam</h3>
            <ul className="footer-links">
              {ottapalamVillas.map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.path}
                    onClick={(e) => {
                      if (onSelectProject) {
                        const prop = getPropertyByName(link.name);
                        if (prop) {
                          e.preventDefault();
                          onSelectProject(prop.id);
                          window.scrollTo(0, 0);
                        }
                      }
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Disclaimer / Terms & Conditions */}
        <div className="footer-disclaimer">
          <p>
            <strong>Disclaimer:</strong> While enough care is taken by the firm to ensure that information on the website is up to date, accurate and correct, viewers of this website confirms that the information including brochures and marketing materials are solely for informational purposes and the viewer should not rely on this information for making any booking/purchase in any of the projects of the firm. Nothing on this website constitutes advertising, marketing, selling or an offer for sale or invitation to purchase a unit in any projects by the firm. Viewers are requested to make their independent enquiry before relying upon the same. Any action you take upon the information on the website is strictly at your own risk, and the firm or its associated entities/companies will not be liable for any consequences of any action taken by the viewers relying on such material/information by viewing the website or its content.
          </p>
          <p>
            The firm reserves the right to add, alter or delete any material from the website at any time and may, at any time, revise these terms, change design & specifications, without prior notice or as may be required under applicable laws including RERA, and all other approvals & permissions. Computer generated images, rendered images, floor plans, etc. represent artistic impressions only. Plans, specifications mentioned in the buyer-seller agreements are final and supersede the contents/information herein. Any viewer of any information or material from this website may avail the same entirely at their own risk as to costs and consequences thereof.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div>
            &copy; {new Date().getFullYear()} <a href="https://victoriarealtors.in" style={{ color: 'var(--text-primary)' }}>Victoria Realtors</a>. All Rights Reserved.
          </div>
          <div className="footer-bottom-links">
            <span>Powered by <a href="https://www.webdura.in/" target="_blank" rel="noreferrer" className="developer-link">Webdura Technologies <ExternalLink size={12} style={{ display: 'inline', marginLeft: '2px' }} /></a></span>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/917907878203?text=Hi%2C+I+would+like+to+know+more+about+your+projects." 
        className="whatsapp-float" 
        target="_blank" 
        rel="noreferrer"
        aria-label="Contact us on WhatsApp"
      >
        <img 
          src="/assets/logo/whatsapp-logo-variant.png" 
          alt="WhatsApp Logo" 
          className="whatsapp-icon"
        />
      </a>
    </footer>
  );
}
