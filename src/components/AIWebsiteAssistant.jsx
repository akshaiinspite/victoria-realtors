import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Phone, Sparkles, Home, DollarSign } from 'lucide-react';
import { allProperties } from '../data/properties';
import './AIWebsiteAssistant.css';

const INITIAL_MSG = {
  id: 'm1',
  sender: 'bot',
  text: "Hello! Welcome to Victoria Realtors. 🏡 I'm your AI Assistant. How can I help you find your dream home today?",
  options: ['Show Gated Villas', 'Check Home Loan Rates', 'Speak to an Expert']
};

export default function AIWebsiteAssistant({ onSubmitLead, properties = allProperties }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MSG]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Lead qualification steps: 'idle', 'wait_name', 'wait_phone'
  const [leadStep, setLeadStep] = useState('idle');
  const [tempLeadData, setTempLeadData] = useState({ name: '', phone: '', location: '' });

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      import('../utils/tracking').then(({ trackEvent }) => {
        trackEvent('chatbot_opened', { source: 'floating_bubble' });
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const addMessage = (sender, text, options = null, properties = null) => {
    setMessages(prev => [
      ...prev,
      {
        id: `m_${Date.now()}_${Math.random()}`,
        sender,
        text,
        options,
        properties
      }
    ]);
  };

  const handleSend = (textToSend) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    addMessage('user', text);
    if (!textToSend) setInputValue('');

    setIsTyping(true);

    setTimeout(() => {
      processResponse(text);
    }, 1000);
  };

  const processResponse = (userInput) => {
    const query = userInput.toLowerCase();

    // 1. Lead capture flow
    if (leadStep === 'wait_name') {
      setTempLeadData(prev => ({ ...prev, name: userInput }));
      setLeadStep('wait_phone');
      addMessage('bot', `Nice to meet you, ${userInput}! Can you please share your Phone Number so a consultant can call you?`);
      setIsTyping(false);
      return;
    }

    if (leadStep === 'wait_phone') {
      const phone = userInput;
      const completedLead = {
        name: tempLeadData.name,
        email: 'N/A (AI Chatbot)',
        phone,
        location: tempLeadData.location || 'Not Specified',
        message: 'Qualified through conversational AI. Requested expert consultation.',
        source: 'AI Website Assistant'
      };

      if (onSubmitLead) {
        onSubmitLead(completedLead);
      }

      setLeadStep('idle');
      addMessage(
        'bot',
        `Thank you, ${tempLeadData.name}! I have registered your request. One of our home loan and property advisors will call you at ${phone} within 24 hours.`,
        ['Browse Gated Villas', 'Check Home Loan Rates']
      );
      setIsTyping(false);
      return;
    }

    // 2. Main response trees
    if (query.includes('show gated villas') || query.includes('browse gated villas') || query === 'villa' || query === 'villas') {
      addMessage(
        'bot',
        'We have premium gated villa projects across Kerala and Tamil Nadu. Which location are you interested in?',
        ['Palakkad', 'Thrissur', 'Ottapalam', 'Trivandrum', 'Coimbatore']
      );
    } 
    else if (['palakkad', 'thrissur', 'ottapalam', 'trivandrum', 'coimbatore'].includes(query)) {
      const loc = userInput.charAt(0).toUpperCase() + userInput.slice(1).toLowerCase();
      // Filter matching active villas in location
      const matches = properties
        .filter(p => p.location.toLowerCase() === query && p.status === 'active')
        .slice(0, 3);

      setTempLeadData(prev => ({ ...prev, location: loc }));

      if (matches.length > 0) {
        addMessage(
          'bot',
          `Here are our premium active projects in ${loc}:`,
          ['Speak to an Expert', 'Check Home Loan Rates'],
          matches
        );
      } else {
        addMessage(
          'bot',
          `We currently don't have any active listings in ${loc}. However, we have exciting upcoming projects there! Would you like to speak to an expert for early bird pricing?`,
          ['Yes, Speak to an Expert', 'Browse Gated Villas']
        );
      }
    } 
    else if (query.includes('loan') || query.includes('interest') || query.includes('emi') || query.includes('home loan')) {
      addMessage(
        'bot',
        'Our banking partners (including SBI, HDFC, ICICI, Federal Bank, LIC HFL) offer pre-approved home loans starting at 8.4%* with minimal documentation. Would you like to connect with a consultant?',
        ['Speak to an Expert', 'Show Gated Villas']
      );
    } 
    else if (query.includes('speak to') || query.includes('expert') || query.includes('yes, speak to') || query.includes('consult')) {
      setLeadStep('wait_name');
      addMessage('bot', 'I would be happy to connect you with our project expert. Let\'s get started. May I please know your Full Name?');
    } 
    else {
      // General Fallback
      addMessage(
        'bot',
        "I'm here to help you find your dream home, check home loan rates, or arrange site visits. What would you like to explore next?",
        ['Show Gated Villas', 'Check Home Loan Rates', 'Speak to an Expert']
      );
    }

    setIsTyping(false);
  };

  const handleOptionClick = (option) => {
    handleSend(option);
  };

  return (
    <div className="ai-assistant-wrapper">
      {/* Floating Chat Bubble Button */}
      <button 
        className={`assistant-bubble ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="AI Website Assistant"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        {!isOpen && <span className="bubble-tooltip">AI Assistant ✨</span>}
      </button>

      {/* Chat Drawer Widget */}
      {isOpen && (
        <div className="assistant-drawer glass-card">
          {/* Header */}
          <div className="drawer-header">
            <div className="header-avatar">
              <Bot size={20} />
            </div>
            <div className="header-text">
              <h3>Victoria Assistant</h3>
              <div className="header-status">
                <span className="status-dot"></span>
                <span>Active | AI Matchmaker</span>
              </div>
            </div>
            <button className="header-close-btn" onClick={() => setIsOpen(false)}>
              <X size={18} />
            </button>
          </div>

          {/* Messages Body */}
          <div className="drawer-body">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-message ${msg.sender}`}>
                <div className="message-icon-avatar">
                  {msg.sender === 'bot' ? <Bot size={14} /> : <User size={14} />}
                </div>
                <div className="message-bubble-wrapper">
                  <div className="message-text">
                    {msg.text}
                  </div>

                  {/* Render Property Cards Matchmaker */}
                  {msg.properties && (
                    <div className="chat-properties-list">
                      {msg.properties.map(p => (
                        <div key={p.id} className="chat-prop-card">
                          <img 
                            src={`/assets/properties/${p.img}`} 
                            alt={p.name} 
                            className="chat-prop-img"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/assets/properties/featured.jpg';
                            }}
                          />
                          <div className="chat-prop-details">
                            <h5>{p.name}</h5>
                            <div className="chat-prop-meta">
                              <span><Home size={10} /> {p.area}</span>
                              <span><DollarSign size={10} /> {p.priceText}</span>
                            </div>
                            <a 
                              href={`https://wa.me/917907878203?text=Interested%20in%20${encodeURIComponent(p.name)}`} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="chat-prop-enquire-btn"
                            >
                              Enquire via WhatsApp
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Option Chips */}
                  {msg.options && (
                    <div className="chat-options-chips">
                      {msg.options.map((opt, oIdx) => (
                        <button 
                          key={oIdx} 
                          className="chip-btn" 
                          onClick={() => handleOptionClick(opt)}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="chat-message bot typing">
                <div className="message-icon-avatar">
                  <Bot size={14} />
                </div>
                <div className="message-bubble-wrapper">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Footer Input Form */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }} 
            className="drawer-footer"
          >
            <input
              type="text"
              placeholder={leadStep !== 'idle' ? "Enter details here..." : "Ask about properties, loans, locations..."}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit" className="footer-send-btn">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
