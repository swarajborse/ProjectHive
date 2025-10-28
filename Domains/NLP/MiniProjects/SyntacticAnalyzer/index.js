const express = require('express');
const nlp = require('compromise');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Main route
app.get('/', (req, res) => {
  res.send(`
    <h1>Syntactic Analyzer</h1>
    <p>Advanced morphosyntactic parsing engine for computational linguistics applications.</p>
    
    <h2>API Endpoint</h2>
    <p>POST /pos</p>
    <p>Body: { "text": "Your sentence for part-of-speech tagging" }</p>
    
    <h2>Try it out:</h2>
    <form id="posForm">
      <textarea id="sentenceInput" placeholder="Enter a sentence for part-of-speech tagging" rows="4" cols="50">The cat sat on the mat.</textarea><br><br>
      <button type="submit">Analyze Syntax</button>
    </form>
    
    <div id="result"></div>
    
    <script>
      document.getElementById('posForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const text = document.getElementById('sentenceInput').value;
        
        const response = await fetch('/pos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text })
        });
        
        const data = await response.json();
        
        if (response.ok) {
          let resultHtml = '<h3>Part-of-Speech Tags:</h3><ul>';
          data.tokens.forEach(token => {
            resultHtml += '<li><strong>' + token.word + '</strong>: ' + token.pos + '</li>';
          });
          resultHtml += '</ul>';
          document.getElementById('result').innerHTML = resultHtml;
        } else {
          document.getElementById('result').innerHTML = '<p style="color: red;">Error: ' + data.error + '</p>';
        }
      });
    </script>
  `);
});

// API endpoint for POS tagging
app.post('/pos', (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }
    
    const doc = nlp(text);
    const tokens = doc.terms().out('array').map((t, i) => {
      const term = nlp(t);
      const tags = term.json()[0]?.tags || [];
      // Get the most specific POS tag
      const pos = tags.length > 0 ? tags[tags.length - 1] : 'Unknown';
      return { word: t, pos: pos };
    });
    
    res.json({ tokens });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log('Syntactic Analyzer server running on port ' + PORT);
  console.log('Visit http://localhost:' + PORT + ' to use the service');
});