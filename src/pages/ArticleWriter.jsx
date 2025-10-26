import { useState } from 'react';
import './ArticleWriter.css';

const ArticleWriter = () => {
  const [topic, setTopic] = useState('');
  const [outputText, setOutputText] = useState('');
  const [wordLength, setWordLength] = useState('500');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      alert('Please enter a topic for your article');
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      setOutputText(`Title: ${topic}\n\nThis is a generated article about "${topic}". The content is optimized for readability and SEO. In a real application, this would be powered by advanced AI to generate comprehensive, well-researched articles on any topic.`);
      setIsLoading(false);
    }, 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    alert('Article copied to clipboard!');
  };

  const handleClear = () => {
    setTopic('');
    setOutputText('');
  };

  return (
    <div className="article-page">
      <div className="container">
        <div className="page-header">
          <h1>Article Writer</h1>
          <p>Generate high-quality articles on any topic with AI assistance</p>
        </div>

        <div className="input-section">
          <div className="form-group">
            <label>Article Topic</label>
            <input
              type="text"
              className="input"
              placeholder="Enter your article topic..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Word Length</label>
            <select className="input" value={wordLength} onChange={(e) => setWordLength(e.target.value)}>
              <option value="300">300 words</option>
              <option value="500">500 words</option>
              <option value="800">800 words</option>
              <option value="1000">1000 words</option>
              <option value="1500">1500 words</option>
            </select>
          </div>

          <div className="form-actions">
            <button className="btn btn-secondary" onClick={handleClear}>
              Clear
            </button>
            <button 
              className="btn btn-primary" 
              onClick={handleGenerate}
              disabled={!topic.trim() || isLoading}
            >
              {isLoading ? 'Generating...' : 'Generate Article'}
            </button>
          </div>
        </div>

        {outputText && (
          <div className="output-section">
            <div className="section-header">
              <h3>Generated Article</h3>
              <button className="btn btn-secondary" onClick={handleCopy}>
                Copy
              </button>
            </div>
            <div className="output-area">
              <p>{outputText}</p>
            </div>
          </div>
        )}

        <div className="info-section">
          <h3>About Article Writer</h3>
          <p>
            Our AI article writer helps you create high-quality, well-structured articles on any topic. 
            Simply provide a topic and desired word length, and our AI will generate comprehensive, 
            SEO-optimized content. Perfect for bloggers, content marketers, and anyone who needs 
            professional articles quickly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArticleWriter;
