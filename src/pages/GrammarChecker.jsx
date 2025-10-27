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
      const result = await checkGrammarWithAPI(inputText);
      setOutputText(result.corrected);
      setErrors(result.errors);
    } catch (error) {
      console.error('Error checking grammar:', error);
      alert('Failed to check grammar. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const checkGrammarWithAPI = async (text) => {
    const corrections = [];
    let corrected = text;

    try {
      // LanguageTool API - free public instance
      const response = await fetch('https://api.languagetool.org/v2/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          text: text,
          language: 'en-US',
        }),
      });

      const data = await response.json();
      
      if (data.matches && data.matches.length > 0) {
        let offset = 0;
        const sortedMatches = [...data.matches].sort((a, b) => a.offset - b.offset);
        
        sortedMatches.forEach(match => {
          const errorText = text.substring(match.offset, match.offset + match.length);
          
          if (match.replacements && match.replacements.length > 0) {
            const suggestion = match.replacements[0].value;
            
            // Add error to corrections list
            corrections.push({
              text: `⚠️ ${match.message}: "${errorText}" → "${suggestion}"`,
              count: corrections.length + 1
            });
            
            // Replace in corrected text
            const index = corrected.indexOf(errorText, offset);
            if (index !== -1) {
              corrected = corrected.substring(0, index) + suggestion + corrected.substring(index + errorText.length);
              offset = index + suggestion.length;
            }
          } else {
            corrections.push({
              text: `⚠️ ${match.message}: "${errorText}"`,
              count: corrections.length + 1
            });
          }
        });
      }
    } catch (error) {
      console.error('LanguageTool API error:', error);
      // Fallback to basic checking if API fails
      return checkGrammar(text);
    }

    return {
      corrected: corrected || text,
      errors: corrections.length > 0 ? corrections : [{ text: 'No errors found!', count: 0 }]
    };
  };

  const isValidEmail = (email) => {
    // Strict email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    // Check basic format
    if (!emailRegex.test(email)) {
      return false;
    }
    
    // Check for common invalid patterns
    const invalidPatterns = [
      /\d{3,}/,  // Too many consecutive numbers
      /[A-Z]{5,}/,  // Too many consecutive capital letters
      /[^a-zA-Z0-9._%+-@]/g,  // Invalid characters
      /@{2,}/,  // Multiple @ symbols
      /\.{2,}/,  // Multiple dots in a row
      /^@/,  // Starts with @
      /@$/,  // Ends with @
      /\.[0-9]/,  // Domain extension with numbers
    ];
    
    return !invalidPatterns.some(pattern => pattern.test(email));
  };

  const checkGrammar = (text) => {
    const corrections = [];
    let corrected = text;
    
    // Email validation - Check for ALL email patterns (valid and invalid)
    const allEmailPatterns = /[\w._%+-]+@[^\s<>"']+/gi;
    const allEmails = text.match(allEmailPatterns);
    
    if (allEmails) {
      allEmails.forEach(email => {
        // Remove trailing punctuation
        const cleanEmail = email.replace(/[.,;:!?]+$/, '');
        
        if (!isValidEmail(cleanEmail)) {
          // Provide specific error messages
          let errorMsg = 'Invalid email format';
          
          if (!cleanEmail.includes('.')) {
            errorMsg = 'Missing domain extension (like .com)';
          } else if (cleanEmail.match(/\d{3,}/)) {
            errorMsg = 'Too many consecutive numbers';
          } else if (cleanEmail.length < 5) {
            errorMsg = 'Email too short';
          } else if (cleanEmail.split('@').length > 2) {
            errorMsg = 'Multiple @ symbols';
          } else if (/[^a-zA-Z0-9._%+-@]/.test(cleanEmail)) {
            errorMsg = 'Contains invalid characters';
          }
          
          corrections.push({
            text: `⚠️ ${errorMsg}: "${cleanEmail}"`,
            count: corrections.length + 1
          });
        }
      });
    }
    
    // Common spelling mistakes
    const spelling = {
      'teh': 'the', 'adn': 'and', 'taht': 'that', 'wich': 'which',
      'recieve': 'receive', 'seperate': 'separate', 'occured': 'occurred',
      'existance': 'existence', 'accomodate': 'accommodate', 'definately': 'definitely',
      'seperate': 'separate', 'accomodation': 'accommodation', 'occassion': 'occasion'
    };
    
    Object.keys(spelling).forEach(mistake => {
      const regex = new RegExp(`\\b${mistake}\\b`, 'gi');
      if (text.match(regex)) {
        corrections.push({
          text: `Fixed spelling: "${mistake}" → "${spelling[mistake]}"`,
          count: corrections.length + 1
        });
      }
      corrected = corrected.replace(regex, spelling[mistake]);
    });
    
    // Grammar corrections
    corrected = corrected
      .replace(/\bi\b/g, 'I')  // Capitalize 'i'
      .replace(/\b(\w+)s (\w+)s\b/gi, '$1 $2s')  // Fix double plurals
      .replace(/\ba ([aeiouAEIOU])/g, 'an $1')  // a → an before vowels
      .replace(/\ban ([^aeiouAEIOU])/g, 'a $1');  // an → a before consonants
    
    // Common grammar mistakes
    corrected = corrected
      .replace(/\bisnt\b/gi, "isn't")
      .replace(/\bwasnt\b/gi, "wasn't")
      .replace(/\bdont\b/gi, "don't")
      .replace(/\bloose\b/gi, 'lose')
      .replace(/\baffect\b/gi, (match) => {  // Context-dependent: simplified
        return 'affect';  // Keep as is, context needed for "effect"
      })
      .replace(/\byour ([^a])/gi, (match, letter) => {
        if (letter !== ' ') return match;  // Keep "your" with normal spacing
        return match;
      });
    
    // Missing apostrophes
    corrected = corrected
      .replace(/\bwont\b/gi, "won't")
      .replace(/\bcant\b/gi, "can't")
      .replace(/\bits\b/gi, (match, offset) => {
        // Basic check: if next word is not a noun, probably should be "it's"
        const nextWord = text.substring(offset + match.length, offset + match.length + 3);
        if (nextWord.startsWith(' ')) return "it's";
        return match;
      });
    
    // Check for comma usage errors
    const commaErrors = corrected.match(/,\s*,|^,|,\s*$/g);
    if (commaErrors) {
      commaErrors.forEach(() => {
        corrections.push({
          text: 'Fixed: Removed extra comma',
          count: corrections.length + 1
        });
      });
      corrected = corrected.replace(/,\s*,/g, ',').replace(/^,|,$/g, '');
    }
    
    // Check for semicolon usage
    if (corrected.includes(';;')) {
      corrections.push({
        text: 'Fixed: Removed double semicolon',
        count: corrections.length + 1
      });
      corrected = corrected.replace(/;;+/g, ';');
    }
    
    // Check for colon usage
    if (corrected.includes('::')) {
      corrections.push({
        text: 'Fixed: Removed double colon',
        count: corrections.length + 1
      });
      corrected = corrected.replace(/::+/g, ':');
    }
    
    // Check for multiple periods
    const multiplePeriods = corrected.match(/\.{3,}/g);
    if (multiplePeriods) {
      corrections.push({
        text: 'Fixed: Multiple periods (should be ... for ellipsis)',
        count: corrections.length + 1
      });
      corrected = corrected.replace(/\.{3,}/g, '...');
    }
    
    // Check for exclamation marks
    if (corrected.match(/!!+/)) {
      corrections.push({
        text: 'Fixed: Multiple exclamation marks',
        count: corrections.length + 1
      });
      corrected = corrected.replace(/!{2,}/g, '!');
    }
    
    // Check for question marks
    if (corrected.match(/\?\?+/)) {
      corrections.push({
        text: 'Fixed: Multiple question marks',
        count: corrections.length + 1
      });
      corrected = corrected.replace(/\?{2,}/g, '?');
    }
    
    // Check for spaces before punctuation
    if (corrected.match(/\s+[.,!?;:]/g)) {
      corrections.push({
        text: 'Fixed: Removed spaces before punctuation',
        count: corrections.length + 1
      });
      corrected = corrected.replace(/\s+([.,!?;:])/g, '$1');
    }
    
    // Check for missing spaces after punctuation
    if (corrected.match(/[.,!?;:]([^\s])/g)) {
      corrections.push({
        text: 'Fixed: Added missing spaces after punctuation',
        count: corrections.length + 1
      });
      corrected = corrected.replace(/([.,!?;:])([^\s])/g, '$1 $2');
    }
    
    // Check for spacing issues
    if (corrected.match(/\s{2,}/g)) {
      corrections.push({
        text: 'Fixed: Removed extra spaces',
        count: corrections.length + 1
      });
      corrected = corrected.replace(/\s{2,}/g, ' ');
    }
    
    // Add period at end if missing (only for statements)
    if (corrected.trim() && !corrected.match(/[.!?]$/)) {
      const lastChar = corrected.trim().slice(-1);
      if (/[a-z]/.test(lastChar)) {
        corrected = corrected.trim() + '.';
        corrections.push({
          text: 'Added missing period at the end',
          count: corrections.length + 1
        });
      }
    }
    
    return {
      corrected,
      errors: corrections.length > 0 ? corrections : [{ text: 'No errors found!', count: 0 }]
    };
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
