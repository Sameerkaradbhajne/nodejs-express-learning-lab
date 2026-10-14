import React, { useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import { Activity, Play, CheckCircle, ArrowDown, Server, Layers, Cpu, Send } from 'lucide-react';

export default function RequestVisualizer({ setCurrentView }) {
  const [selectedEndpoint, setSelectedEndpoint] = useState('/api/status');
  const [currentStage, setCurrentStage] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [actualResponse, setActualResponse] = useState(null);

  const stages = [
    {
      step: 1,
      title: '1. Client Sends HTTP Request',
      actor: 'Browser / Client App',
      description: 'The client constructs an HTTP message containing the method (GET), target path, HTTP headers, and optional body, transmitting TCP packets to port 5000.'
    },
    {
      step: 2,
      title: '2. Express Kernel Receives Request',
      actor: 'Express.js Framework',
      description: 'Node\'s underlying HTTP server hands the raw request stream to Express, which encapsulates it into standard req and res objects.'
    },
    {
      step: 3,
      title: '3. Middleware Pipeline Executes in Sequence',
      actor: 'Middleware Stack',
      description: 'The request flows sequentially through requestTimer (measures start time), logger (records IP & path), and express.json (parses body).'
    },
    {
      step: 4,
      title: '4. Matching Route Handler Fires',
      actor: 'Express Router (routes/api.js)',
      description: 'Express evaluates registered endpoints and matches the URL pattern, executing controller logic and pulling data from memory or disk.'
    },
    {
      step: 5,
      title: '5. Server Generates Standardized Response',
      actor: 'Express res.json()',
      description: 'Express sets the Content-Type to application/json, computes response length, flushes headers (including X-Response-Time), and sends data.'
    },
    {
      step: 6,
      title: '6. Client Renders Server Response',
      actor: 'Browser Client',
      description: 'The client receives the HTTP response payload, parses the JSON string, and displays telemetry to the user.'
    }
  ];

  const handleSimulate = async () => {
    setIsRunning(true);
    setActualResponse(null);
    setCurrentStage(1);

    // Step through stages visually while firing real request
    setTimeout(() => setCurrentStage(2), 400);
    setTimeout(() => setCurrentStage(3), 800);
    setTimeout(() => setCurrentStage(4), 1200);

    try {
      const res = await fetch(`http://localhost:5000${selectedEndpoint}`);
      const data = await res.json();
      setTimeout(() => {
        setCurrentStage(5);
        setActualResponse(data);
      }, 1600);
      setTimeout(() => {
        setCurrentStage(6);
        setIsRunning(false);
      }, 2000);
    } catch (err) {
      setCurrentStage(6);
      setIsRunning(false);
      setActualResponse({ error: 'Backend is offline on port 5000.' });
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px' }}>
      <Breadcrumbs currentView="request-visualizer" setCurrentView={setCurrentView} />

      <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '20px', marginBottom: '24px' }}>
        <span className="eyebrow">FLOW SIMULATOR • MODULE 08</span>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '8px' }}>
          Request-Response Visualizer
        </h1>
        <p style={{ fontSize: '15px' }}>
          Step-by-step conceptual walkthrough of an HTTP packet travelling through the Express.js architecture.
        </p>
      </div>

      {/* Control Banner */}
      <div className="card" style={{ marginBottom: '28px', padding: '18px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>Select Target Endpoint to Trace:</div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['/api/status', '/api/time', '/api/modules', '/api/files/sample'].map((ep) => (
                <button
                  key={ep}
                  onClick={() => setSelectedEndpoint(ep)}
                  className={selectedEndpoint === ep ? 'btn-primary' : 'btn-secondary'}
                  style={{ fontSize: '12px', padding: '5px 10px', fontFamily: 'var(--font-mono)' }}
                >
                  {ep}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleSimulate}
            className="btn-primary"
            disabled={isRunning}
            style={{ padding: '10px 20px' }}
          >
            <Play size={14} />
            <span>{isRunning ? 'Tracing Flow...' : 'Trigger Trace & Simulation'}</span>
          </button>
        </div>
        <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '12px' }}>
          <em>Note:</em> Animated stage indicators represent the conceptual lifecycle for educational clarity while an actual HTTP fetch is dispatched concurrently.
        </div>
      </div>

      {/* 6 Stage Timeline */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
        {stages.map((st) => {
          const isCurrent = currentStage === st.step;
          const isCompleted = currentStage > st.step;

          return (
            <div
              key={st.step}
              style={{
                border: isCurrent ? '1.5px solid #111111' : '1px solid var(--border-light)',
                backgroundColor: isCurrent ? '#FFFFFF' : isCompleted ? 'var(--surface-subtle)' : '#FFFFFF',
                borderRadius: '6px',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                transition: 'all 200ms ease',
                boxShadow: isCurrent ? '0 4px 12px rgba(0,0,0,0.05)' : 'none'
              }}
            >
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                backgroundColor: isCurrent ? '#111111' : isCompleted ? '#333333' : 'var(--surface-subtle)',
                color: isCurrent || isCompleted ? '#FFFFFF' : '#888888',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 700,
                flexShrink: 0
              }}>
                {isCompleted ? <CheckCircle size={14} /> : st.step}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: isCurrent ? '#111111' : 'var(--text-primary)' }}>
                    {st.title}
                  </div>
                  <span className="badge" style={{ fontSize: '10px' }}>
                    {st.actor}
                  </span>
                </div>
                <p style={{ fontSize: '13px', lineHeight: 1.5, margin: 0, color: 'var(--text-secondary)' }}>
                  {st.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Actual Live Payload from the real execution */}
      {actualResponse && (
        <div className="card" style={{ backgroundColor: '#0A0A0A', color: '#F5F5F5', border: '1px solid #262626' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #262626', paddingBottom: '8px', marginBottom: '12px', fontSize: '12px', color: '#888' }}>
            <span>ACTUAL BACKEND RESPONSE RECEIVED AT STAGE 6</span>
            <span style={{ color: '#FFF' }}>{selectedEndpoint}</span>
          </div>
          <pre style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#EEE', whiteSpace: 'pre-wrap' }}>
            {JSON.stringify(actualResponse, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
