const express = require('express');
const Sentiment = require('sentiment');
const sentiment = new Sentiment();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// In-memory storage for custom toxic words (in a real app, this would be in a database)
const toxicWords = new Set([
  'hate', 'kill', 'stupid', 'idiot', 'dumb', 'moron', 'shit', 'damn', 
  'hell', 'ass', 'bastard', 'bitch', 'crap', 'dick', 'piss', 'slut',
  'whore', 'faggot', 'nigger', 'retard', 'suck', 'loser', 'useless'
]);

// Function to check for toxic words
function containsToxicWords(text) {
  const words = text.toLowerCase().split(/\s+/);
  return words.some(word => toxicWords.has(word.replace(/[^a-z]/g, '')));
}

// Function to calculate toxicity
function calculateToxicity(text) {
  // Analyze sentiment
  const result = sentiment.analyze(text);
  
  // Check for toxic words
  const hasToxicWords = containsToxicWords(text);
  
  // Calculate toxicity score
  // Negative sentiment score contributes to toxicity
  // Presence of toxic words increases toxicity
  let toxicityScore = 0;
  
  // Base on sentiment score (more negative = more toxic)
  if (result.score < 0) {
    toxicityScore = Math.abs(result.score) / 10;
  }
  
  // Boost score if toxic words are present
  if (hasToxicWords) {
    toxicityScore += 0.3;
  }
  
  // Cap at 1.0
  toxicityScore = Math.min(toxicityScore, 1.0);
  
  // Determine if toxic based on threshold
  const isToxic = toxicityScore > 0.2;
  
  return {
    toxic: isToxic,
    score: parseFloat(toxicityScore.toFixed(4)),
    sentiment: result,
    hasToxicWords
  };
}

// Main route
app.get('/', (req, res) => {
  res.send(`
    <h1>Toxic Comment Detector</h1>
    <p>Detect if a user comment is toxic/abusive.</p>
    
    <h2>API Endpoint</h2>
    <p>POST /check-toxicity</p>
    <p>Body: { "text": "your comment here" }</p>
    
    <h2>Try it out:</h2>
    <form id="toxicForm">
      <textarea id="commentInput" placeholder="Enter a comment to check for toxicity" rows="4" cols="50"></textarea><br><br>
      <button type="submit">Check Toxicity</button>
    </form>
    
    <div id="result"></div>
    
    <script>
      document.getElementById('toxicForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const text = document.getElementById('commentInput').value;
        
        const response = await fetch('/check-toxicity', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text })
        });
        
        const data = await response.json();
        
        document.getElementById('result').innerHTML = 
          '<h3>Result:</h3>' +
          '<p><strong>Toxic:</strong> ' + (data.toxic ? 'Yes' : 'No') + '</p>' +
          '<p><strong>Toxicity Score:</strong> ' + data.score + ' (0-1 scale)</p>' +
          '<p><strong>Sentiment Score:</strong> ' + data.sentiment.score + '</p>';
      });
    </script>
  `);
});

// API endpoint to check toxicity
app.post('/check-toxicity', (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }
    
    const result = calculateToxicity(text);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log('Toxic Comment Detector server running on port ' + PORT);
  console.log('Visit http://localhost:' + PORT + ' to use the service');
});

module.exports = { calculateToxicity, containsToxicWords };