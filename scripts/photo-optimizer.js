require('dotenv').config({ path: '.env' });

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const uploadsDir = process.env.UPLOADS_DIR;
const BATCH_SIZE = 2; // reduced batch size

// Limit sharp's concurrency
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
                .toFormat('jpeg', { quality: 80 })
                .toFile(outputPath)
                .then(() => {
                    console.log('Optimized:', file);
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
