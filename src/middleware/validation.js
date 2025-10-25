const validateScrapeRequest = (req, res, next) => {
  const { search, location, limit = 20 } = req.body;
  const errors = [];

  if (!search || typeof search !== 'string' || search.trim().length === 0) {
    errors.push('Search term is required and must be a non-empty string');
  }

  if (!location || typeof location !== 'string' || location.trim().length === 0) {
    errors.push('Location is required and must be a non-empty string');
  }

  if (limit && (isNaN(limit) || limit < 1 || limit > 50)) {
    errors.push('Limit must be a number between 1 and 50');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors
    });
  }

  // Add cleaned data to request
  req.body.search = search.trim();
  req.body.location = location.trim();
  req.body.limit = Math.min(parseInt(limit), 50);

  next();
};

module.exports = { validateScrapeRequest };