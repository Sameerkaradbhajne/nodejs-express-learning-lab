# Node.js & Express.js Learning Lab
## Hack-O-Week — SIT Nagpur, CSE Batch 2025–29
### A Complete, Beginner-Friendly Guide to Backend Development

Welcome to the **Node.js & Express.js Learning Lab**! This project was built specifically for the **Hack-O-Week** evaluation at **Symbiosis Institute of Technology (SIT), Nagpur** for the **Computer Science & Engineering Batch 2025–29**.

If you are learning backend development for the first time, this document is designed for you. It explains every single concept in simple English, breaks down every line of code, shows you how the project is organized, explains how to run and test it, and includes over 30 viva questions with concise answers to help you ace your college evaluation.

---

## Table of Contents
1. [Project Introduction](#1-project-introduction)
2. [Detailed Theory: Every Topic from the College Assignment](#2-detailed-theory-every-topic-from-the-college-assignment)
   - [A. Node.js Runtime](#a-nodejs-runtime)
   - [B. CommonJS Modules](#b-commonjs-modules)
   - [C. The fs (File System) Module](#c-the-fs-file-system-module)
   - [D. The path Module](#d-the-path-module)
   - [E. The process Module](#e-the-process-module)
   - [F. npm and Project Setup](#f-npm-and-project-setup)
   - [G. Native HTTP Server (Built-in http Module)](#g-native-http-server-built-in-http-module)
   - [H. Express.js Framework](#h-expressjs-framework)
   - [I. Routing & HTTP Methods](#i-routing--http-methods)
   - [J. Middleware Pipeline](#j-middleware-pipeline)
   - [K. The Full Request-Response Cycle](#k-the-full-request-response-cycle)
3. [Walkthrough of the Website Features](#3-walkthrough-of-the-website-features)
4. [The Minimalist Black-and-White Design](#4-the-minimalist-black-and-white-design)
5. [Actual Project Folder Structure](#5-actual-project-folder-structure)
6. [Step-by-Step Installation & Execution Guide](#6-step-by-step-installation--execution-guide)
7. [Complete API Endpoints Table](#7-complete-api-endpoints-table)
8. [Practical Testing Guide](#8-practical-testing-guide)
9. [30+ College Viva Questions & Answers](#9-30-college-viva-questions--answers)
10. [Troubleshooting Common Issues](#10-troubleshooting-common-issues)

---

## 1. Project Introduction

### What is this project?
This project is an interactive, full-stack educational web application called **Node.js & Express.js Learning Lab**. 

Unlike a static notes website, this application has:
1. A **real backend server** running on Node.js and Express.js (Port `5000`).
2. A **standalone native HTTP server** running on pure Node.js without any framework (Port `5001`).
3. A **modern React frontend** built with Vite (Port `5173`), designed with a clean, monochrome aesthetic inspired by developer tools.
4. An interactive **API Playground**, **Live Request Logger**, **File System Explorer**, and **Viva Examination Suite**.

### Why did we build it?
In classroom lectures, students often learn backend development purely through theory or disconnected terminal commands. We built this lab to bridge that gap: you can click a button on the screen, see an actual HTTP request leave the browser, watch the backend middleware calculate processing time, see the route handler read a file from the hard disk, and view the real formatted JSON response right on your screen.

### What is Backend Development?
When you visit a website (like Google, Amazon, or your college portal):
- **Frontend (Client-side):** What you see and click on your screen — buttons, colors, text, and layouts built with HTML, CSS, and React.
- **Backend (Server-side):** The behind-the-scenes engine that runs on a computer (server) somewhere in the world. It processes user logins, stores data in databases, reads and writes files on disk, checks security rules, and calculates answers before sending them back to the frontend.

### Real-Life Restaurant Analogy
To understand client-server communication, think of a restaurant:
1. **You (The Client / Browser):** You sit at the table and look at the menu.
2. **The Waiter (HTTP Request):** You tell the waiter: *"Please bring me a pizza."* The waiter carries your request to the kitchen.
3. **The Kitchen & Chef (The Backend Server):** The chef checks the recipe, takes ingredients from storage (hard disk/database), cooks the pizza, and prepares the dish.
4. **The Waiter Returns (HTTP Response):** The waiter delivers the hot pizza to your table with a status message: *"Here is your order (200 OK)."* If the kitchen ran out of pizza, the waiter tells you: *"Sorry, not available (404 Not Found)."*

---

## 2. Detailed Theory: Every Topic from the College Assignment

### A. Node.js Runtime

#### What is Node.js?
**Node.js is an open-source, cross-platform JavaScript runtime environment that lets you execute JavaScript code outside a web browser.**

Historically, JavaScript was created in 1995 to run *only* inside web browsers to make buttons clickable and animate web pages. In 2009, an engineer named Ryan Dahl took Google Chrome's fast **V8 JavaScript engine**, combined it with C++ system bindings and an asynchronous I/O library called **libuv**, and created Node.js.

#### What does "Runtime" mean?
A **runtime environment** is like the "operating room" for a programming language. It provides all the memory, background tools, libraries, and system connections that a program needs while it is actively running.
- In a **Browser Runtime**, JavaScript has access to `window`, `document`, and web page buttons, but **cannot** read files from your computer's hard drive for security reasons.
- In the **Node.js Runtime**, JavaScript does not have a web page screen (`window` and `document` do not exist). Instead, it has direct access to the operating system: files (`fs`), network connections (`http`), CPU processes (`process`), and folders (`path`).

#### How to execute a JavaScript file with Node.js
Open your terminal and type:
```bash
node filename.js
```
Node.js immediately starts the V8 engine, reads `filename.js`, executes every line, and prints any `console.log()` output directly in your terminal.

---

### B. CommonJS Modules

#### What is a Module?
A **module** is simply a single JavaScript file that contains related code (functions, objects, or variables). Instead of writing 5,000 lines of code in one huge messy file, we break our project down into small, clean, reusable modules.

#### Why are modules useful?
1. **Maintainability:** If there is a bug in file operations, you only need to check `fileDemo.js`.
2. **Reusability:** You write a math or helper function once, and reuse it across 10 different files.
3. **Scope Protection:** Variables inside a module are private by default. They do not accidentally overwrite variables in other files.

#### What do `module.exports` and `require()` do?
In Node's default **CommonJS** module system:
- `module.exports`: A special object provided by Node. Whatever you attach to this object becomes public and accessible to other files.
- `require('path-to-file')`: A built-in function used by other files to import that exported object.

#### Working Two-File Example:

**File 1: `backend/modules/mathUtils.js` (The Exporter)**
```javascript
// Function 1
function add(a, b) {
  return a + b;
}

// Function 2
function multiply(a, b) {
  return a * b;
}

// Exporting both functions so other files can use them
module.exports = {
  add,
  multiply
};
```

**File 2: `backend/routes/api.js` (The Importer)**
```javascript
// Import the functions using require()
const mathUtils = require('../modules/mathUtils');

// Call the imported functions
const sum = mathUtils.add(10, 5);       // Returns 15
const product = mathUtils.multiply(4, 3); // Returns 12

console.log('Sum:', sum);
console.log('Product:', product);
```

---

### C. The fs (File System) Module

#### What is the `fs` module?
The `fs` module is a built-in Node.js module that allows your JavaScript program to interact directly with files and folders on your computer's storage disk. You do not need to install it with npm; it comes built into Node.js.

#### Synchronous vs. Asynchronous Operations
1. **Synchronous (e.g., `fs.readFileSync`):**
   - **Blocking.** The entire JavaScript thread stops and waits until the file is completely read from the disk. 
   - Good for: Reading startup configuration files when the server boots up.
   - Bad for: High-traffic servers handling 500 requests at once, because one slow file read freezes the server for everyone.
2. **Asynchronous (e.g., `fs.readFile` with callbacks or Promises):**
   - **Non-blocking.** Node sends the file read request to the background (libuv thread pool) and continues handling other user requests immediately. When the file is ready, Node triggers your callback function with the data.

#### Example Code Used in This Project:
```javascript
const fs = require('fs');
const path = require('path');

// 1. Build a safe path to the file
const filePath = path.join(__dirname, '..', 'data', 'sample.txt');

// 2. Read the file synchronously as UTF-8 plain text
try {
  const content = fs.readFileSync(filePath, 'utf-8');
  console.log('File Content:', content);
} catch (error) {
  console.error('Could not read file:', error.message);
}

// 3. Write new text to demo.txt safely
const newText = "Hello from Hack-O-Week SIT Nagpur!";
fs.writeFileSync(path.join(__dirname, '..', 'data', 'demo.txt'), newText, 'utf-8');
console.log('File saved successfully!');
```

---

### D. The path Module

#### What is the `path` module?
The `path` module provides utilities for working with directory and file paths across different operating systems.

#### Why is `path` so important?
Different operating systems write file paths differently:
- **Windows** uses backslashes: `folder\subfolder\file.txt`
- **Linux and macOS** use forward slashes: `folder/subfolder/file.txt`

If you hardcode `"folder/" + "file.txt"`, your code will fail on Windows! The `path` module automatically detects the operating system and uses the correct separator.

#### Key Functions Explained:
| Function | Example Input | Result | What it Does |
| :--- | :--- | :--- | :--- |
| `path.join('backend', 'routes', 'api.js')` | 3 segments | `backend/routes/api.js` (or `\` on Windows) | Glues path segments together safely |
| `path.basename('backend/routes/api.js')` | Full path | `api.js` | Returns only the last part (the filename) |
| `path.extname('backend/routes/api.js')` | Full path | `.js` | Returns the file extension |
| `path.dirname('backend/routes/api.js')` | Full path | `backend/routes` | Returns the directory path excluding filename |
| `path.parse('backend/routes/api.js')` | Full path | Object with root, dir, base, ext, name | Breaks a path down into all its components |

---

### E. The process Module

#### What is the `process` object?
In Node.js, `process` is a global object that provides real-time information about, and control over, the currently running Node.js program. You do not need to `require()` it.

#### Important Properties Used in Our Project:
1. `process.version`: The version of Node.js installed on your machine (e.g., `v24.13.0`).
2. `process.platform`: The operating system you are running on (`win32` for Windows, `linux` for Linux, `darwin` for macOS).
3. `process.pid`: The unique Process ID assigned by your operating system's task manager to this specific running program.
4. `process.cwd()`: Returns the **Current Working Directory** where your terminal command was launched.
5. `process.uptime()`: Returns how many seconds the server has been running without stopping or restarting.
6. `process.argv`: An array containing the command-line arguments passed when starting the program. For example, running `node server.js --port=5000` gives:
   - `process.argv[0]`: Path to node executable
   - `process.argv[1]`: Path to `server.js`
   - `process.argv[2]`: `'--port=5000'`
7. `process.env`: An object containing environment variables (such as `PORT=5000` or `NODE_ENV=development`). **Security note:** Never send secret passwords or API keys to the frontend! Our project cleans this object to only display safe variables.

---

### F. npm and Project Setup

#### What is npm?
**npm (Node Package Manager)** is the world's largest registry of open-source software packages and the default command-line tool that comes bundled with Node.js.

#### Key Definitions:
- **Package / Library:** Pre-written code created by other developers that you can download and use in your project (e.g., `express` or `cors`).
- **Dependency:** A package that your application strictly needs to run in production.
- **DevDependency:** A tool you only need while writing code (e.g., `nodemon` for auto-restarting the server during development).
- **`package.json`:** The "identity card" and manifest of your project. It lists your project name, version, start scripts, and installed packages.
- **`package-lock.json`:** An automatically generated file that locks the exact versions and download links of every sub-dependency, ensuring that your teammate gets the exact same code when they run `npm install`.
- **`node_modules/`:** The folder on your computer where npm actually downloads and unpacks all external packages. It is usually huge, so we never commit it to Git (it is listed in `.gitignore`).

#### How to Create a Node.js Project From Scratch:
Here are the standard commands in order:
```bash
# 1. Create a project directory
mkdir my-backend-project

# 2. Enter the directory
cd my-backend-project

# 3. Create a default package.json without answering prompts (-y means yes)
npm init -y

# 4. Install production dependency (Express framework)
npm install express

# 5. Install development dependency (Nodemon for auto-restart)
npm install --save-dev nodemon
```

---

### G. Native HTTP Server (Built-in http Module)

#### What is HTTP?
**HTTP (Hypertext Transfer Protocol)** is the standard set of rules that computers on the internet use to communicate. A **Client** (e.g., your browser or phone app) sends an HTTP **Request**, and the **Server** returns an HTTP **Response**.

#### Anatomy of Native `http.createServer()`:
Node.js includes a native `http` module that allows you to build a web server without installing any external packages like Express.

In our project, we implemented this in `backend/raw-server.js` on **Port 5001**:

```javascript
const http = require('http');
const url = require('url');

// Create the server instance
const server = http.createServer((req, res) => {
  // 1. Inspect incoming request
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // 2. Set headers (Status 200, Content-Type JSON)
  if (method === 'GET' && pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    // 3. Send response body and close connection
    return res.end(JSON.stringify({ message: 'Hello from Raw HTTP Server!' }));
  }

  // 4. Handle 404 for unknown routes
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Route Not Found', statusCode: 404 }));
});

// Bind server to port 5001
server.listen(5001, () => {
  console.log('Raw HTTP server listening on port 5001');
});
```

#### What is a Port?
Think of an IP address (like `127.0.0.1` or `localhost`) as the street address of a large apartment building. A **port number** is the apartment number. A single computer can run multiple servers at the same time as long as each server listens on its own unique port:
- Our Express server listens on **Port 5000**.
- Our Raw HTTP server listens on **Port 5001**.
- Our React Vite frontend listens on **Port 5173**.

---

### H. Express.js Framework

#### What is Express.js?
**Express.js is a minimal, fast, and unopinionated web framework built on top of Node.js.**

While Node's raw `http` module is powerful, writing a complex API with it requires dozens of manual `if/else` checks for every URL, manual header writing, and difficult JSON body parsing. Express wraps Node's native HTTP tools and provides clean, elegant methods like `app.get()`, `app.post()`, and `res.json()`.

#### Node.js vs. Express.js Comparison Table:
| Feature | Native Node.js (`http` module) | Express.js Framework |
| :--- | :--- | :--- |
| **Category** | Runtime environment and built-in standard library | Third-party web framework built on top of Node |
| **Installation** | Built-in (no installation needed) | Requires installation (`npm install express`) |
| **Routing** | Manual string checks (`if (req.url === '/about')`) | Clean methods (`app.get('/about', handler)`) |
| **Middleware** | Must be coded by hand from scratch | Built-in pipeline (`app.use()`, `next()`) |
| **JSON Responses** | Manual `res.writeHead()` and `JSON.stringify()` | One line: `res.json({ message: "Success" })` |
| **Request Bodies** | Must collect raw buffer chunks (`req.on('data')`) | Automatic with `express.json()` middleware |
| **Speed to Build** | Verbose, repetitive, and error-prone for big apps | Extremely fast, readable, and industry-standard |

---

### I. Routing & HTTP Methods

#### What is Routing?
**Routing** means determining how an application responds to a client request at a specific endpoint (URI/path) and with a specific HTTP method.

#### Common HTTP Methods:
1. **`GET`:** Used to **retrieve** data from the server. It should never change data on the server. Parameters are visible in the URL (e.g., `/api/hello?name=Sameer`).
2. **`POST`:** Used to **send/submit** data to the server to create or process something. The data is sent securely inside the **Request Body**, not visible in the URL.
3. **`PUT` / `PATCH`:** Used to update existing data.
4. **`DELETE`:** Used to remove data.

#### Query Parameters vs. Route Paths:
- **Route Path:** The main destination URL: `/api/status` or `/api/hello`.
- **Query Parameter:** Optional key-value pairs appended after a question mark `?`:  
  `/api/hello?name=Student&batch=2025`  
  In Express, this is parsed automatically into: `req.query.name` and `req.query.batch`.

---

### J. Middleware Pipeline

#### What is Middleware?
**Middleware functions are functions that execute in the middle of the request-response cycle**, between the moment the server receives an incoming request and the moment the route handler sends the final response.

Every middleware function has access to:
1. `req`: The Request object.
2. `res`: The Response object.
3. `next`: A callback function that passes control to the next middleware in line.

#### Text-Based Middleware Flow Diagram:
```
[Client sends Request]
        │
        ▼
┌────────────────────────────────────────┐
│  1. Request Timer Middleware           │  <-- Records start time with process.hrtime()
└───────────────────┬────────────────────┘
                    │ next()
                    ▼
┌────────────────────────────────────────┐
│  2. Request Logger Middleware          │  <-- Prints method & path; logs to in-memory buffer
└───────────────────┬────────────────────┘
                    │ next()
                    ▼
┌────────────────────────────────────────┐
│  3. express.json() Body Parser         │  <-- Converts raw JSON payload into req.body
└───────────────────┬────────────────────┘
                    │ next()
                    ▼
┌────────────────────────────────────────┐
│  4. Route Handler (e.g., /api/status)  │  <-- Generates data and calls res.json()
└───────────────────┬────────────────────┘
                    │
                    ▼
[Timer attaches X-Response-Time header & Client receives Response]
```

#### What happens if `next()` is not called?
If a middleware neither calls `next()` nor sends a response with `res.send()` / `res.json()`, the request will hang indefinitely until the browser times out!

---

### K. The Full Request-Response Cycle

Here is what happens when you click **"Send Request"** in our project's **API Playground**:

1. **User Action:** You select `POST /api/feedback`, type your name, and click "Send Request".
2. **Client HTTP Request:** The React frontend uses the browser `fetch()` API to serialize your text into JSON and send an HTTP `POST` packet across localhost to Port `5000`.
3. **Express Kernel Receives:** Express accepts the TCP socket connection and wraps the incoming data stream into `req` and `res` objects.
4. **Middleware 1 (Timer):** Records the start timestamp using high-resolution time (`process.hrtime()`).
5. **Middleware 2 (Logger):** Captures `POST /api/feedback`, client IP `127.0.0.1`, and stores it in the activity ring buffer.
6. **Middleware 3 (`express.json`):** Parses the incoming JSON body string and places it into `req.body`.
7. **Route Handler (`backend/routes/api.js`):** Checks if `studentName` and `comment` exist. If valid, adds the item to the in-memory array and calls:
   ```javascript
   res.status(201).json({ success: true, message: "Feedback submitted successfully." });
   ```
8. **Response Headers Attached:** The response timer calculates elapsed milliseconds (e.g., `1.8ms`) and attaches the `X-Response-Time: 1.8ms` header.
9. **Client Renders:** The React UI receives the HTTP 201 status code, parses the returned JSON, and displays the formatted result on the screen.

---

## 3. Walkthrough of the Website Features

Our application includes 10 fully implemented learning modules accessible from the sidebar:

### 1. Dashboard
- **What it does:** Displays real-time connection status to the Express server, latency in milliseconds, Node.js version, server uptime, Process ID (PID), memory usage, quick-start action buttons, and a live table of recent server requests.
- **Why it is included:** Gives students and faculty an immediate visual overview of system health based on live API calls rather than hardcoded mock data.
- **How to test:** Click the **"Sync Telemetry"** button and observe the latency and uptime update live.

### 2. Node.js Fundamentals
- **What it does:** Explains the V8 engine, runtime concepts, browser vs. Node.js comparison matrix, and CommonJS module mechanics.
- **Why it is included:** Covers the theoretical foundation required for college exams.
- **How to test:** Read the line-by-line code breakdowns and click the **"Copy"** button on code snippets.

### 3. Core Modules Lab
- **What it does:** Features four interactive tabs for `fs`, `path`, `process`, and `CommonJS`.
  - **fs:** Reads `backend/data/sample.txt` directly from disk. Lets you edit a text box and write content to `backend/data/demo.txt` using `fs.writeFileSync`.
  - **path:** Lets you type any file path and inspect the outputs of `basename`, `extname`, `dirname`, and `join`.
  - **process:** Displays live Process ID, platform, architecture, uptime, and `process.argv`.
  - **CommonJS:** Lets you input two numbers ($A$ and $B$) and calls the functions exported by `backend/modules/mathUtils.js` via the server.
- **How to test:** Switch between the tabs, edit text in the fs card, click "Write Content to demo.txt", and see the success message.

### 4. npm Project Setup
- **What it does:** Displays a 5-step interactive terminal guide explaining `mkdir`, `cd`, `npm init -y`, `npm install express`, and `npm install --save-dev nodemon`, followed by a breakdown of `package.json`.
- **How to test:** Click the **"Copy Command"** buttons to copy any setup command to your clipboard.

### 5. Raw HTTP Server
- **What it does:** Explains the native `http.createServer()` running on Port `5001`. Detects whether Port 5001 is currently active and provides quick test buttons for `GET /`, `GET /about`, `GET /api/status`, `GET /api/time`, and `GET /invalid-path` (404).
- **How to test:** Click each button to see live responses from Port 5001 without touching Express.

### 6. Express Routing
- **What it does:** An interactive route tester for all 12 implemented Express endpoints. Lets you test query parameters (`/api/hello?name=YourName`), POST JSON payloads (`/api/echo`), and centralized 404 responses.
- **How to test:** Select `GET /api/hello?name=Sameer` and click **"Send Live Request"** to see your personalized greeting.

### 7. Middleware Lab
- **What it does:** Visualizes the sequential pipeline (Timer $\rightarrow$ Logger $\rightarrow$ Body Parser $\rightarrow$ Route Handler) and shows a live feed of request logs collected by the server.
- **How to test:** Click **"Fire Pipeline Request"** and observe the `X-Response-Time` header and the new entry in the live log viewer.

### 8. API Playground
- **What it does:** A Postman-style developer console built into the browser. Lets you choose HTTP method (`GET`, `POST`), enter endpoints, type query parameters, provide custom JSON bodies, and inspect real response status codes, headers, and formatted JSON.
- **How to test:** Click any of the **Quick Presets** (e.g., "Submit Feedback") and click **"Send Request"**.

### 9. Project Structure Explorer
- **What it does:** An interactive file tree of the actual repository. Clicking any file displays its role, purpose, and synchronized source code in a dark code viewer.
- **How to test:** Expand folders like `backend/` and click `server.js` or `fileDemo.js`.

### 10. Viva Questions
- **What it does:** Contains 26 curated questions and answers with a keyword search bar, category filter pills, a "Reveal Answer" toggle, and a "Mark as Mastered" tracker.
- **How to test:** Type "middleware" into the search bar, click "Reveal Answer", and mark it as mastered.

---

## 4. The Minimalist Black-and-White Design

Our application was designed with an aesthetic, minimalist monochrome developer visual style:
- **Color Palette:** Pure white (`#FFFFFF`) background, near-black (`#111111`) headings and primary buttons, subtle gray borders (`#E5E5E5`), and dark carbon panels (`#0A0A0A`) for code editors and terminals.
- **Typography:** Professional Swiss-style sans-serif typography (`Inter`) for editorial clarity and clean monospace typography (`JetBrains Mono`) for code snippets and endpoints.
- **No Distracting Colors:** Instead of rainbow gradients or confusing colors, visual hierarchy is created through font weight, clean borders, crisp padding, and real-time status dots.
- **Responsive Layout:** Works smoothly on desktop monitors, laptops, tablets, and mobile screens.

---

## 5. Actual Project Folder Structure

Below is the exact folder structure of our repository:

```
week 15 and 16/
├── package.json               # Root scripts to start backend, raw server, and frontend
├── README.md                  # This complete documentation & viva guide
├── .gitignore                 # Files excluded from git (node_modules, logs)
├── .env.example               # Safe template for environment variables
│
├── backend/                   # Express.js and Node.js Server Application
│   ├── server.js              # Express app entrypoint on Port 5000 (CORS, middleware, routes)
│   ├── raw-server.js          # Standalone native http.createServer() on Port 5001
│   ├── package.json           # Backend dependencies (express, cors, nodemon)
│   ├── routes/                # Modular Express Route Handlers
│   │   ├── index.js           # General routes: GET / and GET /about
│   │   └── api.js             # API routes: /status, /time, /hello, /echo, /feedback, etc.
│   ├── middleware/            # Custom Middleware Functions
│   │   ├── logger.js          # Request logger with in-memory ring buffer
│   │   ├── requestTimer.js    # Calculates latency and attaches X-Response-Time header
│   │   └── errorHandler.js    # Centralized 404 Not Found & 500 Error handlers
│   ├── modules/               # Custom Helper Modules
│   │   ├── fileDemo.js        # Safe fs file reading and writing (traversal protected)
│   │   ├── pathDemo.js        # Demonstrates path.join, basename, extname, dirname
│   │   └── mathUtils.js       # CommonJS module.exports demo module
│   └── data/                  # Dedicated Safe File Storage
│       ├── sample.txt         # Read-only sample file for fs demo
│       └── demo.txt           # File safely updated by fs.writeFileSync
│
└── frontend/                  # React + Vite Client Application
    ├── package.json           # Frontend dependencies (react, lucide-react, vite)
    ├── vite.config.js         # Vite configuration with local proxy to Port 5000
    ├── index.html             # HTML shell with Google Fonts (Inter, JetBrains Mono)
    └── src/
        ├── main.jsx           # React DOM root entrypoint
        ├── App.jsx            # Main app coordinator with live server status polling
        ├── index.css          # Minimalist monochrome design system & typography
        ├── components/        # Reusable UI Components
        │   ├── Navbar.jsx     # Header with live Express & Raw HTTP status pills
        │   ├── Sidebar.jsx    # Collapsible curriculum navigation sidebar
        │   ├── CodeBlock.jsx  # Dark code editor with copy button & line numbers
        │   └── Breadcrumbs.jsx# Minimal breadcrumb navigation
        ├── views/             # 10 Educational Curriculum Screens
        │   ├── LandingPage.jsx
        │   ├── Dashboard.jsx
        │   ├── NodeFundamentals.jsx
        │   ├── CoreModulesLab.jsx
        │   ├── NpmSetup.jsx
        │   ├── RawHttpServer.jsx
        │   ├── ExpressRouting.jsx
        │   ├── MiddlewareLab.jsx
        │   ├── ApiPlayground.jsx
        │   ├── RequestVisualizer.jsx
        │   ├── ProjectStructure.jsx
        │   └── VivaQuestions.jsx
        └── data/              # Static Datasets
            ├── vivaData.js         # 26 Curated Viva Questions and Answers
            └── projectTreeData.js  # Source code and file documentation tree
```

---

## 6. Step-by-Step Installation & Execution Guide

### Prerequisites
Make sure you have Node.js and npm installed on your computer. Open your terminal and check:
```bash
node -v
npm -v
```
*(Node.js version 18.0.0 or higher is recommended).*

---

### Step 1: Install Dependencies
Open your terminal in the root folder (`week 15 and 16`) and run:

```bash
# 1. Install backend dependencies
cd backend
npm install

# 2. Install frontend dependencies
cd ../frontend
npm install
```

---

### Step 2: Start the Servers
We recommend opening **three terminal windows** to see the logs from each component:

#### Terminal 1 — Start the Express Backend Server:
```bash
cd backend
npm start
```
*Output: `🚀 Express Learning Lab Server running on port 5000`*

#### Terminal 2 — Start the Standalone Native Raw HTTP Server:
```bash
cd backend
npm run raw
```
*Output: `⚡ Raw Node.js HTTP Server running on port 5001`*

#### Terminal 3 — Start the React Frontend:
```bash
cd frontend
npm run dev
```
*Output: `➜ Local: http://localhost:5173/`*

---

### Step 3: Open in Browser
Open your browser and navigate to:  
👉 **`http://localhost:5173`**

You will immediately see the landing page, and the header badges will show:
- **`EXPRESS: 5000 (ONLINE)`**
- **`RAW HTTP: 5001 (ACTIVE)`**

---

### How to Stop the Servers
When you are done testing, press `Ctrl + C` in each terminal window to stop the servers.

---

## 7. Complete API Endpoints Table

### Express Server (`http://localhost:5000`)
All endpoints return consistent, standardized JSON payloads with appropriate HTTP status codes:

| HTTP Method | Endpoint | Purpose | Sample Request Body / Query | Expected HTTP Status & Response Summary |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/` | Welcome message & institution metadata | None | `200 OK` — Project name, version, status |
| `GET` | `/about` | Architectural summary of the learning lab | None | `200 OK` — Topics covered, architecture info |
| `GET` | `/api/status` | Live server health, Node version, uptime | None | `200 OK` — `nodeVersion`, `pid`, `uptime`, `memoryUsageMB` |
| `GET` | `/api/time` | Current server timestamps | None | `200 OK` — ISO, UTC, epoch timestamps |
| `GET` | `/api/hello` | Query parameter personalized greeting | `?name=Sameer` | `200 OK` — `"Hello, Sameer! Welcome to Express.js"` |
| `POST` | `/api/echo` | Validates and echoes JSON request body | `{"subject": "Node.js", "level": "Beginner"}` | `200 OK` — Echoes submitted JSON payload |
| `GET` | `/api/modules` | Lists all 10 educational modules | None | `200 OK` — Array of modules with descriptions |
| `GET` | `/api/files/sample` | Reads `sample.txt` via `fs.readFileSync` | None | `200 OK` — File contents and byte size |
| `GET` | `/api/files/demo` | Reads `demo.txt` via `fs.readFileSync` | None | `200 OK` — Content of demo.txt |
| `POST` | `/api/files/write` | Safely writes text to `demo.txt` | `{"content": "New text from student"}` | `200 OK` — Bytes written and timestamp |
| `GET` | `/api/path-demo` | Analyzes path with `path` utilities | `?path=backend/routes/api.js` | `200 OK` — `basename`, `extname`, `dirname`, `join` |
| `POST` | `/api/feedback` | Saves student feedback in memory | `{"studentName": "Aarav", "comment": "Great lab!", "rating": 5}` | `201 Created` — Saved feedback entry |
| `GET` | `/api/feedback` | Retrieves all submitted feedback | None | `200 OK` — Array of feedback objects |
| `GET` | `/api/logs` | Retrieves recent request logs | `?limit=15` | `200 OK` — Array of recent request log objects |
| `GET` | `/api/process-info`| Inspects runtime process telemetry | None | `200 OK` — Node version, platform, PID, safe env preview |
| `GET` | `/api/commonjs-demo`| Executes imported `mathUtils.js` | `?a=12&b=8` | `200 OK` — Demonstrates `add` and `multiply` |
| `ALL` | `/api/unknown` | Centralized 404 route handler | Any | `404 Not Found` — Structured JSON error |

---

### Standalone Raw HTTP Server (`http://localhost:5001`)
| HTTP Method | Endpoint | Purpose | Expected Response |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Welcome message from raw server | `200 OK` — `{ server: "Raw Node.js HTTP Server", port: 5001 }` |
| `GET` | `/about` | Explains native http module | `200 OK` — Differences between raw server and Express |
| `GET` | `/api/status` | Process version and uptime | `200 OK` — `{ success: true, nodeVersion: "..." }` |
| `GET` | `/api/time` | Current server timestamp | `200 OK` — `{ success: true, iso: "..." }` |
| `ALL` | `/invalid-route` | Native 404 response | `404 Not Found` — Native JSON 404 response |

---

## 8. Practical Testing Guide

Follow these testing steps to verify that every feature works:

### Test 1: Check Live Backend Telemetry
1. Open the website at `http://localhost:5173`.
2. Look at the top-right header: you should see `EXPRESS: 5000 (XXms)`.
3. Navigate to **Dashboard**: verify that **Node Version**, **Process ID**, and **Server Uptime** show real values.
4. Click **"Sync Telemetry"**; verify that the values refresh.

### Test 2: Test File Operations (`fs` Module)
1. In the sidebar, click **"Core Modules Lab"**.
2. Select the **`1. fs (File System)`** tab.
3. Click **"Read Disk"**: you will see the contents of `sample.txt`.
4. In the right card, type a message into the textarea (e.g., *"Testing file write at 11:00 AM"*).
5. Click **"Write Content to demo.txt"**: a success banner will appear confirming that bytes were written to disk.

### Test 3: Test Path Analysis (`path` Module)
1. Select the **`2. path (Pathnames)`** tab.
2. In the input box, type `backend/data/sample.txt` and click **"Analyze Path"**.
3. Verify that the table updates with:
   - `path.basename`: `sample.txt`
   - `path.extname`: `.txt`
   - `path.dirname`: `backend/data`

### Test 4: Test CommonJS `mathUtils` Execution
1. Select the **`4. CommonJS`** tab.
2. Enter `A = 20` and `B = 5`, then click **"Run mathUtils Methods"**.
3. Verify that the server returns: `Addition = 25` and `Multiplication = 100`.

### Test 5: Test the Raw HTTP Server (Port 5001)
1. Click **"Raw HTTP Server"** in the sidebar.
2. Confirm the green status dot: *"Raw HTTP Server is Running on Port 5001"*.
3. Click the button **"GET /api/time"**: you will see the live JSON response from port 5001.
4. Click **"GET /invalid-path (Test 404)"**: verify that a `404 Not Found` JSON object is returned.

### Test 6: Test the API Playground
1. Click **"API Playground"** in the sidebar.
2. Click the preset **"Personalized Greeting"**. Notice that the endpoint updates to `/api/hello` with query `name=Student`.
3. Click **"Send Request"**: verify that status `200 OK` is returned with `"Hello, Student!"`.
4. Click the preset **"Echo JSON Payload"**. Notice the method changes to `POST` with a sample JSON body.
5. Click **"Send Request"**: verify that the server echoes back the exact JSON payload.

### Test 7: Test Error Handling & Malformed JSON
1. In the API Playground, select `POST /api/echo`.
2. Deliberately delete the closing bracket `}` in the request body to create invalid JSON.
3. Click **"Send Request"**.
4. Verify that the interface catches the error or the server gracefully returns a `400 Bad Request` without crashing.

---

## 9. 30+ College Viva Questions & Answers

Here are 32 high-yield questions with concise, technically accurate answers for your college viva:

#### 1. What is Node.js?
**Answer:** Node.js is an open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside a web browser, built on Google Chrome's V8 engine and libuv.

#### 2. What is a runtime environment?
**Answer:** A runtime environment provides the execution support, memory allocation, and system APIs required for a programming language to run on a computer.

#### 3. Why can JavaScript run outside a browser using Node.js?
**Answer:** Because Node.js extracted the V8 JavaScript engine from Chrome and wrapped it with C++ operating system bindings for filesystem, networking, and process management.

#### 4. What is the single-threaded event loop in Node.js?
**Answer:** Node.js runs JavaScript on a single main thread, while delegating time-consuming I/O tasks (like disk and network operations) to the background OS kernel or libuv thread pool, preventing blocking.

#### 5. What is CommonJS?
**Answer:** CommonJS is the original module specification used by Node.js, where each file is a module, exports are declared via `module.exports`, and dependencies are imported using `require()`.

#### 6. What does `require()` do?
**Answer:** `require()` is a built-in CommonJS function that reads, evaluates, caches, and returns the exported object of another file or package.

#### 7. What is `module.exports`?
**Answer:** `module.exports` is an object in every Node.js file. Anything assigned to it is made publicly available for other files to import.

#### 8. What is the difference between `module.exports` and `exports`?
**Answer:** `module.exports` is the actual object returned by `require()`. `exports` is simply a reference shortcut pointing to `module.exports`.

#### 9. What is npm?
**Answer:** npm (Node Package Manager) is the default package manager for Node.js, consisting of an online software registry and a CLI tool to install dependencies.

#### 10. What is the purpose of `package.json`?
**Answer:** `package.json` is the project manifest file that contains metadata (name, version), executable scripts (`start`, `dev`), and lists required dependencies.

#### 11. What is the difference between `dependencies` and `devDependencies`?
**Answer:** `dependencies` are packages required for the app to function in production (e.g., Express). `devDependencies` are tools only needed while coding (e.g., Nodemon).

#### 12. What does `npm init -y` do?
**Answer:** It creates a default `package.json` file in the current directory, accepting all default values without prompting the user.

#### 13. What is `node_modules`?
**Answer:** It is the local directory where npm installs and unpacks all external dependencies and sub-dependencies needed by your project.

#### 14. What is the `fs` module?
**Answer:** The File System (`fs`) module is a built-in Node.js module that allows reading, writing, updating, and deleting files on the local disk.

#### 15. What is the difference between `fs.readFileSync` and `fs.readFile`?
**Answer:** `fs.readFileSync` is synchronous and blocks the execution thread until the read finishes. `fs.readFile` is asynchronous, non-blocking, and uses a callback function.

#### 16. What does the `path` module do?
**Answer:** The `path` module provides cross-platform utilities for handling file and directory paths (handling `\` on Windows vs `/` on Linux/macOS).

#### 17. What does `path.join()` do?
**Answer:** It joins multiple path segments together into a single path using the correct operating-system-specific separator.

#### 18. What does `path.basename()` return?
**Answer:** It extracts and returns the last portion of a path, which is typically the filename with its extension.

#### 19. What is the `process` object in Node.js?
**Answer:** `process` is a global object that provides control over and information about the currently executing Node.js process (e.g., PID, platform, uptime).

#### 20. What is `process.argv`?
**Answer:** An array containing command-line arguments passed when launching the Node.js process.

#### 21. What is an HTTP server?
**Answer:** Software that listens on a specific network port, accepts incoming HTTP requests from clients, processes them, and returns HTTP responses.

#### 22. What is a port number?
**Answer:** A numerical identifier (0–65535) assigned to a specific network process on a computer to direct incoming internet traffic to the correct application.

#### 23. What is Express.js?
**Answer:** Express.js is a fast, unopinionated, lightweight web framework built on top of Node.js that simplifies routing, middleware integration, and REST API development.

#### 24. What is the difference between Node.js and Express.js?
**Answer:** Node.js is the runtime environment that lets you execute JavaScript on a server. Express.js is a framework built on top of Node.js that provides clean routing and middleware tools.

#### 25. What is Routing in Express?
**Answer:** Routing refers to how an application responds to a client request at a specific URI/path and HTTP method (such as `app.get('/about')`).

#### 26. What is the difference between GET and POST requests?
**Answer:** `GET` retrieves data from the server and carries parameters in the URL. `POST` submits data to the server and carries its payload securely inside the request body.

#### 27. What is Middleware in Express?
**Answer:** A function with access to the `req`, `res`, and `next` objects that can run code, modify requests/responses, or pass control to the next function.

#### 28. What happens if a middleware does not call `next()`?
**Answer:** The request-response cycle stops, and the client request will hang indefinitely until it times out.

#### 29. What does `express.json()` do?
**Answer:** It is built-in middleware that automatically parses incoming HTTP requests with JSON payloads and populates `req.body`.

#### 30. What is a 404 HTTP status code?
**Answer:** An HTTP status code indicating that the server could not find the requested route or resource.

#### 31. What is CORS and why is it needed?
**Answer:** Cross-Origin Resource Sharing (CORS) is a browser security mechanism. It requires servers to explicitly allow requests originating from a different domain or port (e.g., port 5173 querying port 5000).

#### 32. How does our project handle errors safely?
**Answer:** We use centralized 4-argument error-handling middleware `(err, req, res, next)` in `backend/middleware/errorHandler.js` that returns clean JSON without leaking internal server stack traces to users.

---

## 10. Troubleshooting Common Issues

### 1. `node` or `npm` is not recognized as an internal or external command
- **Cause:** Node.js is not installed or its installation directory is not in your system's `PATH` environment variable.
- **Fix:** Download and install Node.js (LTS version) from [https://nodejs.org](https://nodejs.org). Restart your terminal after installing.

### 2. Error: `EADDRINUSE: address already in use :::5000`
- **Cause:** Another program (or a previous instance of your server) is already running on port 5000.
- **Fix on Windows:**
  ```powershell
  # Find the process ID running on port 5000
  netstat -ano | findstr :5000
  # Kill the process using its PID (replace 1234 with the actual number)
  taskkill /PID 1234 /F
  ```
- **Fix on Linux / macOS:**
  ```bash
  kill -9 $(lsof -t -i:5000)
  ```

### 3. Frontend displays "Server Offline" badge
- **Cause:** The Express backend is not running on port 5000.
- **Fix:** Open a terminal, run `cd backend` and execute `npm start`. Ensure you see the message: `🚀 Express Learning Lab Server running on port 5000`.

### 4. Raw HTTP Server shows "STANDBY"
- **Cause:** `raw-server.js` has not been started on port 5001.
- **Fix:** In a separate terminal, run:
  ```bash
  cd backend
  npm run raw
  ```

### 5. `Cannot find module 'express'`
- **Cause:** You forgot to install packages in the `backend/` directory.
- **Fix:** Open your terminal, navigate to `backend/`, and run `npm install`.

### 6. Post request returns `400 Bad Request: SyntaxError`
- **Cause:** The JSON body you typed has a syntax error (e.g., missing double quotes, trailing comma, or missing bracket).
- **Fix:** Ensure your payload is valid JSON:
  ```json
  {
    "studentName": "Sameer",
    "comment": "Testing valid JSON"
  }
  ```

---

## 11. Final Summary for College Evaluation

When presenting this project to the faculty at **SIT Nagpur**:
1. Open the project in VS Code and show the clean modular folder structure (`backend/routes`, `backend/middleware`, `backend/modules`).
2. Start the Express server on Port 5000, Raw server on Port 5001, and Frontend on Port 5173.
3. Show the **Dashboard** and highlight the live latency and system telemetry.
4. Open the **Core Modules Lab** and demonstrate real-time reading and writing to disk using `fs`.
5. Open the **Raw HTTP Server** view and explain how `http.createServer()` operates under the hood.
6. Open the **Middleware Lab** to explain how `next()` passes control through the logger and timer.
7. Open the **API Playground** and send both a `GET` and a `POST` request to demonstrate real request execution.
8. Finish by opening the **Viva Questions** tab to demonstrate mastery of the theory.

**Congratulations on completing the Hack-O-Week Node.js & Express.js Learning Lab!**
