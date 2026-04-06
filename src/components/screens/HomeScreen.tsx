import React, { useState, useEffect } from 'react';
import { useGameStore } from '../../store/gameStore';

const SPARKLE_COUNT = 16;

export const HomeScreen: React.FC = () => {
  const { setScreen, playerName, setPlayerName, yearBand, setYearBand, wordCoins, streakDays } =
    useGameStore();
  const [nameInput, setNameInput] = useState(playerName);
  const [showSetup, setShowSetup] = useState(!playerName);
  const [sparkles] = useState(() =>
    Array.from({ length: SPARKLE_COUNT }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      size: 0.5 + Math.random() * 1,
    }))
  );

  useEffect(() => {
    if (playerName) setNameInput(playerName);
  }, [playerName]);

  const handleStart = () => {
    const name = nameInput.trim() || 'Hero';
    setPlayerName(name);
    setShowSetup(false);
    setScreen('map');
  };

  return (
    <div className="home-screen">
      {/* Sparkle particles */}
      <div className="sparkles-container" aria-hidden="true">
        {sparkles.map((s) => (
          <div
            key={s.id}
            className="sparkle"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              animationDelay: `${s.delay}s`,
              fontSize: `${s.size}rem`,
            }}
          >
            ✨
          </div>
        ))}
      </div>

      {/* Header stats */}
      {playerName && (
        <div className="home-stats">
          <span>🪙 {wordCoins}</span>
          <span>🔥 {streakDays} day streak</span>
        </div>
      )}

      {/* Main content */}
      <div className="home-content">
        <div className="home-hero-emoji">🧙‍♂️</div>

        <h1 className="home-title">
          <span className="title-word">Word</span>
          <span className="title-quest">Quest</span>
          <br />
          <span className="title-heroes">Heroes</span>
        </h1>

        <div className="home-subtitle">Story Battles ⚔️</div>

        <p className="home-tagline">
          Battle the Shadow Scrambler! Learn real English words!
        </p>

        {showSetup ? (
          <div className="setup-box">
            <h2 style={{ marginBottom: '12px', fontSize: '1.2rem' }}>Who are you, Hero? 🦸</h2>

            <input
              className="name-input"
              type="text"
              placeholder="Enter your name…"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleStart()}
              maxLength={20}
              autoFocus
            />

            <div style={{ margin: '12px 0' }}>
              <div style={{ fontWeight: 700, marginBottom: '8px', color: '#7C3AED' }}>
                Pick your year group:
              </div>
              <div className="year-buttons">
                {([1, 2, 3, 4, 5] as const).map((y) => (
                  <button
                    key={y}
                    className={`year-btn ${yearBand === y ? 'year-btn-active' : ''}`}
                    onClick={() => setYearBand(y)}
                  >
                    Year {y}
                  </button>
                ))}
              </div>
            </div>

            <button className="btn-primary btn-large" onClick={handleStart}>
              🗡️ Start Adventure!
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
            <div style={{ fontSize: '1.1rem', color: '#7C3AED', fontWeight: 700 }}>
              Welcome back, {playerName}! ⭐
            </div>
            <button className="btn-primary btn-large" onClick={() => setScreen('map')}>
              🗺️ Continue Adventure
            </button>
            <button
              className="btn-secondary"
              onClick={() => setShowSetup(true)}
              style={{ fontSize: '0.9rem' }}
            >
              Change Hero
            </button>
          </div>
        )}
      </div>

      {/* Bottom nav */}
      <nav className="bottom-nav">
        <button className="nav-btn" onClick={() => setScreen('map')}>
          🗺️
          <span>Map</span>
        </button>
        <button className="nav-btn" onClick={() => setScreen('dictionary')}>
          📖
          <span>Words</span>
        </button>
        <button className="nav-btn" onClick={() => setScreen('parentDashboard')}>
          👨‍💼
          <span>Parent</span>
        </button>
      </nav>
    </div>
  );
};
