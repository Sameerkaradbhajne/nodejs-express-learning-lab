// logger.js - Request logging middleware with in-memory buffer for dashboard activity
const logsBuffer = [];
const MAX_LOGS = 50;

function loggerMiddleware(req, res, next) {
  const requestTimestamp = new Date().toISOString();
  const startTime = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const logEntry = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      method: req.method,
      path: req.originalUrl || req.url,
      statusCode: res.statusCode,
      timestamp: requestTimestamp,
      durationMs: duration,
      ip: req.ip || '127.0.0.1'
    };

    // Keep ring buffer capped at MAX_LOGS
    logsBuffer.unshift(logEntry);
    if (logsBuffer.length > MAX_LOGS) {
      logsBuffer.pop();
    }

    // Terminal console log formatted cleanly
    console.log(`[${logEntry.timestamp}] ${logEntry.method} ${logEntry.path} -> ${logEntry.statusCode} (${logEntry.durationMs}ms)`);
  });

  next();
}

function getRecentLogs(limit = 15) {
  return logsBuffer.slice(0, limit);
}

function clearLogs() {
  logsBuffer.length = 0;
  return true;
}

module.exports = {
  loggerMiddleware,
  getRecentLogs,
  clearLogs
};
