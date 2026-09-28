const fs = require('fs');
const path = require('path');

const uploadedDir = 'C:\\Users\\mohma\\.gemini\\antigravity-ide\\brain\\60effd8e-b6ab-4896-957a-acff8171cd2e\\.user_uploaded';

function getPngDimensions(filePath) {
  try {
    const fd = fs.openSync(filePath, 'r');
    const buffer = Buffer.alloc(24);
    fs.readSync(fd, buffer, 0, 24, 0);
    fs.closeSync(fd);
    if (buffer[0] === 0x89 && buffer[1] === 0x50) {
      const width = buffer.readUInt32BE(16);
      const height = buffer.readUInt32BE(20);
      return { type: 'png', width, height };
    }
    return { type: 'other' };
  } catch(e) {
    return { error: e.message };
  }
}

const all = fs.readdirSync(uploadedDir);
all.forEach(f => {
  const p = path.join(uploadedDir, f);
  const stat = fs.statSync(p);
  console.log(f, stat.size, getPngDimensions(p));
});
