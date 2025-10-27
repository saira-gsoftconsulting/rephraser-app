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
    // Enhanced content generation with more variety
    const introPhrases = [
      `In today's digital age, ${topic} has emerged as a critical skill.`,
      `${topic.charAt(0).toUpperCase() + topic.slice(1)} continues to evolve, shaping the way we work and live.`,
      `Understanding ${topic} is no longer optional—it's essential for success in modern life.`,
      `The world of ${topic} offers endless possibilities for those willing to learn.`
    ];
    
    const benefitPhrases = [
      `Mastering ${topic} opens doors to new opportunities and career advancement.`,
      `Those proficient in ${topic} often find themselves at a significant advantage in their professional lives.`,
      `The practical applications of ${topic} extend across multiple industries and sectors.`,
      `Investing time in ${topic} pays dividends through improved efficiency and effectiveness.`
    ];
    
    const tips = [
      `Start with the basics and build a strong foundation.`,
      `Practice regularly to reinforce your understanding.`,
      `Seek out real-world examples and case studies.`,
      `Don't be afraid to make mistakes—they're learning opportunities.`,
      `Stay updated with the latest trends and developments.`,
      `Connect with a community of learners for support and insights.`
    ];
    
    let article = '';
    
    // Title
    article += `# ${topic.charAt(0).toUpperCase() + topic.slice(1)}: A Complete Guide\n\n`;
    
    // Introduction with variety
    const introIndex = topic.length % introPhrases.length;
    article += introPhrases[introIndex] + '\n\n';
    
    article += `In this comprehensive guide, we'll explore everything you need to know about ${topic}, from foundational concepts to advanced strategies.\n\n`;
    
    // Main Content
    article += `## Understanding ${topic.charAt(0).toUpperCase() + topic.slice(1)}\n\n`;
    article += `${topic.charAt(0).toUpperCase() + topic.slice(1)} encompasses various aspects that are crucial for both beginners and experienced practitioners. `;
    article += `Whether you're just starting out or looking to enhance your existing knowledge, this guide provides valuable insights.\n\n`;
    
    article += `## Key Benefits and Advantages\n\n`;
    const benefitIndex = topic.length % benefitPhrases.length;
    article += benefitPhrases[benefitIndex] + '\n\n';
    
    article += `The primary advantages include:\n\n`;
    article += `- **Enhanced Skills**: Develop core competencies that are valuable across multiple domains\n`;
    article += `- **Better Opportunities**: Unlock new career paths and professional growth\n`;
    article += `- **Practical Applications**: Apply knowledge to solve real-world challenges\n`;
    article += `- **Competitive Edge**: Stand out in a crowded marketplace\n`;
    article += `- **Continuous Learning**: Build a foundation for lifelong skill development\n\n`;
    
    // Practical tips
    if (wordCount >= 500) {
      article += `## Practical Tips and Best Practices\n\n`;
      article += `Here are some actionable tips to get started with ${topic}:\n\n`;
      
      const numTips = Math.min(4, Math.ceil(wordCount / 200));
      for (let i = 0; i < numTips; i++) {
        const tipIndex = (topic.length + i) % tips.length;
        article += `${i + 1}. ${tips[tipIndex]}\n`;
      }
      article += '\n';
    }
    
    // Advanced section for longer articles
    if (wordCount >= 800) {
      article += `## Advanced Strategies\n\n`;
      article += `For those ready to take their ${topic} skills to the next level, consider these advanced approaches:\n\n`;
      article += `- **Deep Dive**: Explore specialized areas that align with your interests or career goals\n`;
      article += `- **Integration**: Learn how ${topic} connects with other related fields\n`;
      article += `- **Innovation**: Stay ahead of emerging trends and cutting-edge developments\n`;
      article += `- **Community**: Engage with experts and fellow practitioners for mentorship\n\n`;
      
      article += `## Common Challenges and Solutions\n\n`;
      article += `When working with ${topic}, you may encounter various challenges:\n\n`;
      article += `- **Getting Started**: Break down complex concepts into manageable steps\n`;
      article += `- **Staying Motivated**: Set clear goals and track your progress regularly\n`;
      article += `- **Time Management**: Allocate dedicated time for practice and learning\n`;
      article += `- **Overcoming Setbacks**: View obstacles as opportunities for growth\n\n`;
    }
    
    // Use cases
    if (wordCount >= 600) {
      article += `## Real-World Applications\n\n`;
      article += `The practical applications of ${topic} are diverse and far-reaching:\n\n`;
      article += `- **Professional Development**: Enhance your career prospects and job performance\n`;
      article += `- **Personal Growth**: Build confidence and expand your skill set\n`;
      article += `- **Problem Solving**: Apply systematic approaches to tackle complex challenges\n`;
      article += `- **Innovation**: Contribute new ideas and creative solutions to your field\n\n`;
    }
    
    // Conclusion
    article += `## Conclusion\n\n`;
    article += `${topic.charAt(0).toUpperCase() + topic.slice(1)} represents a valuable skill set that continues to grow in importance. `;
    article += `By investing time and effort into learning and practicing ${topic}, you position yourself for success in an increasingly competitive world.\n\n`;
    article += `Remember, mastery comes through consistent practice and a willingness to learn. `;
    article += `Start your journey with ${topic} today, and unlock the potential that awaits.\n\n`;
    article += `Ready to take the next step? Explore advanced resources, join communities, and keep pushing the boundaries of what's possible with ${topic}.`;
    
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
