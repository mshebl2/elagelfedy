const fs = require('fs');
const path = require('path');

const uploadedDir = 'C:\\Users\\mohma\\.gemini\\antigravity-ide\\brain\\60effd8e-b6ab-4896-957a-acff8171cd2e\\.user_uploaded';
const targetDir = path.join(__dirname, '..', 'public', 'images', 'clients');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Copy user-uploaded official logos
const mappings = {
  'media_1790557417676.png': 'logo_aramco.png',
  'media_1790557668490.png': 'logo_sec.png',
  'media_1790557536952.png': 'logo_kaec.png',
  'media_1790557644716.png': 'logo_mashariq.png',
  'media_1790557708143.png': 'logo_nwc.png',
  'media_1790557730852.png': 'logo_nwc_alt.png'
};

for (const [src, dest] of Object.entries(mappings)) {
  const srcPath = path.join(uploadedDir, src);
  const destPath = path.join(targetDir, dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log('Copied', src, '->', dest);
  }
}
