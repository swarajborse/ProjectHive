#!/usr/bin/env node

/**
 * Test Script for Leaderboard Generation
 * 
 * This script tests the leaderboard generation locally before pushing
 * Usage: node scripts/testLeaderboard.js
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Leaderboard Generation...\n');

// Test 1: Check if required directories exist
console.log('📁 Test 1: Checking directories...');
const domainsDir = path.join(__dirname, '../Domains');
const leaderboardDir = path.join(__dirname, '../DomainsLeaderboards');
const hallOfFameDir = path.join(__dirname, '../HallOfFame');

if (!fs.existsSync(domainsDir)) {
  console.error('❌ Domains directory not found!');
  process.exit(1);
}
console.log('✅ Domains directory exists');

if (!fs.existsSync(leaderboardDir)) {
  console.log('⚠️  Creating DomainsLeaderboards directory...');
  fs.mkdirSync(leaderboardDir, { recursive: true });
}
console.log('✅ DomainsLeaderboards directory exists');

if (!fs.existsSync(hallOfFameDir)) {
  console.log('⚠️  Creating HallOfFame directory...');
  fs.mkdirSync(hallOfFameDir, { recursive: true });
}
console.log('✅ HallOfFame directory exists\n');

// Test 2: Scan for contributors
console.log('👥 Test 2: Scanning for contributors...');

let testContributors = {};
let filesScanned = 0;
let contributorsFound = 0;

function testScanDirectory(dir, domain) {
  try {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        testScanDirectory(itemPath, domain);
      } else if (stat.isFile() && (item.endsWith('.md') || item.endsWith('.txt'))) {
        filesScanned++;
        const content = fs.readFileSync(itemPath, 'utf8');
        
        // Test patterns
        const patterns = [
          /\*\*Contributor:\*\*\s*([\w\-]+)/gi,
          /\*\*Contributor\*\*:\s*([\w\-]+)/gi,
          /Contributor:\s*\*\*([\w\-]+)\*\*/gi,
          /Contributor:\s*([\w\-]+)/gi,
        ];
        
        patterns.forEach(pattern => {
          const matches = content.matchAll(pattern);
          
          for (const match of matches) {
            let username = match[1];
            if (!username) continue;
            
            username = username.trim().replace(/\*+/g, '').replace(/\[|\]|\(|\)/g, '').trim();
            
            // Validate username
            if (!username || username.length === 0 || username.length > 39) continue;
            if (!/^[a-zA-Z0-9]([a-zA-Z0-9\-]*[a-zA-Z0-9])?$/.test(username)) continue;
            
            // Skip placeholders
            const placeholders = ['yourname', 'username', 'yourusername', 'yourgithubusername', 'contributor'];
            if (placeholders.includes(username.toLowerCase())) {
              console.log(`⚠️  Skipping placeholder: ${username} in ${itemPath}`);
              continue;
            }
            
            if (!testContributors[username]) {
              testContributors[username] = [];
            }
            testContributors[username].push({ domain, file: itemPath });
            contributorsFound++;
            console.log(`✓ Found: ${username} in ${domain}`);
            break;
          }
        });
      }
    });
  } catch (err) {
    console.error(`Error scanning ${dir}:`, err.message);
  }
}

// Scan all domains
const domains = fs.readdirSync(domainsDir);
domains.forEach(domain => {
  const domainPath = path.join(domainsDir, domain);
  if (!fs.statSync(domainPath).isDirectory()) return;
  
  ['MiniProjects', 'Starter-Templates', 'Programs'].forEach(subdir => {
    const subdirPath = path.join(domainPath, subdir);
    if (fs.existsSync(subdirPath)) {
      testScanDirectory(subdirPath, domain);
    }
  });
});

console.log(`\n📊 Test Results:`);
console.log(`   Files scanned: ${filesScanned}`);
console.log(`   Unique contributors: ${Object.keys(testContributors).length}`);
console.log(`   Total contributions: ${contributorsFound}\n`);

if (Object.keys(testContributors).length === 0) {
  console.log('⚠️  No contributors found!');
  console.log('   Make sure your README files include: **Contributor:** YourUsername\n');
} else {
  console.log('👥 Contributors found:');
  Object.entries(testContributors).forEach(([username, contributions]) => {
    const domains = [...new Set(contributions.map(c => c.domain))];
    console.log(`   - ${username}: ${contributions.length} contribution(s) in ${domains.join(', ')}`);
  });
  console.log('');
}

// Test 3: Run the actual script
console.log('🚀 Test 3: Running actual leaderboard script...\n');
try {
  require('./updateLeaderboard.js');
  console.log('\n✅ All tests passed!');
  console.log('\n📝 Check the generated files:');
  console.log('   - DomainsLeaderboards/Overall.md');
  console.log('   - HallOfFame/README.md');
} catch (err) {
  console.error('\n❌ Error running leaderboard script:', err.message);
  process.exit(1);
}
