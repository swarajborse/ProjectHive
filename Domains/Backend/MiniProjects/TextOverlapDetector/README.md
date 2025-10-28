# Text Overlap Detector

**Contributor:** mekapilgupta

## Description
A JavaScript-based text overlapping score detector that calculates similarity between two texts using multiple algorithms including n-gram overlap, character frequency analysis, and longest common substring detection.

## Features
- Calculates text similarity using multiple algorithms
- N-gram overlap detection
- Character frequency analysis
- Longest common substring identification
- Weighted composite score
- Simple command-line interface
- No external dependencies

## Tech Stack
- **Runtime**: Node.js
- **Language**: JavaScript (ES6+ features)

## How It Works

The detector uses three main algorithms to calculate text similarity:

1. **N-gram Overlap**: Compares 2-character sequences between texts
2. **Character Frequency**: Analyzes character distribution patterns
3. **Common Substrings**: Finds the longest matching substring

The final score is a weighted combination:
- 40% N-gram overlap
- 30% Character frequency overlap
- 30% Common substring ratio

## Setup

```bash
# Clone the repository (if cloning the whole project)
git clone <repository-url>

# Navigate to the project directory
cd Domains/Backend/MiniProjects/TextOverlapDetector
```

## Usage

```bash
# Compare two texts
node index.js "text one" "text two"

# Run with sample texts
node index.js --sample
```

## Example Output

```
Text Overlap Detector
====================
Text 1: "The quick brown fox jumps over the lazy dog"
Text 2: "A quick brown dog jumps over the lazy fox"
====================
Overlap Score: 0.8234 (82.34%)
Interpretation: Very high similarity
```

## Programmatic Usage

```javascript
const TextOverlapDetector = require('./textOverlap');

const score = TextOverlapDetector.calculateOverlapScore(
  "hello world", 
  "hello there"
);

console.log(score); // Outputs similarity score between 0 and 1
```

## Key JavaScript Features Used

- Private static methods (`#methodName`) for encapsulation
- Set/Map operations with spread syntax
- Arrow functions and reduce for concise operations
- Object.fromEntries / Object.entries transformations
- Template literals for clean string output
- Destructuring and spread operators
- Nullish coalescing style access
- Array.from with fill for 2D array initialization

## Contributing

Feel free to fork this project and submit pull requests with improvements. Some ideas for enhancements:
- Add support for different n-gram sizes
- Implement additional similarity algorithms
- Add support for file input
- Create a web interface
- Add language-specific preprocessing

## License

This project is open source and available under the MIT License.