import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { storyChapters } from '../../data/story';
import { SpeechBubble } from '../ui/SpeechBubble';
import { Character } from '../ui/Character';
import { Enemy } from '../ui/Enemy';

export const StoryScreen: React.FC = () => {
  const { currentChapterId, setScreen } = useGameStore();
  const [showBuzzy, setShowBuzzy] = useState(true);

  const chapter = storyChapters.find((c) => c.id === currentChapterId);
  if (!chapter) return null;

  // Highlight target words in the story text
  const renderStoryText = (text: string) => {
    const words = text.split(/(\s+)/);
    return words.map((word, idx) => {
      const clean = word.toLowerCase().replace(/[^a-z]/g, '');
      if (chapter.targetWords.includes(clean)) {
        return (
          <span key={idx} className="story-highlight-word">
            {word}
          </span>
        );
      }
      return <span key={idx}>{word}</span>;
    });
  };

  return (
    <div className="story-screen" style={{ background: chapter.backgroundGradient }}>
      <div className="story-header">
        <button className="back-btn back-btn-light" onClick={() => setScreen('map')}>
          ← Map
        </button>
        <div className="story-chapter-badge">
          {chapter.emoji} Chapter {chapter.id}
        </div>
      </div>

      <div className="story-content">
        <h2 className="story-title">{chapter.title}</h2>
        <div className="story-world">{chapter.world}</div>

        {/* Characters */}
        <div className="story-characters">
          <div className="story-lex">
            <Character character="lex" state="idle" size="medium" label="Lex" />
          </div>

          <div className="story-vs">VS</div>

          <div className="story-enemy">
            <Enemy
              emoji={chapter.minionEmoji}
              name={chapter.minionName}
              state="idle"
              size="medium"
            />
          </div>
        </div>

        {/* Story text */}
        <div className="story-text-box">
          <p className="story-text">{renderStoryText(chapter.storyText)}</p>
        </div>

        {/* Buzzy commentary */}
        <div className="buzzy-row">
          <div
            className="buzzy-toggle"
            onClick={() => setShowBuzzy(!showBuzzy)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setShowBuzzy(!showBuzzy)}
          >
            <Character character="buzzy" state="idle" size="small" />
          </div>
          {showBuzzy && (
            <SpeechBubble
              text={chapter.buzzyCommentary}
              speaker="buzzy"
              direction="left"
              emoji="🐛"
            />
          )}
        </div>

        {/* Target words preview */}
        <div className="target-words-box">
          <div className="target-words-label">✨ Words to learn this chapter:</div>
          <div className="target-words-list">
            {chapter.targetWords.slice(0, 5).map((word) => (
              <span key={word} className="target-word-chip">
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* Continue button */}
        <button
          className="btn-primary btn-large story-continue-btn"
          onClick={() => setScreen('challenge')}
        >
          ⚔️ Battle the Scrambler!
        </button>
      </div>
    </div>
  );
};
