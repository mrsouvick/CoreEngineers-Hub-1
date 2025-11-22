import React, { useState, useEffect, useRef } from 'react';
import './Header.css';

const Header = ({ currentPage = 'home', onPageChange = () => {} }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const mobileBtnRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };

    const onClickOutside = (e) => {
      if (
        mobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target) &&
        !mobileBtnRef.current?.contains(e.target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('keydown', onKeyDown);
      document.addEventListener('click', onClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('click', onClickOutside);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const navigation = [
    { name: 'Home', value: 'home' },
    { name: 'Notes Library', value: 'notes' },
    { name: 'About', value: 'about' },
    { name: 'Contact', value: 'contact' }
  ];

  const handleNavClick = (value) => {
    onPageChange(value);
    setMobileMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav">
        <div
          className="logo"
          role="button"
          tabIndex={0}
          onClick={() => handleNavClick('home')}
          onKeyDown={(e) => e.key === 'Enter' && handleNavClick('home')}
          aria-label="CoreEngineers - go to home"
        >
          <img className="logo-img" src="/assets/logo.png" alt="CoreEngineers logo" />
          <span className="logo-text">CoreEngineers</span>
        </div>

        <nav className="nav-links" aria-label="Main navigation">
          {navigation.map((item) => (
            <button
              key={item.value}
              onClick={() => handleNavClick(item.value)}
              className={`nav-link ${currentPage === item.value ? 'active' : ''}`}
              aria-current={currentPage === item.value ? 'page' : undefined}
            >
              {item.name}
            </button>
          ))}
        </nav>

        <div className="nav-cta">
          <a
            href="https://youtube.com/@CoreEngineersHub"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-accent"
            aria-label="Subscribe to CoreEngineers on YouTube (opens in new tab)"
          >
            Subscribe
          </a>
        </div>

        <button
          ref={mobileBtnRef}
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen((s) => !s)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <span aria-hidden="true" className="mobile-menu-icon">
            {mobileMenuOpen ? '✕' : '☰'}
          </span>
        </button>
      </div>

      {mobileMenuOpen && (
        <div id="mobile-menu" className="mobile-menu" role="dialog" aria-modal="true" ref={mobileMenuRef}>
          <div className="mobile-menu-content container">
            <nav className="mobile-nav" aria-label="Mobile navigation">
              {navigation.map((item) => (
                <button
                  key={item.value}
                  onClick={() => handleNavClick(item.value)}
                  className={`mobile-nav-link ${currentPage === item.value ? 'active' : ''}`}
                  aria-current={currentPage === item.value ? 'page' : undefined}
                >
                  {item.name}
                </button>
              ))}
            </nav>

            <a
              href="https://youtube.com/@CoreEngineersHub"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-accent mobile-cta"
              onClick={() => setMobileMenuOpen(false)}
            >
              Subscribe on YouTube
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
