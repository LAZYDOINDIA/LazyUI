const fs = require('fs');
const path = require('path');

// Simple SVG content for relaxed character
const relaxedSVG = `
<svg width="240" height="240" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="checkmarkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#4CAF50;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#388E3C;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Checkmark body -->
  <path d="M60 180 L180 60 L200 80 L80 200 Z" fill="url(#checkmarkGradient)" stroke="#2E7D32" stroke-width="4"/>
  
  <!-- Character head -->
  <circle cx="140" cy="100" r="30" fill="#FFE0B2" stroke="#D7CCC8" stroke-width="2"/>
  
  <!-- Eyes (open) -->
  <circle cx="132" cy="95" r="3" fill="#333"/>
  <circle cx="148" cy="95" r="3" fill="#333"/>
  
  <!-- Small mouth (relaxed) -->
  <ellipse cx="140" cy="110" rx="8" ry="3" fill="#333"/>
  
  <!-- Arms -->
  <rect x="120" y="130" width="40" height="8" rx="4" fill="#8BC34A" stroke="#689F38" stroke-width="1"/>
  
  <!-- Legs -->
  <rect x="130" y="160" width="6" height="20" rx="3" fill="#795548" stroke="#5D4037" stroke-width="1"/>
  <rect x="144" y="160" width="6" height="20" rx="3" fill="#795548" stroke="#5D4037" stroke-width="1"/>
</svg>
`;

// SVG content for yawning character
const yawningSVG = `
<svg width="240" height="240" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="checkmarkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#4CAF50;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#388E3C;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Checkmark body -->
  <path d="M60 180 L180 60 L200 80 L80 200 Z" fill="url(#checkmarkGradient)" stroke="#2E7D32" stroke-width="4"/>
  
  <!-- Character head -->
  <circle cx="140" cy="100" r="30" fill="#FFE0B2" stroke="#D7CCC8" stroke-width="2"/>
  
  <!-- Eyes (closed) -->
  <line x1="129" y1="95" x2="135" y2="95" stroke="#666" stroke-width="2"/>
  <line x1="145" y1="95" x2="151" y2="95" stroke="#666" stroke-width="2"/>
  
  <!-- Wide mouth (yawning) -->
  <ellipse cx="140" cy="110" rx="12" ry="8" fill="#333"/>
  
  <!-- Tongue -->
  <ellipse cx="140" cy="115" rx="6" ry="4" fill="#FFB3BA"/>
  
  <!-- Arms -->
  <rect x="120" y="130" width="40" height="8" rx="4" fill="#8BC34A" stroke="#689F38" stroke-width="1"/>
  
  <!-- Legs -->
  <rect x="130" y="160" width="6" height="20" rx="3" fill="#795548" stroke="#5D4037" stroke-width="1"/>
  <rect x="144" y="160" width="6" height="20" rx="3" fill="#795548" stroke="#5D4037" stroke-width="1"/>
</svg>
`;

// Create assets directory if it doesn't exist
const assetsDir = path.join(__dirname, 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Write SVG files
fs.writeFileSync(path.join(assetsDir, 'lazydo-relaxed.svg'), relaxedSVG);
fs.writeFileSync(path.join(assetsDir, 'lazydo-yawning.svg'), yawningSVG);

console.log('✅ Character images generated successfully!');
console.log('📁 Files created in:', assetsDir);
console.log('   - lazydo-relaxed.svg');
console.log('   - lazydo-yawning.svg');
console.log('');
console.log('💡 To convert to PNG, you can:');
console.log('   1. Open the SVG files in a browser');
console.log('   2. Take a screenshot or use online SVG to PNG converter');
console.log('   3. Save as lazydo-relaxed.png and lazydo-yawning.png');
console.log('   4. Replace the SVG files with the PNG versions'); 