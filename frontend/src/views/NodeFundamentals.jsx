import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import CodeBlock from '../components/CodeBlock';
import { Cpu, Terminal, ArrowRight, Layers, FileCode, CheckCircle } from 'lucide-react';

export default function NodeFundamentals({ setCurrentView }) {
  const example1 = `// 1. Importing built-in Node.js modules using CommonJS
const fs = require('fs');
const path = require('path');

// 2. Resolve an absolute path to a local text file
const targetPath = path.join(__dirname, 'sample.txt');

// 3. Read the file synchronously from disk
const content = fs.readFileSync(targetPath, 'utf-8');

console.log('File Content:', content);`;

  const example2 = `// 1. Defining a backend HTTP server using the built-in 'http' module
const http = require('http');

// 2. createServer receives a request listener with (req, res) objects
const server = http.createServer((req, res) => {
  // Set the response HTTP status and Content-Type header
  res.writeHead(200, { 'Content-Type': 'application/json' });
  
  // Send the JSON response and terminate the connection
  res.end(JSON.stringify({ message: 'Hello from Node.js runtime!' }));
});

// 3. Bind the server to port 3000
server.listen(3000, () => {
  console.log('Server is running on port 3000');
});`;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px' }}>
      <Breadcrumbs currentView="fundamentals" setCurrentView={setCurrentView} />

      {/* Header */}
      <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '24px', marginBottom: '28px' }}>
        <span className="eyebrow">THEORETICAL FOUNDATION • MODULE 01</span>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '8px' }}>
          Node.js Fundamentals
        </h1>
        <p style={{ fontSize: '15px', maxWidth: '700px' }}>
          Learn how Google Chrome's V8 engine executes JavaScript outside the browser, how the runtime handles operating system APIs, and how CommonJS structures modular backend applications.
        </p>
      </div>

      {/* 1. What is Node.js and What is a Runtime? */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>
          1. What is Node.js &amp; What is a Runtime?
        </h2>
        <div className="card" style={{ marginBottom: '16px' }}>
          <p style={{ fontSize: '14px', lineHeight: 1.7, marginBottom: '12px' }}>
            <strong>Node.js</strong> is an open-source, cross-platform JavaScript runtime environment created in 2009 by Ryan Dahl. It takes Google Chrome's high-performance <strong>V8 JavaScript engine</strong> and wraps it with C++ bindings and the <strong>libuv</strong> asynchronous I/O library.
          </p>
          <p style={{ fontSize: '14px', lineHeight: 1.7 }}>
            A <strong>runtime environment</strong> provides all the execution support, memory management, and system APIs required for code to execute. Without a runtime, JavaScript is just text. The browser provides a web runtime (with DOM, window, fetch). Node.js provides a server runtime (with filesystem, networking, processes, and crypto).
          </p>
        </div>
      </section>

      {/* 2. Browser vs Node.js Execution Comparison */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>
          2. JavaScript in Browser vs. JavaScript in Node.js
        </h2>
        <div className="card" style={{ overflowX: 'auto', padding: 0 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--surface-subtle)', borderBottom: '1px solid var(--border-light)', textAlign: 'left' }}>
                <th style={{ padding: '12px 16px', fontWeight: 700 }}>FEATURE</th>
                <th style={{ padding: '12px 16px', fontWeight: 700 }}>BROWSER JAVASCRIPT</th>
                <th style={{ padding: '12px 16px', fontWeight: 700 }}>NODE.JS JAVASCRIPT</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                <td style={{ padding: '12px 16px', fontWeight: 600 }}>Global Object</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}><span className="font-mono">window</span>, <span className="font-mono">document</span></td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}><span className="font-mono">global</span>, <span className="font-mono">process</span></td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                <td style={{ padding: '12px 16px', fontWeight: 600 }}>Filesystem Access</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>Blocked (Sandboxed for security)</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>Full read/write via <span className="font-mono">fs</span> module</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                <td style={{ padding: '12px 16px', fontWeight: 600 }}>Networking</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>HTTP client requests (<span className="font-mono">fetch</span>, <span className="font-mono">XMLHttpRequest</span>)</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>Can act as both client and listen as an HTTP server (<span className="font-mono">http</span>, <span className="font-mono">net</span>)</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                <td style={{ padding: '12px 16px', fontWeight: 600 }}>Module System</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>ES Modules (<span className="font-mono">import / export</span>)</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>CommonJS (<span className="font-mono">require() / module.exports</span>) &amp; ESM</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 16px', fontWeight: 600 }}>OS &amp; Hardware</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>No direct hardware/OS interaction</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>Direct access to CPU info, memory, process IDs, and environment variables</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. What Does a Backend Server Do? */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>
          3. What Does a Backend Server Do?
        </h2>
        <div className="grid-3">
          <div className="card">
            <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>1. Listens for Requests</h3>
            <p style={{ fontSize: '13px' }}>
              Binds to an IP and TCP port (e.g. <span className="font-mono">5000</span>) and continuously waits for HTTP traffic sent by clients.
            </p>
          </div>
          <div className="card">
            <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>2. Executes Business Logic</h3>
            <p style={{ fontSize: '13px' }}>
              Validates authentication, reads or writes database records, performs calculations, and interacts with disk storage.
            </p>
          </div>
          <div className="card">
            <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>3. Emits HTTP Responses</h3>
            <p style={{ fontSize: '13px' }}>
              Returns standardized status codes (<span className="font-mono">200 OK</span>, <span className="font-mono">404 Not Found</span>) with JSON payloads or HTML documents.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Modules and CommonJS */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>
          4. Modules &amp; CommonJS Explained
        </h2>
        <div className="card" style={{ marginBottom: '20px' }}>
          <p style={{ fontSize: '14px', lineHeight: 1.7, marginBottom: '12px' }}>
            In Node.js, each JavaScript file is treated as a separate <strong>module</strong>. Variables and functions defined in a file remain private to that file unless explicitly exported.
          </p>
          <p style={{ fontSize: '14px', lineHeight: 1.7 }}>
            <strong>CommonJS</strong> is the default module system in Node.js. It provides two primitives:
          </p>
          <ul style={{ paddingLeft: '20px', marginTop: '8px', fontSize: '14px', lineHeight: 1.8 }}>
            <li><span className="font-mono" style={{ fontWeight: 600 }}>require('module-name')</span> — Loads and evaluates an external or local module synchronously.</li>
            <li><span className="font-mono" style={{ fontWeight: 600 }}>module.exports = &#123; ... &#125;</span> — Specifies what public values or functions the module exposes.</li>
          </ul>
        </div>

        {/* Code Example 1 */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span style={{ fontWeight: 600, fontSize: '13px' }}>Example 1: Importing and Using Core Modules</span>
            <span className="badge">COMMONJS</span>
          </div>
          <CodeBlock
            code={example1}
            filename="fileReader.js"
            language="javascript"
          />
          <div className="card" style={{ backgroundColor: 'var(--surface-subtle)', marginTop: '8px', fontSize: '13px' }}>
            <strong>Line-by-line breakdown:</strong>
            <ul style={{ paddingLeft: '20px', marginTop: '6px', lineHeight: 1.6 }}>
              <li><strong>Line 2:</strong> <span className="font-mono">const fs = require('fs');</span> imports Node's built-in File System module without requiring an npm install.</li>
              <li><strong>Line 3:</strong> <span className="font-mono">const path = require('path');</span> imports the Path module for cross-platform directory concatenation.</li>
              <li><strong>Line 6:</strong> <span className="font-mono">path.join(__dirname, 'sample.txt')</span> uses <span className="font-mono">__dirname</span> (the current directory) and joins it safely.</li>
              <li><strong>Line 9:</strong> <span className="font-mono">fs.readFileSync(targetPath, 'utf-8')</span> reads the raw file bytes and decodes them as UTF-8 text synchronously.</li>
            </ul>
          </div>
        </div>

        {/* Code Example 2 */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span style={{ fontWeight: 600, fontSize: '13px' }}>Example 2: Raw HTTP Server with http.createServer()</span>
            <span className="badge">HTTP MODULE</span>
          </div>
          <CodeBlock
            code={example2}
            filename="minimalServer.js"
            language="javascript"
          />
          <div className="card" style={{ backgroundColor: 'var(--surface-subtle)', marginTop: '8px', fontSize: '13px' }}>
            <strong>Line-by-line breakdown:</strong>
            <ul style={{ paddingLeft: '20px', marginTop: '6px', lineHeight: 1.6 }}>
              <li><strong>Line 2:</strong> Loads the low-level <span className="font-mono">http</span> module.</li>
              <li><strong>Line 5:</strong> <span className="font-mono">http.createServer()</span> registers a callback receiving the incoming <span className="font-mono">req</span> (Readable Stream) and outgoing <span className="font-mono">res</span> (Writable Stream).</li>
              <li><strong>Line 7:</strong> <span className="font-mono">res.writeHead(200, ...)</span> writes HTTP headers directly to the response socket.</li>
              <li><strong>Line 10:</strong> <span className="font-mono">res.end(...)</span> writes the body payload and closes the connection.</li>
              <li><strong>Line 14:</strong> <span className="font-mono">server.listen(3000)</span> binds to port 3000 and starts accepting network connections.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Next Step Navigation */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: '1px solid var(--border-light)',
        paddingTop: '20px'
      }}>
        <button onClick={() => setCurrentView('dashboard')} className="btn-secondary">
          ← Back to Dashboard
        </button>
        <button onClick={() => setCurrentView('core-modules')} className="btn-primary">
          <span>Go to Core Modules Lab</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
