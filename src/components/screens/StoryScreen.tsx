import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { storyChapters } from '../../data/story';
import { LexCharacter } from '../characters/LexCharacter';
import { BuzzyCharacter } from '../characters/BuzzyCharacter';
import { MinionCharacter } from '../characters/MinionCharacter';

export const StoryScreen: React.FC = () => {
  const { currentChapterId, setScreen, wordCoins } = useGameStore();
  const [revealed, setRevealed] = useState(false);

  const chapter = storyChapters.find((c) => c.id === currentChapterId);
  if (!chapter) {
    return (
      <div className="screen flex-center">
        <p>Chapter not found.</p>
        <button className="btn btn-primary" onClick={() => setScreen('map')}>Back to Map</button>
      </div>
    );
  }

  // Highlight target words in story text
  const renderStoryText = (text: string) => {
    const targetSet = new Set(chapter.targetWords.map((w) => w.toLowerCase()));
    const parts = text.split(/\b/);
    return parts.map((part, i) => {
      if (targetSet.has(part.toLowerCase())) {
        return (
          <mark
            key={i}
            style={{
              background: 'none',
              color: 'var(--warning)',
              fontWeight: 800,
              borderBottom: '2px solid var(--warning)',
              textShadow: '0 0 8px rgba(247,183,49,0.4)',
              padding: '0 2px',
            }}
          >
            {part}
          </mark>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div
      className="screen"
      style={{
        background: chapter.backgroundGradient,
        position: 'relative',
      }}
    >
      {/* Dark overlay for readability */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', pointerEvents: 'none' }} aria-hidden="true" />

      {/* Top bar */}
      <div className="topbar" style={{ position: 'relative', zIndex: 10, background: 'rgba(15,14,23,0.85)' }}>
        <button className="btn btn-ghost btn-sm" onClick={() => setScreen('map')} aria-label="Back to map">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Map
        </button>
        <div>
          <span className="topbar-title">Chapter {chapter.id}: {chapter.title}</span>
        </div>
        <div className="coin-counter" aria-label={`${wordCoins} coins`}>
          <div className="coin" aria-hidden="true">W</div>
          {wordCoins}
        </div>
      </div>

      {/* Content */}
      <div className="scroll-content" style={{ position: 'relative', zIndex: 1 }}>
        <div className="container" style={{ maxWidth: 800 }}>

          {/* World badge */}
          <div style={{ textAlign: 'center', marginBottom: 'var(--sp-md)' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 'var(--sp-sm)',
              background: 'rgba(15,14,23,0.7)', border: '1px solid var(--card-border)',
              borderRadius: 999, padding: '8px 20px',
            }}>
              <span style={{ fontSize: '1.5rem' }} aria-hidden="true">{chapter.emoji}</span>
              <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1.1rem' }}>{chapter.world}</span>
            </div>
          </div>

          {/* Two-panel layout */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: 'var(--sp-xl)',
            }}
          >
            {/* Story text panel */}
            <div className="card" style={{ background: 'rgba(26,26,46,0.9)', backdropFilter: 'blur(16px)' }}>
              <p style={{
                fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-primary)',
                margin: 0, fontWeight: 500,
              }}>
                {renderStoryText(chapter.storyText)}
              </p>

              <div className="divider" />

              {/* Highlighted words legend */}
              <div>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: 8 }}>
                  Words to master in this chapter:
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {chapter.targetWords.map((w) => (
                    <span key={w} className="badge badge-warning">{w}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Character scene panel */}
            <div
              className="card"
              style={{
                background: 'rgba(26,26,46,0.85)', backdropFilter: 'blur(16px)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--sp-lg)',
              }}
            >
              {/* Characters */}
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 'var(--sp-xl)', flexWrap: 'wrap' }}>
                <LexCharacter size={120} animate />
                <MinionCharacter size={100} name={chapter.minionName} animate />
              </div>

              {/* Buzzy + commentary */}
              <div style={{ width: '100%' }}>
                <BuzzyCharacter size={70} says={chapter.buzzyCommentary} animate />
              </div>
            </div>
          </div>

          {/* Story twist */}
          {!revealed && (
            <div className="card" style={{ marginTop: 'var(--sp-lg)', background: 'rgba(26,26,46,0.9)', textAlign: 'center' }}>
              <p style={{ fontSize: '1rem', marginBottom: 'var(--sp-md)', color: 'var(--text-primary)', fontWeight: 600 }}>
                {chapter.storyTwist.prompt}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-sm)' }}>
                {chapter.storyTwist.options.map((opt, i) => (
                  <button
                    key={i}
                    className="btn btn-ghost"
                    style={{ justifyContent: 'flex-start', textAlign: 'left' }}
                    onClick={() => setRevealed(true)}
                  >
                    <span style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--primary-dim)', border: '2px solid var(--card-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.95rem', fontWeight: 800, color: 'var(--primary)', flexShrink: 0 }}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {revealed && (
            <div className="card anim-bounce-in" style={{ marginTop: 'var(--sp-lg)', background: 'rgba(67,233,123,0.1)', border: '2px solid var(--accent)', textAlign: 'center' }}>
              <p style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '1.1rem' }}>
                Great choice!
              </p>
              <p style={{ color: 'var(--text-primary)', margin: '8px 0 0' }}>
                {chapter.storyTwist.options[0].consequence}
              </p>
            </div>
          )}

          {/* CTA */}
          <div className="sticky-bottom" style={{ marginTop: 'var(--sp-lg)' }}>
            <button
              className="btn btn-primary btn-lg btn-full"
              onClick={() => setScreen('challenge')}
            >
              Begin the Battle!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
