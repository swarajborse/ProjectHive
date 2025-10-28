# Random Fact Generator

**Contributor:** mekapilgupta

## Description
Serves a random verified fact on every request. This project uses the Useless Facts API to provide interesting and educational facts that can be used in chatbots, classroom tools, or social media bots.

## Features
- Returns a random verified fact on every request
- Caches facts for 1 hour to reduce API load
- Simple REST API endpoint
- Web interface for easy testing
- No authentication required
- Free to use

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **API**: [Useless Facts API](https://uselessfacts.jsph.pl/)

## Setup

```bash
# Clone the repository (if cloning the whole project)
git clone <repository-url>

# Navigate to the project directory
cd Domains/Backend/MiniProjects/RandomFactGenerator

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

### Get a Random Fact
```
GET /fact

Response:
{
  "text": "The average person walks the equivalent of three times around the world in a lifetime.",
  "source": "https://uselessfacts.jsph.pl/",
  "permalink": "https://uselessfacts.jsph.pl/8749382749823749823"
}
```

## How It Works

1. User requests a random fact via the API endpoint
2. Server checks if there's a cached fact that's less than 1 hour old
3. If there's a valid cached fact, it returns that
4. If not, it fetches a new fact from the Useless Facts API
5. Server caches the new fact with a timestamp
6. Server returns the fact to the user

## Caching

Facts are cached for 1 hour (3600 seconds) to:
- Reduce load on the Useless Facts API
- Improve response times
- Respect the free service

## Example Usage

1. Visit `http://localhost:3000`
2. Click on the "Try it now" link
3. View a random fact
4. Refresh the page or click the link again to get the same fact for up to 1 hour
5. After 1 hour, a new fact will be fetched

## Contributing

Feel free to fork this project and submit pull requests with improvements. Some ideas for enhancements:
- Add support for multiple languages
- Implement category-based facts
- Create a fact history feature
- Add text-to-speech functionality
- Implement a favorites feature

## License

This project is open source and available under the MIT License.