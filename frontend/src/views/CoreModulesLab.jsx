import React, { useState, useEffect } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import CodeBlock from '../components/CodeBlock';
import {
  FileText,
  FolderTree,
  Cpu,
  Share2,
  RefreshCw,
  Play,
  Save,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function CoreModulesLab({ setCurrentView }) {
  const [activeTab, setActiveTab] = useState('fs');

  // FS state
  const [sampleContent, setSampleContent] = useState('');
  const [sampleLoading, setSampleLoading] = useState(false);
  const [demoInput, setDemoInput] = useState('Updated from the Core Modules Lab at ' + new Date().toLocaleTimeString());
  const [writeStatus, setWriteStatus] = useState(null);
  const [writeLoading, setWriteLoading] = useState(false);

  // Path state
  const [pathInput, setPathInput] = useState('backend/routes/api.js');
  const [pathResult, setPathResult] = useState(null);
  const [pathLoading, setPathLoading] = useState(false);

  // Process state
  const [processData, setProcessData] = useState(null);
  const [processLoading, setProcessLoading] = useState(false);

  // CommonJS state
  const [mathA, setMathA] = useState(15);
  const [mathB, setMathB] = useState(7);
  const [commonJsData, setCommonJsData] = useState(null);
  const [commonJsLoading, setCommonJsLoading] = useState(false);

  // 1. Fetch sample file
  const readSampleFile = async () => {
    try {
      setSampleLoading(true);
      const res = await fetch('http://localhost:5000/api/files/sample');
      const data = await res.json();
      if (data.success) {
        setSampleContent(data.content);
      }
    } catch (err) {
      setSampleContent('Failed to connect to backend.');
    } finally {
      setSampleLoading(false);
    }
  };

  // 2. Write to demo.txt
  const handleWriteDemo = async () => {
    try {
      setWriteLoading(true);
      setWriteStatus(null);
      const res = await fetch('http://localhost:5000/api/files/write', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: demoInput })
      });
      const data = await res.json();
      if (data.success) {
        setWriteStatus({ success: true, message: data.message });
      } else {
        setWriteStatus({ success: false, message: data.error });
      }
    } catch (err) {
      setWriteStatus({ success: false, message: 'Could not connect to backend server.' });
    } finally {
      setWriteLoading(false);
    }
  };

  // 3. Analyze Path
  const handleAnalyzePath = async () => {
    try {
      setPathLoading(true);
      const res = await fetch(`http://localhost:5000/api/path-demo?path=${encodeURIComponent(pathInput)}`);
      const data = await res.json();
      if (data.success) {
        setPathResult(data);
      }
    } catch (err) {
      // Backend error
    } finally {
      setPathLoading(false);
    }
  };

  // 4. Fetch Process info
  const fetchProcessInfo = async () => {
    try {
      setProcessLoading(true);
      const res = await fetch('http://localhost:5000/api/process-info');
      const data = await res.json();
      if (data.success) {
        setProcessData(data);
      }
    } catch (err) {
      // Offline
    } finally {
      setProcessLoading(false);
    }
  };

  // 5. Test CommonJS Module
  const handleTestCommonJS = async () => {
    try {
      setCommonJsLoading(true);
      const res = await fetch(`http://localhost:5000/api/commonjs-demo?a=${mathA}&b=${mathB}`);
      const data = await res.json();
      if (data.success) {
        setCommonJsData(data);
      }
    } catch (err) {
      // Offline
    } finally {
      setCommonJsLoading(false);
    }
  };

  useEffect(() => {
    readSampleFile();
    handleAnalyzePath();
    fetchProcessInfo();
    handleTestCommonJS();
  }, []);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px' }}>
      <Breadcrumbs currentView="core-modules" setCurrentView={setCurrentView} />

      <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '20px', marginBottom: '24px' }}>
        <span className="eyebrow">BUILT-IN SYSTEM UTILITIES • MODULE 02</span>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '8px' }}>
          Core Modules Lab
        </h1>
        <p style={{ fontSize: '15px' }}>
          Interact with Node's native built-in APIs without third-party dependencies: <span className="font-mono">fs</span>, <span className="font-mono">path</span>, <span className="font-mono">process</span>, and <span className="font-mono">CommonJS</span>.
        </p>
      </div>

      {/* Monochrome Tab Controls */}
      <div style={{
        display: 'flex',
        gap: '6px',
        borderBottom: '1px solid var(--border-light)',
        marginBottom: '28px',
        overflowX: 'auto'
      }}>
        {[
          { id: 'fs', label: '1. fs (File System)', icon: FileText },
          { id: 'path', label: '2. path (Pathnames)', icon: FolderTree },
          { id: 'process', label: '3. process (Runtime Global)', icon: Cpu },
          { id: 'commonjs', label: '4. CommonJS (require/exports)', icon: Share2 }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '10px 18px',
                border: 'none',
                background: 'none',
                borderBottom: isActive ? '2px solid #111111' : '2px solid transparent',
                color: isActive ? '#111111' : 'var(--text-secondary)',
                fontWeight: isActive ? 600 : 500,
                fontSize: '13px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                marginBottom: '-1px'
              }}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB A: FS MODULE */}
      {activeTab === 'fs' && (
        <div>
          <div className="card" style={{ marginBottom: '24px' }}>
            <span className="eyebrow">FILE SYSTEM OPERATIONS</span>
            <h2 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>Safe File Operations with fs</h2>
            <p style={{ fontSize: '13px', lineHeight: 1.6, marginBottom: '16px' }}>
              The <span className="font-mono">fs</span> module enables reading, creating, and modifying files on disk. For safety, this educational server restricts file modifications strictly to the dedicated <span className="font-mono">backend/data/</span> directory to prevent directory traversal vulnerabilities.
            </p>

            <div className="grid-2" style={{ gap: '20px' }}>
              {/* Read Section */}
              <div style={{ border: '1px solid var(--border-light)', borderRadius: '6px', padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <div style={{ fontWeight: 600, fontSize: '13px' }}>1. Read sample.txt via fs.readFileSync()</div>
                  <button onClick={readSampleFile} className="btn-secondary" style={{ padding: '4px 8px', fontSize: '11px' }}>
                    <RefreshCw size={12} className={sampleLoading ? 'spin' : ''} />
                    <span>Read Disk</span>
                  </button>
                </div>
                <div style={{
                  backgroundColor: 'var(--surface-subtle)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '4px',
                  padding: '12px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  whiteSpace: 'pre-wrap',
                  minHeight: '100px'
                }}>
                  {sampleLoading ? 'Reading from disk...' : sampleContent || 'No content loaded.'}
                </div>
              </div>

              {/* Write Section */}
              <div style={{ border: '1px solid var(--border-light)', borderRadius: '6px', padding: '16px' }}>
                <div style={{ fontWeight: 600, fontSize: '13px', marginBottom: '10px' }}>
                  2. Update demo.txt via fs.writeFileSync()
                </div>
                <textarea
                  value={demoInput}
                  onChange={(e) => setDemoInput(e.target.value)}
                  style={{
                    width: '100%',
                    height: '100px',
                    padding: '10px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    border: '1px solid var(--border-light)',
                    borderRadius: '4px',
                    marginBottom: '10px',
                    resize: 'none'
                  }}
                  placeholder="Enter text to write to demo.txt..."
                />
                <button
                  onClick={handleWriteDemo}
                  className="btn-primary"
                  disabled={writeLoading}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <Save size={14} />
                  <span>{writeLoading ? 'Writing to Disk...' : 'Write Content to demo.txt'}</span>
                </button>

                {writeStatus && (
                  <div style={{
                    marginTop: '10px',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    backgroundColor: writeStatus.success ? 'var(--surface-subtle)' : '#FFF0F0',
                    border: `1px solid ${writeStatus.success ? 'var(--border-light)' : '#E5C0C0'}`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    {writeStatus.success ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                    <span>{writeStatus.message}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Theoretical Explanations of FS methods */}
          <div className="card">
            <h3 style={{ fontSize: '1.15rem', marginBottom: '12px' }}>fs Methods Comparison</h3>
            <div className="grid-3">
              <div style={{ border: '1px solid var(--border-light)', padding: '14px', borderRadius: '4px' }}>
                <div className="font-mono" style={{ fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                  fs.readFileSync(path, 'utf8')
                </div>
                <div className="badge" style={{ marginBottom: '8px' }}>SYNCHRONOUS (BLOCKING)</div>
                <p style={{ fontSize: '12px', lineHeight: 1.5 }}>
                  Blocks JavaScript thread execution until the complete file is read into memory. Best for startup configuration loading where application cannot proceed without the file.
                </p>
              </div>

              <div style={{ border: '1px solid var(--border-light)', padding: '14px', borderRadius: '4px' }}>
                <div className="font-mono" style={{ fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                  fs.readFile(path, cb)
                </div>
                <div className="badge" style={{ marginBottom: '8px' }}>ASYNCHRONOUS (NON-BLOCKING)</div>
                <p style={{ fontSize: '12px', lineHeight: 1.5 }}>
                  Hands file read off to libuv thread pool. The event loop remains free to process incoming requests, invoking callback once disk operation finishes.
                </p>
              </div>

              <div style={{ border: '1px solid var(--border-light)', padding: '14px', borderRadius: '4px' }}>
                <div className="font-mono" style={{ fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                  fs.writeFile(path, data, cb)
                </div>
                <div className="badge" style={{ marginBottom: '8px' }}>ASYNC WRITE</div>
                <p style={{ fontSize: '12px', lineHeight: 1.5 }}>
                  Creates a new file or replaces existing contents asynchronously. Used for logging, exporting reports, or saving user state.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB B: PATH MODULE */}
      {activeTab === 'path' && (
        <div>
          <div className="card" style={{ marginBottom: '24px' }}>
            <span className="eyebrow">CROSS-PLATFORM PATH RESOLUTION</span>
            <h2 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>Interactive path Module Analyzer</h2>
            <p style={{ fontSize: '13px', lineHeight: 1.6, marginBottom: '16px' }}>
              Operating systems handle file paths differently: Windows uses backslashes (<span className="font-mono">\</span>) while POSIX systems (Linux, macOS) use forward slashes (<span className="font-mono">/</span>). The <span className="font-mono">path</span> module resolves paths cross-platform automatically.
            </p>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              <input
                type="text"
                value={pathInput}
                onChange={(e) => setPathInput(e.target.value)}
                placeholder="Enter sample path (e.g. backend/routes/api.js)..."
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  border: '1px solid var(--border-light)',
                  borderRadius: '4px'
                }}
              />
              <button onClick={handleAnalyzePath} className="btn-primary">
                <Play size={14} />
                <span>Analyze Path</span>
              </button>
            </div>

            {pathResult && pathResult.operations && (
              <div style={{ border: '1px solid var(--border-light)', borderRadius: '6px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ backgroundColor: 'var(--surface-subtle)', borderBottom: '1px solid var(--border-light)', textAlign: 'left' }}>
                      <th style={{ padding: '10px 14px', fontWeight: 700 }}>FUNCTION</th>
                      <th style={{ padding: '10px 14px', fontWeight: 700 }}>RESULT</th>
                      <th style={{ padding: '10px 14px', fontWeight: 700 }}>PURPOSE</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                      <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>path.basename(p)</td>
                      <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', color: '#111' }}>
                        {pathResult.operations['path.basename(path)']}
                      </td>
                      <td style={{ padding: '10px 14px', color: 'var(--text-secondary)' }}>
                        {pathResult.explanations.basename}
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                      <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>path.extname(p)</td>
                      <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', color: '#111' }}>
                        {pathResult.operations['path.extname(path)']}
                      </td>
                      <td style={{ padding: '10px 14px', color: 'var(--text-secondary)' }}>
                        {pathResult.explanations.extname}
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                      <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>path.dirname(p)</td>
                      <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', color: '#111' }}>
                        {pathResult.operations['path.dirname(path)']}
                      </td>
                      <td style={{ padding: '10px 14px', color: 'var(--text-secondary)' }}>
                        {pathResult.explanations.dirname}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>path.join(...)</td>
                      <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', color: '#111' }}>
                        {pathResult.operations['path.join("workspace", "projects", "server", basename)']}
                      </td>
                      <td style={{ padding: '10px 14px', color: 'var(--text-secondary)' }}>
                        {pathResult.explanations.join}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB C: PROCESS MODULE */}
      {activeTab === 'process' && (
        <div>
          <div className="card" style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div>
                <span className="eyebrow">NODE RUNTIME INSPECTION</span>
                <h2 style={{ fontSize: '1.3rem' }}>process Global Object</h2>
              </div>
              <button onClick={fetchProcessInfo} className="btn-secondary" style={{ padding: '4px 8px', fontSize: '11px' }}>
                <RefreshCw size={12} className={processLoading ? 'spin' : ''} />
                <span>Refresh Process</span>
              </button>
            </div>
            <p style={{ fontSize: '13px', lineHeight: 1.6, marginBottom: '20px' }}>
              The global <span className="font-mono">process</span> provides telemetry about the executing Node.js instance. Sensitive environment variables like passwords and secret keys are automatically scrubbed for security.
            </p>

            {processData && (
              <div className="grid-2" style={{ gap: '16px', marginBottom: '20px' }}>
                <div style={{ border: '1px solid var(--border-light)', padding: '16px', borderRadius: '4px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px' }}>PROCESS TELEMETRY</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', fontFamily: 'var(--font-mono)' }}>
                    <div><strong>process.version:</strong> {processData.nodeVersion}</div>
                    <div><strong>process.platform:</strong> {processData.platform} ({processData.arch})</div>
                    <div><strong>process.pid:</strong> {processData.pid}</div>
                    <div><strong>process.uptime():</strong> {processData.uptimeSeconds}s</div>
                    <div><strong>process.cwd():</strong> {processData.cwd}</div>
                  </div>
                </div>

                <div style={{ border: '1px solid var(--border-light)', padding: '16px', borderRadius: '4px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px' }}>COMMAND-LINE ARGS (process.argv)</div>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                    Array containing command line arguments passed when launching the process:
                  </p>
                  <div style={{ backgroundColor: 'var(--surface-subtle)', padding: '8px', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                    {JSON.stringify(processData.argv, null, 2)}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB D: COMMONJS MODULES */}
      {activeTab === 'commonjs' && (
        <div>
          <div className="card" style={{ marginBottom: '24px' }}>
            <span className="eyebrow">MODULAR JAVASCRIPT</span>
            <h2 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>CommonJS: Exporting &amp; Requiring</h2>
            <p style={{ fontSize: '13px', lineHeight: 1.6, marginBottom: '20px' }}>
              CommonJS enables modular architecture. One file exposes functions via <span className="font-mono">module.exports</span>, and another consumes them with <span className="font-mono">require()</span>.
            </p>

            {/* Visual File Relationship Diagram */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '16px',
              marginBottom: '24px',
              backgroundColor: 'var(--surface-subtle)',
              padding: '20px',
              borderRadius: '6px',
              border: '1px solid var(--border-light)'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <span className="badge">FILE 1: EXPORTER</span>
                  <span className="font-mono" style={{ fontSize: '12px', fontWeight: 600 }}>backend/modules/mathUtils.js</span>
                </div>
                <div style={{
                  backgroundColor: '#0A0A0A',
                  color: '#EEE',
                  padding: '12px',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  lineHeight: 1.6
                }}>
                  <div>function add(a, b) &#123; return a + b; &#125;</div>
                  <div>function multiply(a, b) &#123; return a * b; &#125;</div>
                  <div style={{ marginTop: '8px', color: '#888' }}>// Export object:</div>
                  <div style={{ color: '#FFF' }}>module.exports = &#123; add, multiply &#125;;</div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <span className="badge">FILE 2: IMPORTER</span>
                  <span className="font-mono" style={{ fontSize: '12px', fontWeight: 600 }}>backend/routes/api.js</span>
                </div>
                <div style={{
                  backgroundColor: '#0A0A0A',
                  color: '#EEE',
                  padding: '12px',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  lineHeight: 1.6
                }}>
                  <div style={{ color: '#888' }}>// Require from relative path:</div>
                  <div style={{ color: '#FFF' }}>const mathUtils = require('../modules/mathUtils');</div>
                  <div style={{ marginTop: '8px' }}>const sum = mathUtils.add(a, b);</div>
                  <div>const prod = mathUtils.multiply(a, b);</div>
                </div>
              </div>
            </div>

            {/* Interactive Calculator calling the live CommonJS module */}
            <div style={{ border: '1px solid var(--border-light)', borderRadius: '6px', padding: '16px' }}>
              <div style={{ fontWeight: 600, fontSize: '13px', marginBottom: '12px' }}>
                Test Live mathUtils.js Execution on Backend Server
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Value A</label>
                  <input
                    type="number"
                    value={mathA}
                    onChange={(e) => setMathA(Number(e.target.value))}
                    style={{ width: '90px', padding: '6px 10px', border: '1px solid var(--border-light)', borderRadius: '4px' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Value B</label>
                  <input
                    type="number"
                    value={mathB}
                    onChange={(e) => setMathB(Number(e.target.value))}
                    style={{ width: '90px', padding: '6px 10px', border: '1px solid var(--border-light)', borderRadius: '4px' }}
                  />
                </div>
                <div style={{ alignSelf: 'flex-end' }}>
                  <button onClick={handleTestCommonJS} className="btn-primary">
                    <Play size={13} />
                    <span>Run mathUtils Methods</span>
                  </button>
                </div>
              </div>

              {commonJsData && commonJsData.executionResults && (
                <div style={{ backgroundColor: 'var(--surface-subtle)', padding: '12px', borderRadius: '4px', fontSize: '13px', fontFamily: 'var(--font-mono)' }}>
                  <div><strong>Addition:</strong> {commonJsData.executionResults.addition.expression} = <strong>{commonJsData.executionResults.addition.result}</strong></div>
                  <div><strong>Multiplication:</strong> {commonJsData.executionResults.multiplication.expression} = <strong>{commonJsData.executionResults.multiplication.result}</strong></div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
