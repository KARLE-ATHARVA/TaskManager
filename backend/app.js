const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const db = require('./db');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();
const app = express();
const PORT = 1000;

// Middleware
app.use(cors()); // Allow all CORS requests, adjust for production
app.use(bodyParser.json()); // Parse JSON request bodies

// Routes
app.use('/user', userRoutes); // Mount user routes
app.use('/task', taskRoutes); // Mount task routes

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
