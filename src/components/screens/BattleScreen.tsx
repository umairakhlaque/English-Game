import React, { useEffect, useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { storyChapters } from '../../data/story';
import { LexCharacter } from '../characters/LexCharacter';
import { MinionCharacter } from '../characters/MinionCharacter';

type Phase = 'charge' | 'swing' | 'projectile' | 'explode' | 'done';

const PARTICLE_COLORS = ['#6C63FF', '#FF6584', '#43E97B', '#F7B731', '#60A5FA'];

export const BattleScreen: React.FC = () => {
  const { currentChapterId, currentQuestions, currentQuestionIndex, setScreen, nextQuestion } = useGameStore();

  const [phase, setPhase] = useState<Phase>('charge');
  const [particles, setParticles] = useState<{ id: number; color: string; tx: number; ty: number; size: number }[]>([]);

  const chapter = storyChapters.find((c) => c.id === currentChapterId);
  const question = currentQuestions[Math.max(0, currentQuestionIndex - 1)] ?? currentQuestions[currentQuestionIndex];

  useEffect(() => {
    // Sequence: charge(0.6s) → swing(0.5s) → projectile(0.7s) → explode(0.6s) → done
    const t1 = setTimeout(() => setPhase('swing'), 600);
    const t2 = setTimeout(() => setPhase('projectile'), 1100);
    const t3 = setTimeout(() => {
      setPhase('explode');
      setParticles(
        Array.from({ length: 12 }, (_, i) => ({
          id: i,
          color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
          tx: (Math.random() - 0.5) * 120,
          ty: -(20 + Math.random() * 80),
          size: 6 + Math.floor(Math.random() * 10),
        }))
      );
    }, 1800);
    const t4 = setTimeout(() => {
      setPhase('done');
      nextQuestion();
    }, 2500);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className="screen"
      style={{
        background: 'radial-gradient(ellipse at center, #2D1B69 0%, #0F0E17 80%)',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Lightning bg streaks */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {[20, 50, 75].map((left, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${left}%`,
            top: 0,
            width: 1,
            height: '100%',
            background: `linear-gradient(180deg, transparent, rgba(108,99,255,${0.05 + i * 0.03}), transparent)`,
            animation: `pulse-glow ${2 + i}s ease-in-out infinite`,
          }} />
        ))}
      </div>

      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 'var(--sp-xl)', maxWidth: 600, width: '100%', padding: 'var(--sp-lg)',
        position: 'relative', zIndex: 1,
      }}>
        {/* Battle title */}
        <div style={{ textAlign: 'center', animation: 'fade-in 0.3s ease forwards' }}>
          <h2 style={{ color: 'var(--secondary)', textShadow: '0 0 16px rgba(255,101,132,0.5)' }}>
            WORD POWER!
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: 4 }}>Chapter {currentChapterId} · {chapter?.world}</p>
        </div>

        {/* Character arena */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', width: '100%', gap: 'var(--sp-lg)' }}>
          {/* Lex */}
          <div style={{ textAlign: 'center' }}>
            <LexCharacter
              size={110}
              animate={false}
              swinging={phase === 'swing'}
            />
          </div>

          {/* Projectile word */}
          <div style={{ flex: 1, position: 'relative', height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {(phase === 'projectile') && (
              <div
                className="anim-projectile"
                style={{
                  position: 'absolute',
                  background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                  borderRadius: 12,
                  padding: '10px 20px',
                  fontWeight: 900,
                  fontSize: '1.2rem',
                  color: '#fff',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 0 24px var(--primary-glow)',
                  filter: 'drop-shadow(0 0 8px rgba(67,233,123,0.6))',
                }}
              >
                {question?.word ?? '...'}
              </div>
            )}
          </div>

          {/* Enemy */}
          <div style={{ textAlign: 'center', position: 'relative' }}>
            {/* Particles */}
            {phase === 'explode' && particles.map((p) => (
              <div
                key={p.id}
                className="particle"
                style={{
                  background: p.color,
                  width: p.size,
                  height: p.size,
                  // @ts-expect-error CSS custom props
                  '--tx': `${p.tx}px`,
                  '--ty': `${p.ty}px`,
                  left: '50%',
                  top: '50%',
                  borderRadius: Math.random() > 0.5 ? '50%' : 2,
                  animationDuration: '0.6s',
                }}
              />
            ))}
            <div
              style={{
                opacity: phase === 'explode' || phase === 'done' ? 0 : 1,
                transition: 'opacity 0.2s ease',
                animation: phase === 'charge' ? 'charge-in 0.6s cubic-bezier(0.16,1,0.3,1) forwards' : undefined,
              }}
            >
              <MinionCharacter
                size={110}
                name={phase === 'explode' ? '' : (chapter?.minionName ?? 'Minion')}
                animate={false}
              />
            </div>
          </div>
        </div>

        {/* Word display */}
        <div style={{
          background: 'rgba(26,26,46,0.9)', border: '2px solid var(--card-border)',
          borderRadius: 'var(--radius-lg)', padding: 'var(--sp-lg)', textAlign: 'center',
          width: '100%', backdropFilter: 'blur(16px)',
        }}>
          <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: 8 }}>Power Spell</div>
          <div style={{
            fontSize: '2.5rem', fontWeight: 900,
            background: 'linear-gradient(135deg, var(--primary), var(--accent))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: 'none',
            filter: 'drop-shadow(0 0 12px rgba(108,99,255,0.5))',
          }}>
            {question?.word ?? '...'}
          </div>
          {question?.wordEntry && (
            <p style={{ margin: '8px 0 0', fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
              {question.wordEntry.definition}
            </p>
          )}
        </div>

        {/* Phase status */}
        <div style={{ display: 'flex', gap: 'var(--sp-sm)', alignItems: 'center' }}>
          {(['charge', 'swing', 'projectile', 'explode'] as Phase[]).map((p) => (
            <div key={p} style={{
              width: 8, height: 8, borderRadius: '50%',
              background: phase === p ? 'var(--primary)' : 'rgba(255,255,255,0.15)',
              transition: 'background 0.2s',
              boxShadow: phase === p ? '0 0 8px var(--primary-glow)' : 'none',
            }} />
          ))}
        </div>
      </div>
    </div>
  );
};
