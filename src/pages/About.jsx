import React, { useEffect, useRef, useState } from 'react';
import './About.css';

/**
 * Production-Ready About Page for CoreEngineers Hub
 * - Modern glassmorphism design with gradient accents
 * - Scroll-triggered animations using Intersection Observer
 * - Interactive team cards with hover effects
 * - Dynamic counter animations for stats
 * - Enhanced accessibility with ARIA labels
 * - Responsive design with mobile-first approach
 */

const About = () => {
  const [visibleSections, setVisibleSections] = useState({});
  const sectionRefs = useRef([]);
  const statsRef = useRef(null);
  
  const team = [
    {
      name: 'Souvick Kumar Halder',
      role: 'Founder & Admin',
      description: 'Leads the platform vision and manages all operations, ensuring quality and consistency.',
      avatar: '/assets/souvick_dp.jpg',
      emoji: '👨‍💻',
      social: {
        youtube: 'https://www.youtube.com/@vickify-b6l',
        linkedin: '#',
        github: '#'
      }
    },
    {
      name: 'Surajit Ghosh',
      role: 'Content Creator',
      description: 'Curriculum expert who designs clear, exam-focused and project-driven learning materials.',
      avatar: '/assets/surajit_dp.jpg',
      emoji: '📚',
      social: {
        youtube: '#',
        linkedin: '#',
        github: '#'
      }
    },
    {
      name: 'Tanmay Maity',
      role: 'Content Creator',
      description: 'Specializes in creating detailed semester notes and lecture materials for core engineering subjects.',
      avatar: '/assets/tanmay_dp.jpeg',
      emoji: '👨‍🔬',
      social: {
        youtube: '#',
        linkedin: '#',
        github: '#'
      }
    },
    {
      name: 'Sribas Adak',
      role: 'Graphics Designer & Editor',
      description: 'Creates visually engaging materials and designs that enhance learning experiences.',
      avatar: '/assets/sribas-dp.jpeg',
      emoji: '🎨',
      social: {
        youtube: '#',
        linkedin: '#',
        github: '#'
      }
    },
  ];

  const values = [
    {
      emoji: '🎯',
      title: 'Quality First',
      description: 'We maintain high standards across all materials and courses.',
      color: 'var(--primary-500)'
    },
    {
      emoji: '📚',
      title: 'Accessible Learning',
      description: 'Clear, concise resources that work for diverse learners.',
      color: 'var(--secondary-500)'
    },
    {
      emoji: '👥',
      title: 'Community Driven',
      description: 'Students learn faster together — we facilitate that.',
      color: 'var(--accent-500)'
    },
    {
      emoji: '⭐',
      title: 'Practical Excellence',
      description: 'Focus on concepts + hands-on application for employability.',
      color: 'var(--primary-400)'
    },
    {
      emoji: '❤️',
      title: 'Student Success',
      description: 'Everything is designed around measurable student outcomes.',
      color: 'var(--secondary-400)'
    },
    {
      emoji: '🌍',
      title: 'Global Access',
      description: 'Open resources for engineers worldwide.',
      color: 'var(--accent-400)'
    },
  ];

  const stats = [
    { label: 'Students Helped', value: 5000, suffix: '+' },
    { label: 'Resources Available', value: 120, suffix: '+' },
    { label: 'YouTube Subscribers', value: 2500, suffix: '+' },
    { label: 'Satisfaction Rate', value: 98, suffix: '%' },
  ];

  const features = [
    { icon: '📖', text: 'Curated Notes' },
    { icon: '🎯', text: 'Exam-focused' },
    { icon: '💻', text: 'Project Guides' },
    { icon: '🎥', text: 'Video Tutorials' },
    { icon: '👥', text: 'Community Support' },
    { icon: '🔄', text: 'Regular Updates' },
  ];

  // Intersection Observer for animations
  useEffect(() => {
    const observers = [];
    
    sectionRefs.current.forEach((section, index) => {
      if (!section) return;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => ({
              ...prev,
              [index]: true
            }));
          }
        },
        { threshold: 0.1, rootMargin: '-50px' }
      );
      
      observer.observe(section);
      observers.push(observer);
    });

    return () => observers.forEach(obs => obs.disconnect());
  }, []);

  const setSectionRef = (index) => (el) => {
    sectionRefs.current[index] = el;
  };

  return (
    <main className="about-page">
      {/* HERO SECTION - Modern Gradient Design */}
      <section className="hero-section" aria-label="About CoreEngineers Hub">
        <div className="hero-bg-glow"></div>
        <div className="container hero-container">
          <div className="hero-content" ref={setSectionRef(0)}>
            <div className="hero-badge">
              <span className="badge-dot"></span>
              Empowering Engineers Worldwide
            </div>
            
            <h1 className="hero-title">
              We Make Engineering Learning
              <span className="gradient-text"> Simple, Practical</span>
              <span className="title-line">and Career-Focused</span>
            </h1>
            
            <p className="hero-description">
              CoreEngineers Hub provides curated notes, hands-on projects, video tutorials 
              and community mentorship — everything a modern engineering student needs 
              to succeed in academics and industry.
            </p>

            <div className="hero-features-grid">
              {features.map((feature, idx) => (
                <div key={idx} className="feature-chip" data-aos="fade-up" data-aos-delay={idx * 50}>
                  <span className="feature-icon">{feature.icon}</span>
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="hero-actions">
              <a 
                href="#notes" 
                className="btn btn-primary btn-hero"
                aria-label="Explore learning resources"
              >
                <span className="btn-text">Explore Resources</span>
                <svg className="btn-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              
              <a
                href="https://www.youtube.com/@vickify-b6l/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-hero"
                aria-label="Watch tutorials on YouTube"
              >
                <svg className="btn-icon youtube-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
                <span className="btn-text">Watch Tutorials</span>
              </a>
            </div>
          </div>

          <div className="hero-visual" ref={setSectionRef(1)}>
            <div className="floating-cards">
              <div className="floating-card card-1">
                <div className="card-content">
                  <span className="card-emoji">📚</span>
                  <span className="card-text">Organized Notes</span>
                </div>
              </div>
              <div className="floating-card card-2">
                <div className="card-content">
                  <span className="card-emoji">🎯</span>
                  <span className="card-text">Exam Ready</span>
                </div>
              </div>
              <div className="floating-card card-3">
                <div className="card-content">
                  <span className="card-emoji">💻</span>
                  <span className="card-text">Projects</span>
                </div>
              </div>
            </div>
            
            <div className="hero-image-container">
              <img
                src="https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg"
                alt="Engineering students collaborating on projects"
                className="hero-image"
                loading="lazy"
              />
              <div className="image-overlay"></div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION - Animated Counters */}
      <section className="stats-section" ref={setSectionRef(2)}>
        <div className="container stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card" data-aos="fade-up" data-aos-delay={index * 100}>
              <div className="stat-value">
                <span className="counter" data-target={stat.value}>0</span>
                <span className="stat-suffix">{stat.suffix}</span>
              </div>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MISSION & VALUES */}
      <section className="mission-values-section">
        <div className="container mission-values-grid">
          {/* Mission Card */}
          <div className="mission-card glass-card" ref={setSectionRef(3)}>
            <div className="mission-header">
              <div className="mission-icon">🚀</div>
              <h2>Our Mission</h2>
            </div>
            
            <p className="mission-text">
              Bridge the gap between textbook theory and real-world engineering by offering 
              clear notes, worked examples, and project-based learning that prepares students 
              for exams and industry challenges.
            </p>

            <blockquote className="mission-quote">
              <div className="quote-icon">❝</div>
              <p>
                Empowering the next generation of engineers with practical knowledge 
                and a supportive community.
              </p>
              <footer className="quote-author">— CoreEngineers Team</footer>
            </blockquote>
          </div>

          {/* Values Grid */}
          <div className="values-container" ref={setSectionRef(4)}>
            <div className="section-header">
              <h2 className="section-title">Our Values</h2>
              <p className="section-subtitle">
                Principles that guide our content and community
              </p>
            </div>

            <div className="values-grid">
              {values.map((value, index) => (
                <div 
                  key={index} 
                  className="value-card"
                  style={{ '--value-color': value.color }}
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                >
                  <div className="value-icon">{value.emoji}</div>
                  <h3 className="value-title">{value.title}</h3>
                  <p className="value-description">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TEAM SECTION - Interactive Cards */}
      <section className="team-section" aria-labelledby="team-heading" ref={setSectionRef(5)}>
        <div className="container">
          <div className="section-header center">
            <h2 id="team-heading" className="section-title">Meet Our Team</h2>
            <p className="section-subtitle">
              Passionate educators, engineers, and community builders
            </p>
          </div>

          <div className="team-grid">
            {team.map((member, index) => (
              <div 
                key={index} 
                className="team-member-card"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="member-avatar-container">
                  <div className="avatar-glow"></div>
                  <img 
                    src={member.avatar} 
                    alt={`${member.name} - ${member.role}`}
                    className="member-avatar"
                    loading="lazy"
                  />
                  <div className="member-emoji">{member.emoji}</div>
                </div>

                <div className="member-info">
                  <h3 className="member-name">{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                  <p className="member-description">{member.description}</p>
                </div>

                <div className="member-social">
                  {member.social.youtube && (
                    <a 
                      href={member.social.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                      aria-label={`${member.name}'s YouTube`}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                      </svg>
                    </a>
                  )}
                  
                  {member.social.linkedin && (
                    <a 
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION - Gradient Background */}
      <section className="cta-section" ref={setSectionRef(6)}>
        <div className="cta-bg-gradient"></div>
        <div className="container cta-content">
          <div className="cta-text">
            <h2 className="cta-title">Ready to Transform Your Engineering Journey?</h2>
            <p className="cta-description">
              Join thousands of students learning with CoreEngineers Hub — 
              study smarter, build faster, and achieve your career goals.
            </p>
          </div>
          
          <div className="cta-actions">
            <a 
              href="#notes" 
              className="btn btn-primary btn-cta"
              aria-label="Start exploring resources"
            >
              Start Learning Now
              <svg className="cta-icon" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            
            <a
              href="https://www.youtube.com/@vickify-b6l/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-cta"
              aria-label="Subscribe to our YouTube channel"
            >
              <svg className="cta-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 15l5.19-3L10 9v6zm11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/>
              </svg>
              Subscribe on YouTube
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;