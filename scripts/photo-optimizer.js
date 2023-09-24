require('dotenv').config({ path: '.env' });

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const uploadsDir = process.env.UPLOADS_DIR

fs.readdir(uploadsDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  files.forEach(file => {
    const filePath = path.join(uploadsDir, file);
    const outputPath = path.join(uploadsDir, '../photos', file); // Saving optimized images in a sub-folder

    sharp(filePath)
      .toFormat('jpeg', { quality: 80 })
      .toFile(outputPath, (err, info) => {
        if (err) {
          console.error('Error processing file:', file, err);
        } else {
          console.log('Optimized:', file);
        }
      });
  });
});