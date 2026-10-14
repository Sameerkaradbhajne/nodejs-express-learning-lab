// raw-server.js - Standalone Raw Node.js HTTP Server (Without Express)
// Demonstrates Node.js built-in 'http' module
// Runs on port 5001 to avoid conflicting with Express (port 5000)

const http = require('http');
const url = require('url');

const RAW_PORT = process.env.RAW_PORT || 5001;

// Helper to set CORS headers so frontend can query raw server
function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

const server = http.createServer((req, res) => {
  setCorsHeaders(res);

  // Handle pre-flight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Parse request URL
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  console.log(`[RAW-HTTP] ${method} ${pathname}`);

  // Route: GET /
  if (method === 'GET' && pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      serverType: 'Raw Node.js HTTP Server',
      poweredBy: 'Native http.createServer() (Zero dependencies)',
      port: RAW_PORT,
      message: 'Welcome to the standalone native Node.js HTTP server demonstration.',
      timestamp: new Date().toISOString()
    }, null, 2));
    return;
  }

  // Route: GET /about
  if (method === 'GET' && pathname === '/about') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      topic: 'Built-in Node.js http module',
      explanation: 'Built directly using require("http") and http.createServer((req, res) => { ... }). Unlike Express, routing and headers are handled manually by inspecting req.url and req.method.',
      differencesFromExpress: [
        'Manual route matching (if/else on req.url instead of app.get())',
        'Manual status headers via res.writeHead()',
        'Manual JSON serialization via JSON.stringify() and res.end()',
        'No built-in middleware pipeline (req.on("data") needed for bodies)'
      ],
      author: 'SIT Nagpur CSE Batch 2025-29'
    }, null, 2));
    return;
  }

  // Route: GET /api/status
  if (method === 'GET' && pathname === '/api/status') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      success: true,
      server: 'Raw HTTP Server',
      status: 'operational',
      port: RAW_PORT,
      nodeVersion: process.version,
      pid: process.pid,
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString()
    }, null, 2));
    return;
  }

  // Route: GET /api/time
  if (method === 'GET' && pathname === '/api/time') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      success: true,
      source: 'Raw http server',
      iso: new Date().toISOString(),
      timestampEpoch: Date.now()
    }, null, 2));
    return;
  }

  // Unknown route -> 404 response
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    success: false,
    statusCode: 404,
    error: 'Not Found',
    message: `Raw server route not found: ${method} ${pathname}`,
    availableRoutes: ['GET /', 'GET /about', 'GET /api/status', 'GET /api/time']
  }, null, 2));
});

server.listen(RAW_PORT, () => {
  console.log('----------------------------------------------------');
  console.log(`⚡ Raw Node.js HTTP Server running on port ${RAW_PORT}`);
  console.log(`🔗 URL: http://localhost:${RAW_PORT}`);
  console.log('----------------------------------------------------');
});

module.exports = server;
