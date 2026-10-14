// errorHandler.js - Centralized error and 404 handlers

/**
 * 404 Not Found Middleware
 */
function notFoundHandler(req, res, next) {
  res.status(404).json({
    success: false,
    statusCode: 404,
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.originalUrl}`,
    suggestion: 'Check the route path and HTTP method against available endpoints.'
  });
}

/**
 * Global Centralized Error Handling Middleware (must take 4 arguments: err, req, res, next)
 */
function errorHandler(err, req, res, next) {
  const statusCode = err.status || err.statusCode || 500;
  
  // Safe error response without dumping stack traces to client
  res.status(statusCode).json({
    success: false,
    statusCode,
    error: err.name || 'InternalServerError',
    message: err.message || 'An unexpected server error occurred.',
    timestamp: new Date().toISOString()
  });
}

module.exports = {
  notFoundHandler,
  errorHandler
};
