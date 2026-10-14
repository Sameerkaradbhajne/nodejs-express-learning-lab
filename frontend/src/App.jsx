import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LandingPage from './views/LandingPage';
import Dashboard from './views/Dashboard';
import NodeFundamentals from './views/NodeFundamentals';
import CoreModulesLab from './views/CoreModulesLab';
import NpmSetup from './views/NpmSetup';
import RawHttpServer from './views/RawHttpServer';
import ExpressRouting from './views/ExpressRouting';
import MiddlewareLab from './views/MiddlewareLab';
import ApiPlayground from './views/ApiPlayground';
import RequestVisualizer from './views/RequestVisualizer';
import ProjectStructure from './views/ProjectStructure';
import VivaQuestions from './views/VivaQuestions';

export default function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [backendStatus, setBackendStatus] = useState(null);
  const [backendOnline, setBackendOnline] = useState(false);
  const [backendLatency, setBackendLatency] = useState(null);
  const [rawServerOnline, setRawServerOnline] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 1. Check Express Server on port 5000
  const checkExpressStatus = async () => {
    const start = performance.now();
    try {
      const res = await fetch('http://localhost:5000/api/status');
      const duration = (performance.now() - start).toFixed(1);
      if (res.ok) {
        const data = await res.json();
        setBackendStatus(data);
        setBackendOnline(true);
        setBackendLatency(duration);
      } else {
        setBackendOnline(false);
      }
    } catch (err) {
      setBackendOnline(false);
      setBackendStatus(null);
    }
  };

  // 2. Check Raw Server on port 5001
  const checkRawServer = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/status');
      if (res.ok) {
        setRawServerOnline(true);
      } else {
        setRawServerOnline(false);
      }
    } catch (err) {
      setRawServerOnline(false);
    }
  };

  useEffect(() => {
    checkExpressStatus();
    checkRawServer();
    const interval = setInterval(() => {
      checkExpressStatus();
      checkRawServer();
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const renderContent = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage setCurrentView={setCurrentView} backendOnline={backendOnline} />;
      case 'dashboard':
        return (
          <Dashboard
            setCurrentView={setCurrentView}
            backendStatus={backendStatus}
            backendOnline={backendOnline}
            backendLatency={backendLatency}
            refreshBackendStatus={checkExpressStatus}
          />
        );
      case 'fundamentals':
        return <NodeFundamentals setCurrentView={setCurrentView} />;
      case 'core-modules':
        return <CoreModulesLab setCurrentView={setCurrentView} />;
      case 'npm-setup':
        return <NpmSetup setCurrentView={setCurrentView} />;
      case 'raw-http':
        return (
          <RawHttpServer
            setCurrentView={setCurrentView}
            rawServerOnline={rawServerOnline}
            checkRawServer={checkRawServer}
          />
        );
      case 'express-routing':
        return <ExpressRouting setCurrentView={setCurrentView} />;
      case 'middleware-lab':
        return <MiddlewareLab setCurrentView={setCurrentView} />;
      case 'api-playground':
        return <ApiPlayground setCurrentView={setCurrentView} backendOnline={backendOnline} />;
      case 'request-visualizer':
        return <RequestVisualizer setCurrentView={setCurrentView} />;
      case 'project-structure':
        return <ProjectStructure setCurrentView={setCurrentView} />;
      case 'viva-questions':
        return <VivaQuestions setCurrentView={setCurrentView} />;
      default:
        return <Dashboard setCurrentView={setCurrentView} backendOnline={backendOnline} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#FFFFFF' }}>
      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        backendOnline={backendOnline}
        backendLatency={backendLatency}
        rawServerOnline={rawServerOnline}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Main Container */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Render Sidebar when inside Lab modules */}
        {currentView !== 'landing' && (
          <Sidebar
            currentView={currentView}
            setCurrentView={setCurrentView}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
          />
        )}

        <main style={{ flex: 1, minWidth: 0, overflowY: 'auto' }}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
