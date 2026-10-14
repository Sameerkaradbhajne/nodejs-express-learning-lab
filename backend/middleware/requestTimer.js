// requestTimer.js - Middleware to track request processing duration
// Attaches X-Response-Time header before response is sent to client

function requestTimer(req, res, next) {
  const startHrTime = process.hrtime();
  req._startTime = Date.now();

  // Intercept writeHead or end to attach header before headers are committed
  const originalWriteHead = res.writeHead;
  res.writeHead = function(...args) {
    const elapsedHrTime = process.hrtime(startHrTime);
    const elapsedMs = (elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6).toFixed(2);
    res.setHeader('X-Response-Time', `${elapsedMs}ms`);
    req._responseTimeMs = parseFloat(elapsedMs);
    return originalWriteHead.apply(this, args);
  };

  next();
}

module.exports = requestTimer;
