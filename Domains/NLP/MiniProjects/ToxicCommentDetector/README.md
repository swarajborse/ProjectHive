# Toxic Comment Detector

**Contributor:** mekapilgupta

## Description
A simple Node.js application that detects if a user comment is toxic or abusive. Useful for forums, comment sections, or chat moderation.

## Features
- Detects toxic comments using sentiment analysis
- Custom keyword filtering for explicit words
- RESTful API endpoint for integration
- Web interface for testing
- No external API keys required

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **NLP Library**: Sentiment.js
- **Custom Logic**: Keyword-based filtering

## Setup

```bash
# Clone the repository (if cloning the whole project)
git clone <repository-url>

# Navigate to the project directory
cd Domains/NLP/MiniProjects/ToxicCommentDetector

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

## API Endpoint

### Check Comment Toxicity
```
POST /check-toxicity
Content-Type: application/json

{
  "text": "This is a sample comment to check"
}

Response:
{
  "toxic": false,
  "score": 0.1,
  "sentiment": {
    "score": 2,
    "comparative": 0.18181818181818182,
    "calculation": [...],
    "tokens": [...],
    "words": [...],
    "positive": [...],
    "negative": []
  },
  "hasToxicWords": false
}
```

## How It Works

1. User submits a comment via the API or web interface
2. Application analyzes the sentiment of the text using Sentiment.js
3. Application checks for predefined toxic keywords
4. Toxicity score is calculated based on:
   - Negative sentiment score (more negative = more toxic)
   - Presence of toxic keywords (adds to toxicity score)
5. Comment is flagged as toxic if score exceeds threshold (0.2)

## Example Usage

1. Visit `http://localhost:3000`
2. Enter a comment in the text area
3. Click "Check Toxicity"
4. View the results including toxicity score and sentiment analysis

## Customization

You can customize the toxic words list by modifying the `toxicWords` Set in [index.js](file://c:\Users\Albus\Documents\GitHub\ProjectHive\Domains\Backend\MiniProjects\RandomFactGenerator\index.js#L11-L20):
```javascript
const toxicWords = new Set([
  'hate', 'kill', 'stupid', 'idiot', // Add or remove words as needed
]);
```

You can also adjust the toxicity threshold in the [calculateToxicity](file://c:\Users\Albus\Documents\GitHub\ProjectHive\Domains\Backend\MiniProjects\RandomFactGenerator\index.js#L36-L57) function:
```javascript
const isToxic = toxicityScore > 0.2; // Adjust threshold as needed
```

## Contributing

Feel free to fork this project and submit pull requests with improvements. Some ideas for enhancements:
- Add support for multiple languages
- Implement machine learning-based detection
- Add profanity filtering with regex patterns
- Create a dashboard for monitoring toxic comments
- Add support for custom word lists

## License

This project is open source and available under the MIT License.