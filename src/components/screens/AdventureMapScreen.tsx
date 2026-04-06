import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { storyChapters } from '../../data/story';

const WORLD_COLORS = [
  '#10B981', // Forest - green
  '#3B82F6', // Castle - blue
  '#F59E0B', // Mountain - amber
  '#EC4899', // Dragon - pink
  '#7C3AED', // Dark Tower - purple
];

const LockSVG = () => (
  <svg width="20" height="24" viewBox="0 0 20 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="2" y="10" width="16" height="14" rx="3" fill="#A7A9BE" />
    <path d="M5 10V7a5 5 0 0 1 10 0v3" stroke="#A7A9BE" strokeWidth="3" fill="none" strokeLinecap="round" />
    <circle cx="10" cy="17" r="2.5" fill="#0F0E17" />
    <rect x="9" y="17" width="2" height="4" rx="1" fill="#0F0E17" />
  </svg>
);

const CheckSVG = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="10" cy="10" r="10" fill="#43E97B" />
    <path d="M5 10 L8.5 13.5 L15 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export const AdventureMapScreen: React.FC = () => {
  const { levelProgress, setScreen, startChapter, currentChapterId, wordCoins, profile } = useGameStore();

  const completedCount = Object.values(levelProgress).filter((p) => p.completed).length;
  const nextChapterId = completedCount + 1;

  const handleChapterSelect = (chapterId: number) => {
    const isLocked = chapterId > nextChapterId;
    if (isLocked) return;
    startChapter(chapterId);
    setScreen('story');
  };

  return (
    <div className="screen screen-gradient">
      {/* Top bar */}
      <div className="topbar">
        <button className="btn btn-ghost btn-sm" onClick={() => setScreen('home')} aria-label="Back to home">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Home
        </button>
        <span className="topbar-title">Adventure Map</span>
        <div className="coin-counter" aria-label={`${wordCoins} word coins`}>
          <div className="coin" aria-hidden="true">W</div>
          {wordCoins}
        </div>
      </div>

      <div className="scroll-content">
        <div className="container">
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 'var(--sp-xl)' }}>
            <h2 style={{ marginBottom: 8 }}>
              {profile.name ? `${profile.name}'s` : 'Your'} Quest
            </h2>
            <p>{completedCount} of {storyChapters.length} chapters complete</p>
            <div className="progress-track" style={{ maxWidth: 300, margin: '12px auto 0' }}>
              <div className="progress-fill" style={{ width: `${(completedCount / storyChapters.length) * 100}%` }} />
            </div>
          </div>

          {/* SVG connecting path */}
          <div style={{ position: 'relative' }}>
            <svg
              width="100%"
              height="40"
              viewBox="0 0 900 40"
              preserveAspectRatio="none"
              style={{ display: 'block', marginBottom: -20 }}
              aria-hidden="true"
            >
              <path
                d="M90 20 Q270 5 450 20 Q630 35 810 20"
                stroke="rgba(108,99,255,0.25)"
                strokeWidth="3"
                strokeDasharray="12 6"
                fill="none"
              />
            </svg>
          </div>

          {/* Chapter nodes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-md)' }}>
            {storyChapters.map((chapter, idx) => {
              const progress = levelProgress[chapter.id];
              const isCompleted = progress?.completed ?? false;
              const isCurrent = chapter.id === nextChapterId;
              const isLocked = chapter.id > nextChapterId;
              const stars = progress?.stars ?? 0;
              const color = WORLD_COLORS[idx % WORLD_COLORS.length];

              return (
                <button
                  key={chapter.id}
                  className={`map-node${isCompleted ? ' completed' : ''}${isCurrent ? ' current' : ''}${isLocked ? ' locked' : ''}`}
                  onClick={() => handleChapterSelect(chapter.id)}
                  disabled={isLocked}
                  aria-label={`Chapter ${chapter.id}: ${chapter.title}${isLocked ? ' (locked)' : ''}`}
                  style={isCurrent ? { borderColor: 'var(--primary)' } : isCompleted ? { borderColor: color } : {}}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-lg)' }}>
                    {/* World icon */}
                    <div
                      style={{
                        width: 64, height: 64, borderRadius: '50%', flexShrink: 0,
                        background: isLocked ? 'rgba(167,169,190,0.1)' : `${color}22`,
                        border: `3px solid ${isLocked ? 'rgba(167,169,190,0.3)' : color}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.8rem',
                      }}
                      aria-hidden="true"
                    >
                      {isLocked ? <LockSVG /> : chapter.emoji}
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-sm)', marginBottom: 4 }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: isLocked ? 'var(--text-secondary)' : color }}>
                          Chapter {chapter.id}
                        </span>
                        {isCompleted && <CheckSVG />}
                        {isCurrent && (
                          <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>CURRENT</span>
                        )}
                      </div>
                      <h3 style={{ fontSize: '1.05rem', marginBottom: 2, color: isLocked ? 'var(--text-secondary)' : 'var(--text-primary)' }}>
                        {chapter.title}
                      </h3>
                      <p style={{ fontSize: '0.85rem', margin: 0 }}>{chapter.world}</p>

                      {/* Stars */}
                      <div style={{ display: 'flex', gap: 4, marginTop: 8 }} aria-label={`${stars} stars`}>
                        {[1, 2, 3].map((s) => (
                          <div key={s} className={`star-icon sm${s <= stars ? ' filled' : ''}`} />
                        ))}
                        {isCompleted && progress && (
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginLeft: 8, alignSelf: 'center' }}>
                            {Math.round(progress.accuracy * 100)}% accuracy
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Arrow for unlocked */}
                    {!isLocked && (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" style={{ color: 'var(--text-secondary)', flexShrink: 0 }} aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>

                  {/* Target word preview */}
                  {!isLocked && (
                    <div style={{ marginTop: 'var(--sp-sm)', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {chapter.targetWords.slice(0, 5).map((w) => (
                        <span key={w} className="badge badge-primary" style={{ fontSize: '0.7rem' }}>{w}</span>
                      ))}
                      {chapter.targetWords.length > 5 && (
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', alignSelf: 'center' }}>+{chapter.targetWords.length - 5} more</span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Dictionary + Parent buttons */}
          <div style={{ display: 'flex', gap: 'var(--sp-md)', marginTop: 'var(--sp-xl)' }}>
            <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setScreen('dictionary')}>
              My Dictionary
            </button>
            <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setScreen('parentDashboard')}>
              Parent Area
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
