import React, { useState, useEffect } from 'react';
import {
  Activity,
  Server,
  Cpu,
  Layers,
  Terminal,
  Clock,
  HardDrive,
  RefreshCw,
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';

export default function Dashboard({
  setCurrentView,
  backendStatus,
  backendOnline,
  backendLatency,
  refreshBackendStatus
}) {
  const [logs, setLogs] = useState([]);
  const [logsLoading, setLogsLoading] = useState(false);

  // Fetch recent server logs from backend
  const fetchLogs = async () => {
    try {
      setLogsLoading(true);
      const res = await fetch('http://localhost:5000/api/logs?limit=8');
      if (res.ok) {
        const data = await res.json();
        setLogs(data.logs || []);
      }
    } catch (err) {
      // Backend may be offline
    } finally {
      setLogsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
      <Breadcrumbs currentView="dashboard" setCurrentView={setCurrentView} />

      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        borderBottom: '1px solid var(--border-light)',
        paddingBottom: '24px',
        marginBottom: '24px'
      }}>
        <div>
          <span className="eyebrow">HACK-O-WEEK SIT NAGPUR • BATCH 2025–29</span>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '6px' }}>
            Node.js & Express.js Learning Lab
          </h1>
          <p style={{ fontSize: '15px' }}>
            Explore, Execute, and Understand Backend Development.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => {
              refreshBackendStatus();
              fetchLogs();
            }}
            className="btn-secondary"
            title="Refresh Server Telemetry"
          >
            <RefreshCw size={14} className={logsLoading ? 'spin' : ''} />
            <span>Sync Telemetry</span>
          </button>
          <button
            onClick={() => setCurrentView('api-playground')}
            className="btn-primary"
          >
            <Terminal size={14} />
            <span>Launch Playground</span>
          </button>
        </div>
      </div>

      {/* Live Server Telemetry Banner */}
      <div style={{
        backgroundColor: backendOnline ? 'var(--surface-subtle)' : '#FFF0F0',
        border: `1px solid ${backendOnline ? 'var(--border-light)' : '#E5C0C0'}`,
        borderRadius: '6px',
        padding: '16px 20px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span
            className={`status-dot ${backendOnline ? 'online' : 'offline'}`}
            style={{ width: '10px', height: '10px', backgroundColor: backendOnline ? '#111' : '#E00' }}
          />
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600 }}>
              {backendOnline
                ? 'Live Server Connected: Express.js (Port 5000)'
                : 'Server Offline — Please start backend (npm run server)'}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
              Live telemetry is queried directly via <span className="font-mono">/api/status</span> using browser fetch().
            </div>
          </div>
        </div>

        {backendOnline && backendStatus && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px'
          }}>
            <div>
              <span style={{ color: 'var(--text-secondary)' }}>LATENCY:</span>{' '}
              <strong>{backendLatency}ms</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-secondary)' }}>NODE:</span>{' '}
              <strong>{backendStatus.nodeVersion}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-secondary)' }}>PID:</span>{' '}
              <strong>{backendStatus.pid}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-secondary)' }}>UPTIME:</span>{' '}
              <strong>{backendStatus.uptime}</strong>
            </div>
          </div>
        )}
      </div>

      {/* 4 Key Stat Cards */}
      <div className="grid-4" style={{ marginBottom: '28px' }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600 }}>MODULES IMPLEMENTED</span>
            <Layers size={16} />
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800 }}>10 / 10</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Complete Hack-O-Week syllabus
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600 }}>API ENDPOINTS</span>
            <Terminal size={16} />
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800 }}>12+</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            RESTful GET & POST endpoints
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600 }}>SERVER ENGINES</span>
            <Server size={16} />
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800 }}>2 Servers</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Express (:5000) & Raw HTTP (:5001)
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600 }}>VIVA QUESTIONS</span>
            <HardDrive size={16} />
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800 }}>26 Q&amp;A</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            With interactive reveal answers
          </div>
        </div>
      </div>

      {/* Visual Request-to-Response Workflow */}
      <div className="card" style={{ marginBottom: '28px' }}>
        <div style={{ marginBottom: '16px' }}>
          <span className="eyebrow">CONCEPTUAL LIFECYCLE</span>
          <h2 style={{ fontSize: '1.25rem' }}>Visual Request-to-Response Architecture</h2>
          <p style={{ fontSize: '13px' }}>
            Every incoming HTTP request travels sequentially through the Express pipeline before generating a JSON response.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '12px',
          alignItems: 'stretch'
        }}>
          <div style={{ border: '1px solid var(--border-light)', padding: '14px', borderRadius: '4px', backgroundColor: 'var(--surface-subtle)' }}>
            <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>STAGE 01</div>
            <div style={{ fontWeight: 600, fontSize: '13px' }}>Client Request</div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Browser sends HTTP GET/POST with URL, headers, and body.
            </div>
          </div>

          <div style={{ border: '1px solid var(--border-light)', padding: '14px', borderRadius: '4px', backgroundColor: 'var(--surface-subtle)' }}>
            <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>STAGE 02</div>
            <div style={{ fontWeight: 600, fontSize: '13px' }}>Request Timer</div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Records start time with <span className="font-mono">process.hrtime()</span>.
            </div>
          </div>

          <div style={{ border: '1px solid var(--border-light)', padding: '14px', borderRadius: '4px', backgroundColor: 'var(--surface-subtle)' }}>
            <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>STAGE 03</div>
            <div style={{ fontWeight: 600, fontSize: '13px' }}>Logger Middleware</div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Records method, URL, and client IP in memory ring buffer.
            </div>
          </div>

          <div style={{ border: '1px solid var(--border-light)', padding: '14px', borderRadius: '4px', backgroundColor: 'var(--surface-subtle)' }}>
            <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>STAGE 04</div>
            <div style={{ fontWeight: 600, fontSize: '13px' }}>JSON Body Parser</div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Transforms raw stream into JSON object on <span className="font-mono">req.body</span>.
            </div>
          </div>

          <div style={{ border: '1px solid var(--border-light)', padding: '14px', borderRadius: '4px', backgroundColor: 'var(--surface-subtle)' }}>
            <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>STAGE 05</div>
            <div style={{ fontWeight: 600, fontSize: '13px' }}>Route Handler</div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Executes controller logic and calls <span className="font-mono">res.json()</span>.
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Recent Live API Activity & What You Will Learn */}
      <div className="grid-2" style={{ marginBottom: '28px' }}>
        {/* Recent Server Activity Table */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div>
              <span className="eyebrow">LIVE TELEMETRY</span>
              <h3 style={{ fontSize: '1.1rem' }}>Recent Server Requests</h3>
            </div>
            <button onClick={fetchLogs} className="btn-secondary" style={{ padding: '4px 8px', fontSize: '11px' }}>
              Refresh
            </button>
          </div>

          {logs.length === 0 ? (
            <div style={{
              padding: '24px',
              textAlign: 'center',
              color: 'var(--text-secondary)',
              border: '1px dashed var(--border-light)',
              borderRadius: '4px',
              fontSize: '12px'
            }}>
              No requests recorded yet. Make a request via the API Playground to populate this log.
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-light)', color: 'var(--text-secondary)', textAlign: 'left' }}>
                    <th style={{ padding: '6px 8px' }}>METHOD</th>
                    <th style={{ padding: '6px 8px' }}>PATH</th>
                    <th style={{ padding: '6px 8px' }}>STATUS</th>
                    <th style={{ padding: '6px 8px' }}>TIME</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.slice(0, 6).map((log) => (
                    <tr key={log.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                      <td style={{ padding: '8px', fontWeight: 700 }}>{log.method}</td>
                      <td style={{ padding: '8px', color: 'var(--text-secondary)' }}>{log.path}</td>
                      <td style={{ padding: '8px' }}>
                        <span style={{
                          padding: '2px 5px',
                          borderRadius: '3px',
                          border: '1px solid var(--border-light)',
                          fontSize: '10px',
                          fontWeight: 600,
                          backgroundColor: log.statusCode === 200 ? 'var(--surface-subtle)' : '#FFF0F0'
                        }}>
                          {log.statusCode}
                        </span>
                      </td>
                      <td style={{ padding: '8px', color: 'var(--text-secondary)' }}>
                        {log.durationMs}ms
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* What You Will Learn Checklist */}
        <div className="card">
          <span className="eyebrow">SYLLABUS COVERAGE</span>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '14px' }}>What You Will Learn</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <CheckCircle2 size={16} style={{ marginTop: '2px', flexShrink: 0 }} />
              <div>
                <strong>Node.js Runtime &amp; Architecture:</strong> V8 JavaScript engine, event loop, and non-blocking I/O.
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <CheckCircle2 size={16} style={{ marginTop: '2px', flexShrink: 0 }} />
              <div>
                <strong>Built-in Core Modules:</strong> Real interactions with <span className="font-mono">fs</span>, <span className="font-mono">path</span>, and <span className="font-mono">process</span>.
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <CheckCircle2 size={16} style={{ marginTop: '2px', flexShrink: 0 }} />
              <div>
                <strong>CommonJS Module System:</strong> Exporting with <span className="font-mono">module.exports</span> and loading with <span className="font-mono">require()</span>.
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <CheckCircle2 size={16} style={{ marginTop: '2px', flexShrink: 0 }} />
              <div>
                <strong>Raw HTTP vs Express:</strong> How <span className="font-mono">http.createServer()</span> works compared to Express routes.
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <CheckCircle2 size={16} style={{ marginTop: '2px', flexShrink: 0 }} />
              <div>
                <strong>Middleware Pipeline:</strong> Using <span className="font-mono">next()</span>, calculating response latency headers, and parsing JSON bodies.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
