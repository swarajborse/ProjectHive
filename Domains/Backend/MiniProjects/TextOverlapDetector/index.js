const TextOverlapDetector = require('./textOverlap');

// Simple CLI interface
function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.log('Usage: node index.js "text1" "text2"');
    console.log('Example: node index.js "hello world" "hello there"');
    console.log('\nOr run with sample texts: node index.js --sample');
    return;
  }
  
  let text1, text2;
  
  if (args[0] === '--sample') {
    // Sample texts for demonstration
    text1 = "The quick brown fox jumps over the lazy dog";
    text2 = "A quick brown dog jumps over the lazy fox";
  } else {
    text1 = args[0];
    text2 = args[1];
  }
  
  console.log('Text Overlap Detector');
  console.log('====================');
  console.log(`Text 1: "${text1}"`);
  console.log(`Text 2: "${text2}"`);
  console.log('====================');
  
  const score = TextOverlapDetector.calculateOverlapScore(text1, text2);
  console.log(`Overlap Score: ${score.toFixed(4)} (${(score * 100).toFixed(2)}%)`);
  
  // Provide interpretation
  if (score > 0.8) {
    console.log('Interpretation: Very high similarity');
  } else if (score > 0.6) {
    console.log('Interpretation: High similarity');
  } else if (score > 0.4) {
    console.log('Interpretation: Moderate similarity');
  } else if (score > 0.2) {
    console.log('Interpretation: Low similarity');
  } else {
    console.log('Interpretation: Very low similarity');
  }
}

// If run directly, execute main function
if (require.main === module) {
  main();
}

module.exports = TextOverlapDetector;