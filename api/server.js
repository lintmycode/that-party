require('dotenv').config({ path: '.env' });

const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');
const sharp = require('sharp');

// initialize supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// init app
const app = express();
const port = 3000;
const uploadsDir = process.env.UPLOADS_DIR
const optimizedDir = process.env.OPTIMIZED_DIR

// cors options
const corsOptions = {
  origin: process.env.VITE_BASE_URL.replace(/\/$/, ""),
  optionsSuccessStatus: 204,
  methods: 'POST, GET, PUT, DELETE, OPTIONS',
  allowedHeaders: 'Content-Type, Authorization',
};
app.use(cors(corsOptions));

// Filter for media files
const fileFilter = (req, file, cb) => {
  // if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
  if (file.mimetype.startsWith('image/')) {
    // Accept file
    cb(null, true);
  } else {
    // Reject file
    cb(null, false);
  }
};

// multer storage options
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename:  function (req, file, cb) {
    // generate a random string of 16 characters
    const randomString = crypto.randomBytes(8).toString('hex');

    // combine the random string, timestamp, and the file extension
    const newName = `${randomString}-${Date.now()}${path.extname(file.originalname)}`;  
    cb(null, newName);
  }
});

const upload = multer({ 
  storage: storage, 
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 //  10MB in bytes limit per file
  }
});

// handling uploads
app.post('/upload', upload.array('files'), async (req, res) => {
  const { files } = req;
  const { email } = req.body;

  // optimize and move to folder
  await Promise.all(files.map(async file => {
    const inputPath =  path.join(__dirname, '..',  file.path);
    const outputPath = path.join(__dirname, '..', file.path.replace('uploads', optimizedDir));

    await sharp(inputPath)
      .rotate()
      .resize({ width: 1920, height: 1080, fit: 'inside' })
      .jpeg({ quality: 80, progressive: true })
      .toFile(outputPath);
    }));
  
  // save to supabase
  try {
    const { data, error } = await supabase
      .from('media')
      .insert(files.map(file => ({
        email,
        file_name: file.filename,
        file_type: file.mimetype,
      })));

    if (error) throw error;

    res.status(200).json({ message: 'Upload and database insert successful', data });
  } catch (error) {
    console.error('Error inserting into Supabase:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// get files
app.get('/get-files', (req, res) => {
  const directoryPath = path.join(__dirname, '../' + optimizedDir);

  // page and limit parameters
  const limit = parseInt(req.query.limit) || 20; // default limit to 20, change as needed
  const page = parseInt(req.query.page) || 1;
  const reqFilename = req.query.filename; // get the specific filename from query params
  
  // read directory and send array of filenames
  fs.readdir(directoryPath, function(err, files) {
    if (err) {
        return res.status(500).send('Unable to scan directory: ' + directoryPath + err);
    }

    let validFiles = files.filter(file => ['.jpg', '.jpeg', '.png', '.gif'].includes(path.extname(file).toLowerCase()));

    // Get file sizes in an asynchronous manner
    Promise.all(validFiles.map(file => {
        return new Promise((resolve, reject) => {
            fs.stat(path.join(directoryPath, file), (err, stats) => {
                if (err) return reject(err);
                if (stats.size > 0) {
                    resolve(file);
                } else {
                    resolve(null); // resolve with null for files with size <= 0
                }
            });
        });
    }))
    .then(filesWithSize => {
        let filesWithTypes = filesWithSize.filter(Boolean); // Remove null values

        if (reqFilename) {
            const specificFile = filesWithTypes.find(file => file.split('.').slice(0, -1).join('.') === reqFilename);
            if (specificFile) {
                // add the specific file to the start (or end) of the list.
                filesWithTypes.unshift(specificFile);
            }
        }

        const totalFiles = filesWithTypes.length;
        filesWithTypes = filesWithTypes.slice((page - 1) * limit, page * limit);
        filesWithTypes = filesWithTypes.map(file => {
            return { filename: file, type: 'image', extension: file.split('.').pop() };
        });

        res.status(200).json({
            files: filesWithTypes,
            totalPages: Math.ceil(totalFiles / limit),
            totalFiles: totalFiles,
        });
    })
    .catch(error => {
        res.status(500).send('Error processing files: ' + error);
    });
  });
});

// get file
app.get('/media/:filename', async (req, res) => {
  // todo: permission checks
  
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '../' + optimizedDir, filename);
  if (fs.existsSync(filePath)) {

    // determine content type
    const ext = path.extname(filename).toLowerCase();
    let contentType = 'application/octet-stream';  // default to binary stream

    switch (ext) {
      case '.jpg':
      case '.jpeg':
          contentType = 'image/jpeg';
          break;
      case '.png':
          contentType = 'image/png';
          break;
      case '.gif':
          contentType = 'image/gif';
          break;
      // case '.webm':
      //     contentType = 'video/webm';
      //     break;
      // case '.mp4':
      //     contentType = 'video/mp4';
      //     break;
      // case '.ogg':
      //     contentType = 'video/ogg';
      //     break;
    }

    // set header
    res.setHeader('Content-Type', contentType);

    // read and send the file data
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } else {
    res.status(404).json({ message: 'File not found' });
  }
});

// start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${port}`);
});
