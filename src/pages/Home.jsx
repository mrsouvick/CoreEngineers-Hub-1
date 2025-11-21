import React from 'react';

const Home = ({ onPageChange }) => {
  const features = [
    {
      icon: '📚',
      title: 'Comprehensive Notes',
      description: 'Well-structured study materials for all engineering branches with practical examples.',
      color: 'primary'
    },
    {
      icon: '🎥',
      title: 'Video Tutorials',
      description: 'In-depth YouTube tutorials explaining complex engineering concepts.',
      color: 'secondary'
    },
    {
      icon: '👥',
      title: 'Expert Community',
      description: 'Connect with fellow engineering students and professionals.',
      color: 'accent'
    },
    {
      icon: '⭐',
      title: 'Quality Content',
      description: 'Curated and verified content by industry professionals.',
      color: 'primary'
    },
    {
      icon: '⚡',
      title: 'Fast Learning',
      description: 'Accelerate your engineering journey with optimized resources.',
      color: 'secondary'
    },
    {
      icon: '🎯',
      title: 'Career Focused',
      description: 'Content designed to help you excel in academics and career.',
      color: 'accent'
    }
  ];

  const stats = [
    { number: '50+', label: 'Study Materials' },
    { number: '50+', label: 'Video Tutorials' },
    { number: '100+', label: 'Students Helped' },
    { number: '3+', label: 'Engineering Branches' }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="badge">
              <span>⭐</span>
              Trusted by 100+ Engineering Students
            </div>
            
            <h1 className="hero-title">
              Learn <span className="text-gradient">Engineering</span> 
              <br />The Right Way
            </h1>
            
            <p className="hero-description">
              Your ultimate destination for comprehensive engineering education resources, 
              study materials, and expert guidance for all engineering branches.
            </p>
            
            <div className="hero-actions">
              <button 
                onClick={() => onPageChange('notes')}
                className="btn btn-primary"
              >
                Explore Notes Library
              </button>
              <a 
                href="https://youtube.com/@CoreEngineersHub"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                Subscribe on YouTube
              </a>
            </div>

            {/* Stats */}
            <div className="hero-stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2>Everything You Need to Succeed</h2>
            <p>From comprehensive study materials to expert video tutorials, we've got all your engineering education needs covered.</p>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className={`feature-icon ${feature.color}`}>
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Accelerate Your Engineering Journey?</h2>
            <p>Join thousands of successful engineering students who have transformed their learning experience with our resources.</p>
            <div className="cta-actions">
              <button 
                onClick={() => onPageChange('notes')}
                className="btn btn-primary"
              >
                Get Started Now
              </button>
              <a 
                href="https://youtube.com/@CoreEngineersHub"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                Subscribe on YouTube
              </a>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .home {
          min-height: 100vh;
        }

        .hero {
          background: linear-gradient(135deg, var(--primary-50), var(--secondary-50));
          padding: 8rem 0 4rem;
          text-align: center;
        }

        .hero-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--primary-100);
          color: var(--primary-800);
          padding: 0.5rem 1rem;
          border-radius: 2rem;
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 2rem;
        }

        .hero-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          margin-bottom: 1.5rem;
          line-height: 1.1;
        }

        .hero-description {
          font-size: 1.25rem;
          color: var(--gray-600);
          margin-bottom: 2.5rem;
          line-height: 1.6;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 4rem;
          flex-wrap: wrap;
        }

        .hero-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          max-width: 600px;
          margin: 0 auto;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          color: var(--gray-900);
          margin-bottom: 0.5rem;
        }

        .stat-label {
          color: var(--gray-600);
          font-size: 0.875rem;
        }

        .features {
          padding: 6rem 0;
          background: var(--surface);
        }

        .section-header {
          text-align: center;
          max-width: 600px;
          margin: 0 auto 4rem;
        }

        .section-header h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .section-header p {
          font-size: 1.125rem;
          color: var(--gray-600);
          line-height: 1.6;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .feature-card {
          text-align: center;
          padding: 2rem;
        }

        .feature-icon {
          width: 4rem;
          height: 4rem;
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          margin: 0 auto 1.5rem;
        }

        .feature-icon.primary {
          background: var(--primary-100);
          color: var(--primary-600);
        }

        .feature-icon.secondary {
          background: var(--secondary-100);
          color: var(--secondary-600);
        }

        .feature-icon.accent {
          background: var(--accent-100);
          color: var(--accent-600);
        }

        .feature-card h3 {
          font-size: 1.25rem;
          margin-bottom: 1rem;
        }

        .feature-card p {
          color: var(--gray-600);
          line-height: 1.6;
        }

        .cta {
          background: linear-gradient(135deg, var(--primary-500), var(--secondary-500));
          color: white;
          padding: 6rem 0;
          text-align: center;
        }

        .cta-content {
          max-width: 600px;
          margin: 0 auto;
        }

        .cta h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: white;
        }

        .cta p {
          font-size: 1.125rem;
          opacity: 0.9;
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .cta-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .cta .btn-primary {
          background: white;
          color: var(--primary-600);
        }

        .cta .btn-primary:hover {
          background: var(--gray-100);
        }

        .cta .btn-secondary {
          border-color: white;
          color: white;
        }

        .cta .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        @media (max-width: 768px) {
          .hero {
            padding: 6rem 0 3rem;
          }

          .hero-actions,
          .cta-actions {
            flex-direction: column;
            align-items: center;
          }

          .hero-stats {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;