const { calculateToxicity } = require('./index');

console.log('Toxic Comment Detector - Test Cases');
console.log('===================================');

// Test case 1: Non-toxic comment
const test1 = "This is a great article! I really enjoyed reading it.";
const result1 = calculateToxicity(test1);
console.log('\nTest 1 - Non-toxic comment:');
console.log('Text:', test1);
console.log('Toxic:', result1.toxic);
console.log('Score:', result1.score);

// Test case 2: Toxic comment with negative sentiment
const test2 = "This is terrible! I hate this stupid article.";
const result2 = calculateToxicity(test2);
console.log('\nTest 2 - Toxic comment with negative sentiment:');
console.log('Text:', test2);
console.log('Toxic:', result2.toxic);
console.log('Score:', result2.score);

// Test case 3: Comment with toxic words
const test3 = "You are an idiot!";
const result3 = calculateToxicity(test3);
console.log('\nTest 3 - Comment with toxic words:');
console.log('Text:', test3);
console.log('Toxic:', result3.toxic);
console.log('Score:', result3.score);

// Test case 4: Neutral comment
const test4 = "The weather is nice today.";
const result4 = calculateToxicity(test4);
console.log('\nTest 4 - Neutral comment:');
console.log('Text:', test4);
console.log('Toxic:', result4.toxic);
console.log('Score:', result4.score);

// Test case 5: Mixed sentiment
const test5 = "I love this but it's kind of stupid.";
const result5 = calculateToxicity(test5);
console.log('\nTest 5 - Mixed sentiment:');
console.log('Text:', test5);
console.log('Toxic:', result5.toxic);
console.log('Score:', result5.score);

console.log('\n===================================');
console.log('Testing completed successfully!');