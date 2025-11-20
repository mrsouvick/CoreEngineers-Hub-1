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
    // defensive: ensure onPageChange is callable
    try {
      onPageChange(value);
    } catch (err) {
      // fail silently in case parent didn't pass a function
      // console.warn('onPageChange handler error', err);
    }
    // scroll to top for better UX when navigating via footer links
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" aria-labelledby="footer-heading">
      <div className="container footer-content">
        <div className="footer-section footer-brand">
          <div
            className="footer-logo"
            role="button"
            tabIndex={0}
            onClick={() => handleNavigate('home')}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleNavigate('home')}
            aria-label="Go to home"
          >
            <div className="logo-icon" aria-hidden="true">CE</div>
            <div className="logo-text-group">
              <div className="logo-text">CoreEngineers</div>
              <div className="logo-subtitle">Hub</div>
            </div>
          </div>

          <p className="footer-description">
            Your destination for engineering study resources, clear notes, and practical guides for aspiring engineers.
          </p>
        </div>

        <div className="footer-section">
          <h4 id="footer-heading">Quick Links</h4>
          <nav className="footer-links" aria-label="Footer quick links">
            {quickLinks.map((link) => (
              <button
                key={link.value}
                type="button"
                className="footer-link"
                onClick={() => handleNavigate(link.value)}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="footer-section">
          <h4>Connect With Us</h4>
          <div className="social-links" aria-label="Social links">
            <a
              className="social-link youtube"
              href="https://youtube.com/@CoreEngineersHub"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="CoreEngineers Hub YouTube (opens in new tab)"
            >
              YouTube
            </a>

            <a
              className="social-link"
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub (opens in new tab)"
            >
              GitHub
            </a>

            <a
              className="social-link"
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn (opens in new tab)"
            >
              LinkedIn
            </a>

            <a
              className="social-link"
              href="mailto:contact@coreengineershub.com"
              aria-label="Send email to contact at CoreEngineers Hub"
            >
              Email
            </a>
          </div>

          <p className="contact-email" aria-hidden="false">
            Got questions?<br />
            <a href="mailto:contact@coreengineershub.com">reach.souvick@gmail.com</a>
          </p>
        </div>
      </div>

      <div className="container footer-bottom">
        <p className="copyright">&copy; {currentYear} CoreEngineers Hub. All rights reserved.</p>

        <div className="footer-legal" aria-label="Legal links">
          <a href="/privacy" className="legal-link">Privacy</a>
          <a href="/terms" className="legal-link">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
