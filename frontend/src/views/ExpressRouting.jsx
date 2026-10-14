import React, { useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import CodeBlock from '../components/CodeBlock';
import { GitBranch, Play, Send, CheckCircle, AlertCircle, Copy, Check } from 'lucide-react';

export default function ExpressRouting({ setCurrentView }) {
  const [selectedRoute, setSelectedRoute] = useState('/api/hello?name=Sameer');
  const [method, setMethod] = useState('GET');
  const [requestBody, setRequestBody] = useState('{\n  "studentName": "Aditya Rao",\n  "comment": "Express routing makes endpoint design so straightforward!",\n  "rating": 5\n}');
  const [response, setResponse] = useState(null);
  const [status, setStatus] = useState(null);
  const [headers, setHeaders] = useState(null);
  const [latency, setLatency] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const availableRoutes = [
    { method: 'GET', path: '/', label: 'GET / (Project Root)' },
    { method: 'GET', path: '/about', label: 'GET /about (System Info)' },
    { method: 'GET', path: '/api/status', label: 'GET /api/status (Health Check)' },
    { method: 'GET', path: '/api/time', label: 'GET /api/time (Server Timestamp)' },
    { method: 'GET', path: '/api/hello?name=Sameer', label: 'GET /api/hello?name=... (Query Params)' },
    { method: 'POST', path: '/api/echo', label: 'POST /api/echo (Payload Validation)' },
    { method: 'GET', path: '/api/modules', label: 'GET /api/modules (Curriculum List)' },
    { method: 'GET', path: '/api/files/sample', label: 'GET /api/files/sample (fs Read)' },
    { method: 'GET', path: '/api/path-demo?path=backend/routes/api.js', label: 'GET /api/path-demo (Path Analyzer)' },
    { method: 'POST', path: '/api/feedback', label: 'POST /api/feedback (In-Memory Post)' },
    { method: 'GET', path: '/api/feedback', label: 'GET /api/feedback (Feedback List)' },
    { method: 'GET', path: '/api/unknown-route', label: 'GET /api/unknown-route (Test 404 Handler)' }
  ];

  const handleSelectRoute = (item) => {
    setSelectedRoute(item.path);
    setMethod(item.method);
    if (item.path === '/api/echo') {
      setRequestBody('{\n  "message": "Testing Express.js echo route",\n  "timestamp": "now"\n}');
    } else if (item.path === '/api/feedback') {
      setRequestBody('{\n  "studentName": "SIT Student",\n  "comment": "Express routing with modular routers is very clean.",\n  "rating": 5\n}');
    }
  };

  const handleExecute = async () => {
    setLoading(true);
    setResponse(null);
    setStatus(null);
    setHeaders(null);
    const start = performance.now();

    try {
      const options = {
        method,
        headers: { 'Content-Type': 'application/json' }
      };

      if (method === 'POST') {
        options.body = requestBody;
      }

      const res = await fetch(`http://localhost:5000${selectedRoute}`, options);
      const duration = (performance.now() - start).toFixed(1);
      setLatency(duration);
      setStatus(res.status);

      const respHeaders = {};
      res.headers.forEach((val, key) => {
        respHeaders[key] = val;
      });
      setHeaders(respHeaders);

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setResponse({ error: 'Network error or Express server is offline on port 5000.' });
      setStatus(0);
    } finally {
      setLoading(false);
    }
  };

  const copyResponse = () => {
    if (response) {
      navigator.clipboard.writeText(JSON.stringify(response, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px' }}>
      <Breadcrumbs currentView="express-routing" setCurrentView={setCurrentView} />

      <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '20px', marginBottom: '24px' }}>
        <span className="eyebrow">RESTFUL API DESIGN • MODULE 05</span>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '8px' }}>
          Express.js Routing
        </h1>
        <p style={{ fontSize: '15px' }}>
          Test all 12 live Express routes, observe query parameter parsing, JSON body validation, and centralized 404 responses.
        </p>
      </div>

      {/* Route Selector Strip */}
      <div className="card" style={{ marginBottom: '24px', padding: '16px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '10px' }}>
          SELECT AN IMPLEMENTED ENDPOINT TO TEST:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {availableRoutes.map((r, i) => (
            <button
              key={i}
              onClick={() => handleSelectRoute(r)}
              className={selectedRoute === r.path && method === r.method ? 'btn-primary' : 'btn-secondary'}
              style={{
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                padding: '5px 10px'
              }}
            >
              <span style={{ fontWeight: 700 }}>{r.method}</span> {r.path.split('?')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Request Execution Panel */}
      <div className="grid-2" style={{ gap: '20px', marginBottom: '28px' }}>
        {/* Left: Request Configuration */}
        <div className="card">
          <span className="eyebrow">REQUEST CONFIGURATION</span>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
            <span style={{
              padding: '8px 12px',
              backgroundColor: '#0A0A0A',
              color: '#FFFFFF',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              fontSize: '13px',
              borderRadius: '4px'
            }}>
              {method}
            </span>
            <input
              type="text"
              value={selectedRoute}
              onChange={(e) => setSelectedRoute(e.target.value)}
              style={{
                flex: 1,
                padding: '8px 12px',
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                border: '1px solid var(--border-light)',
                borderRadius: '4px'
              }}
            />
          </div>

          {method === 'POST' && (
            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '11px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                JSON REQUEST BODY:
              </label>
              <textarea
                value={requestBody}
                onChange={(e) => setRequestBody(e.target.value)}
                style={{
                  width: '100%',
                  height: '140px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  padding: '10px',
                  border: '1px solid var(--border-light)',
                  borderRadius: '4px',
                  backgroundColor: 'var(--surface-subtle)',
                  resize: 'none'
                }}
              />
            </div>
          )}

          <button
            onClick={handleExecute}
            className="btn-primary"
            disabled={loading}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <Send size={14} />
            <span>{loading ? 'Executing on Express...' : 'Send Live Request'}</span>
          </button>
        </div>

        {/* Right: Live Response Inspector */}
        <div className="card" style={{ backgroundColor: '#0A0A0A', color: '#F5F5F5', border: '1px solid #262626' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #262626', paddingBottom: '10px', marginBottom: '12px' }}>
            <span className="eyebrow" style={{ color: '#888', margin: 0 }}>RESPONSE PAYLOAD</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {status !== null && (
                <span style={{
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  padding: '2px 6px',
                  borderRadius: '3px',
                  backgroundColor: status === 200 || status === 201 ? '#1A331A' : '#331A1A',
                  color: status === 200 || status === 201 ? '#70E070' : '#E07070',
                  border: '1px solid #333'
                }}>
                  {status} {status === 200 ? 'OK' : status === 201 ? 'CREATED' : status === 404 ? 'NOT FOUND' : 'ERR'} ({latency}ms)
                </span>
              )}
              {response && (
                <button onClick={copyResponse} className="btn-dark" style={{ padding: '3px 8px', fontSize: '11px' }}>
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              )}
            </div>
          </div>

          <div style={{
            maxHeight: '260px',
            overflowY: 'auto',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            lineHeight: 1.6
          }}>
            {loading ? (
              <div style={{ color: '#888' }}>Sending HTTP request to Express server on port 5000...</div>
            ) : response ? (
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap', color: '#E5E5E5' }}>
                {JSON.stringify(response, null, 2)}
              </pre>
            ) : (
              <div style={{ color: '#555' }}>Select a route and click "Send Live Request".</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
