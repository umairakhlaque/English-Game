import React, { useState, useMemo } from 'react';
import { useGameStore } from '../../store/gameStore';
import { YearBand } from '../../types';

const YEAR_COLORS: Record<number, string> = {
  1: 'var(--accent)',
  2: '#60A5FA',
  3: 'var(--primary)',
  4: 'var(--secondary)',
  5: 'var(--warning)',
};

const YEAR_LABELS: Record<number, string> = {
  0: 'All',
  1: 'Year 1',
  2: 'Year 2',
  3: 'Year 3',
  4: 'Year 4',
  5: 'Year 5',
};

export const MagicDictionaryScreen: React.FC = () => {
  const { dictionary, setScreen, wordCoins } = useGameStore();
  const [search, setSearch] = useState('');
  const [filterYear, setFilterYear] = useState<0 | YearBand>(0);

  const filtered = useMemo(() => {
    return dictionary.filter((entry) => {
      const matchSearch = entry.word.toLowerCase().includes(search.toLowerCase()) ||
        entry.definition.toLowerCase().includes(search.toLowerCase());
      const matchYear = filterYear === 0 || entry.yearBand === filterYear;
      return matchSearch && matchYear;
    });
  }, [dictionary, search, filterYear]);

  return (
    <div className="screen screen-gradient">
      {/* Top bar */}
      <div className="topbar">
        <button className="btn btn-ghost btn-sm" onClick={() => setScreen('map')} aria-label="Back to map">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Back
        </button>
        <span className="topbar-title">Magic Dictionary</span>
        <div className="coin-counter" aria-label={`${wordCoins} word coins`}>
          <div className="coin" aria-hidden="true">W</div>
          {wordCoins}
        </div>
      </div>

      <div className="scroll-content">
        <div className="container">
          {/* Header */}
          <div style={{ marginBottom: 'var(--sp-lg)', textAlign: 'center' }}>
            <h2 style={{ marginBottom: 4 }}>My Word Collection</h2>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
              <span className="badge badge-accent">{dictionary.length} words learned</span>
            </div>
          </div>

          {dictionary.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: 'var(--sp-2xl)' }}>
              <div style={{ fontSize: '3rem', marginBottom: 'var(--sp-md)' }} aria-hidden="true">📖</div>
              <h3 style={{ marginBottom: 8 }}>No words yet!</h3>
              <p style={{ marginBottom: 'var(--sp-lg)' }}>Complete challenges to add words to your collection.</p>
              <button className="btn btn-primary" onClick={() => setScreen('map')}>Start Learning</button>
            </div>
          ) : (
            <>
              {/* Search bar */}
              <div style={{ position: 'relative', marginBottom: 'var(--sp-md)' }}>
                <div style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" style={{ color: 'var(--text-secondary)' }}>
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  className="input-field"
                  style={{ paddingLeft: 44 }}
                  type="search"
                  placeholder="Search words or definitions..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label="Search dictionary"
                />
              </div>

              {/* Year filter */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 'var(--sp-lg)' }}>
                {([0, 1, 2, 3, 4, 5] as (0 | YearBand)[]).map((y) => (
                  <button
                    key={y}
                    className={`btn btn-sm${filterYear === y ? ' btn-primary' : ' btn-ghost'}`}
                    style={{
                      minHeight: 36,
                      ...(y !== 0 && filterYear !== y ? { borderColor: YEAR_COLORS[y], color: YEAR_COLORS[y] } : {}),
                    }}
                    onClick={() => setFilterYear(y)}
                    aria-pressed={filterYear === y}
                  >
                    {YEAR_LABELS[y]}
                  </button>
                ))}
              </div>

              {/* Results count */}
              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: 'var(--sp-md)' }}>
                {filtered.length} {filtered.length === 1 ? 'word' : 'words'}
                {search ? ` matching "${search}"` : ''}
              </p>

              {/* Word grid */}
              {filtered.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: 'var(--sp-xl)' }}>
                  <p>No words match your search.</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--sp-md)' }}>
                  {filtered.map((entry) => (
                    <div
                      key={entry.word}
                      className={`dict-card y${entry.yearBand}`}
                      role="article"
                      aria-label={entry.word}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 6 }}>
                        <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>{entry.word}</h4>
                        <span
                          className="badge"
                          style={{
                            fontSize: '0.85rem',
                            background: `${YEAR_COLORS[entry.yearBand]}22`,
                            color: YEAR_COLORS[entry.yearBand],
                            border: `1px solid ${YEAR_COLORS[entry.yearBand]}44`,
                            flexShrink: 0,
                          }}
                        >
                          Y{entry.yearBand}
                        </span>
                      </div>
                      <p style={{ fontSize: '1rem', marginBottom: 8 }}>{entry.definition}</p>
                      {entry.exampleSentence && (
                        <p style={{
                          fontSize: '0.95rem', color: 'var(--text-secondary)',
                          fontStyle: 'italic', borderLeft: `3px solid ${YEAR_COLORS[entry.yearBand]}`,
                          paddingLeft: 10, margin: 0,
                        }}>
                          "{entry.exampleSentence}"
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
