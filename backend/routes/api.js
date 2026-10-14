// routes/api.js - Core API routes for the learning lab
const express = require('express');
const router = express.Router();
const path = require('path');
const { readSampleFile, readDemoFile, writeDemoFile } = require('../modules/fileDemo');
const { analyzePath } = require('../modules/pathDemo');
const mathUtils = require('../modules/mathUtils');
const { getRecentLogs } = require('../middleware/logger');

// In-memory feedback store (does not require a database)
const feedbackStore = [
  {
    id: 1,
    studentName: 'Aarav Sharma',
    comment: 'The middleware sequence explanation and path.join demo made everything clear!',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    rating: 5
  },
  {
    id: 2,
    studentName: 'Priya Patel',
    comment: 'Comparing raw http.createServer() to Express routes helped me understand why Express is so popular.',
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    rating: 5
  }
];

// GET /api/status - Live server status, Node.js version, uptime, timestamp
router.get('/status', (req, res) => {
  const uptimeSeconds = Math.floor(process.uptime());
  const hours = Math.floor(uptimeSeconds / 3600);
  const minutes = Math.floor((uptimeSeconds % 3600) / 60);
  const seconds = uptimeSeconds % 60;

  res.json({
    success: true,
    server: 'Express.js Live Server',
    status: 'operational',
    nodeVersion: process.version,
    platform: process.platform,
    pid: process.pid,
    uptime: `${hours}h ${minutes}m ${seconds}s`,
    uptimeSeconds,
    memoryUsageMB: {
      rss: Math.round(process.memoryUsage().rss / 1024 / 1024),
      heapTotal: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
      heapUsed: Math.round(process.memoryUsage().heapUsed / 1024 / 1024)
    },
    timestamp: new Date().toISOString()
  });
});

// GET /api/time - Current server time in multiple formats
router.get('/time', (req, res) => {
  const now = new Date();
  res.json({
    success: true,
    iso: now.toISOString(),
    utc: now.toUTCString(),
    locale: now.toLocaleString(),
    timestampEpochMs: now.getTime(),
    timezoneOffsetMinutes: now.getTimezoneOffset()
  });
});

// GET /api/hello?name=Student - Query parameter demonstration
router.get('/hello', (req, res) => {
  const rawName = req.query.name;
  const name = (rawName && typeof rawName === 'string' && rawName.trim().length > 0)
    ? rawName.trim().slice(0, 50)
    : 'Student';

  res.json({
    success: true,
    message: `Hello, ${name}! Welcome to Express.js routing.`,
    queryReceived: req.query,
    explanation: 'Express parsed the URL query parameter using req.query.name automatically.'
  });
});

// POST /api/echo - Validates and echoes JSON payload
router.post('/echo', (req, res) => {
  if (!req.body || typeof req.body !== 'object' || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      error: 'Bad Request',
      message: 'Request body must be a non-empty valid JSON object.',
      examplePayload: {
        message: 'Hello Express!',
        subject: 'Backend Development'
      }
    });
  }

  res.status(200).json({
    success: true,
    message: 'JSON payload received and validated successfully.',
    receivedAt: new Date().toISOString(),
    payloadSize: Buffer.byteLength(JSON.stringify(req.body)),
    echo: req.body
  });
});

// GET /api/echo - Informational helper for GET requests
router.get('/echo', (req, res) => {
  res.json({
    notice: 'The /api/echo endpoint accepts POST requests containing a JSON body.',
    methodAllowed: 'POST',
    samplePayload: {
      test: 'ping',
      sender: 'SIT Student'
    }
  });
});

// GET /api/modules - Available educational modules
router.get('/modules', (req, res) => {
  res.json({
    success: true,
    totalModules: 10,
    modules: [
      { id: 'dashboard', name: 'Dashboard', desc: 'Live system stats, quick start & recent activity' },
      { id: 'fundamentals', name: 'Node.js Fundamentals', desc: 'Runtime, V8, Browser vs Node, CommonJS' },
      { id: 'core-modules', name: 'Core Modules Lab', desc: 'Interactive fs, path, process, and CommonJS demos' },
      { id: 'npm-setup', name: 'npm Project Setup', desc: 'Step-by-step project initialization & package.json' },
      { id: 'raw-http', name: 'Raw HTTP Server', desc: 'Native http.createServer() on port 5001' },
      { id: 'express-routing', name: 'Express.js Routing', desc: 'REST endpoints, query params, route parameters' },
      { id: 'middleware-lab', name: 'Middleware Lab', desc: 'Logger, request timer, JSON parser & next() flow' },
      { id: 'api-playground', name: 'API Playground', desc: 'Live interactive endpoint tester with real fetch()' },
      { id: 'project-structure', name: 'Project Structure', desc: 'Interactive repository file tree and code inspector' },
      { id: 'viva-questions', name: 'Viva Questions', desc: '25+ comprehensive interview & oral test questions' }
    ]
  });
});

