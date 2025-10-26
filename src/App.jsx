import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Paraphrasing from './pages/Paraphrasing';
import Humanize from './pages/Humanize';
import GrammarChecker from './pages/GrammarChecker';
import ArticleWriter from './pages/ArticleWriter';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/paraphrasing" element={<Paraphrasing />} />
          <Route path="/humanize" element={<Humanize />} />
          <Route path="/grammar-checker" element={<GrammarChecker />} />
          <Route path="/article-writer" element={<ArticleWriter />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
