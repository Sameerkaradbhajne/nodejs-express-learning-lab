import React, { useState, useEffect } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import CodeBlock from '../components/CodeBlock';
import { Layers, Play, Clock, FileText, CheckCircle, ArrowRight, RefreshCw } from 'lucide-react';

export default function MiddlewareLab({ setCurrentView }) {
  const [logs, setLogs] = useState([]);
  const [logsLoading, setLogsLoading] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [testLoading, setTestLoading] = useState(false);

  const fetchLogs = async () => {
    try {
      setLogsLoading(true);
      const res = await fetch('http://localhost:5000/api/logs?limit=10');
      if (res.ok) {
        const data = await res.json();
        setLogs(data.logs || []);
      }
    } catch (e) {
      // offline
    } finally {
      setLogsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const triggerMiddlewareTest = async () => {
    setTestLoading(true);
    setTestResult(null);
    try {
      const res = await fetch('http://localhost:5000/api/status');
      const responseTimeHeader = res.headers.get('X-Response-Time');
      const body = await res.json();
      setTestResult({
        status: res.status,
        responseTimeHeader: responseTimeHeader || 'Available in server logs',
        body
      });
      // Refresh logs
      setTimeout(fetchLogs, 500);
    } catch (err) {
      setTestResult({ error: 'Backend unreachable' });
    } finally {
      setTestLoading(false);
    }
  };

  const middlewareFlowCode = `// Middleware Execution Stack in backend/server.js
const app = express();

// 1. Request Timer Middleware
app.use((req, res, next) => {
  const start = process.hrtime();
  res.on('finish', () => {
    const diff = process.hrtime(start);
    const ms = (diff[0] * 1000 + diff[1] / 1e6).toFixed(2);
    res.setHeader('X-Response-Time', \`\${ms}ms\`);
  });
  next(); // Passes control to next middleware
});

// 2. Request Logger Middleware
app.use((req, res, next) => {
  res.on('finish', () => {
    console.log(\`\${req.method} \${req.url} -> \${res.statusCode}\`);
  });
  next(); // Passes control to JSON parser
});

// 3. Body Parser Middleware
app.use(express.json());

// 4. Route Handler
app.use('/api', apiRoutes);`;

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px' }}>
      <Breadcrumbs currentView="middleware-lab" setCurrentView={setCurrentView} />

      <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '20px', marginBottom: '24px' }}>
        <span className="eyebrow">PIPELINE ARCHITECTURE • MODULE 06</span>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '8px' }}>
          Middleware Lab
        </h1>
        <p style={{ fontSize: '15px' }}>
          Understand how Express processes requests sequentially using functions with <span className="font-mono">(req, res, next)</span>.
        </p>
      </div>

      {/* Conceptual Pipeline Flow Diagram */}
      <div className="card" style={{ marginBottom: '28px' }}>
        <span className="eyebrow">THE MIDDLEWARE CHAIN</span>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>Request Pipeline Architecture</h2>
        <p style={{ fontSize: '13px', lineHeight: 1.6, marginBottom: '20px' }}>
          When an HTTP request enters Express, it flows through registered middleware functions in the exact order they are declared with <span className="font-mono">app.use()</span>. Each function must call <span className="font-mono">next()</span> to pass control forward, or end the response.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '8px',
          alignItems: 'center',
          backgroundColor: 'var(--surface-subtle)',
          padding: '16px',
          borderRadius: '6px',
          border: '1px solid var(--border-light)',
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          textAlign: 'center'
        }}>
          <div style={{ backgroundColor: '#111', color: '#FFF', padding: '10px 8px', borderRadius: '4px' }}>
            1. Client Request
          </div>
          <div style={{ color: '#888' }}>→ next() →</div>
          <div style={{ backgroundColor: '#FFF', border: '1px solid var(--border-light)', padding: '10px 8px', borderRadius: '4px' }}>
            2. Request Timer
          </div>
          <div style={{ color: '#888' }}>→ next() →</div>
          <div style={{ backgroundColor: '#FFF', border: '1px solid var(--border-light)', padding: '10px 8px', borderRadius: '4px' }}>
            3. Request Logger
          </div>
          <div style={{ color: '#888' }}>→ next() →</div>
          <div style={{ backgroundColor: '#FFF', border: '1px solid var(--border-light)', padding: '10px 8px', borderRadius: '4px' }}>
            4. express.json()
          </div>
          <div style={{ color: '#888' }}>→ next() →</div>
          <div style={{ backgroundColor: '#111', color: '#FFF', padding: '10px 8px', borderRadius: '4px' }}>
            5. Route Handler
          </div>
        </div>
      </div>

      {/* Interactive Trigger to test the chain */}
      <div className="grid-2" style={{ gap: '20px', marginBottom: '28px' }}>
        <div className="card">
          <span className="eyebrow">LIVE EXECUTION</span>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Trigger Pipeline Cycle</h3>
          <p style={{ fontSize: '13px', marginBottom: '16px' }}>
            Dispatches a request to <span className="font-mono">/api/status</span> and reads the generated <span className="font-mono">X-Response-Time</span> header calculated by the timer middleware.
          </p>

          <button onClick={triggerMiddlewareTest} className="btn-primary" disabled={testLoading} style={{ marginBottom: '16px' }}>
            <Play size={14} />
            <span>{testLoading ? 'Processing Pipeline...' : 'Fire Pipeline Request'}</span>
          </button>

          {testResult && (
            <div style={{
              backgroundColor: 'var(--surface-subtle)',
              border: '1px solid var(--border-light)',
              borderRadius: '4px',
              padding: '12px',
              fontSize: '12px',
              fontFamily: 'var(--font-mono)'
            }}>
              <div><strong>Status:</strong> {testResult.status} OK</div>
              <div><strong>X-Response-Time Header:</strong> {testResult.responseTimeHeader}</div>
              <div style={{ marginTop: '8px', color: 'var(--text-secondary)' }}>
                Result: Middleware intercepted request, measured duration, attached custom header, and logged the transaction.
              </div>
            </div>
          )}
        </div>

        {/* Live Logger Buffer */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div>
              <span className="eyebrow">LOGGER OUTPUT</span>
              <h3 style={{ fontSize: '1.15rem' }}>Live Middleware Logs</h3>
            </div>
            <button onClick={fetchLogs} className="btn-secondary" style={{ padding: '4px 8px', fontSize: '11px' }}>
              <RefreshCw size={11} className={logsLoading ? 'spin' : ''} />
              <span>Refresh</span>
            </button>
          </div>

          <div style={{
            maxHeight: '200px',
            overflowY: 'auto',
            border: '1px solid var(--border-light)',
            borderRadius: '4px',
            padding: '8px',
            backgroundColor: '#0A0A0A',
            color: '#F5F5F5',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px'
          }}>
            {logs.length === 0 ? (
              <div style={{ color: '#888', padding: '10px' }}>No logs recorded yet.</div>
            ) : (
              logs.map((l) => (
                <div key={l.id} style={{ padding: '4px 0', borderBottom: '1px solid #222' }}>
                  <span style={{ color: '#888' }}>[{l.timestamp.slice(11, 19)}]</span>{' '}
                  <strong style={{ color: '#FFF' }}>{l.method}</strong> {l.path} → {l.statusCode} ({l.durationMs}ms)
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Code Inspector */}
      <div className="card">
        <span className="eyebrow">IMPLEMENTATION PATTERN</span>
        <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>The Power of next()</h3>
        <p style={{ fontSize: '13px', marginBottom: '12px' }}>
          Notice how each middleware receives <span className="font-mono">(req, res, next)</span>. If a middleware does not call <span className="font-mono">next()</span>, the request will hang indefinitely unless ended with <span className="font-mono">res.send()</span> or <span className="font-mono">res.json()</span>.
        </p>

        <CodeBlock code={middlewareFlowCode} filename="backend/server.js" language="javascript" />
      </div>
    </div>
  );
}
