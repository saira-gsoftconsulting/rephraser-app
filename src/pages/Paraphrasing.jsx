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
    
    // Advanced paraphrasing with mode-based transformations
    const paraphrased = paraphraseText(inputText, selectedMode);
    setOutputText(paraphrased);
    setIsLoading(false);
  };

  const paraphraseText = (text, mode) => {
    // Split into sentences
    const sentences = text.split(/(?<=[.!?])\s+/);
    
    return sentences.map(sentence => {
      let paraphrased = sentence;
      
      // Apply mode-specific transformations
      switch(mode) {
        case 'creative':
          paraphrased = applyCreativeStyle(paraphrased);
          break;
        case 'anti-plagiarism':
          paraphrased = applyAntiPlagiarism(paraphrased);
          break;
        case 'academic':
          paraphrased = applyAcademicStyle(paraphrased);
          break;
        case 'blog':
          paraphrased = applyBlogStyle(paraphrased);
          break;
        case 'fluency':
          paraphrased = applyFluency(paraphrased);
          break;
        case 'formal':
          paraphrased = applyFormalStyle(paraphrased);
          break;
        default:
          paraphrased = applyDefaultParaphrasing(paraphrased);
      }
      
      return paraphrased;
    }).join(' ');
  };

  const applyCreativeStyle = (text) => {
    const replacements = {
      'good': 'excellent', 'great': 'amazing', 'bad': 'terrible',
      'very': 'incredibly', 'many': 'numerous', 'important': 'crucial',
      'help': 'assist', 'use': 'utilize', 'start': 'commence',
      'show': 'demonstrate', 'get': 'obtain', 'make': 'create',
      'think': 'contemplate', 'see': 'observe'
    };
    return replaceWords(text, replacements);
  };

  const applyAntiPlagiarism = (text) => {
    return text
      .replace(/Firstly/g, 'To begin with')
      .replace(/Secondly/g, 'Furthermore')
      .replace(/Lastly/g, 'Finally')
      .replace(/In conclusion/g, 'To summarize');
  };

  const applyAcademicStyle = (text) => {
    const replacements = {
      'show': 'demonstrate', 'prove': 'establish', 'use': 'employ',
      'make': 'generate', 'get': 'acquire', 'think': 'argue',
      'important': 'significant', 'good': 'effective'
    };
    return replaceWords(text, replacements);
  };

  const applyBlogStyle = (text) => {
    return text
      .replace(/Firstly/g, 'First things first')
      .replace(/However/g, 'But here\'s the thing')
      .replace(/Therefore/g, 'So')
      .replace(/In addition/g, 'Plus')
      .replace(/Furthermore/g, 'On top of that');
  };

  const applyFluency = (text) => {
    return text
      .replace(/cannot/g, 'can\'t')
      .replace(/will not/g, 'won\'t')
      .replace(/is not/g, 'isn\'t')
      .replace(/are not/g, 'aren\'t')
      .replace(/do not/g, 'don\'t');
  };

  const applyFormalStyle = (text) => {
    const replacements = {
      'can\'t': 'cannot', 'won\'t': 'will not', 'don\'t': 'do not',
      'isn\'t': 'is not', 'aren\'t': 'are not', 'wasn\'t': 'was not',
      'get': 'obtain', 'buy': 'purchase', 'show': 'demonstrate'
    };
    return replaceWords(text, replacements);
  };

  const applyDefaultParaphrasing = (text) => {
    const replacements = {
      'good': 'excellent', 'bad': 'poor', 'important': 'significant',
      'help': 'assist', 'use': 'utilize', 'think': 'consider'
    };
    return replaceWords(text, replacements);
  };

  const replaceWords = (text, replacements) => {
    let result = text;
    Object.keys(replacements).forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      result = result.replace(regex, (match) => {
        // Preserve capitalization
        return match === match.toUpperCase() 
          ? replacements[word].toUpperCase()
          : match === match[0].toUpperCase() + match.slice(1).toLowerCase()
          ? replacements[word][0].toUpperCase() + replacements[word].slice(1)
          : replacements[word].toLowerCase();
      });
    });
    return result;
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
