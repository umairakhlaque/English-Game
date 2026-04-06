import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { storyChapters } from '../../data/story';

const PIN = '1234';

export const ParentDashboardScreen: React.FC = () => {
  const { setScreen, playerName, yearBand, wordCoins, streakDays, dictionary, levelProgress, stats } =
    useGameStore();

  const [pinInput, setPinInput] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [pinError, setPinError] = useState(false);

  const handlePinSubmit = () => {
    if (pinInput === PIN) {
      setUnlocked(true);
      setPinError(false);
    } else {
      setPinError(true);
      setPinInput('');
    }
  };

  const accuracy =
    stats.totalQuestionsAnswered > 0
      ? Math.round((stats.totalCorrect / stats.totalQuestionsAnswered) * 100)
      : 0;

  const minutesPlayed = Math.floor(
    (Date.now() - stats.sessionStartTime) / 60000
  );

  const completedChapters = Object.values(levelProgress).filter((p) => p.completed).length;

  if (!unlocked) {
    return (
      <div className="parent-screen">
        <div className="parent-lock-box">
          <button className="back-btn" onClick={() => setScreen('home')}>
            ← Back
          </button>
          <div style={{ fontSize: '3rem', margin: '20px 0' }}>🔒</div>
          <h2 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>Parent Dashboard</h2>
          <p style={{ color: '#6B7280', marginBottom: '20px', fontSize: '0.9rem' }}>
            Enter the PIN to view your child's progress
          </p>

          <div className="pin-dots">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`pin-dot ${pinInput.length > i ? 'pin-dot-filled' : ''}`}
              />
            ))}
          </div>

          <div className="pin-pad">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, '⌫'].map((key, idx) => (
              <button
                key={idx}
                className={`pin-key ${key === '' ? 'pin-key-empty' : ''}`}
                onClick={() => {
                  if (key === '⌫') {
                    setPinInput((prev) => prev.slice(0, -1));
                    setPinError(false);
                  } else if (key !== '' && pinInput.length < 4) {
                    const next = pinInput + String(key);
                    setPinInput(next);
                    if (next.length === 4) {
                      setTimeout(() => {
                        if (next === PIN) {
                          setUnlocked(true);
                          setPinError(false);
                        } else {
                          setPinError(true);
                          setPinInput('');
                        }
                      }, 100);
                    }
                  }
                }}
                disabled={key === ''}
              >
                {key}
              </button>
            ))}
          </div>

          {pinError && (
            <div style={{ color: '#EF4444', fontWeight: 700, marginTop: '12px' }}>
              Incorrect PIN. Try again. (Hint: 1234)
            </div>
          )}

          <button
            className="btn-primary"
            onClick={handlePinSubmit}
            style={{ marginTop: '16px' }}
            disabled={pinInput.length < 4}
          >
            Unlock
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="parent-screen parent-unlocked">
      <div className="parent-header">
        <button className="back-btn" onClick={() => setScreen('home')}>
          ← Back
        </button>
        <h2 className="parent-title">📊 Parent Dashboard</h2>
        <button
          className="btn-ghost"
          onClick={() => { setUnlocked(false); setPinInput(''); }}
          style={{ fontSize: '0.8rem' }}
        >
          🔒 Lock
        </button>
      </div>

      <div className="parent-content">
        {/* Child info */}
        <div className="parent-card">
          <div className="parent-card-title">🧙‍♂️ Hero Profile</div>
          <div className="parent-info-row">
            <span>Name:</span><strong>{playerName || 'Unknown Hero'}</strong>
          </div>
          <div className="parent-info-row">
            <span>Year Group:</span><strong>Year {yearBand}</strong>
          </div>
          <div className="parent-info-row">
            <span>Word Coins:</span><strong>🪙 {wordCoins}</strong>
          </div>
          <div className="parent-info-row">
            <span>Daily Streak:</span><strong>🔥 {streakDays} days</strong>
          </div>
        </div>

        {/* Stats */}
        <div className="parent-card">
          <div className="parent-card-title">📈 Learning Stats</div>
          <div className="parent-stats-grid">
            <div className="parent-stat-box">
              <div className="parent-stat-val">{stats.totalQuestionsAnswered}</div>
              <div className="parent-stat-lbl">Questions</div>
            </div>
            <div className="parent-stat-box">
              <div className="parent-stat-val">{accuracy}%</div>
              <div className="parent-stat-lbl">Accuracy</div>
            </div>
            <div className="parent-stat-box">
              <div className="parent-stat-val">{dictionary.length}</div>
              <div className="parent-stat-lbl">Words Learned</div>
            </div>
            <div className="parent-stat-box">
              <div className="parent-stat-val">{minutesPlayed}m</div>
              <div className="parent-stat-lbl">This Session</div>
            </div>
          </div>
        </div>

        {/* Chapter progress */}
        <div className="parent-card">
          <div className="parent-card-title">🗺️ Chapter Progress ({completedChapters}/5)</div>
          {storyChapters.map((chapter) => {
            const progress = levelProgress[chapter.id];
            return (
              <div key={chapter.id} className="parent-chapter-row">
                <span className="parent-chapter-emoji">{chapter.emoji}</span>
                <div className="parent-chapter-info">
                  <div className="parent-chapter-name">{chapter.title}</div>
                  {progress?.completed ? (
                    <div className="parent-chapter-stars">
                      {'⭐'.repeat(progress.stars)}{'☆'.repeat(3 - progress.stars)}
                      {' '}{Math.round(progress.accuracy * 100)}% accuracy
                    </div>
                  ) : (
                    <div className="parent-chapter-locked">
                      {levelProgress[chapter.id - 1]?.completed || chapter.id === 1
                        ? '🔓 Unlocked — not started'
                        : '🔒 Locked'}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Words learned */}
        {dictionary.length > 0 && (
          <div className="parent-card">
            <div className="parent-card-title">📚 Words Learned ({dictionary.length})</div>
            <div className="parent-words-grid">
              {dictionary.map((word) => (
                <div key={word.word} className="parent-word-chip">
                  {word.emoji} {word.word}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Curriculum info */}
        <div className="parent-card parent-card-info">
          <div className="parent-card-title">ℹ️ About This Game</div>
          <p style={{ fontSize: '0.85rem', color: '#374151', lineHeight: 1.6 }}>
            WordQuest Heroes uses the UK National Curriculum common exception words
            for Years 1–5. Your child learns by playing story-based challenges that
            test spelling, vocabulary and sentence construction. Correct answers are
            celebrated with fun battle animations to reinforce positive learning.
          </p>
        </div>
      </div>
    </div>
  );
};
