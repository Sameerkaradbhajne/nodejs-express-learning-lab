import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function CodeBlock({
  code = '',
  language = 'javascript',
  filename = '',
  showLineNumbers = true
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split('\n');

  return (
    <div className="code-block-container" style={{
      backgroundColor: '#0A0A0A',
      border: '1px solid #262626',
      borderRadius: '6px',
      overflow: 'hidden',
      fontFamily: 'var(--font-mono)',
      fontSize: '13px',
      color: '#F5F5F5',
      margin: '12px 0'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 14px',
        backgroundColor: '#141414',
        borderBottom: '1px solid #262626',
        fontSize: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '5px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#333' }}></span>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#333' }}></span>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#333' }}></span>
          </div>
          <span style={{ color: '#888888', fontWeight: 500 }}>
            {filename || language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="btn-dark"
          style={{
            padding: '4px 8px',
            fontSize: '11px',
            cursor: 'pointer'
          }}
          title="Copy code"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      <div style={{
        padding: '14px',
        overflowX: 'auto',
        lineHeight: '1.6',
        maxHeight: '450px'
      }}>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} style={{ verticalAlign: 'top' }}>
                {showLineNumbers && (
                  <td style={{
                    width: '36px',
                    userSelect: 'none',
                    color: '#525252',
                    textAlign: 'right',
                    paddingRight: '16px',
                    fontSize: '12px'
                  }}>
                    {idx + 1}
                  </td>
                )}
                <td style={{ whiteSpace: 'pre', color: '#ECECEC' }}>
                  {line || ' '}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
