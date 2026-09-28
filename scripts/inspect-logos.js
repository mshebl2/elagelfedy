const fs = require('fs');
const path = require('path');

const uploadedDir = 'C:\\Users\\mohma\\.gemini\\antigravity-ide\\brain\\60effd8e-b6ab-4896-957a-acff8171cd2e\\.user_uploaded';
const clientsDir = path.join(__dirname, '..', 'public', 'images', 'clients');

const files = [
  'media_1790557730852.png',
  'media_1790557708143.png',
  'media_1790557668490.png',
  'media_1790557644716.png',
  'media_1790557598140.png',
  'media_1790557536952.png'
];

files.forEach(f => {
  const p = path.join(uploadedDir, f);
  if (fs.existsSync(p)) {
    const stats = fs.statSync(p);
    console.log(f, stats.size, 'bytes');
  }
});
