import React, { useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import CodeBlock from '../components/CodeBlock';
import { Copy, Check, Terminal, Package, ArrowRight, Layers } from 'lucide-react';

export default function NpmSetup({ setCurrentView }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const steps = [
    {
      step: '01',
      command: 'mkdir node-learning-lab',
      title: 'Create Project Directory',
      explanation: 'Creates a new dedicated folder on your filesystem named "node-learning-lab" where your backend application code and packages will reside.'
    },
    {
      step: '02',
      command: 'cd node-learning-lab',
      title: 'Navigate into Directory',
      explanation: 'Changes your active terminal shell working directory into the newly created project folder so subsequent npm commands apply locally.'
    },
    {
      step: '03',
      command: 'npm init -y',
      title: 'Initialize package.json Manifest',
      explanation: 'Generates a standard package.json file with default values (-y flags automatic yes to prompts), marking the folder as an official Node.js project.'
    },
    {
      step: '04',
      command: 'npm install express',
      title: 'Install Production Dependency',
      explanation: 'Downloads the Express framework from the npm registry into node_modules and adds "express" to the "dependencies" section of package.json.'
    },
    {
      step: '05',
      command: 'npm install --save-dev nodemon',
      title: 'Install Development Dependency',
      explanation: 'Installs Nodemon as a developer tool (--save-dev), which watches your source code for file changes and restarts the server automatically during development.'
    }
  ];

  const handleCopy = (cmd, index) => {
    navigator.clipboard.writeText(cmd);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const samplePackageJson = `{
  "name": "node-learning-lab",
  "version": "1.0.0",
  "description": "Educational Node.js & Express.js Backend",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.21.2"
  },
  "devDependencies": {
    "nodemon": "^3.1.9"
  }
}`;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px' }}>
      <Breadcrumbs currentView="npm-setup" setCurrentView={setCurrentView} />

      <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '20px', marginBottom: '28px' }}>
        <span className="eyebrow">PACKAGE MANAGEMENT • MODULE 03</span>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '8px' }}>
          npm Project Setup
        </h1>
        <p style={{ fontSize: '15px' }}>
          Step-by-step guide to scaffolding a production-ready Node.js project with npm and configuring package.json.
        </p>
      </div>

      {/* 5 Scaffold Steps */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
        {steps.map((s, idx) => (
          <div key={idx} className="card" style={{ padding: '18px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="badge">STEP {s.step}</span>
                <span style={{ fontWeight: 700, fontSize: '14px' }}>{s.title}</span>
              </div>
              <button
                onClick={() => handleCopy(s.command, idx)}
                className="btn-secondary"
                style={{ padding: '4px 10px', fontSize: '11px' }}
              >
                {copiedIndex === idx ? <Check size={12} /> : <Copy size={12} />}
                <span>{copiedIndex === idx ? 'Copied' : 'Copy Command'}</span>
              </button>
            </div>

            <div style={{
              backgroundColor: '#0A0A0A',
              color: '#F5F5F5',
              padding: '10px 14px',
              borderRadius: '4px',
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '10px'
            }}>
              <span style={{ color: '#666' }}>$</span>
              <span>{s.command}</span>
            </div>

            <p style={{ fontSize: '13px', lineHeight: 1.5, margin: 0, color: 'var(--text-secondary)' }}>
              {s.explanation}
            </p>
          </div>
        ))}
      </div>

      {/* Anatomy of package.json */}
      <div className="card" style={{ marginBottom: '32px' }}>
        <span className="eyebrow">PROJECT MANIFEST DEEP DIVE</span>
        <h2 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>Anatomy of package.json</h2>
        <p style={{ fontSize: '13px', lineHeight: 1.6, marginBottom: '16px' }}>
          The <span className="font-mono">package.json</span> file contains metadata and controls dependency installation:
        </p>

        <CodeBlock code={samplePackageJson} filename="package.json" language="json" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
          <div style={{ border: '1px solid var(--border-light)', borderRadius: '4px', padding: '12px' }}>
            <div className="font-mono" style={{ fontWeight: 700, fontSize: '13px', marginBottom: '2px' }}>"name" &amp; "version"</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Unique identifier and semantic versioning (SemVer: Major.Minor.Patch) of your software package.
            </div>
          </div>

          <div style={{ border: '1px solid var(--border-light)', borderRadius: '4px', padding: '12px' }}>
            <div className="font-mono" style={{ fontWeight: 700, fontSize: '13px', marginBottom: '2px' }}>"scripts"</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Command line aliases executed via <span className="font-mono">npm run &lt;script&gt;</span> (e.g. <span className="font-mono">npm start</span> or <span className="font-mono">npm run dev</span>).
            </div>
          </div>

          <div style={{ border: '1px solid var(--border-light)', borderRadius: '4px', padding: '12px' }}>
            <div className="font-mono" style={{ fontWeight: 700, fontSize: '13px', marginBottom: '2px' }}>"dependencies"</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Packages strictly required for the application to function in production (e.g., Express, database drivers).
            </div>
          </div>

          <div style={{ border: '1px solid var(--border-light)', borderRadius: '4px', padding: '12px' }}>
            <div className="font-mono" style={{ fontWeight: 700, fontSize: '13px', marginBottom: '2px' }}>"devDependencies"</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Tools utilized solely during development (e.g. nodemon, testing suites, linters) that are omitted in production builds.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
