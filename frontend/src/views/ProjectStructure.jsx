import React, { useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import CodeBlock from '../components/CodeBlock';
import { projectTree } from '../data/projectTreeData';
import { Folder, FileText, ChevronRight, ChevronDown, FolderOpen, Info } from 'lucide-react';

export default function ProjectStructure({ setCurrentView }) {
  // Flatten or find the first default file to display
  const defaultFile = projectTree[0].children[0];
  const [selectedFile, setSelectedFile] = useState(defaultFile);
  const [expandedFolders, setExpandedFolders] = useState({
    backend: true,
    routes: true,
    middleware: true,
    modules: true,
    data: true,
    frontend: true
  });

  const toggleFolder = (id) => {
    setExpandedFolders((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderTree = (items) => {
    return items.map((item) => {
      if (item.type === 'folder') {
        const isExpanded = !!expandedFolders[item.id];
        return (
          <div key={item.id} style={{ marginLeft: '12px' }}>
            <div
              onClick={() => toggleFolder(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 8px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 600,
                color: '#111111',
                userSelect: 'none'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--surface-subtle)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              {isExpanded ? <ChevronDown size={14} color="#666" /> : <ChevronRight size={14} color="#666" />}
              {isExpanded ? <FolderOpen size={16} /> : <Folder size={16} />}
              <span className="font-mono">{item.name}</span>
            </div>

            {isExpanded && item.children && (
              <div style={{ borderLeft: '1px solid var(--border-light)', marginLeft: '14px' }}>
                {renderTree(item.children)}
              </div>
            )}
          </div>
        );
      }

      // File item
      const isSelected = selectedFile && selectedFile.id === item.id;
      return (
        <div
          key={item.id}
          onClick={() => setSelectedFile(item)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 8px',
            marginLeft: '12px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '13px',
            backgroundColor: isSelected ? '#111111' : 'transparent',
            color: isSelected ? '#FFFFFF' : 'var(--text-secondary)',
            fontWeight: isSelected ? 600 : 400,
            userSelect: 'none'
          }}
          onMouseEnter={(e) => {
            if (!isSelected) e.currentTarget.style.backgroundColor = 'var(--surface-subtle)';
          }}
          onMouseLeave={(e) => {
            if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <FileText size={15} />
          <span className="font-mono">{item.name}</span>
        </div>
      );
    });
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
      <Breadcrumbs currentView="project-structure" setCurrentView={setCurrentView} />

      <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '20px', marginBottom: '24px' }}>
        <span className="eyebrow">SOURCE REPOSITORY • MODULE 09</span>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '8px' }}>
          Project Structure Explorer
        </h1>
        <p style={{ fontSize: '15px' }}>
          Interactive file tree illustrating standard modular layout for Node.js &amp; Express.js applications. Click any file to inspect its code.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '24px', alignItems: 'start' }}>
        {/* Left: Tree Viewer */}
        <div className="card" style={{ padding: '16px 12px', minHeight: '500px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', padding: '0 8px 10px', borderBottom: '1px solid var(--border-light)', marginBottom: '8px' }}>
            FILE EXPLORER
          </div>
          <div>{renderTree(projectTree)}</div>
        </div>

        {/* Right: Code & Documentation Viewer */}
        <div>
          {selectedFile ? (
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div>
                  <span className="eyebrow">FILE INSPECTOR</span>
                  <h2 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-mono)' }}>{selectedFile.name}</h2>
                </div>
                <span className="badge">{selectedFile.language.toUpperCase()}</span>
              </div>

              {/* Purpose and Description */}
              <div style={{
                backgroundColor: 'var(--surface-subtle)',
                border: '1px solid var(--border-light)',
                borderRadius: '6px',
                padding: '12px 16px',
                marginBottom: '16px',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px'
              }}>
                <Info size={16} style={{ marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <strong>Role &amp; Architecture:</strong> {selectedFile.description}
                </div>
              </div>

              {/* Synchronized Code View */}
              <CodeBlock
                code={selectedFile.code}
                filename={selectedFile.name}
                language={selectedFile.language}
              />
            </div>
          ) : (
            <div className="card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
              Select a file from the explorer on the left to inspect its source code.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
