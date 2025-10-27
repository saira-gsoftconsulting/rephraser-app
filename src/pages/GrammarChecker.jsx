import { useState } from 'react';
import './GrammarChecker.css';

const GrammarChecker = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [errors, setErrors] = useState([]);
  const [wordCount, setWordCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const text = e.target.value;
    setInputText(text);
    setWordCount(text.trim().split(/\s+/).filter(word => word.length > 0).length);
  };

  const handleCheck = async () => {
    if (!inputText.trim()) {
      alert('Please enter some text to check');
      return;
    }

    setIsLoading(true);
    
    try {
      // Use LanguageTool API for grammar checking
      const response = await fetch('https://api.languagetool.org/v2/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          text: inputText,
          language: 'en-US',
        }),
      });

      const data = await response.json();
      
      // Fix the errors in the text
      let correctedText = inputText;
      const errorList = [];
      
      // Sort matches by offset in reverse order to fix from end to beginning
      const matches = data.matches.sort((a, b) => b.offset - a.offset);
      
      matches.forEach((match, index) => {
        if (match.replacements && match.replacements.length > 0) {
          const replacement = match.replacements[0].value;
          const start = match.offset;
          const end = start + match.length;
          
          correctedText = correctedText.substring(0, start) + replacement + correctedText.substring(end);
          
          errorList.push({
            text: `${match.message} - Suggested: "${replacement}"`,
            count: index + 1
          });
        }
      });
      
      setOutputText(correctedText);
      setErrors(errorList.length > 0 ? errorList : [{ text: 'No errors found!', count: 0 }]);
    } catch (error) {
      // Fallback: Simple grammar corrections
      let corrected = inputText
        .replace(/\bteh\b/gi, 'the')
        .replace(/\badn\b/gi, 'and')
        .replace(/\bteh\b/gi, 'the')
        .replace(/\bisnt\b/gi, "isn't")
        .replace(/\bwasnt\b/gi, "wasn't")
        .replace(/\bdont\b/gi, "don't");
      
      setOutputText(corrected);
      setErrors([{ text: 'Used fallback corrections', count: 1 }]);
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
    setErrors([]);
  };

  return (
    <div className="grammar-page">
      <div className="container">
        <div className="page-header">
          <h1>Grammar Checker</h1>
          <p>Fix grammar, spelling, and punctuation errors in your text</p>
        </div>

        <div className="content-area">
          <div className="input-section">
            <div className="section-header">
              <h3>Your Text</h3>
              <span className="word-count">{wordCount} Words</span>
            </div>
            <textarea
              className="textarea"
              placeholder="Paste or type your text here..."
              value={inputText}
              onChange={handleInputChange}
            />
            <button className="btn btn-secondary" onClick={handleClear}>
              Clear
            </button>
          </div>

          <div className="output-section">
            <div className="section-header">
              <h3>Corrected Text</h3>
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
                <p className="placeholder">Corrected text will appear here...</p>
              )}
            </div>
          </div>
        </div>

        <div className="action-section">
          <button 
            className="btn btn-primary btn-large" 
            onClick={handleCheck}
            disabled={!inputText.trim() || isLoading}
          >
            {isLoading ? 'Checking...' : 'Check Grammar'}
          </button>
        </div>

        {errors.length > 0 && (
          <div className="errors-section">
            <h3>Errors Found</h3>
            <div className="errors-list">
              {errors.map((error, index) => (
                <div key={index} className="error-item">
                  <span className="error-icon">⚠️</span>
                  <span className="error-text">{error.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="info-section">
          <h3>About Grammar Checker</h3>
          <p>
            Our AI-powered grammar checker identifies and corrects grammar, spelling, punctuation, 
            and style errors in your text. It helps improve clarity, professionalism, and readability 
            of your content. Perfect for students, professionals, and anyone who wants error-free writing.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GrammarChecker;
