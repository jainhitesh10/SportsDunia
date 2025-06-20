const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const earningRoutes = require('./routes/earningRoutes');
const reportRoutes = require('./routes/reportRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Root route for health check/info
app.get('/', (req, res) => {
  res.json({ status: 'API is running', message: 'Welcome to the Multi-Level Referral and Earning System API' });
});

// Routes (no '/api' prefix)
app.use(userRoutes);
app.use(earningRoutes);
app.use(reportRoutes);

// Error handler
app.use(errorHandler);

// Connect to DB
connectDB();

module.exports = app;
