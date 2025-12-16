import React, { useState, useEffect, useRef } from 'react';
import './Contact.css';

/**
 * 🎯 Production-Ready Contact Page
 * - Modern glassmorphism design with gradient accents
 * - Interactive form with real-time validation
 * - Animated contact cards with hover effects
 * - Live typing effect for dynamic text
 * - Enhanced accessibility with ARIA labels
 * - Responsive design with mobile-first approach
 */

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    'bot-field': ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [typingText, setTypingText] = useState('');
  const [activeSocial, setActiveSocial] = useState(null);
  
  const contactFormRef = useRef(null);
  const successRef = useRef(null);
  const typingIndexRef = useRef(0);
  const typingTexts = [
    "Let's build something amazing together!",
    "Your feedback drives our improvements.",
    "We're here to help 24/7.",
    "Every message gets our full attention."
  ];

  // Typing effect
  useEffect(() => {
    const currentText = typingTexts[typingIndexRef.current];
    let charIndex = 0;
    
    const typeChar = () => {
      if (charIndex <= currentText.length) {
        setTypingText(currentText.substring(0, charIndex));
        charIndex++;
        setTimeout(typeChar, 50);
      } else {
        setTimeout(() => {
          typingIndexRef.current = (typingIndexRef.current + 1) % typingTexts.length;
          const nextText = typingTexts[typingIndexRef.current];
          
          // Backspace effect
          let backspaceIndex = currentText.length;
          const eraseChar = () => {
            if (backspaceIndex >= 0) {
              setTypingText(currentText.substring(0, backspaceIndex));
              backspaceIndex--;
              setTimeout(eraseChar, 30);
            } else {
              setTimeout(() => {
                charIndex = 0;
                typeChar();
              }, 500);
            }
          };
          
          eraseChar();
        }, 2000);
      }
    };
    
    const timeout = setTimeout(typeChar, 1000);
    return () => clearTimeout(timeout);
  }, []);

  // Contact methods with enhanced data
  const contactMethods = [
    {
      emoji: '📧',
      title: 'Email Us',
      details: 'coreengineershub@gmail.com',
      description: 'Get a response within 24 hours',
      color: 'var(--primary-500)',
      link: 'mailto:coreengineershub@gmail.com',
      action: 'Send Email'
    },
    {
      emoji: '📱',
      title: 'Quick Support',
      details: 'Chat on WhatsApp',
      description: 'Instant responses for urgent queries',
      color: 'var(--secondary-500)',
      link: 'https://wa.me/7551891749',
      action: 'Chat Now'
    },
    {
      emoji: '🎥',
      title: 'YouTube Channel',
      details: '@vickify-b6l',
      description: 'Watch tutorials and guides',
      color: '#FF0000',
      link: 'https://www.youtube.com/@vickify-b6l/',
      action: 'Subscribe'
    }
  ];

  // Social links
  const socialLinks = [
    { platform: 'YouTube', icon: '▶️', link: 'https://www.youtube.com/@vickify-b6l/', color: '#FF0000' },
    { platform: 'LinkedIn', icon: '💼', link: 'https://www.linkedin.com', color: '#0A66C2' },
    { platform: 'GitHub', icon: '💻', link: 'https://github.com', color: '#333' },
    { platform: 'Instagram', icon: '📸', link: 'https://instagram.com', color: '#E4405F' }
  ];

  // Subjects for dropdown
  const subjects = [
    'General Inquiry',
    'Technical Support',
    'Content Suggestion',
    'Collaboration Opportunity',
    'Bug Report',
    'Feature Request',
    'Feedback',
    'Other'
  ];

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject) {
      newErrors.subject = 'Please select a subject';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Honeypot check
    if (formData['bot-field']) {
      return;
    }
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Netlify form submission
      const payload = {
        'form-name': 'contact',
        'bot-field': formData['bot-field'] || '',
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      };
      
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(payload).toString(),
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          'bot-field': ''
        });
        
        // Scroll to success message
        setTimeout(() => {
          successRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      setErrors({ submit: 'Failed to send message. Please try again or email us directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      'bot-field': ''
    });
    setErrors({});
  };

  return (
    <main className="contact-page" aria-labelledby="contact-heading">
      {/* Background Glow Effects */}
      <div className="contact-glow-effect glow-1"></div>
      <div className="contact-glow-effect glow-2"></div>
      <div className="contact-glow-effect glow-3"></div>
      
      <div className="container contact-container">
        {/* Page Header */}
        <header className="contact-header" ref={contactFormRef}>
          <div className="header-badge">
            <span className="badge-dot"></span>
            Get in Touch
          </div>
          
          <h1 id="contact-heading" className="contact-title">
            Let's <span className="gradient-text">Connect</span> &
            <span className="title-line">Build Together</span>
          </h1>
          
          <div className="typing-container">
            <p className="typing-text">{typingText}</p>
            <span className="typing-cursor">|</span>
          </div>
        </header>

        <div className="contact-grid">
          {/* Contact Methods - Left Side */}
          <aside className="contact-methods-section" aria-label="Contact options">
            <div className="methods-card glass-card">
              <div className="methods-header">
                <h2 className="methods-title">Quick Contact</h2>
                <p className="methods-subtitle">Choose your preferred way to reach us</p>
              </div>
              
              <div className="contact-methods-grid">
                {contactMethods.map((method, index) => (
                  <a
                    key={index}
                    href={method.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-method-card"
                    style={{ '--method-color': method.color }}
                    onMouseEnter={() => setActiveSocial(method.title)}
                    onMouseLeave={() => setActiveSocial(null)}
                    aria-label={`Contact via ${method.title}`}
                  >
                    <div className="method-icon-container">
                      <span className="method-emoji">{method.emoji}</span>
                      {activeSocial === method.title && (
                        <div className="method-glow"></div>
                      )}
                    </div>
                    
                    <div className="method-content">
                      <h3 className="method-title">{method.title}</h3>
                      <p className="method-details">{method.details}</p>
                      <p className="method-description">{method.description}</p>
                    </div>
                    
                    <div className="method-action">
                      <span className="action-text">{method.action}</span>
                      <svg className="action-icon" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
              
              {/* Social Links */}
              <div className="social-section">
                <h3 className="social-title">Follow Our Journey</h3>
                <p className="social-subtitle">Stay updated with our latest content</p>
                
                <div className="social-links-grid">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link-card"
                      style={{ '--social-color': social.color }}
                      aria-label={`Follow us on ${social.platform}`}
                    >
                      <span className="social-icon">{social.icon}</span>
                      <span className="social-platform">{social.platform}</span>
                      <svg className="social-arrow" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
              
              {/* Stats */}
              <div className="contact-stats">
                <div className="stat-item">
                  <span className="stat-number">24</span>
                  <span className="stat-label">Hour Response</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Satisfaction</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">5000+</span>
                  <span className="stat-label">Students Helped</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Contact Form - Right Side */}
          <section className="contact-form-section" aria-label="Contact form">
            <div className="form-card glass-card" ref={isSubmitted ? successRef : null}>
              {isSubmitted ? (
                <div className="success-message" role="status">
                  <div className="success-animation">
                    <div className="success-circle"></div>
                    <div className="success-checkmark">✓</div>
                  </div>
                  
                  <h2 className="success-title">Message Sent Successfully!</h2>
                  <p className="success-description">
                    Thank you for reaching out! We've received your message and will get back to you 
                    within 24 hours. In the meantime, check out our learning resources.
                  </p>
                  
                  <div className="success-actions">
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="btn btn-secondary success-btn"
                    >
                      Send Another Message
                    </button>
                    <a 
                      href="#notes" 
                      className="btn btn-primary success-btn"
                    >
                      Explore Resources
                    </a>
                  </div>
                  
                  <div className="success-tips">
                    <p className="tip-title">💡 Quick Tips:</p>
                    <ul className="tip-list">
                      <li>Check our FAQ section for instant answers</li>
                      <li>Join our YouTube community for tutorials</li>
                      <li>Follow us for updates and announcements</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <>
                  <div className="form-header">
                    <h2 className="form-title">Send us a Message</h2>
                    <p className="form-subtitle">
                      Fill out the form below and we'll get back to you as soon as possible.
                    </p>
                  </div>
                  
                  <form
                    name="contact"
                    method="POST"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                    onSubmit={handleSubmit}
                    className="contact-form"
                    noValidate
                  >
                    {/* Hidden Netlify Fields */}
                    <input type="hidden" name="form-name" value="contact" />
                    <div className="visually-hidden">
                      <label>
                        Don't fill this out: 
                        <input 
                          name="bot-field" 
                          value={formData['bot-field']} 
                          onChange={handleChange} 
                        />
                      </label>
                    </div>
                    
                    {/* Form Error */}
                    {errors.submit && (
                      <div className="form-error-message" role="alert">
                        <span className="error-icon">⚠️</span>
                        <span>{errors.submit}</span>
                      </div>
                    )}
                    
                    {/* Name & Email Row */}
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="name" className="form-label">
                          Full Name <span className="required">*</span>
                        </label>
                        <div className="input-wrapper">
                          <span className="input-icon">👤</span>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            className={`form-input ${errors.name ? 'input-error' : ''}`}
                            aria-invalid={!!errors.name}
                            aria-describedby={errors.name ? 'name-error' : undefined}
                          />
                        </div>
                        {errors.name && (
                          <p id="name-error" className="error-message">
                            <span className="error-dot">•</span> {errors.name}
                          </p>
                        )}
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="email" className="form-label">
                          Email Address <span className="required">*</span>
                        </label>
                        <div className="input-wrapper">
                          <span className="input-icon">📧</span>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your.email@example.com"
                            className={`form-input ${errors.email ? 'input-error' : ''}`}
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? 'email-error' : undefined}
                          />
                        </div>
                        {errors.email && (
                          <p id="email-error" className="error-message">
                            <span className="error-dot">•</span> {errors.email}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {/* Subject */}
                    <div className="form-group">
                      <label htmlFor="subject" className="form-label">
                        Subject <span className="required">*</span>
                      </label>
                      <div className="input-wrapper">
                        <span className="input-icon">📝</span>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className={`form-select ${errors.subject ? 'input-error' : ''}`}
                          aria-invalid={!!errors.subject}
                          aria-describedby={errors.subject ? 'subject-error' : undefined}
                        >
                          <option value="">Select a subject</option>
                          {subjects.map((subject, index) => (
                            <option key={index} value={subject}>
                              {subject}
                            </option>
                          ))}
                        </select>
                        <svg className="select-arrow" viewBox="0 0 24 24" fill="none">
                          <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      {errors.subject && (
                        <p id="subject-error" className="error-message">
                          <span className="error-dot">•</span> {errors.subject}
                        </p>
                      )}
                    </div>
                    
                    {/* Message */}
                    <div className="form-group">
                      <label htmlFor="message" className="form-label">
                        Your Message <span className="required">*</span>
                      </label>
                      <div className="textarea-wrapper">
                        <span className="textarea-icon">💬</span>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us how we can help you..."
                          rows={6}
                          className={`form-textarea ${errors.message ? 'input-error' : ''}`}
                          aria-invalid={!!errors.message}
                          aria-describedby={errors.message ? 'message-error' : undefined}
                        />
                        <div className="textarea-counter">
                          <span className="char-count">{formData.message.length}</span>
                          <span className="char-max">/ 1000</span>
                        </div>
                      </div>
                      {errors.message && (
                        <p id="message-error" className="error-message">
                          <span className="error-dot">•</span> {errors.message}
                        </p>
                      )}
                    </div>
                    
                    {/* Form Actions */}
                    <div className="form-actions">
                      <button
                        type="submit"
                        className="btn btn-primary submit-btn"
                        disabled={isSubmitting}
                        aria-disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="spinner" aria-hidden="true"></span>
                            Sending...
                          </>
                        ) : (
                          <>
                            <span className="btn-icon">🚀</span>
                            Send Message
                            <svg className="btn-arrow" viewBox="0 0 24 24" fill="none">
                              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </>
                        )}
                      </button>
                      
                      <button
                        type="button"
                        onClick={handleReset}
                        className="btn btn-secondary reset-btn"
                        disabled={isSubmitting}
                      >
                        <span className="btn-icon">🔄</span>
                        Clear Form
                      </button>
                    </div>
                    
                    {/* Form Footer */}
                    <div className="form-footer">
                      <p className="form-note">
                        📌 All fields marked with <span className="required">*</span> are required.
                        We respect your privacy and never share your information.
                      </p>
                    </div>
                  </form>
                </>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Contact;