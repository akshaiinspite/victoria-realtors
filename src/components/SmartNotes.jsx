import { useState, useEffect } from 'react';
import { Users, FileText, Bell, Clock, Search, Edit3, Trash2, Sparkles, Send, CheckCircle, BarChart2, Terminal, Home, Plus, LogOut } from 'lucide-react';
import { subscribeToTrackingLogs } from '../utils/tracking';
import './SmartNotes.css';

export default function SmartNotes({ leads, setLeads, setBlogs, properties = [], setProperties, onAddProperty, onBackToHome }) {
  // Authentication Gate State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Property Form State
  const [propName, setPropName] = useState('');
  const [propLocation, setPropLocation] = useState('Palakkad');
  const [propType, setPropType] = useState('villa');
  const [propPrice, setPropPrice] = useState('');
  const [propPriceText, setPropPriceText] = useState('');
  const [propArea, setPropArea] = useState('');
  const [propStatus, setPropStatus] = useState('active');
  const [propImg, setPropImg] = useState('featured.jpg');
  
  // Available preset gallery images
  const presetImages = [
    { label: 'Nayanam / Standard Villa', value: 'featured.jpg' },
    { label: 'Pranavam / Premium Villa', value: 'Pranavam-Gallery-4-min-486x258.jpg' },
    { label: 'Samrruddhi / Gated Villa', value: 'sammruthi-1263-710-486x273.jpg' },
    { label: 'Sarovaram / Waterfront Villa', value: 'WhatsApp-Image-2024-06-21-at-16.38.21-1-486x273.jpg' },
    { label: 'Anandham / Luxury Villa', value: 'Screenshot-2026-06-20-170546-486x264.png' },
    { label: 'Punyam / Gated Villa II', value: 'punyam.jpg' },
    { label: 'Aristos / Apartment Complex', value: 'fusion-40003-486x318.jpg' },
    { label: 'Richdale / Apartment Complex II', value: 'Saidhaan-Richdale-apartments-in-coimbatore-486x258.png' }
  ];

  const [activeTab, setActiveTab] = useState('leads'); // 'overview', 'leads', 'blogger', 'properties', or 'analytics'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  
  // New Note state
  const [newNoteText, setNewNoteText] = useState('');
  const [reminderDate, setReminderDate] = useState('');

  // AI Blogger state
  const [blogPrompt, setBlogPrompt] = useState('');
  const [blogCategory, setBlogCategory] = useState('Real Estate Trends');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedBlog, setGeneratedBlog] = useState(null);
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('');

  // Live Server-Side Tracking Logs
  const [trackingLogs, setTrackingLogs] = useState([
    {
      id: "evt_init_99",
      timestamp: "2026-06-24T06:00:00.000Z",
      eventName: "page_view",
      ga4: { client_id: "cid_12345", events: [{ name: "page_view", params: { session_id: "sid_98765" } }] },
      meta: { data: [{ event_name: "PageView", event_source_url: typeof window !== 'undefined' ? window.location.href : '' }] }
    }
  ]);

  useEffect(() => {
    const unsubscribe = subscribeToTrackingLogs((log) => {
      setTrackingLogs(prev => [log, ...prev].slice(0, 15));
    });
    return unsubscribe;
  }, []);

  // Stats calculation
  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'New').length;
  const inProgressLeads = leads.filter(l => l.status === 'In Progress').length;
  const closedLeads = leads.filter(l => l.status === 'Closed').length;

  // Filtered leads
  const filteredLeads = leads.filter(lead => {
    const q = searchQuery.toLowerCase();
    return (
      lead.name.toLowerCase().includes(q) ||
      lead.email.toLowerCase().includes(q) ||
      lead.phone.toLowerCase().includes(q) ||
      lead.location.toLowerCase().includes(q) ||
      lead.source.toLowerCase().includes(q)
    );
  });

  const selectedLead = leads.find(l => l.id === selectedLeadId);

  const adminMenuItems = [
    { id: 'overview', label: 'Overview', icon: BarChart2 },
    { id: 'leads', label: 'Leads', icon: Users },
    { id: 'blogger', label: 'AI Blogger', icon: Sparkles },
    { id: 'properties', label: 'Properties', icon: Home },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 }
  ];

  // Update lead status
  const handleStatusChange = (leadId, newStatus) => {
    setLeads(prev => prev.map(lead => {
      if (lead.id === leadId) {
        // Add note log on status change
        const statusLog = {
          date: new Date().toISOString(),
          text: `Status changed to: ${newStatus}`
        };
        return {
          ...lead,
          status: newStatus,
          notes: [statusLog, ...lead.notes]
        };
      }
      return lead;
    }));
  };

  // Add Remark/Note
  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    setLeads(prev => prev.map(lead => {
      if (lead.id === selectedLeadId) {
        const updatedNotes = [
          { date: new Date().toISOString(), text: newNoteText },
          ...lead.notes
        ];
        return {
          ...lead,
          notes: updatedNotes
        };
      }
      return lead;
    }));
    setNewNoteText('');
  };

  // Set Reminder
  const handleSetReminder = (e) => {
    e.preventDefault();
    if (!reminderDate) return;

    setLeads(prev => prev.map(lead => {
      if (lead.id === selectedLeadId) {
        const updatedNotes = [
          { date: new Date().toISOString(), text: `Follow-up reminder scheduled for ${reminderDate.replace('T', ' ')}` },
          ...lead.notes
        ];
        return {
          ...lead,
          reminder: reminderDate,
          notes: updatedNotes
        };
      }
      return lead;
    }));
    setReminderDate('');
  };

  // Delete Lead
  const handleDeleteLead = (leadId) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      setLeads(prev => prev.filter(l => l.id !== leadId));
      if (selectedLeadId === leadId) {
        setSelectedLeadId(null);
      }
    }
  };

  // Simulated AI Writer
  const handleGenerateBlog = (e) => {
    e.preventDefault();
    if (!blogPrompt.trim()) return;

    setIsGenerating(true);
    setGeneratedBlog(null);

    // Simulate generation delay
    setTimeout(() => {
      const generatedId = blogPrompt.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const dateStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-');
      
      const newPost = {
        id: generatedId || 'generated-ai-blog',
        title: blogPrompt.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        date: dateStr,
        img: 'nalukettu-house-for-sale-in-ottapalam-2.png', // Default premium thumbnail
        category: blogCategory,
        summary: `An AI-optimized article researching "${blogPrompt}". This post dives into core local insights, structural benefits, pricing details, and location accessibility indicators for premium properties in Kerala.`,
        content: [
          `Discovering the perfect property is a key milestone, and focusing on "${blogPrompt}" provides a robust framework for understanding the evolving real estate trends in God's Own Country. Victoria Realtors is committed to developing modern living spaces that seamlessly blend traditional values with contemporary requirements.`,
          `When analyzing the technical requirements and architecture, Kerala's traditional architecture provides organic climate control and ventilation. Our new gated communities feature solar panels, rainwater harvesting, smart security layouts, and proximity to major commercial, transit, and education hubs.`,
          `Whether you are looking to purchase a retirement sanctuary, investment asset, or primary home, staying updated with professional market data is essential. Reach out to Victoria Realtors today to schedule a project site tour and review custom financial planning and home loan support.`
        ]
      };

      setGeneratedBlog(newPost);
      setIsGenerating(false);
    }, 2500);
  };

  // Publish / Schedule Blog
  const handlePublishBlog = () => {
    if (!generatedBlog) return;

    const blogToPublish = {
      ...generatedBlog,
      date: isScheduled && scheduledDate ? new Date(scheduledDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-') : generatedBlog.date
    };

    setBlogs(prev => [blogToPublish, ...prev]);
    alert(isScheduled ? `Blog successfully scheduled for ${scheduledDate}!` : 'AI Blog successfully published directly to the Blog page!');
    setBlogPrompt('');
    setGeneratedBlog(null);
    setIsScheduled(false);
  };

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (email.trim() === 'admin@victoriarealtors.in' && password === 'admin') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid email or password. Please try again.');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
  };

  // Handle Dynamic Property Addition
  const handlePropertySubmit = (e) => {
    e.preventDefault();
    if (!propName.trim() || !propPrice || !propArea.trim()) {
      alert('Please fill out all required fields.');
      return;
    }
    const newProp = {
      id: `p_new_${Date.now()}`,
      name: propName,
      location: propLocation,
      type: propType,
      price: parseFloat(propPrice),
      minPriceVal: parseFloat(propPrice),
      priceText: propPriceText || `${propPrice} Lakhs Onwards`,
      area: propArea,
      status: propStatus,
      img: propImg
    };
    if (onAddProperty) {
      onAddProperty(newProp);
    } else if (setProperties) {
      setProperties(prev => [newProp, ...prev]);
    }
    alert(`Successfully added "${propName}" as a new building project!`);
    // Reset Form
    setPropName('');
    setPropPrice('');
    setPropPriceText('');
    setPropArea('');
  };

  // Handle Delete Property
  const handleDeleteProperty = (id, name) => {
    if (window.confirm(`Are you sure you want to delete project "${name}"?`)) {
      if (setProperties) {
        setProperties(prev => prev.filter(p => p.id !== id));
      }
    }
  };

  // Handle Toggle Property Status
  const handleTogglePropertyStatus = (id) => {
    if (setProperties) {
      setProperties(prev => prev.map(p => {
        if (p.id === id) {
          return { ...p, status: p.status === 'active' ? 'sold' : 'active' };
        }
        return p;
      }));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login-page animate-fade-in">
        <div className="admin-login-card glass-card">
          <div className="admin-login-header">
            <img src="/assets/logo/logo.png" alt="Victoria Realtors" className="admin-login-logo" />
            <h2 className="admin-login-title">Admin Portal Sign In</h2>
            <p className="admin-login-subtitle">Access your Lead CRM and Property Management dashboard</p>
          </div>
          
          <form onSubmit={handleLogin} className="admin-login-form">
            {loginError && <div className="login-error-alert">{loginError}</div>}
            
            <div className="form-group-login">
              <label htmlFor="login-email">Email Address</label>
              <input 
                id="login-email"
                type="email" 
                placeholder="admin@victoriarealtors.in" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group-login">
              <label htmlFor="login-password">Password</label>
              <input 
                id="login-password"
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button type="submit" className="btn btn-primary btn-login">
              Sign In to Dashboard
            </button>
            <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>
              Demo Access: <strong>admin@victoriarealtors.in</strong> / <strong>admin</strong>
            </div>
            {onBackToHome && (
              <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
                <button 
                  type="button" 
                  onClick={onBackToHome} 
                  style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600', textDecoration: 'underline' }}
                >
                  Back to Public Website
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-page">
      <div className="admin-shell">
        <aside className="admin-sidebar">
          <div className="admin-sidebar-brand">
            <img src="/assets/logo/logo.png" alt="Victoria Realtors" className="admin-dashboard-logo" />
            <div>
              <h3>Admin Hub</h3>
              <p>Management Console</p>
            </div>
          </div>

          <nav className="admin-sidebar-nav">
            {adminMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  className={`admin-sidebar-link ${activeTab === item.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="admin-sidebar-footer">
            <button onClick={handleLogout} className="btn btn-secondary btn-logout">
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </aside>

        <div className="admin-main-panel">
          <div className="admin-hero container">
            <div className="admin-hero-header-flex">
              <div>
                <span className="admin-subtitle font-accent">Victoria Realtors Administration</span>
                <h2 className="admin-title">Business Growth Dashboard</h2>
              </div>
            </div>
          </div>

          <div className="admin-layout container">
            {activeTab === 'overview' ? (
              <div className="overview-panel">
                <div className="stats-row">
                  <div className="stat-card glass-card">
                    <Users className="stat-icon" size={24} />
                    <div className="stat-info">
                      <h4>Total Leads</h4>
                      <p>{totalLeads}</p>
                    </div>
                  </div>
                  <div className="stat-card glass-card warning">
                    <Clock className="stat-icon" size={24} />
                    <div className="stat-info">
                      <h4>New Leads</h4>
                      <p>{newLeads}</p>
                    </div>
                  </div>
                  <div className="stat-card glass-card info">
                    <Edit3 className="stat-icon" size={24} />
                    <div className="stat-info">
                      <h4>In Progress</h4>
                      <p>{inProgressLeads}</p>
                    </div>
                  </div>
                  <div className="stat-card glass-card success">
                    <CheckCircle className="stat-icon" size={24} />
                    <div className="stat-info">
                      <h4>Closed Deals</h4>
                      <p>{closedLeads}</p>
                    </div>
                  </div>
                </div>

                <div className="overview-grid">
                  <div className="glass-card overview-card">
                    <h3>Quick Actions</h3>
                    <p>Use the sidebar to jump into leads, content, property updates, or live analytics.</p>
                    <button className="btn btn-primary" onClick={() => setActiveTab('leads')}>Open Lead Manager</button>
                  </div>
                  <div className="glass-card overview-card">
                    <h3>Live Status</h3>
                    <p>Your dashboard is ready to manage inquiries, publish content, and monitor conversion health.</p>
                    <span className="status-pill active">System Ready</span>
                  </div>
                </div>
              </div>
            ) : activeTab === 'leads' ? (
              <div className="leads-manager-tab">
            {/* Stats Cards */}
            <div className="stats-row">
              <div className="stat-card glass-card">
                <Users className="stat-icon" size={24} />
                <div className="stat-info">
                  <h4>Total Leads</h4>
                  <p>{totalLeads}</p>
                </div>
              </div>
              <div className="stat-card glass-card warning">
                <Clock className="stat-icon" size={24} />
                <div className="stat-info">
                  <h4>New Leads</h4>
                  <p>{newLeads}</p>
                </div>
              </div>
              <div className="stat-card glass-card info">
                <Edit3 className="stat-icon" size={24} />
                <div className="stat-info">
                  <h4>In Progress</h4>
                  <p>{inProgressLeads}</p>
                </div>
              </div>
              <div className="stat-card glass-card success">
                <CheckCircle className="stat-icon" size={24} />
                <div className="stat-info">
                  <h4>Closed Deals</h4>
                  <p>{closedLeads}</p>
                </div>
              </div>
            </div>

            {/* Dashboard Content Split Grid */}
            <div className="leads-split-grid">
              
              {/* Left Side: Table & Search */}
              <div className="leads-table-container glass-card">
                <div className="table-header-row">
                  <h3>Lead Activity Tracker</h3>
                  <div className="search-box-wrapper">
                    <Search size={16} />
                    <input 
                      type="text" 
                      placeholder="Search leads..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="leads-table-scroll">
                  <table className="leads-table">
                    <thead>
                      <tr>
                        <th>Client</th>
                        <th>Location</th>
                        <th>Source</th>
                        <th>Engagement Score</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLeads.map((lead) => (
                        <tr 
                          key={lead.id} 
                          className={`lead-tr ${selectedLeadId === lead.id ? 'active' : ''}`}
                          onClick={() => setSelectedLeadId(lead.id)}
                        >
                          <td>
                            <div className="lead-client-info">
                              <strong>{lead.name}</strong>
                              <span>{lead.phone}</span>
                            </div>
                          </td>
                          <td>{lead.location}</td>
                          <td>
                            <span className="source-badge">{lead.source}</span>
                          </td>
                          <td>
                            <div className={`score-badge ${(lead.score || 15) >= 70 ? 'hot' : (lead.score || 15) >= 30 ? 'warm' : 'cold'}`}>
                              <span className="score-num">{lead.score || 15}</span>
                              <span className="score-heat">
                                {(lead.score || 15) >= 70 ? '🔥 Hot' : (lead.score || 15) >= 30 ? '☀️ Warm' : '❄️ Cold'}
                              </span>
                            </div>
                          </td>
                          <td>{new Date(lead.date).toLocaleDateString()}</td>
                          <td>
                            <select 
                              className={`status-select ${lead.status.toLowerCase().replace(' ', '-')}`}
                              value={lead.status}
                              onClick={(e) => e.stopPropagation()}
                              onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Closed">Closed</option>
                            </select>
                          </td>
                          <td>
                            <button 
                              className="delete-lead-btn" 
                              onClick={(e) => { e.stopPropagation(); handleDeleteLead(lead.id); }}
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {filteredLeads.length === 0 && (
                        <tr>
                          <td colSpan="6" className="no-data-td">No active leads matching filter.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Side: Lead Details, Smart Notes, Reminders */}
              <div className="lead-details-panel glass-card">
                {selectedLead ? (
                  <div className="details-panel-content">
                    <div className="details-panel-header">
                      <h3>{selectedLead.name}</h3>
                      <span className={`status-pill ${selectedLead.status.toLowerCase().replace(' ', '-')}`}>
                        {selectedLead.status}
                      </span>
                    </div>

                    <div className="details-meta-list">
                      <div className="meta-item">
                        <strong>Email:</strong> <span>{selectedLead.email}</span>
                      </div>
                      <div className="meta-item">
                        <strong>Phone:</strong> <span>{selectedLead.phone}</span>
                      </div>
                      <div className="meta-item">
                        <strong>Location of Interest:</strong> <span>{selectedLead.location}</span>
                      </div>
                      <div className="meta-item">
                        <strong>Lead Quality Score:</strong>
                        <span className={`score-badge ${(selectedLead.score || 15) >= 70 ? 'hot' : (selectedLead.score || 15) >= 30 ? 'warm' : 'cold'}`} style={{ marginLeft: '10px', display: 'inline-flex' }}>
                          <strong style={{ color: 'inherit' }}>{selectedLead.score || 15}</strong> &nbsp;
                          <span>{(selectedLead.score || 15) >= 70 ? '🔥 Hot Lead (High Interest)' : (selectedLead.score || 15) >= 30 ? '☀️ Warm Lead' : '❄️ Cold Lead'}</span>
                        </span>
                      </div>
                      <div className="meta-item">
                        <strong>Original Enquiry Message:</strong> 
                        <p className="enquiry-msg-p">"{selectedLead.message}"</p>
                      </div>
                      {selectedLead.reminder && (
                        <div className="meta-item reminder-active">
                          <Bell size={14} />
                          <strong>Active Follow-up Reminder:</strong> 
                          <span>{new Date(selectedLead.reminder).toLocaleString()}</span>
                        </div>
                      )}
                    </div>

                    {/* Schedule Reminder Form */}
                    <form className="reminder-form border-box" onSubmit={handleSetReminder}>
                      <h4>Schedule Follow-up Reminder</h4>
                      <div className="form-inline-row">
                        <input 
                          type="datetime-local" 
                          required
                          value={reminderDate}
                          onChange={(e) => setReminderDate(e.target.value)}
                        />
                        <button type="submit" className="btn btn-primary btn-sm">
                          Set
                        </button>
                      </div>
                    </form>

                    {/* Smart Notes Log Section */}
                    <div className="notes-log-section">
                      <h4>Smart Notes & History Logs</h4>
                      
                      {/* Add note text form */}
                      <form onSubmit={handleAddNote} className="add-note-form">
                        <textarea 
                          placeholder="Type internal remarks, updates, or call log details here..."
                          required
                          value={newNoteText}
                          onChange={(e) => setNewNoteText(e.target.value)}
                        />
                        <button type="submit" className="btn btn-primary btn-sm flex-center">
                          Save Note <Send size={12} style={{ marginLeft: '6px' }} />
                        </button>
                      </form>

                      {/* Notes history list */}
                      <div className="notes-history-list">
                        {selectedLead.notes && selectedLead.notes.map((note, nIdx) => (
                          <div key={nIdx} className="note-log-item">
                            <span className="note-log-date">
                              {new Date(note.date).toLocaleString()}
                            </span>
                            <p className="note-log-text">{note.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="no-lead-selected">
                    <Users size={48} />
                    <p>Select a lead from the tracking list to manage status, add remarks, or set follow-up reminders.</p>
                  </div>
                )}
              </div>

            </div>
          </div>
        ) : activeTab === 'blogger' ? (
          <div className="ai-blogger-tab">
            <div className="blogger-split-grid">
              
              {/* Left Side: Parameters input */}
              <div className="blogger-params-card glass-card">
                <h3>AI Content Generator Setup</h3>
                <p className="section-intro">Automatically formulate, schedule, and publish SEO, AEO, and GEO optimized blog posts targeting specific search terms.</p>
 
                <form onSubmit={handleGenerateBlog} className="blogger-form">
                  <div className="form-group">
                    <label>SEO Focus Keywords / Article Title Idea</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Traditional Nalukettu villas for sale in Palakkad"
                      required
                      value={blogPrompt}
                      onChange={(e) => setBlogPrompt(e.target.value)}
                    />
                  </div>
 
                  <div className="form-row">
                    <div className="form-group">
                      <label>Target Category</label>
                      <select 
                        value={blogCategory}
                        onChange={(e) => setBlogCategory(e.target.value)}
                      >
                        <option value="Real Estate Trends">Real Estate Trends</option>
                        <option value="Kerala Heritage">Kerala Heritage</option>
                        <option value="Traditional Architecture">Traditional Architecture</option>
                        <option value="Eco-Friendly Living">Eco-Friendly Living</option>
                        <option value="Luxury Living">Luxury Living</option>
                        <option value="Villas & Homes">Villas & Homes</option>
                      </select>
                    </div>
 
                    <div className="form-group">
                      <label>Workflow Status</label>
                      <div className="schedule-toggle-wrapper">
                        <label className="toggle-switch">
                          <input 
                            type="checkbox" 
                            checked={isScheduled}
                            onChange={(e) => setIsScheduled(e.target.checked)}
                          />
                          <span className="slider"></span>
                        </label>
                        <span>{isScheduled ? 'Schedule' : 'Publish Directly'}</span>
                      </div>
                    </div>
                  </div>
 
                  {isScheduled && (
                    <div className="form-group animation-fade">
                      <label>Schedule Release Date & Time</label>
                      <input 
                        type="date" 
                        required
                        value={scheduledDate}
                        onChange={(e) => setScheduledDate(e.target.value)}
                      />
                    </div>
                  )}
 
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-block flex-center"
                    disabled={isGenerating}
                  >
                    {isGenerating ? 'AI Engine Writing...' : 'Generate SEO Article'} 
                    <Sparkles size={16} style={{ marginLeft: '8px' }} />
                  </button>
                </form>
              </div>
 
              {/* Right Side: Article Generation Output */}
              <div className="blogger-preview-card glass-card">
                <h3>Simulated AI Article Preview</h3>
                
                {isGenerating ? (
                  <div className="preview-placeholder">
                    <div className="ai-spinner"></div>
                    <h4>AI Engine Working...</h4>
                    <p>Conducting semantic keyword clustering, optimizing header hierarchy (H1-H4), drafting body sections, and embedding structured FAQ schemas...</p>
                  </div>
                ) : generatedBlog ? (
                  <div className="preview-active-content">
                    <div className="preview-meta-badge">
                      <span>Ready to Publish</span>
                    </div>
 
                    <h2 className="preview-article-title">{generatedBlog.title}</h2>
                    
                    <div className="preview-meta-row">
                      <span className="preview-tag">{generatedBlog.category}</span>
                      <span>•</span>
                      <span>Target Date: {isScheduled && scheduledDate ? scheduledDate : 'Immediate'}</span>
                      <span>•</span>
                      <span>Authored by: Antigravity AI Writer</span>
                    </div>
 
                    <div className="preview-article-body">
                      {generatedBlog.content.map((p, idx) => (
                        <p key={idx}>{p}</p>
                      ))}
                    </div>
 
                    <div className="preview-actions-bar">
                      <button className="btn btn-secondary" onClick={() => setGeneratedBlog(null)}>
                        Discard Draft
                      </button>
                      <button className="btn btn-primary flex-center" onClick={handlePublishBlog}>
                        {isScheduled ? 'Confirm & Schedule' : 'Publish to Live Site'}
                        <CheckCircle size={16} style={{ marginLeft: '8px' }} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="preview-placeholder">
                    <FileText size={48} />
                    <h4>No Active Draft</h4>
                    <p>Configure details on the left panel and prompt the AI Engine to generate an optimized blog draft.</p>
                  </div>
                )}
              </div>
 
            </div>
          </div>
        ) : activeTab === 'properties' ? (
          <div className="properties-manager-tab animate-fade-in" style={{ width: '100%' }}>
            <div className="blogger-grid">
              {/* Left Side: Add Property Form */}
              <div className="blogger-form-card glass-card">
                <h3>Add New Project / Building</h3>
                <p className="blogger-form-subtitle">Register a new property listing dynamically into the portfolio</p>
                
                <form onSubmit={handlePropertySubmit} className="blogger-editor-form">
                  <div className="form-group">
                    <label htmlFor="prop-name">Property Name *</label>
                    <input 
                      id="prop-name"
                      type="text" 
                      placeholder="e.g. Victoria Samrruddhi II" 
                      required
                      value={propName}
                      onChange={(e) => setPropName(e.target.value)}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="prop-loc">Location Territory *</label>
                      <select 
                        id="prop-loc"
                        value={propLocation}
                        onChange={(e) => setPropLocation(e.target.value)}
                      >
                        <option value="Palakkad">Palakkad</option>
                        <option value="Thrissur">Thrissur</option>
                        <option value="Ottapalam">Ottapalam</option>
                        <option value="Trivandrum">Trivandrum</option>
                        <option value="Coimbatore">Coimbatore</option>
                        <option value="Tiruppur">Tiruppur</option>
                        <option value="Irinjalakuda">Irinjalakuda</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="prop-type">Property Type *</label>
                      <select 
                        id="prop-type"
                        value={propType}
                        onChange={(e) => setPropType(e.target.value)}
                      >
                        <option value="villa">Luxury Villa</option>
                        <option value="apartment">Premium Apartment</option>
                        <option value="bungalow">Modern Bungalow</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="prop-price">Price (in Lakhs INR) *</label>
                      <input 
                        id="prop-price"
                        type="number" 
                        placeholder="e.g. 75" 
                        required
                        value={propPrice}
                        onChange={(e) => setPropPrice(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="prop-price-txt">Price Label / Range</label>
                      <input 
                        id="prop-price-txt"
                        type="text" 
                        placeholder="e.g. 75 Lakhs Onwards" 
                        value={propPriceText}
                        onChange={(e) => setPropPriceText(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="prop-area">Built-up Area *</label>
                      <input 
                        id="prop-area"
                        type="text" 
                        placeholder="e.g. 1850 Sq.Ft" 
                        required
                        value={propArea}
                        onChange={(e) => setPropArea(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="prop-status">Launch Status</label>
                      <select 
                        id="prop-status"
                        value={propStatus}
                        onChange={(e) => setPropStatus(e.target.value)}
                      >
                        <option value="active">Active / For Sale</option>
                        <option value="sold">Sold Out</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="prop-img">Primary Thumbnail Image</label>
                    <select 
                      id="prop-img"
                      value={propImg}
                      onChange={(e) => setPropImg(e.target.value)}
                    >
                      {presetImages.map(img => (
                        <option key={img.value} value={img.value}>{img.label}</option>
                      ))}
                    </select>
                  </div>

                  <button type="submit" className="btn btn-primary btn-block flex-center" style={{ marginTop: '1rem' }}>
                    <Plus size={16} style={{ marginRight: '8px' }} /> Register Gated Building
                  </button>
                </form>
              </div>

              {/* Right Side: Active Project Database Portfolio */}
              <div className="blogger-preview-card glass-card">
                <h3>Live Building Database ({properties.length})</h3>
                <p className="blogger-form-subtitle" style={{ marginBottom: '1.5rem' }}>Active listings displayed to visitors across search and portfolios</p>
                
                <div style={{ maxHeight: '420px', overflowY: 'auto', paddingRight: '5px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {properties.map(p => (
                      <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                        <img 
                          src={`/assets/properties/${p.img}`} 
                          alt={p.name} 
                          style={{ width: '60px', height: '45px', objectFit: 'cover', borderRadius: '4px', background: '#ccc' }} 
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: '700', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{p.name}</h4>
                          <div style={{ display: 'flex', gap: '8px', fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                            <span>📍 {p.location}</span>
                            <span>•</span>
                            <span style={{ textTransform: 'capitalize' }}>🏠 {p.type}</span>
                            <span>•</span>
                            <span>₹{p.price}L</span>
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <button 
                            className={`status-pill ${p.status}`} 
                            onClick={() => handleTogglePropertyStatus(p.id)}
                            style={{ border: 'none', cursor: 'pointer', padding: '4px 8px', fontSize: '0.7rem', fontWeight: 'bold', borderRadius: '4px' }}
                          >
                            {p.status === 'active' ? 'Active' : 'Sold'}
                          </button>
                          <button 
                            onClick={() => handleDeleteProperty(p.id, p.name)}
                            style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', padding: '4px' }}
                            aria-label="Delete property"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    ))}
                    {properties.length === 0 && (
                      <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem 0' }}>No buildings currently in database.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="analytics-tab">
            <div className="analytics-grid">
              
              {/* Line Chart: Monthly Lead Trajectory */}
              <div className="chart-card glass-card">
                <h3>Monthly Lead Trajectory</h3>
                <p className="chart-subtitle">Direct conversion trend over the last 6 months</p>
                <div className="chart-svg-wrapper">
                  <svg viewBox="0 0 500 220" className="chart-svg">
                    {/* Grid lines */}
                    <line x1="50" y1="30" x2="450" y2="30" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                    <line x1="50" y1="80" x2="450" y2="80" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                    <line x1="50" y1="130" x2="450" y2="130" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                    <line x1="50" y1="180" x2="450" y2="180" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
                    
                    {/* Line path */}
                    <path 
                      d="M 50 160 Q 130 135 210 145 T 370 75 L 450 35" 
                      fill="none" 
                      stroke="var(--primary)" 
                      strokeWidth="3.5" 
                      strokeLinecap="round" 
                    />
                    
                    {/* Data Points */}
                    <circle cx="50" cy="160" r="5" fill="var(--primary)" />
                    <circle cx="130" cy="135" r="5" fill="var(--primary)" />
                    <circle cx="210" cy="145" r="5" fill="var(--primary)" />
                    <circle cx="290" cy="110" r="5" fill="var(--primary)" />
                    <circle cx="370" cy="75" r="5" fill="var(--primary)" />
                    <circle cx="450" cy="35" r="6" fill="#fff" stroke="var(--primary)" strokeWidth="3" />
                    
                    {/* Point Values */}
                    <text x="50" y="145" className="chart-value-lbl">12</text>
                    <text x="130" y="120" className="chart-value-lbl">18</text>
                    <text x="210" y="130" className="chart-value-lbl">15</text>
                    <text x="290" y="95" className="chart-value-lbl">28</text>
                    <text x="370" y="60" className="chart-value-lbl">42</text>
                    <text x="450" y="20" className="chart-value-lbl" style={{ fill: 'var(--primary)', fontWeight: 'bold' }}>58</text>
                    
                    {/* X Axis Labels */}
                    <text x="50" y="205" className="chart-axis-lbl">Jan</text>
                    <text x="130" y="205" className="chart-axis-lbl">Feb</text>
                    <text x="210" y="205" className="chart-axis-lbl">Mar</text>
                    <text x="290" y="205" className="chart-axis-lbl">Apr</text>
                    <text x="370" y="205" className="chart-axis-lbl">May</text>
                    <text x="450" y="205" className="chart-axis-lbl">Jun</text>
                  </svg>
                </div>
              </div>

              {/* Bar Chart: Conversion Share by Source */}
              <div className="chart-card glass-card">
                <h3>Conversion Share by Acquisition Source</h3>
                <p className="chart-subtitle">Total leads captured by system channel</p>
                <div className="chart-svg-wrapper">
                  <svg viewBox="0 0 450 220" className="chart-svg">
                    <line x1="50" y1="180" x2="400" y2="180" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
                    
                    {/* AI Chatbot Bar */}
                    <rect x="80" y="40" width="36" height="140" fill="var(--primary)" rx="4" className="chart-bar" />
                    <text x="98" y="30" className="chart-bar-value">40%</text>
                    <text x="98" y="198" className="chart-axis-lbl">AI Chat</text>
                    
                    {/* Exit Intent Bar */}
                    <rect x="170" y="70" width="36" height="110" fill="rgba(197, 49, 45, 0.7)" rx="4" className="chart-bar" />
                    <text x="188" y="60" className="chart-bar-value">30%</text>
                    <text x="188" y="198" className="chart-axis-lbl">Exit Popup</text>
                    
                    {/* Web Forms Bar */}
                    <rect x="260" y="105" width="36" height="75" fill="rgba(197, 49, 45, 0.4)" rx="4" className="chart-bar" />
                    <text x="278" y="95" className="chart-bar-value">20%</text>
                    <text x="278" y="198" className="chart-axis-lbl">Web Forms</text>
                    
                    {/* Reels Bar */}
                    <rect x="350" y="145" width="36" height="35" fill="rgba(197, 49, 45, 0.2)" rx="4" className="chart-bar" />
                    <text x="368" y="135" className="chart-bar-value">10%</text>
                    <text x="368" y="198" className="chart-axis-lbl">Reels Tour</text>
                  </svg>
                </div>
              </div>

              {/* Donut Chart: Location Interest Split */}
              <div className="chart-card glass-card">
                <h3>Interest Split by Territory</h3>
                <p className="chart-subtitle">Geographic demand split based on listings browsed</p>
                <div className="chart-svg-wrapper flex-center" style={{ height: '180px' }}>
                  <svg viewBox="0 0 200 200" width="160" height="160" className="donut-svg">
                    {/* Base grey background ring */}
                    <circle cx="100" cy="100" r="70" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="18" />
                    
                    {/* Thrissur - 45% (Segment length: 2 * PI * r * 0.45 = 440 * 0.45 = 198) */}
                    <circle cx="100" cy="100" r="70" fill="transparent" stroke="var(--primary)" strokeWidth="18" 
                      strokeDasharray="198 440" strokeDashoffset="0" strokeLinecap="round" />
                      
                    {/* Palakkad - 35% (Segment length: 440 * 0.35 = 154, Offset: -198) */}
                    <circle cx="100" cy="100" r="70" fill="transparent" stroke="rgba(197, 49, 45, 0.65)" strokeWidth="18" 
                      strokeDasharray="154 440" strokeDashoffset="-198" strokeLinecap="round" />

                    {/* Trivandrum - 20% (Segment length: 440 * 0.20 = 88, Offset: -352) */}
                    <circle cx="100" cy="100" r="70" fill="transparent" stroke="rgba(197, 49, 45, 0.3)" strokeWidth="18" 
                      strokeDasharray="88 440" strokeDashoffset="-352" strokeLinecap="round" />
                  </svg>
                  
                  <div className="donut-legend">
                    <div className="legend-item"><span className="legend-color" style={{ background: 'var(--primary)' }}></span> Thrissur (45%)</div>
                    <div className="legend-item"><span className="legend-color" style={{ background: 'rgba(197, 49, 45, 0.65)' }}></span> Palakkad (35%)</div>
                    <div className="legend-item"><span className="legend-color" style={{ background: 'rgba(197, 49, 45, 0.3)' }}></span> Trivandrum (20%)</div>
                  </div>
                </div>
              </div>

              {/* Real-time Server Tracking Event Console Stream */}
              <div className="chart-card glass-card stream-card">
                <div className="stream-header">
                  <div className="stream-title">
                    <Terminal size={18} className="text-primary" />
                    <h3>Server-Side Conversion Tracking Stream</h3>
                  </div>
                  <span className="live-badge animate-pulse">LIVE FEED</span>
                </div>
                <p className="chart-subtitle">Real-time GA4 & Meta Conversions API (CAPI) logs processed server-to-server</p>
                
                <div className="terminal-logs-stream">
                  {trackingLogs.map((log, idx) => (
                    <div key={log.id || idx} className="terminal-log-row animate-slide-up">
                      <div className="log-row-header">
                        <span className="log-time">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
                        <span className="log-event-tag">{log.eventName.toUpperCase()}</span>
                        <span className="log-id">ID: {log.id}</span>
                      </div>
                      
                      <div className="log-payloads-flex">
                        <div className="payload-box ga4">
                          <strong>GA4 Measurement Protocol:</strong>
                          <pre>{JSON.stringify(log.ga4, null, 2)}</pre>
                        </div>
                        <div className="payload-box meta">
                          <strong>Meta Conversions API:</strong>
                          <pre>{JSON.stringify(log.meta, null, 2)}</pre>
                        </div>
                      </div>
                    </div>
                  ))}
                  {trackingLogs.length === 0 && (
                    <div className="no-logs">Waiting for user actions (form submissions, reel likes, chatbot clicks)...</div>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  </div>
</div>
  );
}
