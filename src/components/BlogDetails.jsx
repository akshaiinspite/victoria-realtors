import React, { useState } from 'react';
import { ArrowLeft, Calendar, Tag, User, Send } from 'lucide-react';
import { allBlogs } from '../data/blogs';
import './BlogDetails.css';

export default function BlogDetails({ blogId, onBack, onSelectBlog, blogs = allBlogs, onSubmitLead }) {
  const blog = blogs.find(b => b.id === blogId);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `Hi, I read your blog article "${blog?.title}" and I am interested in learning more about your property listings.`
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!blog) {
    return (
      <div className="blog-details-error container section">
        <h2>Article Not Found</h2>
        <p>We couldn't locate the blog post you are looking for.</p>
        <button onClick={onBack} className="btn btn-primary">
          <ArrowLeft size={16} style={{ marginRight: '8px' }} /> Return to Directory
        </button>
      </div>
    );
  }

  const relatedBlogs = blogs.filter(b => b.id !== blog.id).slice(0, 4);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (onSubmitLead) {
      onSubmitLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: 'Not Specified',
        message: formData.message,
        source: `Blog Inquiry: ${blog.title}`
      });
    }

    setIsSubmitted(true);
    // Reset form after a delay
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: `Hi, I read your blog article "${blog.title}" and I am interested in learning more about your property listings.`
      });
    }, 4000);
  };

  return (
    <article className="blog-details-page">
      {/* Editorial Header */}
      <header className="blog-details-header">
        <div className="container">
          <button onClick={onBack} className="blog-back-btn">
            <ArrowLeft size={16} /> Back to Directory
          </button>
          
          <div className="blog-header-meta">
            <span className="blog-meta-item">
              <Calendar size={14} />
              {blog.date}
            </span>
            <span className="blog-meta-item">
              <Tag size={14} />
              {blog.category}
            </span>
            <span className="blog-meta-item">
              <User size={14} />
              By Victoria Realtors
            </span>
          </div>

          <h1 className="blog-details-title">{blog.title}</h1>
        </div>
      </header>

      {/* Featured Banner Image */}
      <div className="blog-details-banner-container">
        <div className="container">
          <div className="blog-details-banner-wrapper">
            <img 
              src={`/assets/blog/${blog.img}`} 
              alt={blog.title} 
              className="blog-details-banner-img"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/assets/properties/featured.jpg'; // Fallback
              }}
            />
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="blog-details-body section">
        <div className="container blog-details-layout">
          {/* Article Text Content */}
          <main className="blog-main-content">
            <div className="blog-article-text">
              {blog.content.map((paragraph, index) => {
                // Style first letter of first paragraph as a drop-cap
                if (index === 0) {
                  return (
                    <p key={index} className="blog-p first-paragraph">
                      <span className="drop-cap">{paragraph.charAt(0)}</span>
                      {paragraph.slice(1)}
                    </p>
                  );
                }
                return (
                  <p key={index} className="blog-p">
                    {paragraph}
                  </p>
                );
              })}
            </div>
            
            {/* Disclaimer & Sharing */}
            <div className="blog-article-footer">
              <div className="blog-tag-box">
                <strong>Tags:</strong>
                <span>{blog.category}</span>
                <span>Kerala Real Estate</span>
                <span>Victoria Realtors</span>
              </div>
            </div>
          </main>

          {/* Sidebar */}
          <aside className="blog-sidebar">
            {/* Lead Capture Form */}
            <div className="sidebar-widget widget-form glass-card">
              <h3>Quick Property Inquiry</h3>
              <p>Interested in purchasing traditional villas, heritage homes, or modern apartments? Leave your details below.</p>
              
              {isSubmitted ? (
                <div className="sidebar-success-message">
                  <div className="success-icon">✓</div>
                  <h4>Thank You!</h4>
                  <p>Your message has been sent. Our team will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="sidebar-inquiry-form">
                  <div className="form-group">
                    <label htmlFor="name">Your Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="name@example.com"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +91 98765 43210"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="3"
                      value={formData.message}
                      onChange={handleInputChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block sidebar-submit-btn">
                    Submit Inquiry <Send size={14} style={{ marginLeft: '8px' }} />
                  </button>
                </form>
              )}
            </div>

            {/* Recent Posts widget */}
            <div className="sidebar-widget widget-recent glass-card">
              <h3>Recent Articles</h3>
              <div className="widget-recent-list">
                {relatedBlogs.map((rBlog) => (
                  <div key={rBlog.id} className="recent-post-item" onClick={() => onSelectBlog(rBlog.id)}>
                    <img 
                      src={`/assets/blog/${rBlog.img}`} 
                      alt={rBlog.title} 
                      className="recent-post-thumb"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/assets/properties/featured.jpg'; // Fallback
                      }}
                    />
                    <div className="recent-post-info">
                      <span className="recent-post-date">{rBlog.date}</span>
                      <h4>{rBlog.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
