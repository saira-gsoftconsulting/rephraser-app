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
      // Use LibreTranslate API for humanization
      const humanized = await humanizeTextWithAPI(inputText);
      setOutputText(humanized);
    } catch (error) {
      console.error('Error humanizing text:', error);
      alert('Failed to humanize text. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const humanizeTextWithAPI = async (text) => {
    try {
      // Use LibreTranslate API for translation-based humanization
      // Translate English -> French -> English to achieve humanization
      
      // Step 1: English to French
      const frenchResponse = await fetch('https://libretranslate.de/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          source: 'en',
          target: 'fr'
        }),
      });
      
      const frenchData = await frenchResponse.json();
      
      if (!frenchData.translatedText) {
        throw new Error('Failed to translate to French');
      }
      
      // Step 2: French back to English
      const englishResponse = await fetch('https://libretranslate.de/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: frenchData.translatedText,
          source: 'fr',
          target: 'en'
        }),
      });
      
      const englishData = await englishResponse.json();
      
      if (!englishData.translatedText) {
        throw new Error('Failed to translate back to English');
      }
      
      // Apply humanization transformations
      return humanizeText(englishData.translatedText);
    } catch (error) {
      console.error('LibreTranslate API error:', error);
      // Fallback to local humanization
      return humanizeText(text);
    }
  };

  const humanizeText = (text) => {
    let humanized = text;
    
    // Add contractions for natural flow
    humanized = humanized
      .replace(/\bcannot\b/gi, 'can\'t')
      .replace(/\bwill not\b/gi, 'won\'t')
      .replace(/\bdo not\b/gi, 'don\'t')
      .replace(/\bis not\b/gi, 'isn\'t')
      .replace(/\bare not\b/gi, 'aren\'t')
      .replace(/\bwas not\b/gi, 'wasn\'t')
      .replace(/\bwere not\b/gi, 'weren\'t')
      .replace(/\bdoes not\b/gi, 'doesn\'t')
      .replace(/\bhave not\b/gi, 'haven\'t')
      .replace(/\bhas not\b/gi, 'hasn\'t')
      .replace(/\bwould not\b/gi, 'wouldn\'t')
      .replace(/\bcould not\b/gi, 'couldn\'t')
      .replace(/\bshould not\b/gi, 'shouldn\'t');
    
    // Replace formal phrases with casual ones
    humanized = humanized
      .replace(/\bTherefore\b/gi, 'So')
      .replace(/\bFurthermore\b/gi, 'Plus')
      .replace(/\bMoreover\b/gi, 'Also')
      .replace(/\bIn conclusion\b/gi, 'To wrap it up')
      .replace(/\bIn summary\b/gi, 'Bottom line')
      .replace(/\bIt is important\b/gi, 'It\'s important')
      .replace(/\bIt should be noted\b/gi, 'Keep in mind')
      .replace(/\bIn addition\b/gi, 'Plus')
      .replace(/\bHowever\b/gi, 'But')
      .replace(/\bNevertheless\b/gi, 'Still')
      .replace(/\bConsequently\b/gi, 'So')
      .replace(/\bAdditionally\b/gi, 'Also')
      .replace(/\bFurthermore\b/gi, 'What\'s more');
    
    // Remove AI-sounding phrases
    humanized = humanized
      .replace(/\bAs an AI language model\b/gi, '')
      .replace(/\bI cannot\b/gi, 'I can\'t')
      .replace(/\bI do not\b/gi, 'I don\'t')
      .replace(/\bIt is worth noting\b/gi, 'Note that')
      .replace(/\bIt should be emphasized\b/gi, 'Remember');
    
    return humanized.trim();
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
