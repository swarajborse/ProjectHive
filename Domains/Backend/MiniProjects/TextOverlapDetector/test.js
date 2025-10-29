const TextOverlapDetector = require('./textOverlap');

console.log('Text Overlap Detector - Test Cases');
console.log('==================================');

// Test case 1: Similar texts
const text1 = "The quick brown fox jumps over the lazy dog";
const text2 = "A quick brown dog jumps over the lazy fox";
const score1 = TextOverlapDetector.calculateOverlapScore(text1, text2);
console.log(`\nTest 1:`);
console.log(`Text 1: "${text1}"`);
console.log(`Text 2: "${text2}"`);
console.log(`Score: ${score1.toFixed(4)} (${(score1 * 100).toFixed(2)}%)`);

// Test case 2: Identical texts
const text3 = "Hello world";
const text4 = "Hello world";
const score2 = TextOverlapDetector.calculateOverlapScore(text3, text4);
console.log(`\nTest 2:`);
console.log(`Text 3: "${text3}"`);
console.log(`Text 4: "${text4}"`);
console.log(`Score: ${score2.toFixed(4)} (${(score2 * 100).toFixed(2)}%)`);

// Test case 3: Different texts
const text5 = "The weather is nice today";
const text6 = "Programming is fun and challenging";
const score3 = TextOverlapDetector.calculateOverlapScore(text5, text6);
console.log(`\nTest 3:`);
console.log(`Text 5: "${text5}"`);
console.log(`Text 6: "${text6}"`);
console.log(`Score: ${score3.toFixed(4)} (${(score3 * 100).toFixed(2)}%)`);

// Test case 4: Partially similar texts
const text7 = "I love programming in JavaScript";
const text8 = "JavaScript is my favorite programming language";
const score4 = TextOverlapDetector.calculateOverlapScore(text7, text8);
console.log(`\nTest 4:`);
console.log(`Text 7: "${text7}"`);
console.log(`Text 8: "${text8}"`);
console.log(`Score: ${score4.toFixed(4)} (${(score4 * 100).toFixed(2)}%)`);

console.log('\n==================================');
console.log('Testing completed successfully!');