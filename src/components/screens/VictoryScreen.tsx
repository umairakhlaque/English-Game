import React, { useState, useEffect } from 'react';
import { useGameStore } from '../../store/gameStore';
import { storyChapters } from '../../data/story';
import { Confetti } from '../ui/Confetti';
import { LexCharacter } from '../characters/LexCharacter';

const TrophySVG: React.FC<{ size?: number }> = ({ size = 80 }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" aria-label="Trophy" role="img">
    <defs>
      <linearGradient id="trophy-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFE566" />
        <stop offset="50%" stopColor="#F7B731" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
    </defs>
    {/* Cup */}
    <path d="M20 12 L60 12 L55 44 Q53 52 40 52 Q27 52 25 44 Z" fill="url(#trophy-grad)" />
    {/* Handles */}
    <path d="M20 14 Q8 20 10 34 Q12 46 20 42" fill="none" stroke="url(#trophy-grad)" strokeWidth="5" strokeLinecap="round" />
    <path d="M60 14 Q72 20 70 34 Q68 46 60 42" fill="none" stroke="url(#trophy-grad)" strokeWidth="5" strokeLinecap="round" />
    {/* Stem */}
    <rect x="35" y="52" width="10" height="14" rx="3" fill="#D97706" />
    {/* Base */}
    <rect x="25" y="64" width="30" height="6" rx="3" fill="url(#trophy-grad)" />
    {/* Star on cup */}
    <polygon points="40,20 42.4,27 50,27 44,31.6 46.4,38.6 40,34 33.6,38.6 36,31.6 30,27 37.6,27" fill="#fff" opacity="0.7" />
    {/* Shine */}
    <ellipse cx="30" cy="22" rx="4" ry="6" fill="#fff" opacity="0.3" />
  </svg>
);

export const VictoryScreen: React.FC = () => {
  const {
    currentChapterId, chapterStars, chapterSessionCorrect, chapterSessionTotal,
    wordCoins, dictionary, stats, setScreen, levelProgress,
  } = useGameStore();

  const [starsShown, setStarsShown] = useState(0);
  const [trophyVisible, setTrophyVisible] = useState(false);
  const [confettiActive, setConfettiActive] = useState(true);

  const chapter = storyChapters.find((c) => c.id === currentChapterId);
  const accuracy = chapterSessionTotal > 0
    ? Math.round((chapterSessionCorrect / chapterSessionTotal) * 100)
    : 0;
  const coinsEarned = chapterSessionCorrect * 10;
  const nextChapterId = currentChapterId + 1;
  const hasNextChapter = nextChapterId <= storyChapters.length;
  const newWords = dictionary.slice(-Math.min(3, chapterSessionCorrect));

  // Animate stars and trophy in sequence
  useEffect(() => {
    const t0 = setTimeout(() => setTrophyVisible(true), 300);
    const t1 = setTimeout(() => setStarsShown(1), 800);
    const t2 = setTimeout(() => setStarsShown(2), 1100);
    const t3 = setTimeout(() => setStarsShown(chapterStars), 1400);
    const t4 = setTimeout(() => setConfettiActive(false), 4000);

    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [chapterStars]);

  return (
    <div className="screen screen-gradient" style={{ alignItems: 'center', justifyContent: 'center', padding: 'var(--sp-lg)' }}>
      <Confetti active={confettiActive} count={70} />

      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 'var(--sp-xl)', maxWidth: 500, width: '100%', position: 'relative', zIndex: 1,
      }}>
        {/* Title */}
        <div style={{ textAlign: 'center' }}>
          <h1 className="text-gradient text-glow" style={{ lineHeight: 1, marginBottom: 8 }}>Victory!</h1>
          {chapter && <p style={{ fontSize: '1rem' }}>You completed {chapter.title}!</p>}
        </div>

        {/* Trophy + Lex */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 'var(--sp-lg)',
          opacity: trophyVisible ? 1 : 0,
          transform: trophyVisible ? 'scale(1)' : 'scale(0.5)',
          transition: 'all 0.5s cubic-bezier(0.34,1.56,0.64,1)',
        }}>
          <LexCharacter size={100} animate />
          <div style={{ filter: 'drop-shadow(0 0 16px rgba(247,183,49,0.6))' }}>
            <TrophySVG size={90} />
          </div>
        </div>

        {/* Stars */}
        <div style={{ display: 'flex', gap: 'var(--sp-md)', alignItems: 'center' }} aria-label={`${chapterStars} stars earned`}>
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`star-icon lg${s <= starsShown ? ' filled' : ''}`}
              style={{
                animation: s <= starsShown ? `star-reveal 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards` : undefined,
                animationDelay: `${(s - 1) * 0.3}s`,
              }}
              aria-hidden="true"
            />
          ))}
        </div>

        {/* Stats */}
        <div className="card" style={{ width: '100%' }}>
          <h3 style={{ textAlign: 'center', marginBottom: 'var(--sp-md)', fontSize: '1.1rem' }}>Chapter Results</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value" style={{ color: 'var(--accent)' }}>{accuracy}%</div>
              <div className="stat-label">Accuracy</div>
            </div>
            <div className="stat-card">
              <div className="stat-value" style={{ color: 'var(--warning)' }}>{coinsEarned}</div>
              <div className="stat-label">Coins Earned</div>
            </div>
            <div className="stat-card">
              <div className="stat-value" style={{ color: 'var(--primary)' }}>{chapterSessionCorrect}/{chapterSessionTotal}</div>
              <div className="stat-label">Correct</div>
            </div>
            <div className="stat-card">
              <div className="stat-value" style={{ color: 'var(--secondary)' }}>{wordCoins}</div>
              <div className="stat-label">Total Coins</div>
            </div>
          </div>
        </div>

        {/* New words learned */}
        {newWords.length > 0 && (
          <div className="card" style={{ width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-sm)', marginBottom: 'var(--sp-sm)' }}>
              <span style={{ fontSize: '1.2rem' }} aria-hidden="true">📖</span>
              <h4 style={{ fontSize: '1rem' }}>Words Added to Your Dictionary</h4>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-xs)' }}>
              {newWords.map((entry) => (
                <div key={entry.word} style={{
                  display: 'flex', alignItems: 'center', gap: 'var(--sp-sm)',
                  background: 'rgba(67,233,123,0.08)', border: '1px solid rgba(67,233,123,0.2)',
                  borderRadius: 'var(--radius-sm)', padding: '8px 12px',
                }}>
                  <span style={{ fontWeight: 900, color: 'var(--accent)' }}>{entry.word}</span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>— {entry.definition}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Total stats row */}
        <div style={{ width: '100%', textAlign: 'center' }}>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
            Total words learned: <strong style={{ color: 'var(--accent)' }}>{stats.totalWordsLearned}</strong>
          </p>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-md)', width: '100%' }}>
          {hasNextChapter && (
            <button
              className="btn btn-primary btn-lg btn-full"
              onClick={() => {
                const store = useGameStore.getState();
                store.startChapter(nextChapterId);
                store.setScreen('story');
              }}
            >
              Next Chapter
            </button>
          )}
          <div style={{ display: 'flex', gap: 'var(--sp-md)' }}>
            <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setScreen('map')}>
              Adventure Map
            </button>
            <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setScreen('dictionary')}>
              My Dictionary
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
