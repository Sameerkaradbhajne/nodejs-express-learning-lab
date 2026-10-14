import React from 'react';
import {
  ArrowRight,
  Terminal,
  Server,
  Layers,
  Cpu,
  Package,
  BookOpen,
  Code2,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function LandingPage({ setCurrentView, backendOnline }) {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 80px' }}>
      {/* Hero Section */}
      <section style={{ padding: '60px 0 50px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <span className="eyebrow" style={{ margin: 0 }}>
            HACK-O-WEEK / SIT NAGPUR
          </span>
          <span style={{ color: 'var(--border-medium)' }}>•</span>
          <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>
            CSE BATCH 2025–29
          </span>
        </div>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 6vw, 4.2rem)',
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: '-0.03em',
          maxWidth: '900px',
          margin: '0 auto 20px',
          color: '#111111'
        }}>
          Understand the Backend.
        </h1>

        <p style={{
          fontSize: '18px',
          color: 'var(--text-secondary)',
          maxWidth: '640px',
          margin: '0 auto 32px',
          fontWeight: 400,
          lineHeight: 1.5
        }}>
          Learn Node.js. Explore Express. Build with confidence. An interactive, live-connected learning lab designed for engineering students.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setCurrentView('dashboard')}
            className="btn-primary"
            style={{ padding: '12px 24px', fontSize: '14px' }}
          >
            <span>Explore the Lab</span>
            <ArrowRight size={16} />
          </button>
          <button
            onClick={() => setCurrentView('fundamentals')}
            className="btn-secondary"
            style={{ padding: '12px 22px', fontSize: '14px' }}
          >
            <span>View Documentation</span>
          </button>
        </div>
      </section>

      {/* Monochrome Code Illustration: Node.js server starting and responding */}
      <section style={{
        maxWidth: '840px',
        margin: '0 auto 60px',
        backgroundColor: '#0A0A0A',
        borderRadius: '8px',
        border: '1px solid #262626',
        overflow: 'hidden',
        boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.15)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 16px',
          backgroundColor: '#141414',
          borderBottom: '1px solid #262626'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#262626' }}></span>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#262626' }}></span>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#262626' }}></span>
            <span style={{ fontSize: '12px', color: '#888888', fontFamily: 'var(--font-mono)', marginLeft: '6px' }}>
              node server.js
            </span>
          </div>
          <span style={{
            fontSize: '11px',
            color: '#888',
            fontFamily: 'var(--font-mono)',
            border: '1px solid #333',
            padding: '2px 6px',
            borderRadius: '3px'
          }}>
            HTTP/1.1 200 OK
          </span>
        </div>

        <div style={{
          padding: '20px',
          fontFamily: 'var(--font-mono)',
          fontSize: '13px',
          lineHeight: '1.7',
          color: '#E5E5E5'
        }}>
          <div style={{ color: '#888888' }}>// Express application initialization</div>
          <div><span style={{ color: '#888888' }}>const</span> express = require(<span style={{ color: '#FFFFFF' }}>'express'</span>);</div>
          <div><span style={{ color: '#888888' }}>const</span> app = express();</div>
          <div style={{ height: '8px' }}></div>
          <div style={{ color: '#888888' }}>// Register middleware & route handler</div>
          <div>app.use(express.json());</div>
          <div>app.get(<span style={{ color: '#FFFFFF' }}>'/api/status'</span>, (req, res) =&gt; &#123;</div>
          <div style={{ paddingLeft: '20px' }}>
            res.json(&#123; status: <span style={{ color: '#FFFFFF' }}>'operational'</span>, time: Date.now() &#125;);
          </div>
          <div>&#125;);</div>
          <div style={{ height: '12px' }}></div>
          <div style={{
            backgroundColor: '#121212',
            padding: '10px 14px',
            borderRadius: '4px',
            borderLeft: '3px solid #FFFFFF',
            color: '#F5F5F5'
          }}>
            <span style={{ color: '#888888' }}>[READY]</span> Server listening on port 5000 • Status: {backendOnline ? 'CONNECTED' : 'STANDBY'}
          </div>
        </div>
      </section>

      {/* Technology Strip */}
      <section style={{
        borderTop: '1px solid var(--border-light)',
        borderBottom: '1px solid var(--border-light)',
        padding: '24px 0',
        marginBottom: '60px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          gap: '24px',
          fontFamily: 'var(--font-mono)',
          fontSize: '13px',
          fontWeight: 600,
          color: 'var(--text-secondary)'
        }}>
          <span style={{ color: 'var(--text-primary)' }}>NODE.JS V24</span>
          <span>/</span>
          <span style={{ color: 'var(--text-primary)' }}>EXPRESS.JS 4</span>
          <span>/</span>
          <span style={{ color: 'var(--text-primary)' }}>COMMONJS</span>
          <span>/</span>
          <span style={{ color: 'var(--text-primary)' }}>RAW HTTP :5001</span>
          <span>/</span>
          <span style={{ color: 'var(--text-primary)' }}>NPM ENGINE</span>
        </div>
      </section>

      {/* Editorial Section: Modules Overview */}
      <section>
        <div style={{ marginBottom: '32px' }}>
          <span className="eyebrow">CURRICULUM ARCHITECTURE</span>
          <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>
            Built for Systematic Mastery
          </h2>
          <p style={{ maxWidth: '600px' }}>
            Every section matches the syllabus requirements with working interactive demos, live API triggers, and clean architectural explanations.
          </p>
        </div>

        <div className="grid-3">
          <div className="card" onClick={() => setCurrentView('fundamentals')} style={{ cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <Cpu size={20} />
              <span className="badge">MODULE 01</span>
            </div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Node.js Fundamentals</h3>
            <p style={{ fontSize: '13px', lineHeight: 1.5 }}>
              V8 runtime architecture, single-threaded event loop, browser vs Node execution context, and CommonJS module system.
            </p>
          </div>

          <div className="card" onClick={() => setCurrentView('core-modules')} style={{ cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <Terminal size={20} />
              <span className="badge">MODULE 02</span>
            </div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Core Modules Lab</h3>
            <p style={{ fontSize: '13px', lineHeight: 1.5 }}>
              Safe disk operations with <span className="font-mono">fs</span>, cross-platform path resolution with <span className="font-mono">path</span>, and <span className="font-mono">process</span> inspection.
            </p>
          </div>

          <div className="card" onClick={() => setCurrentView('raw-http')} style={{ cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <Server size={20} />
              <span className="badge">MODULE 03</span>
            </div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Native Raw HTTP Server</h3>
            <p style={{ fontSize: '13px', lineHeight: 1.5 }}>
              Understand what happens under the hood before Express: <span className="font-mono">http.createServer()</span> running on port 5001.
            </p>
          </div>

          <div className="card" onClick={() => setCurrentView('middleware-lab')} style={{ cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <Layers size={20} />
              <span className="badge">MODULE 04</span>
            </div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Middleware Pipeline</h3>
            <p style={{ fontSize: '13px', lineHeight: 1.5 }}>
              Inspect request logging, timer headers (<span className="font-mono">X-Response-Time</span>), JSON parsing, and the role of <span className="font-mono">next()</span>.
            </p>
          </div>

          <div className="card" onClick={() => setCurrentView('api-playground')} style={{ cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <Code2 size={20} />
              <span className="badge">MODULE 05</span>
            </div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>API Playground</h3>
            <p style={{ fontSize: '13px', lineHeight: 1.5 }}>
              Send real HTTP requests, customize parameters and JSON payloads, and inspect actual response headers and latency.
            </p>
          </div>

          <div className="card" onClick={() => setCurrentView('viva-questions')} style={{ cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <BookOpen size={20} />
              <span className="badge">MODULE 06</span>
            </div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Viva Examination Suite</h3>
            <p style={{ fontSize: '13px', lineHeight: 1.5 }}>
              26 high-yield questions and precise answers curated for academic evaluation and technical interviews.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
