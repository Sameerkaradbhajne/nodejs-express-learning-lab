import React from 'react';
import {
  LayoutDashboard,
  Cpu,
  Boxes,
  Package,
  Globe,
  GitBranch,
  Layers,
  Terminal,
  Activity,
  FolderTree,
  HelpCircle,
  ChevronRight
} from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: 'Overview' },
  { id: 'fundamentals', label: 'Node.js Fundamentals', icon: Cpu, badge: 'Core' },
  { id: 'core-modules', label: 'Core Modules Lab', icon: Boxes, badge: 'fs/path/proc' },
  { id: 'npm-setup', label: 'npm Project Setup', icon: Package, badge: 'CLI' },
  { id: 'raw-http', label: 'Raw HTTP Server', icon: Globe, badge: 'Port 5001' },
  { id: 'express-routing', label: 'Express Routing', icon: GitBranch, badge: 'REST' },
  { id: 'middleware-lab', label: 'Middleware Lab', icon: Layers, badge: 'Pipeline' },
  { id: 'api-playground', label: 'API Playground', icon: Terminal, badge: 'Live Test' },
  { id: 'request-visualizer', label: 'Request Visualizer', icon: Activity, badge: 'Flow' },
  { id: 'project-structure', label: 'Project Structure', icon: FolderTree, badge: 'Source' },
  { id: 'viva-questions', label: 'Viva Questions', icon: HelpCircle, badge: '26 Q&A' }
];

export default function Sidebar({ currentView, setCurrentView, mobileMenuOpen, setMobileMenuOpen }) {
  const handleSelect = (id) => {
    setCurrentView(id);
    if (setMobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            zIndex: 40,
            backdropFilter: 'blur(2px)'
          }}
        />
      )}

      <aside
        id="app-sidebar"
        style={{
          width: '260px',
          minWidth: '260px',
          borderRight: '1px solid var(--border-light)',
          backgroundColor: '#FFFFFF',
          padding: '20px 12px',
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100vh - 60px)',
          position: 'sticky',
          top: '60px',
          overflowY: 'auto'
        }}
      >
        <div style={{ padding: '0 8px 12px', borderBottom: '1px solid var(--border-light)', marginBottom: '12px' }}>
          <span className="eyebrow">CURRICULUM MODULES</span>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
            Hack-O-Week Evaluation Suite
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '3px', flex: 1 }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '9px 12px',
                  borderRadius: '5px',
                  border: isActive ? '1px solid #111111' : '1px solid transparent',
                  backgroundColor: isActive ? '#111111' : 'transparent',
                  color: isActive ? '#FFFFFF' : 'var(--text-primary)',
                  fontSize: '13px',
                  fontWeight: isActive ? 600 : 400,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all var(--transition-fast)'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'var(--surface-subtle)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icon size={16} strokeWidth={isActive ? 2.2 : 1.7} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    style={{
                      fontSize: '10px',
                      padding: '2px 5px',
                      borderRadius: '3px',
                      fontFamily: 'var(--font-mono)',
                      backgroundColor: isActive ? '#262626' : 'var(--surface-subtle)',
                      color: isActive ? '#D4D4D4' : 'var(--text-secondary)',
                      border: isActive ? '1px solid #333' : '1px solid var(--border-light)'
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer info in sidebar */}
        <div style={{
          padding: '16px 8px 0',
          borderTop: '1px solid var(--border-light)',
          marginTop: 'auto',
          fontSize: '11px',
          color: 'var(--text-secondary)'
        }}>
          <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2px' }}>
            SIT Nagpur • CSE 2025–29
          </div>
          <div>CommonJS & Express Engine</div>
        </div>
      </aside>

      <style>{`
        @media (max-width: 860px) {
          #app-sidebar {
            position: fixed !important;
            top: 60px !important;
            bottom: 0 !important;
            left: 0 !important;
            z-index: 45 !important;
            transform: ${mobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)'};
            transition: transform 200ms ease;
            box-shadow: ${mobileMenuOpen ? '4px 0 24px rgba(0,0,0,0.1)' : 'none'};
          }
        }
      `}</style>
    </>
  );
}
