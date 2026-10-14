import React, { useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import { vivaQuestions } from '../data/vivaData';
import { HelpCircle, Search, Eye, EyeOff, CheckCircle2, BookOpen } from 'lucide-react';

export default function VivaQuestions({ setCurrentView }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [revealedIds, setRevealedIds] = useState({});
  const [masteredIds, setMasteredIds] = useState({});

  const categories = ['All', 'Node.js Basics', 'Modules & CommonJS', 'Package Management', 'Core Modules', 'HTTP & Networking', 'Express.js', 'Middleware', 'HTTP Concepts', 'Architecture'];

  const toggleReveal = (id) => {
    setRevealedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleMastered = (id) => {
    setMasteredIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const revealAll = () => {
    const all = {};
    vivaQuestions.forEach((q) => { all[q.id] = true; });
    setRevealedIds(all);
  };

  const hideAll = () => {
    setRevealedIds({});
  };

  const filtered = vivaQuestions.filter((q) => {
    const matchesCategory = selectedCategory === 'All' || q.category === selectedCategory;
    const matchesSearch =
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const masteredCount = Object.keys(masteredIds).filter((k) => masteredIds[k]).length;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px' }}>
      <Breadcrumbs currentView="viva-questions" setCurrentView={setCurrentView} />

      <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '20px', marginBottom: '24px' }}>
        <span className="eyebrow">EXAMINATION PREPARATION • MODULE 10</span>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '8px' }}>
              Viva Questions &amp; Answers
            </h1>
            <p style={{ fontSize: '15px' }}>
              26 high-yield questions and concise technical answers covering every syllabus topic for Hack-O-Week college evaluation.
            </p>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'var(--surface-subtle)',
            padding: '8px 14px',
            borderRadius: '6px',
            border: '1px solid var(--border-light)',
            fontSize: '13px'
          }}>
            <CheckCircle2 size={16} />
            <span>Mastered: <strong>{masteredCount}</strong> / {vivaQuestions.length}</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="card" style={{ marginBottom: '24px', padding: '16px' }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '14px' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
            <Search size={15} style={{ position: 'absolute', left: '12px', top: '11px', color: '#888' }} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search viva questions or keywords..."
              style={{
                width: '100%',
                padding: '8px 12px 8px 34px',
                fontSize: '13px',
                border: '1px solid var(--border-light)',
                borderRadius: '4px'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={revealAll} className="btn-secondary" style={{ fontSize: '12px', padding: '6px 12px' }}>
              <Eye size={13} />
              <span>Reveal All</span>
            </button>
            <button onClick={hideAll} className="btn-secondary" style={{ fontSize: '12px', padding: '6px 12px' }}>
              <EyeOff size={13} />
              <span>Hide All</span>
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={selectedCategory === c ? 'btn-primary' : 'btn-secondary'}
              style={{ fontSize: '11px', padding: '4px 10px' }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Questions List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filtered.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
            No questions match your search query.
          </div>
        ) : (
          filtered.map((item) => {
            const isRevealed = !!revealedIds[item.id];
            const isMastered = !!masteredIds[item.id];

            return (
              <div
                key={item.id}
                className="card"
                style={{
                  borderLeft: isMastered ? '3px solid #111111' : '1px solid var(--border-light)',
                  padding: '18px 20px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span className="badge" style={{ fontSize: '10px' }}>Q{item.id}</span>
                      <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>{item.category}</span>
                    </div>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', fontWeight: 700 }}>
                      {item.question}
                    </h3>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button
                      onClick={() => toggleMastered(item.id)}
                      className="btn-secondary"
                      style={{
                        padding: '4px 8px',
                        fontSize: '11px',
                        backgroundColor: isMastered ? '#111' : 'transparent',
                        color: isMastered ? '#FFF' : 'inherit',
                        border: '1px solid #111'
                      }}
                      title="Mark as mastered"
                    >
                      <CheckCircle2 size={12} />
                      <span>{isMastered ? 'Mastered' : 'Mark'}</span>
                    </button>
                    <button
                      onClick={() => toggleReveal(item.id)}
                      className="btn-primary"
                      style={{ padding: '4px 10px', fontSize: '11px' }}
                    >
                      {isRevealed ? <EyeOff size={12} /> : <Eye size={12} />}
                      <span>{isRevealed ? 'Hide Answer' : 'Reveal Answer'}</span>
                    </button>
                  </div>
                </div>

                {isRevealed && (
                  <div style={{
                    marginTop: '14px',
                    padding: '14px 16px',
                    backgroundColor: 'var(--surface-subtle)',
                    border: '1px solid var(--border-light)',
                    borderRadius: '4px',
                    fontSize: '13px',
                    lineHeight: 1.65,
                    color: '#222222',
                    borderLeft: '2px solid #111111'
                  }}>
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
