const axios = require('axios');

class GoogleMapsScraper {
  constructor() {
    this.client = axios.create({
      timeout: 30000
    });
    this.serpApiKey = process.env.SERP_API_KEY;
  }

  // Main method to get business data
  async scrapeGoogleMaps({ search, location, limit = 10 }) {
    try {
      console.log(`Searching: ${search} in ${location}`);

      if (!this.serpApiKey) {
        throw new Error('SERP_API_KEY missing in .env file');
      }

      const businesses = await this.useSerpApi(search, location, limit);

      if (businesses.length === 0) {
        throw new Error('No businesses found');
      }

      console.log(`Found ${businesses.length} businesses`);
      return businesses;

    } catch (error) {
      console.error('Error:', error.message);
      throw error;
    }
  }

  // Use SerpAPI for reliable data
  async useSerpApi(search, location, limit) {
    const url = 'https://serpapi.com/search.json';

    const response = await this.client.get(url, {
      params: {
        engine: 'google_maps',
        q: `${search} ${location}`,
        type: 'search',
        api_key: this.serpApiKey
      }
    });

    if (response.data.local_results) {
      return response.data.local_results
        .slice(0, limit)
        .map(business => ({
          name: business.title,
          address: business.address,
          rating: business.rating,
          link: business.gps_coordinates ?
            `https://maps.google.com/?q=${business.gps_coordinates.latitude},${business.gps_coordinates.longitude}` :
            `https://maps.google.com/search/${encodeURIComponent(business.title)}`,
          source: "Google Maps",
          type: search,
          timestamp: new Date().toISOString()
        }));
    }

    return [];
  }
}

module.exports = new GoogleMapsScraper();