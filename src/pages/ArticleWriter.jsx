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
    
    try {
      // Generate article based on word length
      const article = generateArticle(topic, parseInt(wordLength));
      setOutputText(article);
    } catch (error) {
      console.error('Error generating article:', error);
      alert('An error occurred while generating the article. Please try again.');
      setOutputText('');
    } finally {
      setIsLoading(false);
    }
  };

  const generateArticle = (topic, wordCount) => {
    // Validate inputs
    if (!topic || topic.trim().length === 0) {
      throw new Error('Topic is required');
    }
    
    if (isNaN(wordCount) || wordCount < 100) {
      wordCount = 500; // Default to 500 words
    }
    
    // Detect topic category
    const lowerTopic = topic.toLowerCase();
    let category = 'general';
    
    if (lowerTopic.includes('girl') || lowerTopic.includes('woman') || lowerTopic.includes('life') || lowerTopic.includes('lifestyle')) {
      category = 'lifestyle';
    } else if (lowerTopic.includes('tech') || lowerTopic.includes('code') || lowerTopic.includes('programming') || lowerTopic.includes('software')) {
      category = 'tech';
    } else if (lowerTopic.includes('health') || lowerTopic.includes('fitness') || lowerTopic.includes('wellness')) {
      category = 'health';
    } else if (lowerTopic.includes('business') || lowerTopic.includes('career') || lowerTopic.includes('entrepreneur')) {
      category = 'business';
    } else if (lowerTopic.includes('food') || lowerTopic.includes('cooking') || lowerTopic.includes('recipe')) {
      category = 'food';
    }
    
    // Generate article based on category
    return generateContentByCategory(topic, category, wordCount);
  };

  const generateContentByCategory = (topic, category, wordCount) => {
    let article = '';
    
    // Title
    article += `# ${topic.charAt(0).toUpperCase() + topic.slice(1)}: A Complete Guide\n\n`;
    
    // Category-specific introduction
    let intro = '';
    let mainContent = '';
    
    switch(category) {
      case 'lifestyle':
        intro = `${topic.charAt(0).toUpperCase() + topic.slice(1)} is an important aspect of modern living. Whether you're looking to improve your daily routine, enhance your wellbeing, or explore new opportunities, understanding ${topic} can transform your life.`;
        mainContent = `## What Makes ${topic.charAt(0).toUpperCase() + topic.slice(1)} Important?\n\n` +
          `${topic.charAt(0).toUpperCase() + topic.slice(1)} impacts every area of your life, from your relationships and career to your health and happiness. By focusing on this area, you can create positive changes that last a lifetime.\n\n` +
          `## Key Benefits\n\n` +
          `- Improved overall wellbeing and life satisfaction\n` +
          `- Better relationships with family and friends\n` +
          `- Enhanced self-confidence and personal growth\n` +
          `- Greater work-life balance\n` +
          `- Increased opportunities for success\n\n`;
        break;
        
      case 'tech':
        intro = `Technology continues to evolve rapidly, and ${topic} is at the forefront of this digital transformation. Whether you're a beginner or experienced developer, understanding ${topic} is crucial for staying competitive in today's tech-driven world.`;
        mainContent = `## Understanding ${topic.charAt(0).toUpperCase() + topic.slice(1)}\n\n` +
          `${topic.charAt(0).toUpperCase() + topic.slice(1)} is essential for modern software development and digital innovation. It offers powerful capabilities that enable developers to create efficient, scalable solutions.\n\n` +
          `## Key Benefits\n\n` +
          `- Modern development practices and tools\n` +
          `- Career advancement opportunities\n` +
          `- Higher earning potential\n` +
          `- Ability to build innovative solutions\n` +
          `- Staying relevant in the tech industry\n\n`;
        break;
        
      case 'health':
        intro = `Taking care of your health is one of the most important investments you can make. Understanding ${topic} can help you lead a healthier, more active lifestyle and prevent future health issues.`;
        mainContent = `## The Importance of ${topic.charAt(0).toUpperCase() + topic.slice(1)}\n\n` +
          `${topic.charAt(0).toUpperCase() + topic.slice(1)} plays a vital role in maintaining overall wellness. By incorporating healthy practices into your daily routine, you can improve both your physical and mental wellbeing.\n\n` +
          `## Key Benefits\n\n` +
          `- Increased energy and vitality\n` +
          `- Improved mental clarity and focus\n` +
          `- Better physical fitness and strength\n` +
          `- Enhanced immune system\n` +
          `- Long-term health benefits\n\n`;
        break;
        
      case 'business':
        intro = `In today's competitive business landscape, ${topic} is essential for success. Whether you're an entrepreneur or corporate professional, mastering ${topic} can significantly impact your career growth and business outcomes.`;
        mainContent = `## Why ${topic.charAt(0).toUpperCase() + topic.slice(1)} Matters in Business\n\n` +
          `${topic.charAt(0).toUpperCase() + topic.slice(1)} is a critical skill for business success. It helps professionals make informed decisions, build strategic relationships, and drive organizational growth.\n\n` +
          `## Key Benefits\n\n` +
          `- Career advancement opportunities\n` +
          `- Increased earning potential\n` +
          `- Better business outcomes\n` +
          `- Enhanced leadership skills\n` +
          `- Competitive advantage\n\n`;
        break;
        
      case 'food':
        intro = `Good food brings people together and nourishes both body and soul. Exploring ${topic} opens up a world of flavors, techniques, and culinary experiences that can enhance your daily life.`;
        mainContent = `## Exploring ${topic.charAt(0).toUpperCase() + topic.slice(1)}\n\n` +
          `${topic.charAt(0).toUpperCase() + topic.slice(1)} is not just about eating—it's about creating memorable experiences, learning new skills, and enjoying the pleasures of good food.\n\n` +
          `## Key Benefits\n\n` +
          `- Improved nutrition and health\n` +
          `- Creative expression through cooking\n` +
          `- Social connections and shared meals\n` +
          `- Cost savings from home cooking\n` +
          `- Appreciation of different cultures\n\n`;
        break;
        
      default:
        intro = `${topic.charAt(0).toUpperCase() + topic.slice(1)} is an important topic worth exploring. Whether you're a beginner or experienced enthusiast, understanding ${topic} can provide valuable insights and opportunities.`;
        mainContent = `## Understanding ${topic.charAt(0).toUpperCase() + topic.slice(1)}\n\n` +
          `${topic.charAt(0).toUpperCase() + topic.slice(1)} encompasses various aspects that are crucial for both beginners and experienced practitioners. This guide provides valuable insights to help you navigate this area effectively.\n\n` +
          `## Key Benefits\n\n` +
          `- Enhanced knowledge and understanding\n` +
          `- Practical applications in daily life\n` +
          `- Personal and professional growth\n` +
          `- New opportunities and possibilities\n` +
          `- Improved confidence and skills\n\n`;
    }
    
    article += intro + '\n\n';
    article += mainContent;
    
    // Practical tips
    if (wordCount >= 500) {
      article += `## Practical Tips and Best Practices\n\n`;
      article += `Here are some actionable tips to get started with ${topic}:\n\n`;
      
      const tips = getCategoryTips(category, topic);
      const numTips = Math.min(tips.length, Math.ceil(wordCount / 200));
      
      for (let i = 0; i < numTips; i++) {
        article += `${i + 1}. ${tips[i]}\n`;
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

  const getCategoryTips = (category, topic) => {
    const tipSets = {
      lifestyle: [
        'Set aside time each day for activities you enjoy',
        'Build meaningful relationships with family and friends',
        'Practice self-care and prioritize your wellbeing',
        'Set realistic goals and celebrate small wins',
        'Surround yourself with positive influences',
        'Take time to reflect on your experiences and growth'
      ],
      tech: [
        'Start with the fundamentals before moving to advanced topics',
        'Practice coding regularly to reinforce concepts',
        'Build projects to apply what you learn',
        'Join online communities for support and learning',
        'Read documentation and stay updated with new features',
        'Don\'t be afraid to experiment and make mistakes'
      ],
      health: [
        'Start with small, sustainable changes to your routine',
        'Stay hydrated and maintain a balanced diet',
        'Find physical activities you enjoy',
        'Get enough sleep and rest',
        'Manage stress through relaxation techniques',
        'Listen to your body and consult professionals when needed'
      ],
      business: [
        'Define clear goals and create an action plan',
        'Build a strong professional network',
        'Continuously develop your skills and knowledge',
        'Stay informed about industry trends and changes',
        'Focus on delivering value to your clients or customers',
        'Learn from both successes and failures'
      ],
      food: [
        'Start with simple recipes and gradually try more complex dishes',
        'Use fresh, quality ingredients whenever possible',
        'Experiment with different flavors and cuisines',
        'Learn basic knife skills and cooking techniques',
        'Keep a well-stocked pantry with essential ingredients',
        'Cook with family and friends to make it more enjoyable'
      ],
      general: [
        'Start with the basics and build a strong foundation',
        'Practice regularly to reinforce your understanding',
        'Seek out real-world examples and case studies',
        'Don\'t be afraid to make mistakes—they\'re learning opportunities',
        'Stay updated with the latest trends and developments',
        'Connect with a community of learners for support and insights'
      ]
    };
    
    return tipSets[category] || tipSets.general;
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
