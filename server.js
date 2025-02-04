require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const knex = require('knex')(require('./knexfile').development);
const path = require('path');

const app = express();

app.use(cookieParser());

// Middleware for session management
app.use(session({
    secret: 'your_secret_key', // Should be a secret key, ideally stored in environment variables
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // set to true if you're using HTTPS
}));

app.use(express.json());



// Configure Multer for File Uploads
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Upload Image Endpoint
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const { filename, path } = req.file;

    // Save Image Info to Database
    await knex('images').insert({ filename, path });

    res.json({ message: 'Image uploaded successfully', filename });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// Serve Uploaded Images
app.use('/uploads', express.static('uploads'));

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
