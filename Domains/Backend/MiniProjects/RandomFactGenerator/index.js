const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
const PORT = process.env.PORT || 3000;

// Cache to store the fact and its timestamp
let factCache = {
  data: null,
  timestamp: null
};

// Cache duration: 1 hour (in milliseconds)
const CACHE_DURATION = 60 * 60 * 1000;

// Function to fetch a new fact from the API
async function fetchNewFact() {
  try {
    const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const fact = await response.json();
    return {
      text: fact.text,
      source: fact.source,
      permalink: fact.permalink
    };
  } catch (error) {
    console.error('Error fetching fact:', error);
    throw error;
  }
}

// Function to get a fact (either from cache or fresh from API)
async function getFact() {
  const now = Date.now();
  
  // Check if we have a cached fact and if it's still valid
  if (factCache.data && factCache.timestamp && (now - factCache.timestamp) < CACHE_DURATION) {
    console.log('Returning cached fact');
    return factCache.data;
  }
  
  // Fetch a new fact
  console.log('Fetching new fact from API');
  const newFact = await fetchNewFact();
  
  // Update cache
  factCache.data = newFact;
  factCache.timestamp = now;
  
  return newFact;
}

// Main route
app.get('/', (req, res) => {
  res.send(`
    <h1>Random Fact Generator</h1>
    <p>Get a random verified fact on every request.</p>
    
    <h2>How to use:</h2>
    <p>GET /fact - Returns a random fact</p>
    <p><a href="/fact">Try it now</a> - Click to get a random fact!</p>
    
    <h2>About</h2>
    <p>This service uses the <a href="https://uselessfacts.jsph.pl/">Useless Facts API</a> to provide interesting facts.</p>
    <p>Facts are cached for 1 hour to reduce load and respect the API.</p>
  `);
});

// API endpoint to get a random fact
app.get('/fact', async (req, res) => {
  try {
    const fact = await getFact();
    res.json(fact);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch fact',
      message: error.message 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Random Fact Generator server running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to use the service`);
  console.log(`API endpoint: http://localhost:${PORT}/fact`);
});