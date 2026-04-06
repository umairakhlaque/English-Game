import React, { useState, useMemo } from 'react';
import { useGameStore } from '../../store/gameStore';

export const MagicDictionaryScreen: React.FC = () => {
  const { dictionary, setScreen, wordCoins } = useGameStore();
  const [search, setSearch] = useState('');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const filtered = useMemo(() => {
    return dictionary
      .filter((entry) => {
        const matchSearch =
          !search ||
          entry.word.toLowerCase().includes(search.toLowerCase()) ||
          entry.definition.toLowerCase().includes(search.toLowerCase());
        const matchYear = selectedYear === null || entry.yearBand === selectedYear;
        return matchSearch && matchYear;
      })
      .sort((a, b) => a.word.localeCompare(b.word));
  }, [dictionary, search, selectedYear]);

  return (
    <div className="dictionary-screen">
      <div className="dictionary-header">
        <button className="back-btn" onClick={() => setScreen('map')}>
          ← Back
        </button>
        <h2 className="dictionary-title">📖 Magic Dictionary</h2>
        <div className="dictionary-coin">
          🪙 {wordCoins}
        </div>
      </div>

      {/* Search */}
      <div className="dictionary-search-row">
        <input
          className="dictionary-search"
          type="text"
          placeholder="🔍 Search words..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Year filter */}
      <div className="dictionary-year-filters">
        <button
          className={`year-filter-btn ${selectedYear === null ? 'year-filter-active' : ''}`}
          onClick={() => setSelectedYear(null)}
        >
          All
        </button>
        {[1, 2, 3, 4, 5].map((y) => (
          <button
            key={y}
            className={`year-filter-btn ${selectedYear === y ? 'year-filter-active' : ''}`}
            onClick={() => setSelectedYear(y)}
          >
            Y{y}
          </button>
        ))}
      </div>

      {/* Count */}
      <div className="dictionary-count">
        {filtered.length === 0
          ? 'No words yet! Complete chapters to add words.'
          : `${filtered.length} word${filtered.length !== 1 ? 's' : ''} found`}
      </div>

      {/* Words grid */}
      {filtered.length === 0 && dictionary.length === 0 ? (
        <div className="dictionary-empty">
          <div style={{ fontSize: '4rem' }}>📚</div>
          <p>Your dictionary is empty!</p>
          <p>Start an adventure to learn words.</p>
          <button className="btn-primary" onClick={() => setScreen('map')}>
            🗺️ Go on Adventure
          </button>
        </div>
      ) : (
        <div className="dictionary-grid">
          {filtered.map((entry) => (
            <div key={entry.word} className="dictionary-card">
              <div className="dict-card-emoji">{entry.emoji}</div>
              <div className="dict-card-word">{entry.word}</div>
              <div className="dict-card-year">Year {entry.yearBand}</div>
              <div className="dict-card-definition">{entry.definition}</div>
              <div className="dict-card-example">
                <em>"{entry.exampleSentence}"</em>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom nav */}
      <nav className="bottom-nav">
        <button className="nav-btn" onClick={() => setScreen('home')}>
          🏠<span>Home</span>
        </button>
        <button className="nav-btn" onClick={() => setScreen('map')}>
          🗺️<span>Map</span>
        </button>
        <button className="nav-btn nav-btn-active">
          📖<span>Words</span>
        </button>
        <button className="nav-btn" onClick={() => setScreen('parentDashboard')}>
          👨‍💼<span>Parent</span>
        </button>
      </nav>
    </div>
  );
};
