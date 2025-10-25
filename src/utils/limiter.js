const rateLimit = require('express-rate-limit');

const createScraperLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 50 requests per windowMs
  message: {
    error: 'Too many scraping requests from this IP, please try again after 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { createScraperLimiter };