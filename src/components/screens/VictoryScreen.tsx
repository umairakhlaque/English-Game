import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { useGameEngine } from '../../hooks/useGameEngine';
import { storyChapters } from '../../data/story';
import { StarRating } from '../ui/StarRating';
import { WordCoin } from '../ui/WordCoin';
import { StoryTwist } from '../game/StoryTwist';
import { StoryTwistOption } from '../../types';

const FIREWORK_COUNT = 20;

export const VictoryScreen: React.FC = () => {
  const {
    currentChapterId,
    chapterStars,
    wordCoins,
    chapterSessionCorrect,
    chapterSessionTotal,
    dictionary,
  } = useGameStore();

  const { handleNextChapter } = useGameEngine();
  const [chosenTwist, setChosenTwist] = useState<StoryTwistOption | null>(null);
  const [showTwist, setShowTwist] = useState(false);
  const { setScreen } = useGameStore();

  const chapter = storyChapters.find((c) => c.id === currentChapterId);
  const accuracy =
    chapterSessionTotal > 0
      ? Math.round((chapterSessionCorrect / chapterSessionTotal) * 100)
      : 100;

  const isFinalChapter = currentChapterId === 5;

  const recentWords = dictionary
    .filter((d) => d.learnedAt === currentChapterId)
    .slice(-4);

  const fireworks = Array.from({ length: FIREWORK_COUNT }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 2,
    color: ['#7C3AED', '#F59E0B', '#10B981', '#EC4899', '#3B82F6'][i % 5],
  }));

  return (
    <div className="victory-screen">
      {/* Fireworks */}
      <div className="fireworks-container" aria-hidden="true">
        {fireworks.map((fw) => (
          <div
            key={fw.id}
            className="firework"
            style={{
              left: `${fw.x}%`,
              animationDelay: `${fw.delay}s`,
              color: fw.color,
            }}
          >
            🎆
          </div>
        ))}
      </div>

      <div className="victory-content">
        {/* Trophy */}
        <div className="victory-trophy">
          {isFinalChapter ? '🏆' : '⭐'}
        </div>

        <h2 className="victory-title">
          {isFinalChapter ? 'LEGEND!' : 'Chapter Complete!'}
        </h2>

        <div className="victory-chapter-name">
          {chapter?.emoji} {chapter?.title}
        </div>

        {/* Stars */}
        <div style={{ margin: '16px 0' }}>
          <StarRating stars={chapterStars} maxStars={3} size="large" animate />
        </div>

        {/* Stats */}
        <div className="victory-stats">
          <div className="victory-stat">
            <div className="stat-value">{accuracy}%</div>
            <div className="stat-label">Accuracy</div>
          </div>
          <div className="victory-stat">
            <div className="stat-value">{chapterSessionCorrect}/{chapterSessionTotal}</div>
            <div className="stat-label">Correct</div>
          </div>
          <div className="victory-stat">
            <div className="stat-value">{recentWords.length}</div>
            <div className="stat-label">Words learned</div>
          </div>
        </div>

        {/* Coins earned */}
        <div style={{ margin: '12px 0' }}>
          <WordCoin count={wordCoins} animate />
        </div>

        {/* New words learned */}
        {recentWords.length > 0 && (
          <div className="victory-new-words">
            <div className="victory-new-words-title">📚 Words Added to Dictionary!</div>
            <div className="victory-word-chips">
              {recentWords.map((w) => (
                <div key={w.word} className="victory-word-chip">
                  <span>{w.emoji}</span>
                  <span>{w.word}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Story Twist */}
        {!showTwist && chapter?.storyTwist && !isFinalChapter && (
          <button
            className="btn-secondary"
            onClick={() => setShowTwist(true)}
            style={{ marginBottom: '12px' }}
          >
            🌀 See Story Twist!
          </button>
        )}

        {showTwist && chapter?.storyTwist && (
          <div style={{ margin: '12px 0' }}>
            <StoryTwist
              prompt={chapter.storyTwist.prompt}
              options={chapter.storyTwist.options}
              onChoose={setChosenTwist}
              chosenOption={chosenTwist}
            />
          </div>
        )}

        {/* Action buttons */}
        <div className="victory-buttons">
          {isFinalChapter ? (
            <>
              <button className="btn-primary btn-large" onClick={() => setScreen('home')}>
                🏠 Back to Home
              </button>
              <button className="btn-secondary" onClick={() => setScreen('map')}>
                🗺️ Play Again
              </button>
            </>
          ) : (
            <>
              <button className="btn-primary btn-large" onClick={handleNextChapter}>
                ➡️ Next Chapter
              </button>
              <button className="btn-secondary" onClick={() => setScreen('map')}>
                🗺️ Back to Map
              </button>
            </>
          )}
          <button className="btn-ghost" onClick={() => setScreen('dictionary')}>
            📖 View Dictionary
          </button>
        </div>
      </div>
    </div>
  );
};
