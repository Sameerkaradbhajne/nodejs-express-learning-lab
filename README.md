<div align="center">

# ⚡ Node.js & Express.js Learning Lab
### Hack-O-Week — SIT Nagpur, CSE Batch 2025–29
**Explore, Execute, and Understand Backend Development**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel%20Production-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://nodejs-express-learning-lab.vercel.app/)
[![Node.js](https://img.shields.io/badge/Node.js-v24.13.0-111111?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-v4.21.2-111111?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-v18.3.1-111111?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-v6.0.7-111111?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

<br />

**[🌐 Open Live Deployed Web App](https://nodejs-express-learning-lab.vercel.app/)** • **[📖 32+ College Viva Q&A](#-30-college-viva-questions--answers)** • **[📡 API Endpoints Reference](#-complete-api-endpoints-table)** • **[🎓 Faculty Walkthrough](#-faculty-evaluation-demonstration-walkthrough)**

</div>

---

## 📌 Executive Summary

The **Node.js & Express.js Learning Lab** is an interactive, full-stack educational web application engineered specifically for the **Hack-O-Week** evaluation at **Symbiosis Institute of Technology (SIT), Nagpur (CSE Batch 2025–29)**.

Designed with an aesthetic, minimalist monochrome developer interface (Swiss typography, pure black-and-white visual hierarchy, and real-time backend telemetry), this project bridges theoretical backend concepts with hands-on, live-running code:
- **Two Real Server Engines:** An Express.js REST application on Port `5000` and a native raw HTTP server running `http.createServer()` on Port `5001`.
- **Live Interactive Playground:** A Postman-style API client in the browser executing real `fetch()` requests with millisecond-precision timing.
- **Systematic Curriculum:** 10 core modules covering Node.js runtime, CommonJS, native `fs`/`path`/`process`, npm project setup, middleware pipelines, and error handling.
- **Academic Preparation:** 32 curated viva questions with revealable answers, search, and category filtering.

---

## 📑 Table of Contents

- [1. Architecture & Tech Stack](#-architecture--tech-stack)
- [2. Concept Deep-Dive (Curriculum Theory)](#-concept-deep-dive-curriculum-theory)
  - [A. Node.js Runtime & V8 Engine](#a-nodejs-runtime--v8-engine)
  - [B. CommonJS Modules (require & exports)](#b-commonjs-modules-require--exports)
  - [C. The fs (File System) Module](#c-the-fs-file-system-module)
  - [D. The path Module](#d-the-path-module)
  - [E. The process Module](#e-the-process-module)
  - [F. npm & Project Scaffolding](#f-npm--project-scaffolding)
  - [G. Native HTTP Server (Built-in http module)](#g-native-http-server-built-in-http-module)
  - [H. Express.js Framework](#h-expressjs-framework)
  - [I. Routing & HTTP Methods (GET vs POST)](#i-routing--http-methods-get-vs-post)
  - [J. Middleware Pipeline Architecture](#j-middleware-pipeline-architecture)
  - [K. The End-to-End Request-Response Cycle](#k-the-end-to-end-request-response-cycle)
- [3. Interactive Website Modules](#-interactive-website-modules)
- [4. Repository Folder Structure](#-repository-folder-structure)
- [5. Quick Start & Installation](#-quick-start--installation)
- [6. Complete API Endpoints Table](#-complete-api-endpoints-table)
- [7. Practical Testing & Verification Guide](#-practical-testing--verification-guide)
- [8. 30+ College Viva Questions & Answers](#-30-college-viva-questions--answers)
- [9. Faculty Evaluation Demonstration Walkthrough](#-faculty-evaluation-demonstration-walkthrough)
- [10. Troubleshooting & Common Fixes](#-troubleshooting--common-fixes)

---

## 🏗️ Architecture & Tech Stack

```
                        ┌────────────────────────────────────────┐
                        │          React + Vite Client           │
                        │   (Minimalist Monochrome UI @ :5173)   │
                        └───────────────────┬────────────────────┘
                                            │
                     ┌──────────────────────┴──────────────────────┐
                     │                                             │
         HTTP Requests (fetch)                         HTTP Requests (fetch)
                     ▼                                             ▼
┌────────────────────────────────────────┐    ┌────────────────────────────────────────┐
│         Express.js Backend             │    │         Native Raw HTTP Server         │
│             (Port 5000)                │    │             (Port 5001)                │
├────────────────────────────────────────┤    ├────────────────────────────────────────┤
│ • Request Timer (X-Response-Time)      │    │ • Zero external dependencies           │
│ • Logging Middleware (Buffer)          │    │ • Manual URL parsing (url.parse)       │
│ • JSON Body Parser (express.json)      │    │ • Manual HTTP headers (res.writeHead)  │
│ • Safe fs Module Handler               │    │ • Manual JSON streaming (res.end)      │
│ • Cross-Platform path Analyzer         │    │ • Native 404 handler                   │
│ • CommonJS mathUtils Demonstration     │    └────────────────────────────────────────┘
│ • Centralized 4-arg Error Handler      │
└────────────────────────────────────────┘
```

| Layer | Technologies & Tools | Description |
| :--- | :--- | :--- |
| **Backend Runtime** | Node.js (v24.13.0), CommonJS | Executes server JavaScript, manages I/O and disk operations |
| **Web Framework** | Express.js (v4.21.2) | Provides routing, middleware chain, and REST abstractions |
| **Native Server** | Built-in `http` module | Standalone raw server demonstrating low-level HTTP primitives |
| **Frontend UI** | React 18, Vite 6, Lucide Icons | Component-driven dashboard with real-time telemetry polling |
| **Design System** | Pure CSS (Swiss Monochrome) | Minimal `#FFFFFF`/`#111111` typography, zero color distraction |
| **Deployment** | Vercel Serverless / Cloud | High-speed global edge distribution |

---

## 🧠 Concept Deep-Dive (Curriculum Theory)

### A. Node.js Runtime & V8 Engine
- **What is Node.js?** An open-source, cross-platform JavaScript runtime environment created in 2009 by Ryan Dahl. It takes Google Chrome's fast **V8 C++ engine** and wraps it with **libuv** (event loop and asynchronous thread pool) and system bindings.
- **What is a Runtime?** The execution environment that provides the memory management, global objects, and hardware APIs needed for code to execute. Web browsers provide a *DOM/Browser Runtime* (`window`, `document`). Node.js provides a *Server Runtime* (`fs`, `http`, `process`).
- **How does it execute?**
  ```bash
  node filename.js
  ```

---

### B. CommonJS Modules (require & exports)
In Node.js, every JavaScript file is encapsulated as a private **module**. Variables declared in one file do not leak into another.

#### Working Two-File Example:
**1. Exporter (`backend/modules/mathUtils.js`):**
```javascript
function add(a, b) {
  return a + b;
}
function multiply(a, b) {
  return a * b;
}
// Export public interface
module.exports = { add, multiply };
```

**2. Importer (`backend/routes/api.js`):**
```javascript
// Import using CommonJS require()
const mathUtils = require('../modules/mathUtils');

const result = mathUtils.add(10, 5); // Returns 15
```

---

### C. The fs (File System) Module
The built-in `fs` module enables reading, writing, and modifying files on the server's storage disk.

```javascript
const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, '..', 'data', 'sample.txt');

// Synchronous (blocking) read
const content = fs.readFileSync(target, 'utf-8');

// Synchronous safe write
fs.writeFileSync(path.join(__dirname, '..', 'data', 'demo.txt'), 'Hello SIT Nagpur!', 'utf-8');
```

- **Synchronous (`fs.readFileSync`):** Halts the JavaScript thread until disk read completes. Safe for server boot-up configuration.
- **Asynchronous (`fs.readFile`):** Non-blocking. Offloads disk reading to the libuv thread pool and invokes a callback or resolves a Promise when finished.

---

### D. The path Module
Resolves file and directory paths across different operating systems (Windows uses backslash `\`, Linux/macOS use forward slash `/`).

```javascript
const path = require('path');

const file = 'backend/routes/api.js';

path.basename(file); // 'api.js' (filename)
path.extname(file);  // '.js' (extension)
path.dirname(file);  // 'backend/routes' (folder)
path.join('server', 'data', 'demo.txt'); // 'server/data/demo.txt' (cross-platform safe)
```

---

### E. The process Module
A global object providing real-time telemetry and control over the active Node.js instance:
- `process.version`: Current Node.js version (`v24.13.0`).
- `process.platform`: Operating system (`win32`, `linux`, `darwin`).
- `process.pid`: Process ID allocated by the OS task manager.
- `process.uptime()`: Active running seconds since boot.
- `process.argv`: Array of command-line arguments passed at launch.
- `process.env`: Environment variables (credentials are safely filtered in this lab).

---

### F. npm & Project Scaffolding
- **`npm` (Node Package Manager):** Software registry and command-line manager.
- **`package.json`:** Project manifest storing name, version, scripts, dependencies, and devDependencies.
- **`package-lock.json`:** Cryptographic dependency tree lock guaranteeing identical installs.
- **Standard Scaffolding Sequence:**
  ```bash
  mkdir my-app && cd my-app
  npm init -y
  npm install express
  npm install --save-dev nodemon
  ```

---

### G. Native HTTP Server (Built-in http module)
Demonstrated in `backend/raw-server.js` on **Port 5001**:

```javascript
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url, true);
  
  if (req.method === 'GET' && parsed.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ status: 'Raw HTTP server running on port 5001' }));
  }
  
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not Found' }));
});

server.listen(5001);
```

---

### H. Express.js Framework
A fast, minimalist web framework built on top of Node's raw HTTP module.

| Feature | Native Node.js `http` | Express.js Framework |
| :--- | :--- | :--- |
| **Routing** | Manual string comparisons (`if (req.url === '...')`) | Declarative methods (`app.get()`, `app.post()`) |
| **Middleware** | Must be manually coded | Built-in pipeline (`app.use()`, `next()`) |
| **JSON Output** | `res.writeHead()` + `JSON.stringify()` + `res.end()` | Single line: `res.json(...)` |
| **Body Parsing** | Collect raw data buffer chunks with stream events | Automatic with `express.json()` |

---

### I. Routing & HTTP Methods (GET vs POST)
- **`GET`:** Used to retrieve data; parameters are visible in URL query string (`/api/hello?name=Student`).
- **`POST`:** Used to submit data; payload is transmitted inside the Request Body, allowing complex and protected payloads.

---

### J. Middleware Pipeline Architecture
Middleware functions have access to `req`, `res`, and the `next` callback.

```
Client Request
      │
      ▼
┌────────────────────────────────────────┐
│  1. Request Timer Middleware           │  (Measures start time via process.hrtime)
└──────────────────┬─────────────────────┘
                   │ next()
                   ▼
┌────────────────────────────────────────┐
│  2. Logger Middleware                  │  (Records method, route, status to memory)
└──────────────────┬─────────────────────┘
                   │ next()
                   ▼
┌────────────────────────────────────────┐
│  3. express.json() Body Parser         │  (Parses raw JSON bytes into req.body)
└──────────────────┬─────────────────────┘
                   │ next()
                   ▼
┌────────────────────────────────────────┐
│  4. Route Handler (e.g. /api/status)   │  (Executes business logic & res.json())
└──────────────────┬─────────────────────┘
                   │
                   ▼
Client Receives Response (with X-Response-Time header)
```

---

### K. The End-to-End Request-Response Cycle
1. **User Action:** User clicks "Send Request" in the API Playground.
2. **HTTP Dispatch:** Browser `fetch()` sends an HTTP packet across localhost to Port 5000.
3. **Kernel Acceptance:** Express creates `req` and `res` stream instances.
4. **Pipeline Traversal:** Request passes through Timer $\rightarrow$ Logger $\rightarrow$ Body Parser.
5. **Route Execution:** Matching route handler reads from disk/memory and triggers `res.json()`.
6. **Header Injection:** Timer attaches `X-Response-Time: 1.4ms` header.
7. **Client Rendering:** React renders the response JSON and updates telemetry.

---

## 💻 Interactive Website Modules

| Module Name | Route ID | Educational Functionality |
| :--- | :--- | :--- |
| **Dashboard** | `dashboard` | Live server telemetry, latency pill, uptime, PID, and live recent request table |
| **Node Fundamentals** | `fundamentals` | V8 engine architecture, Browser vs Node matrix, and line-by-line CommonJS breakdown |
| **Core Modules Lab** | `core-modules` | Interactive tabs for live `fs` read/write, `path` analyzer, `process` inspection, and `mathUtils` |
| **npm Project Setup** | `npm-setup` | 5-step terminal CLI guide with copy buttons and an interactive `package.json` explorer |
| **Raw HTTP Server** | `raw-http` | Live Port 5001 health detector with buttons to test endpoints without Express |
| **Express Routing** | `express-routing` | Live execution console testing query params, POST echoing, feedback submission, and 404s |
| **Middleware Lab** | `middleware-lab` | Visual sequence diagram, `next()` flow demonstration, and real-time middleware log feed |
| **API Playground** | `api-playground` | Postman-style REST testing console with preset templates and header/body inspectors |
| **Project Structure** | `project-structure`| Interactive file tree synchronizing actual source code with explanatory notes |
| **Viva Questions** | `viva-questions` | 26 categorized oral exam questions with keyword search and revealable answers |

---

## 📁 Repository Folder Structure

```
week 15 and 16/
├── package.json               # Root scripts to orchestrate backend & frontend
├── README.md                  # Comprehensive documentation, theory & viva guide
├── .gitignore                 # Exclusion list (node_modules, logs, .env)
├── .env.example               # Safe environment variable configuration template
│
├── backend/                   # Node.js + Express.js Server
│   ├── server.js              # Express entrypoint on Port 5000 (CORS, middleware, routes)
│   ├── raw-server.js          # Standalone native http.createServer() on Port 5001
│   ├── package.json           # Backend dependencies (express, cors, nodemon)
│   ├── routes/
│   │   ├── index.js           # Informational routes (GET /, GET /about)
│   │   └── api.js             # REST API routes (/status, /time, /hello, /echo, etc.)
│   ├── middleware/
│   │   ├── logger.js          # Request logger with in-memory activity ring buffer
│   │   ├── requestTimer.js    # Calculates latency and attaches X-Response-Time header
│   │   └── errorHandler.js    # Centralized 404 & 500 JSON error handlers
│   ├── modules/
│   │   ├── fileDemo.js        # Safe fs read & write (traversal protected)
│   │   ├── pathDemo.js        # Cross-platform path.join, basename, extname analyzer
│   │   └── mathUtils.js       # CommonJS module.exports demo module
│   └── data/
│       ├── sample.txt         # Dedicated sample file read via fs
│       └── demo.txt           # Dedicated file safely written via fs.writeFileSync
│
└── frontend/                  # React + Vite Client
    ├── package.json           # Dependencies (react, lucide-react, vite)
    ├── vite.config.js         # Reverse-proxy config to port 5000
    ├── index.html             # Typographic HTML shell (Inter & JetBrains Mono)
    └── src/
        ├── main.jsx           # React DOM root entrypoint
        ├── App.jsx            # State coordinator with telemetry polling
        ├── index.css          # Minimalist monochrome design system
        ├── components/        # Reusable UI components (Navbar, Sidebar, CodeBlock)
        ├── views/             # 10 Curriculum Views
        └── data/              # Static datasets (vivaData.js, projectTreeData.js)
```

---

## ⚡ Quick Start & Installation

### 1. Clone & Install Dependencies
```bash
# Clone the repository
git clone https://github.com/Sameerkaradbhajne/nodejs-express-learning-lab.git
cd nodejs-express-learning-lab

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
```

### 2. Launch the Development Environment
For the best demonstration experience, start each component in a separate terminal:

```bash
# Terminal 1 — Express Backend Server (Port 5000):
cd backend
npm start

# Terminal 2 — Standalone Native Raw HTTP Server (Port 5001):
cd backend
npm run raw

# Terminal 3 — React Frontend (Port 5173):
cd frontend
npm run dev
```

### 3. Open in Browser
- **Local Client:** [http://localhost:5173](http://localhost:5173)
- **Live Cloud Deployment:** [https://nodejs-express-learning-lab.vercel.app/](https://nodejs-express-learning-lab.vercel.app/)

---

## 📡 Complete API Endpoints Table

### Express Server (`http://localhost:5000`)
| Method | Endpoint | Description | Sample Query / Body | Expected Status |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/` | Project overview & college metadata | None | `200 OK` |
| `GET` | `/about` | Syllabus overview & architecture | None | `200 OK` |
| `GET` | `/api/status` | Live telemetry (Node version, uptime, PID, RAM) | None | `200 OK` |
| `GET` | `/api/time` | High-precision server timestamps | None | `200 OK` |
| `GET` | `/api/hello` | Query parameter parsing | `?name=Sameer` | `200 OK` |
| `POST` | `/api/echo` | Validates & echoes JSON payload | `{"msg": "Hello Express"}` | `200 OK` |
| `GET` | `/api/modules` | Lists all 10 educational modules | None | `200 OK` |
| `GET` | `/api/files/sample` | Reads `sample.txt` via `fs.readFileSync` | None | `200 OK` |
| `GET` | `/api/files/demo` | Reads `demo.txt` via `fs.readFileSync` | None | `200 OK` |
| `POST`| `/api/files/write` | Safely writes text to `demo.txt` | `{"content": "New text"}` | `200 OK` |
| `GET` | `/api/path-demo` | Analyzes path with `path` utilities | `?path=backend/server.js` | `200 OK` |
| `POST`| `/api/feedback` | In-memory feedback submission | `{"studentName": "Aarav", "comment": "Great lab", "rating": 5}` | `201 Created` |
| `GET` | `/api/feedback` | Retrieves recent feedback entries | None | `200 OK` |
| `GET` | `/api/logs` | In-memory request logs from logger | `?limit=15` | `200 OK` |
| `GET` | `/api/process-info` | Safe runtime process telemetry | None | `200 OK` |
| `GET` | `/api/commonjs-demo`| Tests imported `mathUtils.js` | `?a=12&b=8` | `200 OK` |
| `ALL` | `/api/*` | Centralized 404 handler | Any invalid URL | `404 Not Found` |

### Native Raw HTTP Server (`http://localhost:5001`)
| Method | Endpoint | Description | Expected Status |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Welcome message from raw server | `200 OK` |
| `GET` | `/about` | Architectural differences vs Express | `200 OK` |
| `GET` | `/api/status` | Native server uptime & process version | `200 OK` |
| `GET` | `/api/time` | Native server timestamp | `200 OK` |
| `ALL` | `/invalid` | Native 404 response | `404 Not Found` |

---

## 🧪 Practical Testing & Verification Guide

### Test Suite Execution Checklist:
- [x] **Live Status Telemetry:** Open Dashboard $\rightarrow$ Verify Node.js version, PID, and latency indicator.
- [x] **File System (`fs`):** Navigate to Core Modules Lab $\rightarrow$ Click "Read Disk" $\rightarrow$ Type new text $\rightarrow$ Click "Write Content to demo.txt" $\rightarrow$ Verify file saved on disk.
- [x] **Path Utilities (`path`):** Enter custom path `backend/data/sample.txt` $\rightarrow$ Click "Analyze Path" $\rightarrow$ Confirm `basename`, `extname`, `dirname`.
- [x] **CommonJS Modularity:** Enter values $A=25$, $B=4$ $\rightarrow$ Click "Run mathUtils" $\rightarrow$ Verify live server outputs addition $29$ and multiplication $100$.
- [x] **Raw HTTP Server:** Switch to Raw HTTP Server $\rightarrow$ Test `GET /api/time` on Port 5001 $\rightarrow$ Test `GET /invalid` to confirm native 404 handling.
- [x] **API Playground:** Send `GET /api/hello?name=HackOWeek` $\rightarrow$ Send `POST /api/echo` with JSON body $\rightarrow$ Check response time and status badges.
- [x] **Error Handling:** Send invalid JSON body (missing bracket) $\rightarrow$ Confirm server returns structured `400 Bad Request` without crashing.

---

## 🎓 30+ College Viva Questions & Answers

<details>
<summary><b>1. What is Node.js and who created it?</b></summary>
<br>
<b>Answer:</b> Node.js is an open-source, cross-platform JavaScript runtime environment created in 2009 by Ryan Dahl. It executes JavaScript outside the browser using Google Chrome's V8 engine and libuv.
</details>

<details>
<summary><b>2. What is a runtime environment?</b></summary>
<br>
<b>Answer:</b> A runtime environment provides the execution support, memory allocation, and system APIs required for a programming language to execute on a computer.
</details>

<details>
<summary><b>3. Why can JavaScript run outside a browser using Node.js?</b></summary>
<br>
<b>Answer:</b> Because Node.js extracted the V8 JavaScript engine from Chrome and bound it with C++ operating system libraries for filesystem access, TCP networking, and process management.
</details>

<details>
<summary><b>4. How does Node.js handle concurrent requests with a single thread?</b></summary>
<br>
<b>Answer:</b> Through its non-blocking event loop. Time-consuming I/O tasks (file reading, network queries) are delegated to the OS kernel or libuv thread pool. The main thread continues running other code without blocking.
</details>

<details>
<summary><b>5. What is CommonJS?</b></summary>
<br>
<b>Answer:</b> CommonJS is the original module specification used by Node.js. In CommonJS, each file is a module, exports are declared via `module.exports`, and dependencies are loaded using `require()`.
</details>

<details>
<summary><b>6. What does require() do?</b></summary>
<br>
<b>Answer:</b> `require()` is a built-in CommonJS function that synchronously reads, executes, caches, and returns the exported object from another file or npm package.
</details>

<details>
<summary><b>7. What is module.exports?</b></summary>
<br>
<b>Answer:</b> `module.exports` is a special object created automatically by Node.js for every file. Anything assigned to it is made public for other files to import.
</details>

<details>
<summary><b>8. What is the difference between module.exports and exports?</b></summary>
<br>
<b>Answer:</b> `module.exports` is the actual object returned by `require()`. `exports` is simply a reference shortcut pointing to `module.exports`. If `module.exports` is reassigned, `exports` loses its link.
</details>

<details>
<summary><b>9. What is npm?</b></summary>
<br>
<b>Answer:</b> npm (Node Package Manager) is the default package manager for Node.js, consisting of an online registry of open-source packages and a CLI tool to install and manage them.
</details>

<details>
<summary><b>10. What is package.json?</b></summary>
<br>
<b>Answer:</b> `package.json` is the manifest file at the root of a Node.js project. It records metadata (name, version), executable scripts (`start`, `dev`), and lists required dependencies.
</details>

<details>
<summary><b>11. What is the difference between dependencies and devDependencies?</b></summary>
<br>
<b>Answer:</b> `dependencies` are packages required for the app to function in production (e.g., Express). `devDependencies` are tools only needed while coding (e.g., Nodemon, linters).
</details>

<details>
<summary><b>12. What does npm init -y do?</b></summary>
<br>
<b>Answer:</b> It automatically generates a default `package.json` file in the current folder without prompting the user with questions (`-y` means yes to all).
</details>

<details>
<summary><b>13. What is the node_modules folder?</b></summary>
<br>
<b>Answer:</b> It is the local directory where npm installs and unpacks all external packages and their dependencies. It is excluded from Git via `.gitignore`.
</details>

<details>
<summary><b>14. What is the fs module?</b></summary>
<br>
<b>Answer:</b> The File System (`fs`) module is a built-in Node.js module that allows reading, writing, updating, and deleting files on the local storage disk.
</details>

<details>
<summary><b>15. What is the difference between fs.readFileSync and fs.readFile?</b></summary>
<br>
<b>Answer:</b> `fs.readFileSync` is synchronous and blocks thread execution until the read completes. `fs.readFile` is asynchronous, non-blocking, and uses a callback function.
</details>

<details>
<summary><b>16. What does the path module do?</b></summary>
<br>
<b>Answer:</b> The `path` module provides cross-platform utilities for handling file and folder paths, automatically handling `\` on Windows and `/` on Linux/macOS.
</details>

<details>
<summary><b>17. What does path.join() do?</b></summary>
<br>
<b>Answer:</b> It joins multiple path segments together into a single path using the operating-system-specific separator.
</details>

<details>
<summary><b>18. What does path.basename() return?</b></summary>
<br>
<b>Answer:</b> It extracts and returns the last portion of a path, which is typically the filename with its extension (e.g., `api.js`).
</details>

<details>
<summary><b>19. What is the process object in Node.js?</b></summary>
<br>
<b>Answer:</b> `process` is a global object that provides control over and information about the currently running Node.js process (e.g., PID, platform, uptime).
</details>

<details>
<summary><b>20. What is process.argv?</b></summary>
<br>
<b>Answer:</b> An array containing the command-line arguments passed when launching the Node.js process.
</details>

<details>
<summary><b>21. What is an HTTP server?</b></summary>
<br>
<b>Answer:</b> Software that binds to a network port, listens for incoming HTTP requests from clients, processes them, and returns HTTP responses.
</details>

<details>
<summary><b>22. What is a port number?</b></summary>
<br>
<b>Answer:</b> A numerical identifier (0–65535) assigned to a specific network process on a computer to direct incoming internet traffic to the correct application.
</details>

<details>
<summary><b>23. What is Express.js?</b></summary>
<br>
<b>Answer:</b> Express.js is a fast, unopinionated, lightweight web framework built on top of Node.js that simplifies routing, middleware integration, and REST API development.
</details>

<details>
<summary><b>24. What is the difference between Node.js and Express.js?</b></summary>
<br>
<b>Answer:</b> Node.js is the runtime environment that lets you execute JavaScript on a server. Express.js is a framework built on top of Node.js that provides clean routing and middleware tools.
</details>

<details>
<summary><b>25. What is Routing in Express?</b></summary>
<br>
<b>Answer:</b> Routing refers to how an application responds to a client request at a specific URI/path and HTTP method (such as `app.get('/about', handler)`).
</details>

<details>
<summary><b>26. What is the difference between GET and POST requests?</b></summary>
<br>
<b>Answer:</b> `GET` retrieves data from the server and carries parameters in the URL. `POST` submits data to the server and carries its payload securely inside the request body.
</details>

<details>
<summary><b>27. What is Middleware in Express?</b></summary>
<br>
<b>Answer:</b> A function with access to the `req`, `res`, and `next` objects that can run code, modify requests/responses, or pass control to the next function.
</details>

<details>
<summary><b>28. What happens if a middleware does not call next()?</b></summary>
<br>
<b>Answer:</b> The request-response cycle stops, and the client request will hang indefinitely until it times out.
</details>

<details>
<summary><b>29. What does express.json() do?</b></summary>
<br>
<b>Answer:</b> It is built-in middleware that automatically parses incoming HTTP requests with JSON payloads and populates `req.body`.
</details>

<details>
<summary><b>30. What is a 404 HTTP status code?</b></summary>
<br>
<b>Answer:</b> An HTTP status code indicating that the server could not find the requested route or resource.
</details>

<details>
<summary><b>31. What is CORS and why is it needed?</b></summary>
<br>
<b>Answer:</b> Cross-Origin Resource Sharing (CORS) is a browser security mechanism. It requires servers to explicitly allow requests originating from a different domain or port (e.g., port 5173 querying port 5000).
</details>

<details>
<summary><b>32. How does our project handle errors safely?</b></summary>
<br>
<b>Answer:</b> We use centralized 4-argument error-handling middleware `(err, req, res, next)` in `backend/middleware/errorHandler.js` that returns clean JSON without leaking internal server stack traces to users.
</details>

---

## 🎯 Faculty Evaluation Demonstration Walkthrough

When presenting this project during your college evaluation:
1. **Show the Clean Codebase:** Open the project in VS Code and show the modular structure: `routes/`, `middleware/`, and `modules/`.
2. **Highlight the Live Telemetry:** Point out the live telemetry pill in the header showing the active connection to Express on Port 5000 and millisecond latency.
3. **Demonstrate File Operations (`fs`):** In the Core Modules Lab, read `sample.txt` directly from disk and write new text to `demo.txt`.
4. **Demonstrate Raw HTTP vs. Express:** Open the Raw HTTP Server view on Port 5001 and explain that it operates using native `http.createServer()` without any external framework.
5. **Demonstrate the Middleware Pipeline:** Fire a request in the Middleware Lab and show how the `X-Response-Time` header is computed and logged.
6. **Demonstrate the API Playground:** Send `GET /api/hello?name=Faculty` and `POST /api/echo` to prove real HTTP communication.
7. **Answer Viva Questions:** Open the Viva Questions module and use the search bar to demonstrate mastery of the theory.

---

## 🛠️ Troubleshooting & Common Fixes

| Problem | Root Cause | Exact Solution |
| :--- | :--- | :--- |
| **`EADDRINUSE: :::5000`** | Another process is occupying port 5000 | Run `netstat -ano \| findstr :5000` in PowerShell and terminate the PID with `taskkill /PID <PID> /F` |
| **`Cannot find module 'express'`** | Backend dependencies not installed | Run `cd backend && npm install` |
| **Frontend displays "OFFLINE"** | Express server not started | Open terminal, navigate to `backend/`, and run `npm start` |
| **Raw Server displays "STANDBY"**| Raw server not started on port 5001 | Open separate terminal, navigate to `backend/`, and run `npm run raw` |
| **`SyntaxError: Unexpected token`**| Malformed JSON body in POST request | Validate JSON formatting in the API Playground (check for missing quotes or brackets) |

---

<div align="center">
  <b>Developed for Hack-O-Week — SIT Nagpur (CSE Batch 2025–29)</b><br />
  Designed & Built with Node.js, Express.js, and React.
</div>
