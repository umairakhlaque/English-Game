import React, { useEffect, useState } from 'react';
import { useGameEngine } from '../../hooks/useGameEngine';
import { useGameStore } from '../../store/gameStore';
import { storyChapters } from '../../data/story';

const PARTICLE_COUNT = 12;

export const BattleScreen: React.FC = () => {
  const { currentQuestion, handleBattleComplete } = useGameEngine();
  const { currentChapterId } = useGameStore();
  const [phase, setPhase] = useState<'charge' | 'strike' | 'result'>('charge');
  const [particles] = useState(() =>
    Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      angle: (360 / PARTICLE_COUNT) * i,
      distance: 40 + Math.random() * 40,
    }))
  );

  const chapter = storyChapters.find((c) => c.id === currentChapterId);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('strike'), 600);
    const t2 = setTimeout(() => setPhase('result'), 1200);
    const t3 = setTimeout(() => handleBattleComplete(), 2400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [handleBattleComplete]);

  return (
    <div className="battle-screen">
      {/* Background flash */}
      <div className={`battle-flash ${phase === 'strike' ? 'flash-active' : ''}`} />

      {/* Word power banner */}
      <div className={`power-word-banner ${phase !== 'charge' ? 'banner-visible' : ''}`}>
        ⚡ POWER WORD! ⚡
        <div className="power-word-text">{currentQuestion?.word.toUpperCase()}</div>
      </div>

      {/* Battle stage */}
      <div className="battle-stage">
        {/* Lex */}
        <div className={`battle-lex-wrap ${phase === 'strike' ? 'lex-strike' : ''} ${phase === 'result' ? 'lex-celebrate' : ''}`}>
          <div style={{ fontSize: '6rem' }}>
            {phase === 'strike' || phase === 'result' ? '🧙‍♂️' : '⚡'}
          </div>
          <div className="battle-name-tag">Lex</div>
          {phase === 'strike' && (
            <div className="sword-slash">⚡📖</div>
          )}
        </div>

        {/* VS */}
        <div className="battle-impact">
          {phase === 'strike' ? '💥' : phase === 'result' ? '✨' : '⚔️'}
        </div>

        {/* Enemy */}
        <div className={`battle-enemy-wrap ${phase === 'strike' ? 'enemy-take-hit' : ''} ${phase === 'result' ? 'enemy-fall' : ''}`}>
          <div style={{ fontSize: '5rem', transition: 'all 0.3s' }}>
            {chapter?.minionEmoji ?? '👺'}
          </div>
          <div className="battle-name-tag">{chapter?.minionName ?? 'Minion'}</div>
        </div>
      </div>

      {/* Sparkle particles */}
      {phase !== 'charge' && (
        <div className="battle-particles" aria-hidden="true">
          {particles.map((p) => (
            <div
              key={p.id}
              className="battle-particle"
              style={{
                transform: `rotate(${p.angle}deg) translateX(${p.distance}px)`,
                animationDelay: `${(p.id / PARTICLE_COUNT) * 0.3}s`,
              }}
            >
              ✨
            </div>
          ))}
        </div>
      )}

      {/* Result message */}
      {phase === 'result' && (
        <div className="battle-result-msg">
          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#F59E0B' }}>
            🌟 Word Power Activated!
          </div>
          <div style={{ fontSize: '1rem', color: '#7C3AED', marginTop: '4px' }}>
            "{currentQuestion?.wordEntry.definition}"
          </div>
        </div>
      )}
    </div>
  );
};
