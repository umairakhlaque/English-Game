import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { storyChapters } from '../../data/story';
import { StarRating } from '../ui/StarRating';
import { WordCoin } from '../ui/WordCoin';
import { useGameEngine } from '../../hooks/useGameEngine';

export const AdventureMapScreen: React.FC = () => {
  const { setScreen, levelProgress, wordCoins, playerName, streakDays } = useGameStore();
  const { handleStartChapter } = useGameEngine();

  const isUnlocked = (chapterId: number): boolean => {
    if (chapterId === 1) return true;
    return levelProgress[chapterId - 1]?.completed ?? false;
  };

  return (
    <div className="map-screen">
      <div className="map-header">
        <button className="back-btn" onClick={() => setScreen('home')}>
          ← Home
        </button>
        <div className="map-header-info">
          <WordCoin count={wordCoins} />
          <span className="streak-badge">🔥 {streakDays}</span>
        </div>
      </div>

      <h2 className="map-title">⚔️ Adventure Map</h2>
      {playerName && (
        <div className="map-subtitle">Hero: {playerName}</div>
      )}

      <div className="map-path">
        {storyChapters.map((chapter, index) => {
          const unlocked = isUnlocked(chapter.id);
          const progress = levelProgress[chapter.id];
          const stars = progress?.stars ?? 0;
          const completed = progress?.completed ?? false;

          return (
            <div key={chapter.id} className="map-chapter-row">
              {/* Connector line */}
              {index > 0 && (
                <div
                  className={`path-connector ${isUnlocked(chapter.id) ? 'connector-active' : 'connector-locked'}`}
                />
              )}

              <button
                className={`map-node ${unlocked ? 'node-unlocked' : 'node-locked'} ${completed ? 'node-completed' : ''}`}
                onClick={() => unlocked && handleStartChapter(chapter.id)}
                disabled={!unlocked}
                aria-label={`Chapter ${chapter.id}: ${chapter.title} ${!unlocked ? '(locked)' : ''}`}
              >
                <div className="node-world-emoji">{chapter.emoji}</div>

                <div className="node-info">
                  <div className="node-chapter-num">Chapter {chapter.id}</div>
                  <div className="node-title">{chapter.title}</div>
                  <div className="node-world">{chapter.world}</div>

                  {unlocked && (
                    <StarRating stars={stars} maxStars={3} size="small" />
                  )}

                  {!unlocked && (
                    <div className="node-lock">🔒 Complete Chapter {chapter.id - 1} first</div>
                  )}
                </div>

                {completed && (
                  <div className="node-complete-badge">✅</div>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Bottom nav */}
      <nav className="bottom-nav">
        <button className="nav-btn" onClick={() => setScreen('home')}>
          🏠
          <span>Home</span>
        </button>
        <button className="nav-btn nav-btn-active">
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
