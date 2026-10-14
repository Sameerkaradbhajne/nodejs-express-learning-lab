// server.js - Main Express Application
// Node.js & Express.js Learning Lab - SIT Nagpur, CSE Batch 2025–29

const express = require('express');
const cors = require('cors');
const path = require('path');

// Import Custom Middlewares
const requestTimer = require('./middleware/requestTimer');
const { loggerMiddleware } = require('./middleware/logger');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

// Import Route Handlers
const indexRoutes = require('./routes/index');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

// 1. CORS Configuration (Allow frontend communication)
app.use(cors({
  origin: '*', // For local educational lab demonstration
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['X-Response-Time']
}));

// 2. Request Timing Middleware (measures duration, sets X-Response-Time)
app.use(requestTimer);

// 3. Request Logging Middleware (logs to console and keeps in-memory activity ring buffer)
app.use(loggerMiddleware);

// 4. Body Parsing Middleware
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// 5. Mount Application Routes
app.use('/', indexRoutes);
app.use('/api', apiRoutes);

// 6. 404 Not Found Handler (catches unmatched routes)
app.use(notFoundHandler);

// 7. Centralized Error Handler (handles exceptions thrown in route handlers)
app.use(errorHandler);

// Start listening if run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log('====================================================');
    console.log(`🚀 Express Learning Lab Server running on port ${PORT}`);
    console.log(`📡 URL: http://localhost:${PORT}`);
    console.log(`📖 API Documentation: http://localhost:${PORT}/about`);
    console.log(`🩺 Health & Status: http://localhost:${PORT}/api/status`);
    console.log('====================================================');
  });
}

module.exports = app;
