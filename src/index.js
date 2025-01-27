const express = require('express');
const knex = require('./db/knex');

const userRegistrationRoutes = require('./routes/userRegistration');
const allUsersRoutes = require('./routes/userRegistration');
const getByTeam = require('./routes/userRegistration');
const verifyOTP = require('./routes/userRegistration')
const addTeamMember = require('./routes/userRegistration');
const deleteTeamMember = require('./routes/userRegistration');
const getUniqueTeamNames=require('./routes/userRegistration');


const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api', userRegistrationRoutes);
app.use('/api', allUsersRoutes);
app.use('/api', getByTeam);
app.use('/api',verifyOTP);
app.use('/api', addTeamMember);
app.use('/api', deleteTeamMember);
app.use('/api',getUniqueTeamNames);



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