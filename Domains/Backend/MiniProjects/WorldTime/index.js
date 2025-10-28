const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static('public'));

// Main route
app.get('/', (req, res) => {
  res.send(`
    <h1>World Time by City</h1>
    <p>Get current local time for any city without dealing with timezone math.</p>
    
    <h2>How to use:</h2>
    <p>GET /time/:region/:city</p>
    <p>Example: <a href="/time/America/New_York">/time/America/New_York</a></p>
    
    <h2>Try it:</h2>
    <form id="timeForm">
      <select id="regionSelect">
        <option value="America">America</option>
        <option value="Europe">Europe</option>
        <option value="Asia">Asia</option>
        <option value="Africa">Africa</option>
        <option value="Australia">Australia</option>
      </select>
      <input type="text" id="cityInput" placeholder="City" required>
      <button type="submit">Get Time</button>
    </form>
    
    <div id="result"></div>
    
    <script>
      document.getElementById('timeForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const region = document.getElementById('regionSelect').value;
        const city = document.getElementById('cityInput').value.replace(/\s+/g, '_');
        
        try {
          const response = await fetch(\`/time/\${region}/\${city}\`);
          const data = await response.json();
          
          if (response.ok) {
            document.getElementById('result').innerHTML = \`
              <h3>Time in \${region}/\${city.replace(/_/g, ' ')}:</h3>
              <p><strong>Local Time:</strong> \${new Date(data.datetime).toLocaleString()}</p>
              <p><strong>Timezone:</strong> \${data.timezone}</p>
              <p><strong>Day of Week:</strong> \${data.day_of_week}</p>
            \`;
          } else {
            document.getElementById('result').innerHTML = \`<p style="color: red;">Error: \${data.error}</p>\`;
          }
        } catch (error) {
          document.getElementById('result').innerHTML = \`<p style="color: red;">Error: \${error.message}</p>\`;
        }
      });
    </script>
  `);
});

// API endpoint to get time for a specific region/city
app.get('/time/:region/:city', async (req, res) => {
  try {
    const { region, city } = req.params;
    const formattedCity = city.replace(/\s+/g, '_');
    const url = `https://worldtimeapi.org/api/timezone/${region}/${formattedCity}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      return res.status(response.status).json({ 
        error: `Failed to fetch time data for ${region}/${formattedCity}` 
      });
    }
    
    const data = await response.json();
    
    res.json({
      datetime: data.datetime,
      timezone: data.timezone,
      day_of_week: data.day_of_week
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`World Time server running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to use the service`);
});