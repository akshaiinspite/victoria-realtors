import React from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { allBlogs } from '../data/blogs';

export default function BlogSection({ onSelectBlog, onViewAll, blogs = allBlogs }) {
  // Get top 3 latest blogs
  const latestBlogs = blogs.slice(0, 3);

  return (
    <section id="blog" className="section" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        <div className="section-header">
          <span>Insights & Updates</span>
          <h2>Our Latest Blogs</h2>
          <p>Read articles on traditional Kerala Nalukettu villas, architecture heritage, and regional real estate market updates.</p>
        </div>

        <div className="blog-grid">
          {latestBlogs.map((blog) => (
            <article key={blog.id} className="blog-card glass-card">
              <div className="blog-img-wrapper" onClick={() => onSelectBlog(blog.id)} style={{ cursor: 'pointer' }}>
                <img 
                  src={`/assets/blog/${blog.img}`} 
                  alt={blog.title} 
                  className="blog-img"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/assets/properties/featured.jpg'; // Fallback
                  }}
                />
              </div>
              <div className="blog-content">
                <span className="blog-date">{blog.date}</span>
                <h3 className="blog-card-title" onClick={() => onSelectBlog(blog.id)} style={{ cursor: 'pointer' }}>
                  {blog.title}
                </h3>
                <button 
                  onClick={() => onSelectBlog(blog.id)} 
                  className="blog-readmore" 
                  style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                >
                  Read Article <ArrowRight size={14} />
                </button>
              </div>
            </article>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <button 
            onClick={onViewAll} 
            className="btn btn-secondary" 
            style={{ display: 'inline-flex', gap: '0.5rem', alignItems: 'center', border: 'none', cursor: 'pointer' }}
          >
            <BookOpen size={16} /> View All Blogs
          </button>
        </div>
      </div>
    </section>
  );
}
