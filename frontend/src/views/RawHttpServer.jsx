import React, { useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import CodeBlock from '../components/CodeBlock';
import { Server, Play, RefreshCw, AlertCircle, CheckCircle, ExternalLink } from 'lucide-react';

export default function RawHttpServer({ setCurrentView, rawServerOnline, checkRawServer }) {
  const [activeRoute, setActiveRoute] = useState('/');
  const [responseOutput, setResponseOutput] = useState(null);
  const [responseStatus, setResponseStatus] = useState(null);
  const [latency, setLatency] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const rawServerCode = `// raw-server.js - Standalone Native HTTP Server (No Framework)
const http = require('http');
const url = require('url');

const RAW_PORT = process.env.RAW_PORT || 5001;

const server = http.createServer((req, res) => {
  // 1. Set CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  // 2. Parse request pathname & method
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // 3. Manual Route Routing
  if (method === 'GET' && pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ server: 'Raw Node.js Server', port: RAW_PORT }));
  }

  if (method === 'GET' && pathname === '/about') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ topic: 'Built-in http module' }));
  }

  if (method === 'GET' && pathname === '/api/status') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ success: true, node: process.version }));
  }

  if (method === 'GET' && pathname === '/api/time') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ success: true, time: new Date().toISOString() }));
  }

  // 4. Default 404 handler
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not Found', statusCode: 404 }));
});

server.listen(RAW_PORT, () => {
  console.log(\`Raw HTTP Server running on http://localhost:\${RAW_PORT}\`);
});`;

  const testEndpoint = async (routePath) => {
    setActiveRoute(routePath);
    setLoading(true);
    setErrorMsg(null);
    setResponseOutput(null);
    setResponseStatus(null);
    const start = performance.now();

    try {
      const res = await fetch(`http://localhost:5001${routePath}`);
      const duration = (performance.now() - start).toFixed(1);
      setLatency(duration);
      setResponseStatus(res.status);

      const json = await res.json();
      setResponseOutput(json);
    } catch (err) {
      setErrorMsg(`Failed to connect to http://localhost:5001${routePath}. Ensure raw server is running: "npm run raw"`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px' }}>
      <Breadcrumbs currentView="raw-http" setCurrentView={setCurrentView} />

      <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '20px', marginBottom: '24px' }}>
        <span className="eyebrow">STANDALONE DEMONSTRATION • MODULE 04</span>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '8px' }}>
          Raw HTTP Server (Port 5001)
        </h1>
        <p style={{ fontSize: '15px' }}>
          Explore low-level HTTP handling using Node's built-in <span className="font-mono">http.createServer()</span> without Express.
        </p>
      </div>

      {/* Server Status Box */}
      <div style={{
        padding: '16px 20px',
        borderRadius: '6px',
        border: `1px solid ${rawServerOnline ? 'var(--border-light)' : '#E5C0C0'}`,
        backgroundColor: rawServerOnline ? 'var(--surface-subtle)' : '#FFF0F0',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span
            className={`status-dot ${rawServerOnline ? 'online' : 'offline'}`}
            style={{ width: '10px', height: '10px', backgroundColor: rawServerOnline ? '#111' : '#E00' }}
          />
          <div>
            <div style={{ fontWeight: 600, fontSize: '13px' }}>
              {rawServerOnline
                ? 'Raw HTTP Server is Running on Port 5001'
                : 'Raw HTTP Server is NOT Running (Standby Mode)'}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
              {rawServerOnline
                ? 'Requests below send real HTTP calls directly to native http.createServer() instance.'
                : 'Launch in a terminal: npm run raw (or node backend/raw-server.js)'}
            </div>
          </div>
        </div>

        <button onClick={checkRawServer} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '11px' }}>
          <RefreshCw size={12} />
          <span>Check Status</span>
        </button>
      </div>

      {/* Interactive Route Testing Panel */}
      <div className="card" style={{ marginBottom: '28px' }}>
        <span className="eyebrow">INTERACTIVE ENDPOINT TESTER</span>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Test Native Endpoints</h2>
        <p style={{ fontSize: '13px', marginBottom: '16px' }}>
          Click an endpoint below to dispatch a real request via browser <span className="font-mono">fetch()</span>:
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
          {[
            { label: 'GET /', path: '/' },
            { label: 'GET /about', path: '/about' },
            { label: 'GET /api/status', path: '/api/status' },
            { label: 'GET /api/time', path: '/api/time' },
            { label: 'GET /invalid-path (Test 404)', path: '/invalid-path' }
          ].map((r) => (
            <button
              key={r.path}
              onClick={() => testEndpoint(r.path)}
              className={activeRoute === r.path ? 'btn-primary' : 'btn-secondary'}
              style={{ padding: '6px 12px', fontSize: '12px', fontFamily: 'var(--font-mono)' }}
            >
              <Play size={11} />
              <span>{r.label}</span>
            </button>
          ))}
        </div>

        {/* Output Console */}
        <div style={{
          backgroundColor: '#0A0A0A',
          border: '1px solid #262626',
          borderRadius: '6px',
          padding: '16px',
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          color: '#F5F5F5',
          minHeight: '140px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #222', paddingBottom: '8px', marginBottom: '12px', color: '#888' }}>
            <div>REQUEST: GET http://localhost:5001{activeRoute}</div>
            {responseStatus && (
              <div>
                STATUS: <span style={{ color: responseStatus === 200 ? '#FFF' : '#AAA' }}>{responseStatus}</span> | {latency}ms
              </div>
            )}
          </div>

          {loading ? (
            <div style={{ color: '#888' }}>Dispatching HTTP request to port 5001...</div>
          ) : errorMsg ? (
            <div style={{ color: '#AAA' }}>{errorMsg}</div>
          ) : responseOutput ? (
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', color: '#FFF' }}>
              {JSON.stringify(responseOutput, null, 2)}
            </pre>
          ) : (
            <div style={{ color: '#666' }}>Click one of the endpoints above to test the raw server.</div>
          )}
        </div>
      </div>

      {/* Raw Server Code & Architectural Explanation */}
      <div className="card">
        <span className="eyebrow">SOURCE CODE INSPECTION</span>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>raw-server.js Implementation</h2>
        <p style={{ fontSize: '13px', marginBottom: '12px' }}>
          Notice how routing requires manual URL string parsing (<span className="font-mono">url.parse()</span>) and explicit status codes via <span className="font-mono">res.writeHead()</span>. Express abstracts away all this repetitive boilerplate.
        </p>

        <CodeBlock code={rawServerCode} filename="backend/raw-server.js" language="javascript" />
      </div>
    </div>
  );
}
