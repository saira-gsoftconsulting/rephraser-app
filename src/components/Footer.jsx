import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Rephraser</h3>
            <p>AI-powered paraphrasing tool to help you create better content with ease.</p>
          </div>
          
          <div className="footer-section">
            <h4>Tools</h4>
            <ul>
              <li><a href="/paraphrasing">Paraphrasing</a></li>
              <li><a href="/humanize">Humanize</a></li>
              <li><a href="/grammar-checker">Grammar Checker</a></li>
              <li><a href="/article-writer">Article Writer</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#refund">Refund Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 Rephraser. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
