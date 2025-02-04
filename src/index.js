const express = require('express');
const knex = require('./db/knex');
const path = require('path');
const cors = require('cors');
const router = require('./routes/userRegistration');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
// Middleware
const corsOptions = {
  origin: 'http://localhost:5173',  // Replace with your frontend's URL
  methods: ['GET', 'POST','PUT','UPDATE','DELETE'],     // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};
app.use(cors(corsOptions));
app.use(express.json());

// for images
app.use('/uploads', express.static( 'uploads'));

// Routes
app.use('/api', router);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});