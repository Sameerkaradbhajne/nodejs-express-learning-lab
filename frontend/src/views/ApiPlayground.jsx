import React, { useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import { Send, Copy, Check, Terminal, Clock, RefreshCw, AlertCircle } from 'lucide-react';

export default function ApiPlayground({ setCurrentView, backendOnline }) {
  const [method, setMethod] = useState('GET');
  const [endpoint, setEndpoint] = useState('/api/status');
  const [queryParams, setQueryParams] = useState('');
  const [requestBody, setRequestBody] = useState('{\n  "name": "SIT Student",\n  "message": "Testing backend playground"\n}');
  const [response, setResponse] = useState(null);
  const [status, setStatus] = useState(null);
  const [statusText, setStatusText] = useState('');
  const [latency, setLatency] = useState(null);
  const [headers, setHeaders] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const presets = [
    { label: 'Health Status', method: 'GET', endpoint: '/api/status', query: '', body: '', desc: 'Returns Node.js version, uptime, memory, and operational state.' },
    { label: 'Server Time', method: 'GET', endpoint: '/api/time', query: '', body: '', desc: 'Returns current server clock in ISO, UTC, and epoch timestamps.' },
    { label: 'Personalized Greeting', method: 'GET', endpoint: '/api/hello', query: 'name=Student', body: '', desc: 'Tests query parameter parsing via req.query.name.' },
    { label: 'Echo JSON Payload', method: 'POST', endpoint: '/api/echo', query: '', body: '{\n  "role": "Learner",\n  "course": "Hack-O-Week",\n  "topic": "REST API"\n}', desc: 'Tests POST request body validation and echoing.' },
    { label: 'Curriculum Modules', method: 'GET', endpoint: '/api/modules', query: '', body: '', desc: 'Lists all 10 modules implemented in this lab.' },
    { label: 'Read Sample File', method: 'GET', endpoint: '/api/files/sample', query: '', body: '', desc: 'Reads sample.txt from disk via fs.readFileSync().' },
    { label: 'Path Analysis', method: 'GET', endpoint: '/api/path-demo', query: 'path=backend/data/sample.txt', body: '', desc: 'Tests cross-platform path resolution methods.' },
    { label: 'Submit Feedback', method: 'POST', endpoint: '/api/feedback', query: '', body: '{\n  "studentName": "Devika Joshi",\n  "comment": "The interactive playground makes API testing intuitive.",\n  "rating": 5\n}', desc: 'Saves user feedback into server in-memory store.' },
    { label: 'Trigger 404', method: 'GET', endpoint: '/api/non-existent-endpoint', query: '', body: '', desc: 'Tests the catch-all centralized 404 error handler.' }
  ];

  const applyPreset = (preset) => {
    setMethod(preset.method);
    setEndpoint(preset.endpoint);
    setQueryParams(preset.query);
    if (preset.body) {
      setRequestBody(preset.body);
    }
  };

  const sendRequest = async () => {
    setLoading(true);
    setResponse(null);
    setStatus(null);
    setStatusText('');
    setLatency(null);
    setHeaders(null);
    setErrorMsg(null);

    const fullUrl = queryParams ? `${endpoint}?${queryParams}` : endpoint;
    const start = performance.now();

    try {
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      if (method === 'POST') {
        try {
          JSON.parse(requestBody);
          options.body = requestBody;
        } catch (e) {
          setErrorMsg('Malformed JSON in request body. Please fix syntax.');
          setLoading(false);
          return;
        }
      }

      const res = await fetch(`http://localhost:5000${fullUrl}`, options);
      const duration = (performance.now() - start).toFixed(1);
      setLatency(duration);
      setStatus(res.status);
      setStatusText(res.statusText || (res.status === 200 ? 'OK' : ''));

      const responseHeaders = {};
      res.headers.forEach((val, key) => {
        responseHeaders[key] = val;
      });
      setHeaders(responseHeaders);

      const json = await res.json();
      setResponse(json);
    } catch (err) {
      setErrorMsg(`Request failed: ${err.message}. The backend server on http://localhost:5000 appears offline.`);
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
      <Breadcrumbs currentView="api-playground" setCurrentView={setCurrentView} />

      <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '20px', marginBottom: '24px' }}>
        <span className="eyebrow">INTERACTIVE CONSOLE • MODULE 07</span>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '8px' }}>
          API Playground
        </h1>
        <p style={{ fontSize: '15px' }}>
          Construct and execute live HTTP requests directly against your local Express backend with real response parsing and timing.
        </p>
      </div>

      {/* Preset Buttons */}
      <div className="card" style={{ marginBottom: '24px', padding: '16px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px' }}>
          QUICK PRESETS:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {presets.map((p, i) => (
            <button
              key={i}
              onClick={() => applyPreset(p)}
              className="btn-secondary"
              style={{ fontSize: '12px', padding: '5px 10px' }}
              title={p.desc}
            >
              <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{p.method}</span> {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Request Builder & Response Visualizer */}
      <div className="grid-2" style={{ gap: '20px', marginBottom: '28px' }}>
        {/* Request Side */}
        <div className="card">
          <span className="eyebrow">HTTP REQUEST</span>

          {/* Method and Endpoint */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              style={{
                padding: '8px 12px',
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                fontWeight: 700,
                border: '1px solid var(--border-light)',
                borderRadius: '4px',
                backgroundColor: 'var(--surface-subtle)'
              }}
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
            </select>

            <input
              type="text"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              placeholder="/api/status"
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

          {/* Query Params */}
          <div style={{ marginBottom: '14px' }}>
            <label style={{ fontSize: '11px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
              QUERY PARAMETERS (OPTIONAL, e.g. name=Student):
            </label>
            <input
              type="text"
              value={queryParams}
              onChange={(e) => setQueryParams(e.target.value)}
              placeholder="key=value&foo=bar"
              style={{
                width: '100%',
                padding: '8px 12px',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                border: '1px solid var(--border-light)',
                borderRadius: '4px'
              }}
            />
          </div>

          {/* Body for POST */}
          {method === 'POST' && (
            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '11px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                REQUEST BODY (JSON):
              </label>
              <textarea
                value={requestBody}
                onChange={(e) => setRequestBody(e.target.value)}
                style={{
                  width: '100%',
                  height: '140px',
                  padding: '10px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  border: '1px solid var(--border-light)',
                  borderRadius: '4px',
                  backgroundColor: 'var(--surface-subtle)',
                  resize: 'none'
                }}
              />
            </div>
          )}

          <button
            onClick={sendRequest}
            className="btn-primary"
            disabled={loading}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <Send size={14} />
            <span>{loading ? 'Dispatching Request...' : 'Send Request'}</span>
          </button>
        </div>

        {/* Response Side */}
        <div className="card" style={{ backgroundColor: '#0A0A0A', color: '#F5F5F5', border: '1px solid #262626' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #262626', paddingBottom: '10px', marginBottom: '12px' }}>
            <span className="eyebrow" style={{ color: '#888', margin: 0 }}>RESPONSE PAYLOAD</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {status !== null && (
                <span style={{
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  padding: '2px 6px',
                  borderRadius: '3px',
                  border: '1px solid #333',
                  backgroundColor: status >= 200 && status < 300 ? '#1A331A' : '#331A1A',
                  color: status >= 200 && status < 300 ? '#70E070' : '#E07070'
                }}>
                  {status} {statusText} ({latency}ms)
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
            maxHeight: '300px',
            overflowY: 'auto',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            lineHeight: 1.6
          }}>
            {loading ? (
              <div style={{ color: '#888' }}>Waiting for response from Express backend...</div>
            ) : errorMsg ? (
              <div style={{ color: '#E58888', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertCircle size={14} />
                <span>{errorMsg}</span>
              </div>
            ) : response ? (
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap', color: '#E5E5E5' }}>
                {JSON.stringify(response, null, 2)}
              </pre>
            ) : (
              <div style={{ color: '#555' }}>
                Configure parameters on the left and click "Send Request" to test any endpoint.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
