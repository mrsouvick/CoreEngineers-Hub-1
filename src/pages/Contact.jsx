import React, { useState } from 'react';
import './Contact.css';

// Illustration path in your workspace. Move to public/assets/hero.png for production and update this constant.
const CONTACT_ILLUSTRATION = 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg';

/* Helper: encode form data for application/x-www-form-urlencoded */
function encodeForm(data) {
  return Object.keys(data)
    .map(
      (key) =>
        encodeURIComponent(key) + '=' + encodeURIComponent(data[key] == null ? '' : data[key])
    )
    .join('&');
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const initialForm = { name: '', email: '', subject: '', message: '', 'bot-field': '' };

const Contact = () => {
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const contactMethods = [
    { emoji: '📧', title: 'Email Us', details: 'coreengineershub@gmail.com', description: 'Send us an email anytime' },
    
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    setError(null);
  };

  /* Submits to Netlify:
     - Standard Netlify capture happens if there's a plain HTML form at build time.
     - For SPA behavior we POST to "/" with form-name and Netlify will capture submissions too.
  */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot check (if filled, likely a bot)
    if (formData['bot-field']) {
      // silently drop
      return;
    }

    // Basic client-side validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject || !formData.message.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Netlify expects the "form-name" field to match the form's name attribute
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
        body: encodeForm(payload),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData(initialForm);
      } else {
        // Netlify returns 200 for success; anything else might be an error
        const text = await response.text();
        console.error('Netlify form error:', response.status, text);
        setError('Failed to send message. Please try again later.');
      }
    } catch (err) {
      console.error('Submit error:', err);
      setError('Network error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="contact-page" aria-labelledby="contact-heading">
      <div className="container contact-container">
        <header className="page-header">
          <h1 id="contact-heading">Get in <span className="text-gradient">Touch</span></h1>
          <p className="lead">Have questions, suggestions, or need support? Tell us how we can help — we usually reply within 24 hours.</p>
        </header>

        <section className="contact-grid">
          {/* Left panel */}
          <aside className="contact-info" aria-label="Contact information">
            <div className="info-card card">
              <img src={CONTACT_ILLUSTRATION} alt="Students studying together" className="contact-illustration" loading="lazy" />

              <h2>Contact Information</h2>
              <p className="muted">Choose a convenient way to reach us — we’re here to help.</p>

              <div className="contact-methods">
                {contactMethods.map((m, idx) => (
                  <div key={idx} className="contact-method">
                    <div className="method-emoji" aria-hidden="true">{m.emoji}</div>
                    <div className="method-details">
                      <h3>{m.title}</h3>
                      <p className="method-main">{m.details}</p>
                      <p className="method-description">{m.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="social-section">
                <h3>Follow Us</h3>
                <div className="social-links">
                  <a href="https://www.youtube.com/@vickify-b6l/" target="_blank" rel="noopener noreferrer" className="social-link">YouTube</a>
              
                  <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">LinkedIn</a>
                  <a href="mailto:coreengineershub@gmail.com" className="social-link">Email</a>
                </div>
              </div>
            </div>
          </aside>

          {/* Right panel: Netlify form */}
          <section className="contact-form-wrap" aria-live="polite">
            <div className="contact-form-card card">
              {isSubmitted ? (
                <div className="success-message" role="status">
                  <div className="success-icon" aria-hidden="true">✅</div>
                  <h3>Message Sent</h3>
                  <p>Thanks — we received your message. We'll reply to your email within 24 hours.</p>
                  <div className="success-actions">
                    <button onClick={() => setIsSubmitted(false)} className="btn btn-secondary">Send Another</button>
                    <a href="#notes" className="btn btn-primary">Browse Resources</a>
                  </div>
                </div>
              ) : (
                <>
                  <h2>Send us a Message</h2>

                  {/* Netlify form attributes */}
                  <form
                    name="contact"
                    method="POST"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                    onSubmit={handleSubmit}
                    className="contact-form"
                    noValidate
                  >
                    {/* Netlify hidden inputs */}
                    <input type="hidden" name="form-name" value="contact" />
                    {/* Honeypot field (hidden from users) */}
                    <div style={{ display: 'none' }}>
                      <label>
                        Don’t fill this out if you're human: <input name="bot-field" value={formData['bot-field']} onChange={handleChange} />
                      </label>
                    </div>

                    {error && <div className="form-error" role="alert">{error}</div>}

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="name">Full name *</label>
                        <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Your full name" required />
                      </div>

                      <div className="form-group">
                        <label htmlFor="email">Email address *</label>
                        <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="subject">Subject *</label>
                      <select id="subject" name="subject" value={formData.subject} onChange={handleChange} required>
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="content">Content Suggestion</option>
                        <option value="collaboration">Collaboration</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="message">Message *</label>
                      <textarea id="message" name="message" rows={6} value={formData.message} onChange={handleChange} placeholder="Tell us how we can help..." required />
                    </div>

                    <div className="form-actions">
                      <button type="submit" className="btn submit-btn" disabled={isSubmitting} aria-disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <span className="loading-spinner" aria-hidden="true"></span> Sending...
                          </>
                        ) : (
                          <>📨 Send Message</>
                        )}
                      </button>

                      <button type="button" className="btn btn-outline" onClick={() => setFormData(initialForm)} disabled={isSubmitting}>
                        Reset
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </section>
        </section>
      </div>
    </main>
  );
};

export default Contact;
