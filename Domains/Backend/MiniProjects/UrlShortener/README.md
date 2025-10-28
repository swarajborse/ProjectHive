# URL Shortener

**Contributor:** mekapilgupta

## Description
A simple URL shortener service that converts long URLs into short, shareable links. This project demonstrates REST APIs, routing, and HTTP redirects.

## Features
- Shorten long URLs into compact links
- Redirect short URLs to original URLs
- Persistent storage using JSON file
- Simple web interface
- RESTful API endpoints

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Storage**: JSON file (no database required)

## Setup

```bash
# Clone the repository (if cloning the whole project)
git clone <repository-url>

# Navigate to the project directory
cd Domains/Backend/MiniProjects/UrlShortener

# Install dependencies
npm install
```

## Usage

```bash
# Start the server
npm start

# Or for development with auto-restart
npm run dev
```

Visit `http://localhost:3000` in your browser to use the web interface.

## API Endpoints

### Shorten a URL
```
POST /shorten
Content-Type: application/json

{
  "url": "https://example.com/very/long/url/that/needs/shortening"
}

Response:
{
  "shortUrl": "http://localhost:3000/a1b2c3"
}
```

### Redirect to Original URL
```
GET /:shortCode
```
This endpoint automatically redirects to the original URL.

### Get URL Information
```
GET /stats/:shortCode
```
Returns information about the shortened URL.

## How It Works

1. User submits a long URL via the web interface or API
2. Server generates a unique short code
3. URL mapping is stored in memory and saved to a JSON file
4. User receives the short URL
5. When someone visits the short URL, they're redirected to the original URL

## Example Usage

1. Visit `http://localhost:3000`
2. Enter a long URL in the input field
3. Click "Shorten"
4. Copy the generated short URL
5. Visit the short URL to be redirected to the original URL

## File Storage

URL mappings are automatically saved to `urls.json` in the project directory. This file persists between server restarts.

## Contributing

Feel free to fork this project and submit pull requests with improvements. Some ideas for enhancements:
- Add expiration dates for URLs
- Implement click tracking
- Add URL analytics
- Create custom short codes
- Add authentication for URL management

## License

This project is open source and available under the MIT License.