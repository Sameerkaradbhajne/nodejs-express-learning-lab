import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumbs({ currentView, setCurrentView }) {
  const titles = {
    landing: 'Overview',
    dashboard: 'Dashboard',
    fundamentals: 'Node.js Fundamentals',
    'core-modules': 'Core Modules Lab (fs, path, process)',
    'npm-setup': 'npm Project Setup & package.json',
    'raw-http': 'Raw HTTP Server (Port 5001)',
    'express-routing': 'Express.js Routing & REST APIs',
    'middleware-lab': 'Middleware Pipeline Lab',
    'api-playground': 'Interactive API Playground',
    'request-visualizer': 'Request-Response Visualizer',
    'project-structure': 'Project Structure Explorer',
    'viva-questions': 'Viva Questions & Answers'
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '12px',
      color: 'var(--text-secondary)',
      marginBottom: '16px'
    }}>
      <span
        onClick={() => setCurrentView('dashboard')}
        style={{ cursor: 'pointer', hover: { color: '#111' } }}
      >
        Lab
      </span>
      <ChevronRight size={13} />
      <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
        {titles[currentView] || currentView}
      </span>
    </div>
  );
}
