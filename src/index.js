require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

// Import scraper
const scraper = require('./scraper');

// Security and middleware setup
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting - 30 requests per minute
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 30,
  message: { error: 'Too many requests' }
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Google Maps Real-Time API',
    status: 'LIVE',
    timestamp: new Date().toISOString()
  });
});

// Main scraping endpoint
app.post('/scrape', limiter, async (req, res) => {
  try {
    const { search, location, limit = 10 } = req.body;

    // Validate required parameters
    if (!search || !location) {
      return res.status(400).json({
        error: 'Search and location parameters required'
      });
    }

    console.log(`Request: ${search} in ${location}`);

    // Get business data
    const data = await scraper.scrapeGoogleMaps({
      search,
      location,
      limit: Math.min(parseInt(limit), 20)
    });

    // Return JSON array
    res.json(data);

  } catch (error) {
    console.error('Server error:', error.message);
    res.status(500).json({
      error: error.message
    });
  }
});

// Test endpoint
app.post('/test', async (req, res) => {
  try {
    const { search = "pizza", location = "new york", limit = 3 } = req.body;

    console.log(`Test request: ${search} in ${location}`);

    const data = await scraper.scrapeGoogleMaps({ search, location, limit });

    res.json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API ready at http://localhost:${PORT}`);
});