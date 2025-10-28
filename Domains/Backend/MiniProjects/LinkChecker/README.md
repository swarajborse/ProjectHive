# 404 Link Checker

**Contributor:** Albus

## Description
A simple Node.js tool that crawls a website and reports broken (404) links. This tool helps website owners maintain SEO and user experience by identifying dead links on their pages.

## Features
- Crawls a given website URL
- Extracts all `<a href>` links from the page
- Checks HTTP status of each link
- Reports broken links with their status codes
- Simple and easy to use CLI interface

## Tech Stack
- **Runtime**: Node.js
- **HTTP Client**: axios
- **HTML Parser**: cheerio

## Setup

```bash
# Clone the repository (if cloning the whole project)
git clone <repository-url>

# Navigate to the project directory
cd Domains/Backend/MiniProjects/LinkChecker

# Install dependencies
npm install
```

## Usage

```bash
# Check links on a website
node index.js https://example.com

# Or with www prefix
node index.js www.example.com
```

## How It Works

1. Accepts a URL as input
2. Fetches the page content using axios
3. Parses HTML using cheerio to extract all `<a href>` links
4. Checks each link's HTTP status using HEAD requests (falls back to GET if HEAD fails)
5. Returns a list of broken links with their status codes

## Example Output

```
Checking links on: https://example.com
Found 12 links to check
✓ https://example.com/about
✓ https://example.com/contact
✗ https://example.com/nonexistent-page (404)
✗ https://broken-site.com/link (ENOTFOUND)

--- RESULTS ---
2 broken link(s) found:
- https://example.com/nonexistent-page (404)
- https://broken-site.com/link (ENOTFOUND)
```

## Limitations

- Only checks links on the provided page (level 1 depth)
- Does not recursively crawl the entire website
- May be slow for pages with many external links

## Contributing

Feel free to fork this project and submit pull requests with improvements. Some ideas for enhancements:
- Add recursive crawling options
- Export results to CSV/JSON
- Add concurrency for faster checking
- Implement rate limiting
- Add support for checking other HTTP methods

## License

This project is open source and available under the MIT License.