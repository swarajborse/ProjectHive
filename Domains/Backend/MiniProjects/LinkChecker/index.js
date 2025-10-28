const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Checks for broken links on a webpage
 * @param {string} url - The URL to check
 * @returns {Promise<Array>} - Array of broken links
 */
async function checkBrokenLinks(url) {
  try {
    // Validate URL
    if (!url.startsWith('http')) {
      url = 'https://' + url;
    }

    console.log(`Checking links on: ${url}`);
    
    // Fetch the page
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    
    // Extract all links
    const links = [];
    $('a[href]').each((i, elem) => {
      const href = $(elem).attr('href');
      // Only check http/https links, skip anchors, mailto, etc.
      if (href && (href.startsWith('http') || href.startsWith('//'))) {
        let fullUrl = href;
        if (href.startsWith('//')) {
          // Handle protocol-relative URLs
          fullUrl = 'https:' + href;
        } else if (href.startsWith('/')) {
          // Handle relative URLs
          const baseUrl = new URL(url);
          fullUrl = baseUrl.origin + href;
        }
        links.push(fullUrl);
      } else if (href && href.startsWith('/')) {
        // Handle relative paths
        const baseUrl = new URL(url);
        const fullUrl = baseUrl.origin + href;
        links.push(fullUrl);
      }
    });
    
    console.log(`Found ${links.length} links to check`);
    
    // Check each link
    const brokenLinks = [];
    for (const link of links) {
      try {
        // Skip checking the same domain as the input URL to avoid infinite loops
        const inputUrlObj = new URL(url);
        const linkUrlObj = new URL(link);
        
        // Only check external links or different paths on same domain
        // For this simple version, we'll check all links
        await axios.head(link);
        console.log(`✓ ${link}`);
      } catch (error) {
        // If HEAD fails, try GET as some servers block HEAD requests
        try {
          await axios.get(link);
          console.log(`✓ ${link}`);
        } catch (getError) {
          // Both HEAD and GET failed, likely a broken link
          const status = getError.response ? getError.response.status : 'Unknown';
          console.log(`✗ ${link} (${status})`);
          brokenLinks.push({
            url: link,
            status: status
          });
        }
      }
    }
    
    return brokenLinks;
  } catch (error) {
    console.error(`Error fetching page: ${error.message}`);
    return [{
      url: url,
      status: error.message,
      error: true
    }];
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  let url = args[0];
  
  if (!url) {
    console.log('Usage: node index.js <url>');
    console.log('Example: node index.js https://example.com');
    process.exit(1);
  }
  
  const brokenLinks = await checkBrokenLinks(url);
  
  console.log('\n--- RESULTS ---');
  if (brokenLinks.length === 0) {
    console.log('No broken links found! All links are working.');
  } else {
    console.log(`${brokenLinks.length} broken link(s) found:`);
    brokenLinks.forEach(link => {
      console.log(`- ${link.url} (${link.status})`);
    });
  }
}

if (require.main === module) {
  main();
}

module.exports = { checkBrokenLinks };