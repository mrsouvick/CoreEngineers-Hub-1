import React from 'react';
import './About.css';

/**
 * About page for CoreEngineers Hub
 * - Improved accessibility (semantic elements, ARIA)
 * - Responsive layout and lightweight markup
 * - Uses local hero illustration (replace path on deploy)
 */

const About = () => {
  const team = [
    {
      name: 'Alex Johnson',
      role: 'Founder & Lead Educator',
      description:
        'Senior Software Engineer with 8+ years of experience and a passion for teaching practical engineering concepts.',
      avatar: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg',
      emoji: '👨‍💻',
    },
    {
      name: 'Sarah Chen',
      role: 'Content Director',
      description:
        'Curriculum expert who designs clear, exam-focused and project-driven learning materials.',
      avatar: '/mnt/data/04dec392-a8e7-464d-a024-6ece30b7e88a.png',
      emoji: '👩‍🏫',
    },
    {
      name: 'Mike Rodriguez',
      role: 'Technical Advisor',
      description:
        'Electronics researcher who makes advanced topics approachable through examples and labs.',
      avatar: '/mnt/data/04dec392-a8e7-464d-a024-6ece30b7e88a.png',
      emoji: '👨‍🔬',
    },
    {
      name: 'Priya Patel',
      role: 'Community Manager',
      description:
        'Community builder focused on mentoring, peer-learning groups, and live sessions.',
      avatar: '/mnt/data/04dec392-a8e7-464d-a024-6ece30b7e88a.png',
      emoji: '👩‍💼',
    },
  ];

  const values = [
    {
      emoji: '🎯',
      title: 'Quality First',
      description: 'We maintain high standards across all materials and courses.',
    },
    {
      emoji: '📚',
      title: 'Accessible Learning',
      description: 'Clear, concise resources that work for diverse learners.',
    },
    {
      emoji: '👥',
      title: 'Community Driven',
      description: 'Students learn faster together — we facilitate that.',
    },
    {
      emoji: '⭐',
      title: 'Practical Excellence',
      description: 'Focus on concepts + hands-on application for employability.',
    },
    {
      emoji: '❤️',
      title: 'Student Success',
      description: 'Everything is designed around measurable student outcomes.',
    },
    {
      emoji: '🌍',
      title: 'Global Access',
      description: 'Open resources for engineers worldwide.',
    },
  ];

  return (
    <main className="about-page">
      {/* HERO */}
      <header className="about-hero" aria-label="About CoreEngineers Hub">
        <div className="container hero-grid">
          <div className="hero-left">
            <p className="kicker">About</p>
            <h1 className="hero-title">
              We make engineering learning simple, practical and career-focused
            </h1>
            <p className="hero-lead">
              CoreEngineers Hub provides curated notes, hands-on projects, video tutorials and community mentorship
              — everything a modern engineering student needs to succeed.
            </p>

            <div className="hero-actions">
              <a href="#notes" className="btn btn-primary" aria-label="Explore resources">
                Explore Resources
              </a>
              <a
                href="https://youtube.com/@CoreEngineersHub"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                aria-label="Watch tutorials on YouTube (opens in new tab)"
              >
                Watch Tutorials
              </a>
            </div>

            <div className="hero-features" aria-hidden="true">
              <span className="feature-pill">Structured Notes</span>
              <span className="feature-pill">Exam-ready</span>
              <span className="feature-pill">Project Guides</span>
            </div>
          </div>

          <div className="hero-right" aria-hidden="true">
            {/* Using uploaded file as illustration — replace path for production */}
            <div className="hero-illustration" role="img" aria-label="Students learning illustration">
              <img
                src="https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg"
                alt="Students studying together"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </header>

      {/* MISSION */}
      <section className="mission-section container" id="mission">
        <div className="mission-grid">
          <div className="mission-card card">
            <h2>Our Mission</h2>
            <p>
              Bridge the gap between textbook theory and real-world engineering by offering clear notes, worked
              examples, and project-based learning that prepares students for exams and industry.
            </p>

            <blockquote className="mission-quote" aria-label="mission quote">
              “Empowering the next generation of engineers with practical knowledge and a supportive community.”
            </blockquote>
          </div>

          <aside className="mission-card card" aria-labelledby="what-we-offer">
            <h3 id="what-we-offer">What we offer</h3>
            <ul className="feature-list">
              <li>Curated notes for all core branches</li>
              <li>Step-by-step project guides and code examples</li>
              <li>Video explainers and interview prep</li>
              <li>Community Q&A and mentorship circles</li>
              <li>Frequent updates aligned to curriculum changes</li>
            </ul>
          </aside>
        </div>
      </section>

      {/* VALUES */}
      <section className="values-section container" aria-labelledby="values-heading">
        <div className="section-header">
          <h2 id="values-heading">Our Values</h2>
          <p className="sub">Principles that guide our content and community</p>
        </div>

        <div className="values-grid">
          {values.map((v, idx) => (
            <article key={idx} className="value-card" aria-labelledby={`value-${idx}`}>
              <div className="value-emoji" aria-hidden="true">{v.emoji}</div>
              <h3 id={`value-${idx}`}>{v.title}</h3>
              <p>{v.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section className="team-section container" aria-labelledby="team-heading">
        <div className="section-header">
          <h2 id="team-heading">Meet the Team</h2>
          <p className="sub">Educators, engineers and community builders</p>
        </div>

        <div className="team-grid">
          {team.map((m, i) => (
            <article key={i} className="team-card card" aria-labelledby={`member-${i}`}>
              <div className="member-top">
                <div className="member-avatar" aria-hidden="true">
                  {/* Use emoji as fallback; avatar image is decorative */}
                  <img src={m.avatar} alt="" role="presentation" loading="lazy" />
                </div>
                <div className="member-meta">
                  <h3 id={`member-${i}`}>{m.name}</h3>
                  <p className="member-role">{m.role}</p>
                </div>
              </div>

              <p className="member-description">{m.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="container cta-inner">
          <div>
            <h2>Ready to get started?</h2>
            <p className="sub">Join thousands of students learning with CoreEngineers Hub — study smarter, build faster.</p>
          </div>

          <div className="cta-actions">
            <a href="#notes" className="btn btn-primary">Explore Resources</a>
            <a
              href="https://youtube.com/@CoreEngineersHub"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              Watch Tutorials
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
