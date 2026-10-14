// vivaData.js - 26 Viva Questions and Answers for Hack-O-Week Evaluation
export const vivaQuestions = [
  {
    id: 1,
    category: 'Node.js Basics',
    question: 'What is Node.js?',
    answer: 'Node.js is an open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside a web browser. Built on Google Chrome\'s V8 JavaScript engine, it uses an asynchronous, event-driven, non-blocking I/O model suited for building scalable network applications.'
  },
  {
    id: 2,
    category: 'Node.js Basics',
    question: 'What is a runtime environment?',
    answer: 'A runtime environment is the program infrastructure and libraries that provide execution support and memory management for code written in a specific language. Node.js provides a runtime for JavaScript with access to the file system, network sockets, operating system processes, and hardware APIs that do not exist inside web browsers.'
  },
  {
    id: 3,
    category: 'Modules & CommonJS',
    question: 'What is CommonJS?',
    answer: 'CommonJS is the original module specification adopted by Node.js. In CommonJS, each file is treated as a separate module with its own private scope. Modules expose functionality through the module.exports object and load other modules synchronously using the require() function.'
  },
  {
    id: 4,
    category: 'Modules & CommonJS',
    question: 'What is require() in Node.js?',
    answer: 'require() is a built-in CommonJS function used to import modules, JSON files, or local files. When require(\'module-name\') is called, Node searches core built-in modules first, then checks node_modules directories, loads and evaluates the file, caches the exports, and returns the module.exports object.'
  },
  {
    id: 5,
    category: 'Modules & CommonJS',
    question: 'What is module.exports?',
    answer: 'module.exports is a special object created automatically by the Node.js runtime for every file. Anything assigned to module.exports (such as functions, objects, or classes) is made available to other files that import the module with require().'
  },
  {
    id: 6,
    category: 'Package Management',
    question: 'What is npm?',
    answer: 'npm (Node Package Manager) is the default package manager and registry for Node.js. It consists of an online registry of open-source packages, a command-line client for installing and managing dependencies, and a workflow tool for running project automation scripts.'
  },
  {
    id: 7,
    category: 'Package Management',
    question: 'What is package.json?',
    answer: 'package.json is the manifest file at the root of a Node.js project. It records project metadata (name, version, author), executable scripts (e.g., start, dev, test), runtime dependencies required for production, and devDependencies needed only during development.'
  },
  {
    id: 8,
    category: 'Core Modules',
    question: 'What is the fs module in Node.js?',
    answer: 'The fs (File System) module is a core built-in Node.js module that enables interacting with the file system. It provides both synchronous methods (like fs.readFileSync, fs.writeFileSync) which block the thread, and asynchronous methods (like fs.readFile, fs.promises) which use non-blocking callbacks or Promises.'
  },
  {
    id: 9,
    category: 'Core Modules',
    question: 'What is the path module and why is it essential?',
    answer: 'The path module provides utilities for working with file and directory paths. It is essential because different operating systems use different path separators (Windows uses backslash \\, whereas macOS/Linux use forward slash /). Using path.join() and path.resolve() ensures cross-platform reliability.'
  },
  {
    id: 10,
    category: 'Core Modules',
    question: 'What is the process module in Node.js?',
    answer: 'The process module is a global object that provides information about and control over the currently running Node.js process. It allows accessing command-line arguments (process.argv), environment variables (process.env), process ID (process.pid), execution uptime, memory usage, and graceful termination methods (process.exit).'
  },
  {
    id: 11,
    category: 'HTTP & Networking',
    question: 'What is an HTTP server?',
    answer: 'An HTTP server is software that listens for incoming client requests over the Hypertext Transfer Protocol (HTTP) on a specified port, processes the request (evaluating headers, URL path, and payload), and returns an appropriate HTTP response status code, headers, and body.'
  },
  {
    id: 12,
    category: 'HTTP & Networking',
    question: 'What is the built-in http module?',
    answer: 'The http module is Node.js\'s native module for transferring data over HTTP. It allows developers to create low-level web servers using http.createServer((req, res) => { ... }) without relying on any external third-party libraries.'
  },
  {
    id: 13,
    category: 'Express.js',
    question: 'What is Express.js?',
    answer: 'Express.js is a minimal, fast, and unopinionated web framework built on top of Node.js. It simplifies building web servers and RESTful APIs by providing a robust routing system, flexible middleware architecture, cookie handling, and simplified request/response helper methods.'
  },
  {
    id: 14,
    category: 'Express.js',
    question: 'What is routing in web development?',
    answer: 'Routing is the mechanism of defining how an application responds to a client request at a specific endpoint (URI or path) and with a specific HTTP request method (GET, POST, PUT, DELETE). In Express, routes are declared with app.get(\'/path\', handler) or express.Router().'
  },
  {
    id: 15,
    category: 'Middleware',
    question: 'What is middleware in Express.js?',
    answer: 'Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. They can execute code, modify req/res objects, end the cycle, or call next() to invoke the next middleware.'
  },
  {
    id: 16,
    category: 'Middleware',
    question: 'What is next() in Express middleware?',
    answer: 'next() is a callback function passed into Express middleware. When invoked, it passes control to the next middleware function in the execution stack. If next() is not called and the response is not ended, the client request will hang indefinitely.'
  },
  {
    id: 17,
    category: 'HTTP Concepts',
    question: 'What is an HTTP Request?',
    answer: 'An HTTP Request is a formatted message sent from a client (e.g., browser or frontend app) to a server asking for a resource or action. It contains an HTTP method (GET, POST), a target URL/path, headers (metadata like Content-Type), query parameters, and an optional body.'
  },
  {
    id: 18,
    category: 'HTTP Concepts',
    question: 'What is an HTTP Response?',
    answer: 'An HTTP Response is the message returned by a server to the requesting client. It consists of an HTTP status line (e.g., 200 OK, 404 Not Found), response headers (like Content-Type: application/json), and the response body containing the requested data or error information.'
  },
  {
    id: 19,
    category: 'HTTP Concepts',
    question: 'What is an HTTP Status Code and what are the main ranges?',
    answer: 'HTTP status codes are 3-digit standardized integers issued by a server in response to a client request. The ranges are: 1xx (Informational), 2xx (Success, e.g. 200 OK, 201 Created), 3xx (Redirection), 4xx (Client Error, e.g. 400 Bad Request, 404 Not Found), and 5xx (Server Error, e.g. 500 Internal Server Error).'
  },
  {
    id: 20,
    category: 'HTTP Concepts',
    question: 'What is the difference between GET and POST requests?',
    answer: 'GET is used to retrieve data from a server; it is idempotent, parameters are appended in the URL query string, and it should have no side-effects on server state. POST is used to submit data to the server to create or process a resource; data is transmitted inside the request body, allowing larger and sensitive payloads.'
  },
  {
    id: 21,
    category: 'Express.js',
    question: 'What does express.json() do?',
    answer: 'express.json() is a built-in middleware function in Express based on body-parser. It parses incoming HTTP requests with JSON payloads and populates req.body with the parsed JavaScript object, making it easily accessible in route handlers.'
  },
  {
    id: 22,
    category: 'HTTP Concepts',
    question: 'What is a query parameter?',
    answer: 'A query parameter is an optional key-value pair appended to the end of a URL following a question mark (?) (e.g., /api/hello?name=Student&batch=2029). Multiple parameters are separated by ampersands (&). In Express, they are automatically parsed into req.query.'
  },
  {
    id: 23,
    category: 'HTTP Concepts',
    question: 'What is a 404 error and how is it handled in Express?',
    answer: 'A 404 Not Found error indicates that the server cannot find the requested resource or route. In Express, it is handled by placing a catch-all middleware at the very end of the route definitions: app.use((req, res) => res.status(404).json({ error: "Not Found" })).'
  },
  {
    id: 24,
    category: 'Architecture',
    question: 'What is the key difference between Node.js and Express.js?',
    answer: 'Node.js is a runtime environment that allows executing JavaScript on the server with raw built-in modules like http and fs. Express.js is a web framework built ON TOP OF Node.js that provides abstractions, an elegant routing layer, and a middleware pipeline to build APIs much faster with cleaner code.'
  },
  {
    id: 25,
    category: 'Node.js Basics',
    question: 'How does Node.js handle concurrent requests with a single thread?',
    answer: 'Node.js uses a single execution thread for JavaScript code combined with the Libuv C++ library event loop and thread pool. Time-consuming I/O operations (file reading, database calls, network requests) are delegated to the OS kernel or Libuv worker threads. Once complete, their callbacks are queued in the event loop without blocking other incoming requests.'
  },
  {
    id: 26,
    category: 'Architecture',
    question: 'What is CORS and why is it needed in web development?',
    answer: 'CORS (Cross-Origin Resource Sharing) is a browser security mechanism that restricts web applications running at one origin (e.g., http://localhost:5173) from making AJAX/Fetch requests to a different origin (e.g., http://localhost:5000) unless the server explicitly sends Access-Control-Allow-Origin headers.'
  }
];
