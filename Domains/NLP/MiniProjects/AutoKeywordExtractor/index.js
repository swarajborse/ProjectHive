const express = require('express');
const extract = require('keyword-extractor');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Main route
app.get('/', (req, res) => {
  res.send(`
    <h1>Auto-Keyword Extractor</h1>
    <p>Intelligent automated keyword extraction engine for semantic content analysis and SEO optimization.</p>
    
    <h2>API Endpoint</h2>
    <p>POST /keywords</p>
    <p>Body: { "text": "your article or blog post content here" }</p>
    
    <h2>Try it out:</h2>
    <form id="keywordForm">
      <textarea id="contentInput" placeholder="Enter article or blog post content to extract keywords" rows="6" cols="60"></textarea><br><br>
      <button type="submit">Extract Keywords</button>
    </form>
    
    <div id="result"></div>
    
    <script>
      document.getElementById('keywordForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const text = document.getElementById('contentInput').value;
        
        const response = await fetch('/keywords', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text })
        });
        
        const data = await response.json();
        
        if (response.ok) {
          let keywordsHtml = '<h3>Extracted Keywords:</h3><ul>';
          data.keywords.forEach(keyword => {
            keywordsHtml += '<li>' + keyword + '</li>';
          });
          keywordsHtml += '</ul>';
          document.getElementById('result').innerHTML = keywordsHtml;
        } else {
          document.getElementById('result').innerHTML = '<p style="color: red;">Error: ' + data.error + '</p>';
        }
      });
    </script>
  `);
});

// API endpoint to extract keywords
app.post('/keywords', (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }
    
    if (text.length < 50) {
      return res.status(400).json({ error: 'Text is too short. Please provide a longer article or blog post.' });
    }
    
    const keywords = extract.extract(text, {
      language: "english",
      remove_digits: true,
      return_changed_case: false,
      remove_duplicates: true
    });
    
    res.json({ keywords: keywords.slice(0, 10) }); // Top 10
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log('Auto-Keyword Extractor server running on port ' + PORT);
  console.log('Visit http://localhost:' + PORT + ' to use the service');
});