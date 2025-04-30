const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Import routes
const predictRoute = require('./routes/predict');
const authRoutes = require('./routes/authRoutes'); // New authentication routes

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Use the routes
app.use('/predict', predictRoute);
app.use('/api/auth', authRoutes); // Register authentication routes

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
