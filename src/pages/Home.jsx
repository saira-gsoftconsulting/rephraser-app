import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content fade-in">
            <h1 className="hero-title">AI-Powered Rephraser</h1>
            <p className="hero-subtitle">
              Transform your content with our advanced AI paraphrasing tool. 
              Make your writing more engaging, unique, and professional.
            </p>
            <div className="hero-buttons">
              <Link to="/paraphrasing" className="btn btn-primary">
                Start Paraphrasing
              </Link>
              <Link to="/article-writer" className="btn btn-secondary">
                Article Writer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Our Powerful Tools</h2>
          <div className="features-grid">
            <Link to="/paraphrasing" className="feature-card">
              <div className="feature-icon">📝</div>
              <h3>Paraphrasing</h3>
              <p>Rewrite your text while keeping the original meaning intact. Perfect for avoiding plagiarism.</p>
            </Link>

            <Link to="/humanize" className="feature-card">
              <div className="feature-icon">✨</div>
              <h3>Humanize AI Text</h3>
              <p>Make AI-generated content sound natural and human-written. Remove AI detection.</p>
            </Link>

            <Link to="/grammar-checker" className="feature-card">
              <div className="feature-icon">✓</div>
              <h3>Grammar Checker</h3>
              <p>Fix grammar, spelling, and punctuation errors to improve your writing quality.</p>
            </Link>

            <Link to="/article-writer" className="feature-card">
              <div className="feature-icon">✍️</div>
              <h3>Article Writer</h3>
              <p>Generate high-quality articles on any topic with AI-powered writing assistance.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Paste Your Text</h3>
              <p>Simply paste or type your content into our editor</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Choose Mode</h3>
              <p>Select the appropriate mode for your needs</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Get Results</h3>
              <p>Get instant results with high-quality output</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Writing?</h2>
            <p>Join thousands of users who trust our AI-powered tools</p>
            <Link to="/paraphrasing" className="btn btn-primary">
              Get Started Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
