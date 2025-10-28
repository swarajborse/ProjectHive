const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory storage for URLs (also saved to file)
let urlDatabase = new Map();

// File to persist URL mappings
const DB_FILE = path.join(__dirname, 'urls.json');

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Load URLs from file on startup
async function loadUrlsFromFile() {
  try {
    const data = await fs.readFile(DB_FILE, 'utf8');
    const urls = JSON.parse(data);
    urlDatabase = new Map(Object.entries(urls));
    console.log(`Loaded ${urlDatabase.size} URLs from file`);
  } catch (error) {
    // File doesn't exist or is invalid, start with empty database
    console.log('Starting with empty URL database');
  }
}

// Save URLs to file
async function saveUrlsToFile() {
  try {
    const urls = Object.fromEntries(urlDatabase);
    await fs.writeFile(DB_FILE, JSON.stringify(urls, null, 2));
  } catch (error) {
    console.error('Error saving URLs to file:', error);
  }
}

// Generate a short code
function generateShortCode() {
  return Math.random().toString(36).substring(2, 8);
}

// Routes
app.get('/', (req, res) => {
  res.send(`
    <h1>URL Shortener</h1>
    <form id="shortenForm">
      <input type="url" id="urlInput" placeholder="Enter URL to shorten" required style="width: 300px; padding: 10px;">
      <button type="submit" style="padding: 10px 20px;">Shorten</button>
    </form>
    <div id="result" style="margin-top: 20px;"></div>
    
    <script>
      document.getElementById('shortenForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const url = document.getElementById('urlInput').value;
        
        const response = await fetch('/shorten', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url })
        });
        
        const data = await response.json();
        if (response.ok) {
          document.getElementById('result').innerHTML = 
            '<p>Short URL: <a href="' + data.shortUrl + '" target="_blank">' + data.shortUrl + '</a></p>';
        } else {
          document.getElementById('result').innerHTML = 
            '<p style="color: red;">Error: ' + data.error + '</p>';
        }
      });
    </script>
  `);
});

// API endpoint to shorten a URL
app.post('/shorten', async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }
    
    // Validate URL format
    try {
      new URL(url);
    } catch {
      return res.status(400).json({ error: 'Invalid URL format' });
    }
    
    // Generate short code
    let shortCode = generateShortCode();
    
    // Ensure uniqueness (very low chance of collision, but let's be safe)
    while (urlDatabase.has(shortCode)) {
      shortCode = generateShortCode();
    }
    
    // Store the mapping
    urlDatabase.set(shortCode, url);
    
    // Save to file
    await saveUrlsToFile();
    
    // Return the short URL
    const shortUrl = `${req.protocol}://${req.get('host')}/${shortCode}`;
    res.json({ shortUrl });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Redirect short URL to original URL
app.get('/:shortCode', (req, res) => {
  try {
    const { shortCode } = req.params;
    const originalUrl = urlDatabase.get(shortCode);
    
    if (originalUrl) {
      res.redirect(originalUrl);
    } else {
      res.status(404).send('URL not found');
    }
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

// API endpoint to get stats
app.get('/stats/:shortCode', (req, res) => {
  try {
    const { shortCode } = req.params;
    const originalUrl = urlDatabase.get(shortCode);
    
    if (originalUrl) {
      res.json({ 
        shortCode, 
        originalUrl,
        shortUrl: `${req.protocol}://${req.get('host')}/${shortCode}`
      });
    } else {
      res.status(404).json({ error: 'URL not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
async function startServer() {
  await loadUrlsFromFile();
  
  app.listen(PORT, () => {
    console.log(`URL Shortener server running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} to use the service`);
  });
}

startServer();