require('dotenv').config({ path: '.env' });

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const uploadsDir = process.env.UPLOADS_DIR;
const BATCH_SIZE = 1;

sharp.concurrency(1);

fs.readdir(uploadsDir, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    const imageFiles = files.filter(file => ['.jpg', '.jpeg', '.png'].includes(path.extname(file).toLowerCase()));

    const processBatch = (batchFiles) => {
        const promises = batchFiles.map(file => {
            const filePath = path.join(uploadsDir, file);
            const outputPath = path.join(uploadsDir, '../photos', file);

            return sharp(filePath)
                .rotate()  // Auto rotate based on the orientation EXIF tag
                .resize({ width: 1920 }) // Resize to 1920 pixels width, height is auto to maintain aspect ratio
                .toFormat('jpeg', { quality: 80, progressive: true  })
                .toFile(outputPath)
                .then(() => {
                    console.log('Optimized and resized:', file);
                })
                .catch(err => {
                    console.error('Error processing file:', file, err);
                });
        });

        return Promise.all(promises);
    };

    const processAllBatches = async () => {
        for (let i = 0; i < imageFiles.length; i += BATCH_SIZE) {
            const batchFiles = imageFiles.slice(i, i + BATCH_SIZE);
            await processBatch(batchFiles);
        }
    };

    processAllBatches().then(() => {
        console.log('Finished processing all images.');
    });
});
