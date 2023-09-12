const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

// cors options
const corsOptions = {
  origin: 'http://127.0.0.1:5173',
  optionsSuccessStatus: 204,
  methods: 'POST, GET, PUT, DELETE, OPTIONS',
  allowedHeaders: 'Content-Type, Authorization'
};

// Filter for media files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
    // Accept file
    cb(null, true);
  } else {
    // Reject file
    cb(null, false);
  }
};

app.use(cors(corsOptions));

// Configuring multer storage options
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage, 
  fileFilter: fileFilter,
  limits: {
    fileSize: 30 * 1024 * 1024 // 30 MB in bytes limit per file
  }
});

// Handling uploads
app.post('/upload', upload.array('files'), (req, res) => {
  const { files } = req;
  const { email } = req.body;

  // Here you could do something with the uploaded files and email
  // For now, let's just send a success message back
  res.status(200).send('Upload successful');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
