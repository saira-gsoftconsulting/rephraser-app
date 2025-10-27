import { useState } from 'react';
import './ArticleWriter.css';

const ArticleWriter = () => {
  const [topic, setTopic] = useState('');
  const [outputText, setOutputText] = useState('');
  const [wordLength, setWordLength] = useState('500');
  const [isLoading, setIsLoading] = useState(false);
  const [showTableBuilder, setShowTableBuilder] = useState(false);
  const [tableRows, setTableRows] = useState(2);
  const [tableCols, setTableCols] = useState(3);
  const [tableData, setTableData] = useState({});

  const handleGenerate = async () => {
    if (!topic.trim()) {
      alert('Please enter a topic for your article');
      return;
    }

    setIsLoading(true);
    
    // Generate article based on word length
    const article = generateArticle(topic, parseInt(wordLength));
    setOutputText(article);
    setIsLoading(false);
  };

  const generateArticle = (topic, wordCount) => {
    const articles = {
      introduction: [
        `# ${topic.charAt(0).toUpperCase() + topic.slice(1)}: A Comprehensive Guide`,
        `In today's fast-paced world, understanding ${topic} has become increasingly important. This article explores the key aspects, benefits, and practical applications of ${topic}.`,
      ],
      mainContent: [
        `## Why ${topic} Matters`,
        `${topic.charAt(0).toUpperCase() + topic.slice(1)} plays a crucial role in modern life. Whether you're a beginner or an experienced professional, understanding the fundamentals is essential.`,
        `## Key Benefits`,
        `The advantages of ${topic} include:`,
        `- Improved efficiency and productivity`,
        `- Better understanding of core concepts`,
        `- Enhanced problem-solving skills`,
        `- Practical real-world applications`,
      ],
      advanced: [
        `## Advanced Considerations`,
        `For those looking to dive deeper into ${topic}, consider these advanced topics:`,
        `- Best practices and industry standards`,
        `- Common challenges and solutions`,
        `- Future trends and developments`,
        `- Case studies and examples`,
      ],
      conclusion: [
        `## Conclusion`,
        `In summary, ${topic} offers numerous opportunities for growth and development. By understanding the fundamental concepts and applying them effectively, you can achieve significant results. Continue exploring and learning to stay ahead in this dynamic field.`,
      ],
    };

    let article = '';
    
    // Add introduction
    article += articles.introduction.join('\n\n') + '\n\n';
    
    // Add main content
    article += articles.mainContent.join('\n\n') + '\n\n';
    
    // Add advanced section if word count is higher
    if (wordCount >= 800) {
      article += articles.advanced.join('\n\n') + '\n\n';
    }
    
    // Add conclusion
    article += articles.conclusion.join('\n\n');
    
    return article;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    alert('Article copied to clipboard!');
  };

  const handleClear = () => {
    setTopic('');
    setOutputText('');
  };

  const handleTableCellChange = (row, col, value) => {
    setTableData({
      ...tableData,
      [`${row}-${col}`]: value
    });
  };

  const generateTable = () => {
    let markdownTable = '';
    
    // Generate header row
    markdownTable += '|';
    for (let col = 0; col < tableCols; col++) {
      const value = tableData[`0-${col}`] || `Header ${col + 1}`;
      markdownTable += ` ${value} |`;
    }
    markdownTable += '\n';
    
    // Generate separator row
    markdownTable += '|';
    for (let col = 0; col < tableCols; col++) {
      markdownTable += ' --- |';
    }
    markdownTable += '\n';
    
    // Generate data rows
    for (let row = 1; row < tableRows; row++) {
      markdownTable += '|';
      for (let col = 0; col < tableCols; col++) {
        const value = tableData[`${row}-${col}`] || '';
        markdownTable += ` ${value} |`;
      }
      markdownTable += '\n';
    }
    
    return markdownTable;
  };

  const insertTable = () => {
    const tableMarkdown = generateTable();
    setOutputText(prev => prev + '\n\n' + tableMarkdown);
    setShowTableBuilder(false);
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
              className="btn btn-secondary" 
              onClick={() => setShowTableBuilder(!showTableBuilder)}
            >
              {showTableBuilder ? 'Hide Table Builder' : 'Create Table'}
            </button>
            <button 
              className="btn btn-primary" 
              onClick={handleGenerate}
              disabled={!topic.trim() || isLoading}
            >
              {isLoading ? 'Generating...' : 'Generate Article'}
            </button>
          </div>

          {showTableBuilder && (
            <div className="table-builder">
              <h3>Table Builder</h3>
              <div className="table-controls">
                <div className="control-group">
                  <label>Rows:</label>
                  <input
                    type="number"
                    min="2"
                    max="10"
                    value={tableRows}
                    onChange={(e) => setTableRows(parseInt(e.target.value))}
                    className="table-input"
                  />
                </div>
                <div className="control-group">
                  <label>Columns:</label>
                  <input
                    type="number"
                    min="2"
                    max="10"
                    value={tableCols}
                    onChange={(e) => setTableCols(parseInt(e.target.value))}
                    className="table-input"
                  />
                </div>
              </div>
              
              <div className="table-editor">
                <div className="table-grid" style={{ gridTemplateColumns: `repeat(${tableCols}, 1fr)` }}>
                  {Array.from({ length: tableRows }).map((_, row) =>
                    Array.from({ length: tableCols }).map((_, col) => (
                      <input
                        key={`${row}-${col}`}
                        type="text"
                        placeholder={row === 0 ? `Header ${col + 1}` : `Cell ${row},${col + 1}`}
                        value={tableData[`${row}-${col}`] || ''}
                        onChange={(e) => handleTableCellChange(row, col, e.target.value)}
                        className="table-cell"
                      />
                    ))
                  )}
                </div>
              </div>
              
              <div className="table-actions">
                <button className="btn btn-secondary" onClick={() => setShowTableBuilder(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={insertTable}>
                  Insert Table
                </button>
              </div>
            </div>
          )}
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
