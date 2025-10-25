Google Maps Scraper API
A real-time Node.js backend API that scrapes business data from Google Maps using SerpAPI. Returns clean JSON data without any database storage.

🚀 Features
Real-time business data from Google Maps

Pure JSON responses

Rate limiting and security headers

No database - fresh data every request

Easy to deploy and scale

📦 Installation

# Clone repository
git clone https://github.com/yourusername/google-maps-scraper.git
cd google-maps-scraper

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

⚙️ Environment Variables
Create a .env file:

PORT=3000
SERP_API_KEY=your_serpapi_key_here


🛠️ Usage
Start Server
npm start

API Endpoints
Health Check

GET /

Scrape Businesses

POST /scrape
Content-Type: application/json

{
  "search": "restaurant",
  "location": "delhi",
  "limit": 5
}

Test Endpoint

POST /test
Content-Type: application/json

{
  "search": "pizza",
  "location": "new york",
  "limit": 3
}

📋 Example Requests
Using PowerShell

# Basic search
Invoke-RestMethod -Uri "http://localhost:3000/scrape" -Method POST -ContentType "application/json" -Body '{"search":"restaurant","location":"delhi","limit":3}'

# Hotels in Mumbai
Invoke-RestMethod -Uri "http://localhost:3000/scrape" -Method POST -ContentType "application/json" -Body '{"search":"hotel","location":"mumbai","limit":2}'

# Coffee shops in Bangalore
Invoke-RestMethod -Uri "http://localhost:3000/scrape" -Method POST -ContentType "application/json" -Body '{"search":"coffee","location":"bangalore","limit":3}'

📤 Response Format

[
  {
    "name": "Business Name",
    "address": "Full address with city and PIN",
    "rating": 4.5,
    "link": "https://maps.google.com/...",
    "source": "Google Maps",
    "type": "search term",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
]

