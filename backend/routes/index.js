// routes/index.js - General informational routes
const express = require('express');
const router = express.Router();

// GET / - Welcome message and project information
router.get('/', (req, res) => {
  res.json({
    project: 'Node.js & Express.js Learning Lab',
    institution: 'SIT Nagpur',
    program: 'Hack-O-Week — CSE Batch 2025–29',
    tagline: 'Explore, Execute, and Understand Backend Development',
    status: 'online',
    version: '1.0.0',
    documentation: '/about',
    apiRoot: '/api/status',
    timestamp: new Date().toISOString()
  });
});

// GET /about - Information about the learning platform
router.get('/about', (req, res) => {
  res.json({
    title: 'About Node.js & Express.js Learning Lab',
    purpose: 'Interactive educational platform created for Hack-O-Week at SIT Nagpur',
    targetAudience: 'CSE Batch 2025–29 & backend beginners',
    architecture: {
      backend: 'Node.js + Express.js (CommonJS)',
      frontend: 'React + Vite (Minimalist Monochrome UX)',
      rawServer: 'Native Node.js http.createServer() on port 5001'
    },
    keyLearningTopics: [
      'Node.js Runtime & Event Loop Concepts',
      'Built-in Core Modules (fs, path, process, http)',
      'CommonJS require() and module.exports',
      'npm Package Management & package.json Anatomy',
      'Native HTTP Server vs Express.js Framework',
      'Routing, Query Parameters & URL Params',
      'Middleware Chain & Request-Response Cycle',
      'RESTful JSON API Design & HTTP Status Codes'
    ],
    author: 'SIT Nagpur CSE Batch 2025-29'
  });
});

module.exports = router;
