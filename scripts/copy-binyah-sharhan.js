const fs = require('fs');
const path = require('path');

const uploadedDir = 'C:\\Users\\mohma\\.gemini\\antigravity-ide\\brain\\60effd8e-b6ab-4896-957a-acff8171cd2e\\.user_uploaded';
const targetDir = path.join(__dirname, '..', 'public', 'images', 'clients');

const copyFiles = {
  'media_1790557774849.png': 'logo_binyah.png',
  'media_1790557882658.png': 'logo_sharhan.png'
};

for (const [src, dest] of Object.entries(copyFiles)) {
  const srcPath = path.join(uploadedDir, src);
  const destPath = path.join(targetDir, dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log('Successfully copied', src, '->', dest);
  }
}
