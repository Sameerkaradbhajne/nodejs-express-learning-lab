import React from 'react';
import { Terminal, Server, Radio, Menu, X, ExternalLink, BookOpen } from 'lucide-react';

export default function Navbar({
  currentView,
  setCurrentView,
  backendOnline,
  backendLatency,
  rawServerOnline,
  mobileMenuOpen,
  setMobileMenuOpen
}) {
  return (
    <header style={{
      borderBottom: '1px solid var(--border-light)',
      backgroundColor: '#FFFFFF',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      width: '100%'
    }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '0 24px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Left: Brand / College Identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn-secondary"
            style={{
              padding: '6px',
              display: 'none',
              cursor: 'pointer'
            }}
            id="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          <div
            onClick={() => setCurrentView('landing')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              userSelect: 'none'
            }}
          >
            <div style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#111111',
              color: '#FFFFFF',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '13px',
              fontFamily: 'var(--font-mono)'
            }}>
              NL
            </div>
            <div>
              <div style={{
                fontWeight: 700,
                fontSize: '14px',
                letterSpacing: '-0.02em',
                lineHeight: 1.2
              }}>
                Node.js & Express Lab
              </div>
              <div style={{
                fontSize: '10px',
                color: 'var(--text-secondary)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                fontWeight: 600
              }}>
                Hack-O-Week • SIT Nagpur
              </div>
            </div>
          </div>
        </div>

        {/* Center/Right: Live Status & Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Express Server Health Indicator */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '4px 10px',
            borderRadius: '4px',
            border: '1px solid var(--border-light)',
            backgroundColor: 'var(--surface-subtle)',
            fontSize: '12px'
          }} title={backendOnline ? `Express backend online at port 5000 (${backendLatency}ms)` : 'Express server offline'}>
            <span
              className={`status-dot ${backendOnline ? 'online' : 'offline'}`}
              style={{
                backgroundColor: backendOnline ? '#111111' : '#A3A3A3',
                width: '7px',
                height: '7px'
              }}
            />
            <span style={{ fontWeight: 600, fontSize: '11px', letterSpacing: '0.02em' }}>
              EXPRESS:
            </span>
            <span style={{ color: backendOnline ? '#111111' : '#737373', fontSize: '11px' }}>
              {backendOnline ? `5000 (${backendLatency}ms)` : 'OFFLINE'}
            </span>
          </div>

          {/* Raw HTTP Server Health Indicator */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '4px 10px',
            borderRadius: '4px',
            border: '1px solid var(--border-light)',
            backgroundColor: 'var(--surface-subtle)',
            fontSize: '12px'
          }} title={rawServerOnline ? 'Raw HTTP server running on port 5001' : 'Raw server offline. Run "npm run raw" to start.'}>
            <span
              className={`status-dot ${rawServerOnline ? 'online' : 'offline'}`}
              style={{
                backgroundColor: rawServerOnline ? '#111111' : '#D4D4D4',
                width: '7px',
                height: '7px'
              }}
            />
            <span style={{ fontWeight: 600, fontSize: '11px', letterSpacing: '0.02em' }}>
              RAW HTTP:
            </span>
            <span style={{ color: rawServerOnline ? '#111111' : '#737373', fontSize: '11px' }}>
              {rawServerOnline ? '5001 (ACTIVE)' : 'STANDBY'}
            </span>
          </div>

          {/* Quick Toggle Landing / Lab */}
          {currentView === 'landing' ? (
            <button
              onClick={() => setCurrentView('dashboard')}
              className="btn-primary"
              style={{ padding: '6px 14px', fontSize: '12px' }}
            >
              <Terminal size={14} />
              <span>Enter Lab</span>
            </button>
          ) : (
            <button
              onClick={() => setCurrentView('landing')}
              className="btn-secondary"
              style={{ padding: '6px 12px', fontSize: '12px' }}
            >
              <BookOpen size={14} />
              <span>Overview</span>
            </button>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          #mobile-menu-btn {
            display: inline-flex !important;
          }
        }
      `}</style>
    </header>
  );
}
