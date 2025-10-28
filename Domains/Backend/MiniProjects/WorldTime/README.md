# World Time by City

**Contributor:** mekapilgupta

## Description
Get current local time for any city without dealing with timezone math. This project uses the World Time API to fetch accurate time data for cities around the world.

## Features
- Get current time for any city worldwide
- Simple REST API endpoint
- Web interface for easy testing
- No authentication required
- Free to use with open CORS

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **API**: [World Time API](https://worldtimeapi.org/)

## Setup

```bash
# Clone the repository (if cloning the whole project)
git clone <repository-url>

# Navigate to the project directory
cd Domains/Backend/MiniProjects/WorldTime

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

### Get Time for a City
```
GET /time/:region/:city

Example:
GET /time/America/New_York
GET /time/Europe/London
GET /time/Asia/Tokyo

Response:
{
  "datetime": "2023-10-28T14:30:45.123456-04:00",
  "timezone": "America/New_York",
  "day_of_week": 6
}
```

## How It Works

1. User requests time for a specific region/city
2. Server calls the World Time API with the provided parameters
3. Server returns formatted time data to the client
4. User can see the current local time for any city

## Example Usage

1. Visit `http://localhost:3000`
2. Select a region from the dropdown
3. Enter a city name
4. Click "Get Time"
5. View the current time for that city

## Supported Regions

- America (e.g., New_York, Los_Angeles)
- Europe (e.g., London, Paris)
- Asia (e.g., Tokyo, Singapore)
- Africa (e.g., Cairo, Lagos)
- Australia (e.g., Sydney, Melbourne)

## Contributing

Feel free to fork this project and submit pull requests with improvements. Some ideas for enhancements:
- Add search functionality for cities
- Implement time difference calculations
- Add support for multiple cities comparison
- Create a favorites feature
- Add time formatting options

## License

This project is open source and available under the MIT License.