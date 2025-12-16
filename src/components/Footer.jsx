import React from 'react';
import './Footer.css';

const Footer = ({ onPageChange = () => {} }) => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', value: 'home' },
    { label: 'Notes', value: 'notes' },
    { label: 'About', value: 'about' },
    { label: 'Contact', value: 'contact' },
  ];

  const handleNavigate = (value) => {
    try { onPageChange(value); } catch (e) {}
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" aria-labelledby="footer-heading">
      <div className="container footer-content">
        <div className="footer-brand">
          <button className="footer-logo" onClick={() => handleNavigate('home')} type="button" aria-label="Go to home">
            <img src="/assets/logo.png" alt="CoreEngineers logo" className="footer-logo-img" />
            <div className="footer-logo-text">
              <span className="brand-name">CoreEngineers</span>
              <span className="brand-sub">Hub</span>
            </div>
          </button>

          <p className="footer-description">
            Clear, practical study notes and project guides for engineering students. Free resources, concise explanations, and hands-on examples.
          </p>

          <form
            className="newsletter"
            onSubmit={(e) => {
              e.preventDefault();
              const email = e.target.elements.email?.value?.trim();
              if (!email) return;
              e.target.reset();
              alert('Thanks — Chat with Admin 7551891749.');
            }}
            aria-label="Subscribe to newsletter"
          >
            <label htmlFor="footer-email" className="visually-hidden">Email</label>
            <input id="footer-email" name="email" type="email" placeholder="Your email" className="newsletter-input" />
            <button type="submit" className="newsletter-btn">Subscribe</button>
          </form>
        </div>

        <div className="footer-links-section" aria-labelledby="footer-links">
          <h4 id="footer-links" className="footer-heading">Quick links</h4>
          <nav className="footer-links" aria-label="Footer navigation">
            {quickLinks.map((link) => (
              <button key={link.value} type="button" className="footer-link" onClick={() => handleNavigate(link.value)}>
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="footer-contact">
          <h4 className="footer-heading">Connect with us</h4>

          <div className="social-row" role="list" aria-label="Social links">
            <a className="social social-youtube" href="https://www.youtube.com/@vickify-b6l/" target="_blank" rel="noopener noreferrer" role="listitem" aria-label="YouTube">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="social-icon"><path d="M23 7s-.2-1.6-.8-2.3c-.8-.9-1.7-.9-2.1-1C16.8 3 12 3 12 3s-4.8 0-7.9.7c-.4.1-1.3.1-2.1 1C1.2 5.4 1 7 1 7S0.8 9.1.8 11.2v1.6C.8 15.9 1 18 1 18s.2 1.6.8 2.3c.8.9 1.9.9 2.4 1 1.8.3 7 .7 7 .7s4.8 0 7.9-.7c.4-.1 1.3-.1 2.1-1 .6-.7.8-2.3.8-2.3s.2-2.1.2-4.3v-1.6C23.2 9.1 23 7 23 7z" /><path d="M9.5 15.2V8.8l6.1 3.2-6.1 3.2z" /></svg>
              <span className="social-label">YouTube</span>
            </a>

            <a className="social" href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" role="listitem">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="social-icon"><path d="M12 .5C5.65.5.5 5.64.5 12c0 5.09 3.29 9.4 7.86 10.93.58.11.79-.25.79-.56 0-.28-.01-1.02-.01-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.7.08-.7 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.72 1.27 3.38.97.11-.75.41-1.27.74-1.56-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.3 1.2-3.11-.12-.3-.52-1.52.12-3.17 0 0 .98-.31 3.2 1.19a11.14 11.14 0 0 1 2.92-.39c.99 0 1.99.13 2.92.39 2.22-1.5 3.2-1.19 3.2-1.19.64 1.65.24 2.87.12 3.17.75.81 1.2 1.85 1.2 3.11 0 4.43-2.7 5.4-5.27 5.68.42.36.8 1.08.8 2.18 0 1.57-.01 2.84-.01 3.22 0 .31.21.68.8.56A10.53 10.53 0 0 0 23.5 12C23.5 5.64 18.35.5 12 .5z" /></svg>
              <span className="social-label">GitHub</span>
            </a>

            <a className="social" href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" role="listitem">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="social-icon"><path d="M20.45 20.45h-3.55v-5.2c0-1.24-.02-2.83-1.72-2.83-1.72 0-1.98 1.34-1.98 2.72v5.3H9.12V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.78zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45z" /></svg>
              <span className="social-label">LinkedIn</span>
            </a>

            <a className="social" href="mailto:coreengineershub@gmail.com" aria-label="Email" role="listitem">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="social-icon"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" /></svg>
              <span className="social-label">Email</span>
            </a>
          </div>

          <address className="contact-block">
            <div>Questions? <a href="mailto:coreengineers@gmail.com">coreengineershub@gmail.com</a></div>
            <div className="small-muted">Made with ❤️ for engineering students</div>
          </address>
        </div>
      </div>

      <div className="container footer-bottom">
        <p className="copyright">&copy; {currentYear} CoreEngineers Hub. All rights reserved.</p>
        <div className="footer-legal">
          <a href="/privacy" className="legal-link">Privacy</a>
          <a href="/terms" className="legal-link">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
