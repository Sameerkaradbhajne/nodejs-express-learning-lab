// projectTreeData.js - File metadata and source content for Project Structure Explorer
export const projectTree = [
  {
    id: 'backend',
    name: 'backend/',
    type: 'folder',
    children: [
      {
        id: 'server-js',
        name: 'server.js',
        type: 'file',
        description: 'Main Express application entry point. Configures CORS, sets up requestTimer & logger middlewares, attaches express.json body parser, and mounts index & api routes.',
        language: 'javascript',
        code: `// server.js - Main Express Application
const express = require('express');
const cors = require('cors');
const requestTimer = require('./middleware/requestTimer');
const { loggerMiddleware } = require('./middleware/logger');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');
const indexRoutes = require('./routes/index');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: '*', exposedHeaders: ['X-Response-Time'] }));
app.use(requestTimer);
app.use(loggerMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRoutes);
app.use('/api', apiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(\`Server listening on http://localhost:\${PORT}\`);
  });
}

module.exports = app;`
      },
      {
        id: 'raw-server-js',
        name: 'raw-server.js',
        type: 'file',
        description: 'Standalone native HTTP server using Node.js built-in http.createServer() on port 5001. Demonstrates low-level request parsing and res.writeHead/res.end without Express.',
        language: 'javascript',
        code: `// raw-server.js - Standalone Raw Node.js HTTP Server
const http = require('http');
const url = require('url');

const RAW_PORT = process.env.RAW_PORT || 5001;

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  if (req.method === 'GET' && pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ server: 'Raw HTTP Server', status: 'online' }));
  }
  if (req.method === 'GET' && pathname === '/api/status') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ success: true, nodeVersion: process.version }));
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not Found', statusCode: 404 }));
});

server.listen(RAW_PORT);`
      },
      {
        id: 'routes',
        name: 'routes/',
        type: 'folder',
        children: [
          {
            id: 'routes-index',
            name: 'index.js',
            type: 'file',
            description: 'Handles general informational endpoints like GET / (welcome) and GET /about (architecture summary).',
            language: 'javascript',
            code: `const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ project: 'Node.js & Express.js Learning Lab', status: 'online' });
});

router.get('/about', (req, res) => {
  res.json({ title: 'About Learning Lab', author: 'SIT Nagpur CSE Batch 2025-29' });
});

module.exports = router;`
          },
          {
            id: 'routes-api',
            name: 'api.js',
            type: 'file',
            description: 'Core REST API endpoints: /status, /time, /hello, /echo, /modules, /files, /path-demo, /feedback, /process-info, /commonjs-demo.',
            language: 'javascript',
            code: `const express = require('express');
const router = express.Router();
const { readSampleFile, writeDemoFile } = require('../modules/fileDemo');
const { analyzePath } = require('../modules/pathDemo');

router.get('/status', (req, res) => {
  res.json({ success: true, nodeVersion: process.version, pid: process.pid, uptime: process.uptime() });
});

router.get('/hello', (req, res) => {
  const name = req.query.name || 'Student';
  res.json({ success: true, message: \`Hello, \${name}!\` });
});

router.post('/echo', (req, res) => {
  res.json({ success: true, echo: req.body });
});

module.exports = router;`
          }
        ]
      },
      {
        id: 'middleware',
        name: 'middleware/',
        type: 'folder',
        children: [
          {
            id: 'mw-logger',
            name: 'logger.js',
            type: 'file',
            description: 'Intercepts every incoming request, logs details to console, and retains an in-memory ring buffer of recent logs for dashboard activity monitoring.',
            language: 'javascript',
            code: `const logsBuffer = [];
function loggerMiddleware(req, res, next) {
  const start = Date.now();
  res.on('finish', () => {
    logsBuffer.unshift({
      method: req.method,
      path: req.originalUrl,
      statusCode: res.statusCode,
      durationMs: Date.now() - start,
      timestamp: new Date().toISOString()
    });
    if (logsBuffer.length > 50) logsBuffer.pop();
  });
  next();
}
module.exports = { loggerMiddleware, getRecentLogs: (limit) => logsBuffer.slice(0, limit) };`
          },
          {
            id: 'mw-timer',
            name: 'requestTimer.js',
            type: 'file',
            description: 'Calculates high-resolution response duration using process.hrtime() and attaches the custom X-Response-Time HTTP header.',
            language: 'javascript',
            code: `function requestTimer(req, res, next) {
  const startHr = process.hrtime();
  res.on('finish', () => {
    const diff = process.hrtime(startHr);
    const ms = (diff[0] * 1000 + diff[1] / 1e6).toFixed(2);
    res.setHeader('X-Response-Time', \`\${ms}ms\`);
  });
  next();
}
module.exports = requestTimer;`
          },
          {
            id: 'mw-error',
            name: 'errorHandler.js',
            type: 'file',
            description: 'Centralized 404 Not Found handler and 4-argument error handling middleware (err, req, res, next) ensuring clean JSON responses.',
            language: 'javascript',
            code: `function notFoundHandler(req, res, next) {
  res.status(404).json({ success: false, statusCode: 404, error: 'Not Found' });
}
function errorHandler(err, req, res, next) {
  res.status(err.status || 500).json({ success: false, error: err.name, message: err.message });
}
module.exports = { notFoundHandler, errorHandler };`
          }
        ]
      },
      {
        id: 'modules',
        name: 'modules/',
        type: 'folder',
        children: [
          {
            id: 'mod-file',
            name: 'fileDemo.js',
            type: 'file',
            description: 'Encapsulates file reading and writing with path sanitization to prevent directory traversal attacks.',
            language: 'javascript',
            code: `const fs = require('fs');
const path = require('path');
const DATA_DIR = path.resolve(__dirname, '..', 'data');

function readSampleFile() {
  const filePath = path.join(DATA_DIR, 'sample.txt');
  return { success: true, content: fs.readFileSync(filePath, 'utf-8') };
}
function writeDemoFile(text) {
  const filePath = path.join(DATA_DIR, 'demo.txt');
  fs.writeFileSync(filePath, text, 'utf-8');
  return { success: true, message: 'Saved successfully.' };
}
module.exports = { readSampleFile, writeDemoFile };`
          },
          {
            id: 'mod-path',
            name: 'pathDemo.js',
            type: 'file',
            description: 'Demonstrates path.join(), path.basename(), path.extname(), path.dirname(), and path.parse().',
            language: 'javascript',
            code: `const path = require('path');
function analyzePath(input) {
  return {
    basename: path.basename(input),
    extname: path.extname(input),
    dirname: path.dirname(input),
    normalized: path.normalize(input)
  };
}
module.exports = { analyzePath };`
          },
          {
            id: 'mod-math',
            name: 'mathUtils.js',
            type: 'file',
            description: 'Demonstrates CommonJS module.exports pattern by exporting add, multiply, and getModuleInfo functions.',
            language: 'javascript',
            code: `function add(a, b) { return a + b; }
function multiply(a, b) { return a * b; }
module.exports = { add, multiply };`
          }
        ]
      },
      {
        id: 'data',
        name: 'data/',
        type: 'folder',
        children: [
          {
            id: 'sample-txt',
            name: 'sample.txt',
            type: 'file',
            description: 'Dedicated sample text file read by the fs module during demonstrations.',
            language: 'text',
            code: `Welcome to the Node.js & Express.js Learning Lab!
This sample file is read directly from disk using Node's built-in 'fs' module.
Hack-O-Week — SIT Nagpur, CSE Batch 2025–29.`
          }
        ]
      },
      {
        id: 'backend-pkg',
        name: 'package.json',
        type: 'file',
        description: 'Backend npm configuration detailing dependencies (express, cors) and scripts (start, dev, raw).',
        language: 'json',
        code: `{
  "name": "node-express-learning-lab-backend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "raw": "node raw-server.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.21.2"
  }
}`
      }
    ]
  },
  {
    id: 'frontend',
    name: 'frontend/',
    type: 'folder',
    children: [
      {
        id: 'frontend-pkg',
        name: 'package.json',
        type: 'file',
        description: 'Frontend dependencies (React 18, Vite, Lucide Icons).',
        language: 'json',
        code: `{
  "name": "node-express-learning-lab-frontend",
  "dependencies": {
    "lucide-react": "^0.469.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "vite": "^6.0.7"
  }
}`
      },
      {
        id: 'vite-config',
        name: 'vite.config.js',
        type: 'file',
        description: 'Vite configuration with React plugin and development reverse-proxy targeting Express on port 5000.',
        language: 'javascript',
        code: `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: { '/api': 'http://localhost:5000' }
  }
});`
      }
    ]
  },
  {
    id: 'root-pkg',
    name: 'package.json (root)',
    type: 'file',
    description: 'Root workspace configuration with unified convenience commands to launch backend and frontend simultaneously.',
    language: 'json',
    code: `{
  "name": "node-express-learning-lab",
  "scripts": {
    "start": "node backend/server.js",
    "backend": "cd backend && npm run dev",
    "raw": "node backend/raw-server.js",
    "frontend": "cd frontend && npm run dev"
  }
}`
  }
];
