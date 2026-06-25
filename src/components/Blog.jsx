import React, { useState, useMemo } from 'react';
import { Search, Calendar, Tag, ArrowRight } from 'lucide-react';
import { allBlogs } from '../data/blogs';
import './Blog.css';

export default function Blog({ onSelectBlog, blogs = allBlogs }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Categories list
  const categories = useMemo(() => {
    const cats = new Set(blogs.map(b => b.category));
    return ['All', ...Array.from(cats)];
  }, [blogs]);

  // Filtered blogs based on search query and category
  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog => {
      const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
      const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            blog.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [blogs, searchQuery, selectedCategory]);

  return (
    <div className="blog-page">
      {/* Blog Hero/Header */}
      <section className="blog-hero">
        <div className="container">
          <div className="blog-hero-content">
            <span className="blog-hero-subtitle">Insights & Articles</span>
            <h1 className="blog-hero-title">Our Blog Directory</h1>
            <p className="blog-hero-desc">
              Stay updated with premium insights on Kerala architectural heritage, 
              local property market trends, home construction tips, and lifestyle guides.
            </p>
            
            {/* Search Box */}
            <div className="blog-search-wrapper">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search articles by keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="blog-search-input"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Listing Section */}
      <section className="blog-listing section">
        <div className="container">
          
          {/* Category Filter Pills */}
          <div className="blog-categories">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results Info */}
          <div className="blog-results-info">
            Showing {filteredBlogs.length} {filteredBlogs.length === 1 ? 'article' : 'articles'}
            {selectedCategory !== 'All' && <span> in <strong>{selectedCategory}</strong></span>}
            {searchQuery && <span> for "<strong>{searchQuery}</strong>"</span>}
          </div>

          {/* Blog Grid */}
          {filteredBlogs.length > 0 ? (
            <div className="blog-directory-grid">
              {filteredBlogs.map((blog) => (
                <article key={blog.id} className="blog-directory-card glass-card">
                  <div className="blog-card-img-wrapper" onClick={() => onSelectBlog(blog.id)}>
                    <img
                      src={`/assets/blog/${blog.img}`}
                      alt={blog.title}
                      className="blog-card-img"
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/assets/properties/featured.jpg'; // Fallback
                      }}
                    />
                    <div className="blog-card-category-badge">
                      <Tag size={12} style={{ marginRight: '4px' }} />
                      {blog.category}
                    </div>
                  </div>
                  <div className="blog-card-details">
                    <div className="blog-card-meta">
                      <span className="blog-card-date">
                        <Calendar size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                        {blog.date}
                      </span>
                    </div>
                    <h3 className="blog-card-heading" onClick={() => onSelectBlog(blog.id)}>
                      {blog.title}
                    </h3>
                    <p className="blog-card-summary">
                      {blog.summary}
                    </p>
                    <button onClick={() => onSelectBlog(blog.id)} className="blog-card-btn">
                      Read Article <ArrowRight size={14} style={{ marginLeft: '6px' }} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="blog-empty-state">
              <h3>No articles found</h3>
              <p>We couldn't find any blog posts matching your search criteria. Try a different keyword or category.</p>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
              >
                Reset Filters
              </button>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
