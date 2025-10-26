import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <span className="logo-text">Rephraser</span>
        </Link>
        
        <nav className="nav">
          <Link 
            to="/paraphrasing" 
            className={isActive('/paraphrasing') ? 'nav-link active' : 'nav-link'}
          >
            Paraphrasing
          </Link>
          <Link 
            to="/humanize" 
            className={isActive('/humanize') ? 'nav-link active' : 'nav-link'}
          >
            Humanize
          </Link>
          <Link 
            to="/grammar-checker" 
            className={isActive('/grammar-checker') ? 'nav-link active' : 'nav-link'}
          >
            Grammar Checker
          </Link>
          <Link 
            to="/article-writer" 
            className={isActive('/article-writer') ? 'nav-link active' : 'nav-link'}
          >
            Article Writer
          </Link>
        </nav>

        <div className="header-actions">
          <button className="btn btn-primary">Go Pro</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
