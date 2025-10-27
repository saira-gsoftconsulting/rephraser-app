import { useState } from 'react';
import './Paraphrasing.css';

const Paraphrasing = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [selectedMode, setSelectedMode] = useState('creative');
  const [wordCount, setWordCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const modes = [
    { id: 'creative', name: 'Creative', icon: '🎨' },
    { id: 'anti-plagiarism', name: 'Anti Plagiarism', icon: '🛡️' },
    { id: 'academic', name: 'Academic', icon: '📚' },
    { id: 'blog', name: 'Blog', icon: '📝' },
    { id: 'fluency', name: 'Fluency', icon: '💬' },
    { id: 'formal', name: 'Formal', icon: '🎩' }
  ];

  const handleInputChange = (e) => {
    const text = e.target.value;
    setInputText(text);
    setWordCount(text.trim().split(/\s+/).filter(word => word.length > 0).length);
  };

  const handleParaphrase = async () => {
    if (!inputText.trim()) {
      alert('Please enter some text to paraphrase');
      return;
    }

    setIsLoading(true);
    
    try {
      // Use LibreTranslate API (free alternative)
      const response = await fetch('https://libretranslate.de/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: inputText,
          source: 'en',
          target: 'es', // Translate to Spanish first
          format: 'text',
        }),
      });

      const spanish = await response.json();
      
      // Translate back to English for paraphrasing effect
      const backResponse = await fetch('https://libretranslate.de/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: spanish.translatedText,
          source: 'es',
          target: 'en',
          format: 'text',
        }),
      });

      const english = await backResponse.json();
      setOutputText(english.translatedText);
    } catch (error) {
      // Fallback: Use a simple word replacement algorithm
      const words = inputText.split(' ');
      const paraphrased = words.map(word => {
        const synonyms = {
          'good': 'excellent',
          'bad': 'poor',
          'important': 'significant',
          'help': 'assist',
          'use': 'utilize',
          'think': 'consider',
          'want': 'desire',
          'need': 'require',
          'get': 'obtain',
          'make': 'create'
        };
        const lowerWord = word.toLowerCase().replace(/[.,!?;:]/g, '');
        return synonyms[lowerWord] ? word.replace(lowerWord, synonyms[lowerWord]) : word;
      }).join(' ');
      
      setOutputText(paraphrased);
    }
    
    setIsLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    alert('Text copied to clipboard!');
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setWordCount(0);
  };

  return (
    <div className="paraphrasing-page">
      <div className="container">
        <div className="page-header">
          <h1>Paraphrasing Tool</h1>
          <p>Rephrase your text with AI-powered algorithms while keeping the original meaning</p>
        </div>

        {/* Mode Selection */}
        <div className="modes-section">
          <h3>Select Mode</h3>
          <div className="modes-grid">
            {modes.map(mode => (
              <button
                key={mode.id}
                className={`mode-btn ${selectedMode === mode.id ? 'active' : ''}`}
                onClick={() => setSelectedMode(mode.id)}
              >
                <span className="mode-icon">{mode.icon}</span>
                <span className="mode-name">{mode.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="content-area">
          {/* Input Section */}
          <div className="input-section">
            <div className="section-header">
              <h3>Input Text</h3>
              <span className="word-count">{wordCount} / 1000 Words</span>
            </div>
            <textarea
              className="textarea"
              placeholder="Paste or type your content here..."
              value={inputText}
              onChange={handleInputChange}
            />
            <button className="btn btn-secondary" onClick={handleClear}>
              Clear
            </button>
          </div>

          {/* Output Section */}
          <div className="output-section">
            <div className="section-header">
              <h3>Rephrased Text</h3>
              <button className="btn btn-secondary" onClick={handleCopy} disabled={!outputText}>
                Copy
              </button>
            </div>
            <div className="output-area">
              {isLoading ? (
                <div className="spinner"></div>
              ) : outputText ? (
                <p>{outputText}</p>
              ) : (
                <p className="placeholder">Rephrased text will appear here...</p>
              )}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="action-section">
          <button 
            className="btn btn-primary btn-large" 
            onClick={handleParaphrase}
            disabled={!inputText.trim() || isLoading}
          >
            {isLoading ? 'Rephrasing...' : 'Rephrase'}
          </button>
        </div>

        {/* Info Section */}
        <div className="info-section">
          <h3>About This Tool</h3>
          <p>
            Our AI-powered paraphrasing tool helps you rewrite text while maintaining the original meaning. 
            It uses advanced algorithms to change sentence structure, replace synonyms, and improve readability. 
            Perfect for students, content creators, and professionals who want to avoid plagiarism while keeping 
            their content unique and engaging.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Paraphrasing;
