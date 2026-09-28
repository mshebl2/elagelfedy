const fs = require('fs');
const path = require('path');

const uploadedDir = 'C:\\Users\\mohma\\.gemini\\antigravity-ide\\brain\\60effd8e-b6ab-4896-957a-acff8171cd2e\\.user_uploaded';

function getPngDimensions(filePath) {
  const fd = fs.openSync(filePath, 'r');
  const buffer = Buffer.alloc(24);
  fs.readSync(fd, buffer, 0, 24, 0);
  fs.closeSync(fd);
  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  return { width, height };
}

const files = [
  'media_1790557536952.png',
  'media_1790557598140.png',
  'media_1790557644716.png',
  'media_1790557668490.png',
  'media_1790557708143.png',
  'media_1790557730852.png'
];

files.forEach(f => {
  const p = path.join(uploadedDir, f);
  if (fs.existsSync(p)) {
    console.log(f, getPngDimensions(p), fs.statSync(p).size);
  }
});