// GET /api/files/sample - Safe fs.readFileSync demonstration
router.get('/files/sample', (req, res) => {
  const result = readSampleFile();
  if (!result.success) {
    return res.status(500).json(result);
  }
  res.json(result);
});

// GET /api/files/demo - Read demo.txt
router.get('/files/demo', (req, res) => {
  const result = readDemoFile('demo.txt');
  if (!result.success) {
    return res.status(404).json(result);
  }
  res.json(result);
});

// POST /api/files/write - Safe fs.writeFileSync demonstration
router.post('/files/write', (req, res) => {
  const { content } = req.body || {};
  if (typeof content !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Invalid request body. "content" field (string) is required.'
    });
  }

  // Enforce max length of 10,000 characters for safety
  if (content.length > 10000) {
    return res.status(400).json({
      success: false,
      error: 'Content exceeds safe limit of 10,000 characters.'
    });
  }

  const result = writeDemoFile(content, 'demo.txt');
  if (!result.success) {
    return res.status(500).json(result);
  }
  res.json(result);
});

// GET /api/path-demo - Safe path module demonstration
router.get('/path-demo', (req, res) => {
  const inputPath = req.query.path || 'backend/routes/api.js';
  // Disallow null bytes or path escapes in query
  if (inputPath.includes('\0')) {
    return res.status(400).json({ success: false, error: 'Invalid characters in path' });
  }
  const result = analyzePath(inputPath);
  res.json({
    success: true,
    ...result
  });
});

// POST /api/feedback - In-memory feedback submission
router.post('/feedback', (req, res) => {
  const { studentName, comment, rating } = req.body || {};

  if (!studentName || typeof studentName !== 'string' || studentName.trim() === '') {
    return res.status(400).json({
      success: false,
      error: 'studentName is required and must be a non-empty string.'
    });
  }

  if (!comment || typeof comment !== 'string' || comment.trim().length < 5) {
    return res.status(400).json({
      success: false,
      error: 'comment is required and must be at least 5 characters long.'
    });
  }

  const numericRating = Number(rating) || 5;
  const newEntry = {
    id: feedbackStore.length + 1,
    studentName: studentName.trim().slice(0, 60),
    comment: comment.trim().slice(0, 500),
    rating: Math.min(Math.max(numericRating, 1), 5),
    timestamp: new Date().toISOString()
  };

  feedbackStore.unshift(newEntry);

  res.status(201).json({
    success: true,
    message: 'Feedback submitted successfully in-memory.',
    entry: newEntry,
    totalCount: feedbackStore.length
  });
});

// GET /api/feedback - Retrieve feedback list
router.get('/feedback', (req, res) => {
  res.json({
    success: true,
    count: feedbackStore.length,
    feedback: feedbackStore
  });
});

// GET /api/logs - In-memory request logs from logger middleware
router.get('/logs', (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 15;
  res.json({
    success: true,
    logs: getRecentLogs(limit)
  });
});

// GET /api/process-info - Safe process details for educational inspection
router.get('/process-info', (req, res) => {
  // Never expose sensitive env vars like passwords, tokens, keys
  const safeEnvKeys = Object.keys(process.env).filter(key => 
    !key.toLowerCase().includes('key') &&
    !key.toLowerCase().includes('secret') &&
    !key.toLowerCase().includes('token') &&
    !key.toLowerCase().includes('pass')
  ).slice(0, 8);

  const safeEnvSample = {};
  safeEnvKeys.forEach(k => {
    safeEnvSample[k] = process.env[k] ? String(process.env[k]).slice(0, 60) : '';
  });

  res.json({
    success: true,
    nodeVersion: process.version,
    platform: process.platform,
    arch: process.arch,
    pid: process.pid,
    title: process.title,
    cwd: path.basename(process.cwd()),
    argv: process.argv.map(arg => path.basename(arg)),
    uptimeSeconds: Math.floor(process.uptime()),
    features: {
      inspector: process.features.inspector,
      ipv6: process.features.ipv6,
      tls: process.features.tls
    },
    safeEnvPreview: safeEnvSample,
    explanation: 'The process global provides info about and control over the current Node.js process.'
  });
});

// GET /api/commonjs-demo - Demonstrates require() and module.exports
router.get('/commonjs-demo', (req, res) => {
  const a = parseInt(req.query.a, 10) || 12;
  const b = parseInt(req.query.b, 10) || 8;

  res.json({
    success: true,
    sourceModule: 'backend/modules/mathUtils.js',
    importer: 'backend/routes/api.js (via require("../modules/mathUtils"))',
    moduleInfo: mathUtils.getModuleInfo(),
    executionResults: {
      addition: {
        expression: `mathUtils.add(${a}, ${b})`,
        result: mathUtils.add(a, b)
      },
      multiplication: {
        expression: `mathUtils.multiply(${a}, ${b})`,
        result: mathUtils.multiply(a, b)
      }
    },
    explanation: 'In CommonJS, functions are exported with module.exports = { ... } and imported with const mathUtils = require("./mathUtils").'
  });
});

module.exports = router;
