import { useState } from 'react';
import './Humanize.css';

const Humanize = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const text = e.target.value;
    setInputText(text);
    setWordCount(text.trim().split(/\s+/).filter(word => word.length > 0).length);
  };

  const handleHumanize = async () => {
    if (!inputText.trim()) {
      alert('Please enter some text to humanize');
      return;
    }

    setIsLoading(true);
    
    try {
      // Use LibreTranslate for humanization effect
      const response = await fetch('https://libretranslate.de/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: inputText,
          source: 'en',
          target: 'fr', // Translate to French
          format: 'text',
        }),
      });

      const french = await response.json();
      
      // Translate back to English
      const backResponse = await fetch('https://libretranslate.de/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: french.translatedText,
          source: 'fr',
          target: 'en',
          format: 'text',
        }),
      });

      const english = await backResponse.json();
      
      // Make it more conversational
      let humanized = english.translatedText
        .replace(/Therefore/g, 'So')
        .replace(/Furthermore/g, 'Also')
        .replace(/Moreover/g, 'Plus')
        .replace(/In conclusion/g, 'To wrap up')
        .replace(/It is important/g, 'It\'s important')
        .replace(/cannot/g, 'can\'t')
        .replace(/will not/g, 'won\'t')
        .replace(/do not/g, 'don\'t');
      
      setOutputText(humanized);
    } catch (error) {
      // Fallback: Add conversational elements
      let humanized = inputText
        .replace(/\bvery\b/gi, 'really')
        .replace(/\bthus\b/gi, 'so')
        .replace(/\bhence\b/gi, 'that\'s why')
        .replace(/\bhowever\b/gi, 'but')
        .replace(/\btherefore\b/gi, 'so');
      
      setOutputText(humanized);
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
    <div className="humanize-page">
      <div className="container">
        <div className="page-header">
          <h1>Humanize AI Text</h1>
          <p>Make your AI-generated content sound natural and human-written</p>
        </div>

        <div className="content-area">
          <div className="input-section">
            <div className="section-header">
              <h3>AI-Generated Text</h3>
              <span className="word-count">{wordCount} Words</span>
            </div>
            <textarea
              className="textarea"
              placeholder="Paste your AI-generated content here..."
              value={inputText}
              onChange={handleInputChange}
            />
            <button className="btn btn-secondary" onClick={handleClear}>
              Clear
            </button>
          </div>

          <div className="output-section">
            <div className="section-header">
              <h3>Humanized Text</h3>
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
                <p className="placeholder">Humanized text will appear here...</p>
              )}
            </div>
          </div>
        </div>

        <div className="action-section">
          <button 
            className="btn btn-primary btn-large" 
            onClick={handleHumanize}
            disabled={!inputText.trim() || isLoading}
          >
            {isLoading ? 'Humanizing...' : 'Humanize Now'}
          </button>
        </div>

        <div className="info-section">
          <h3>What is Humanize?</h3>
          <p>
            The Humanize tool transforms AI-generated content into natural, human-like writing. 
            It removes robotic patterns, adds conversational flow, and makes your text undetectable by AI detectors. 
            Perfect for making ChatGPT, Claude, and other AI-generated content sound authentically human.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Humanize;
