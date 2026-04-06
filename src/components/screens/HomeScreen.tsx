import React, { useState, useEffect } from 'react';
import { useGameStore } from '../../store/gameStore';
import { YearBand, AvatarType } from '../../types';
import { LexCharacter } from '../characters/LexCharacter';
import { AvatarPicker } from '../ui/AvatarPicker';
import { PinKeypad } from '../ui/PinKeypad';
import { storyChapters } from '../../data/story';

type RegistrationStep = 'welcome' | 'name' | 'year' | 'avatar' | 'pin' | 'confirmPin';

const YEAR_AGES: Record<YearBand, string> = {
  1: 'Ages 5–6',
  2: 'Ages 6–7',
  3: 'Ages 7–8',
  4: 'Ages 8–9',
  5: 'Ages 9–10',
};

const YEAR_DESCRIPTIONS: Record<YearBand, string> = {
  1: 'Phonics & sight words',
  2: 'Building sentences',
  3: 'Word meanings & spelling',
  4: 'Complex vocabulary',
  5: 'Advanced language',
};

export const HomeScreen: React.FC = () => {
  const { isRegistered, profile, completeRegistration, setScreen, levelProgress, stats, wordCoins } = useGameStore();

  const [step, setStep] = useState<RegistrationStep>('welcome');
  const [name, setName] = useState('');
  const [yearBand, setYearBand] = useState<YearBand>(1);
  const [avatar, setAvatar] = useState<AvatarType>('knight');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [nameError, setNameError] = useState('');
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setTitleVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  // ── Return visit ───────────────────────────────────────────
  if (isRegistered) {
    const completedChapters = Object.values(levelProgress).filter((p) => p.completed).length;
    const currentChapter = Math.min(completedChapters + 1, storyChapters.length);
    const accuracy = stats.totalQuestionsAnswered > 0
      ? Math.round((stats.totalCorrect / stats.totalQuestionsAnswered) * 100)
      : 0;

    return (
      <div className="screen screen-gradient" style={{ alignItems: 'center', justifyContent: 'center', padding: 'var(--sp-lg)' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          {Array.from({ length: 30 }, (_, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: 2 + (i % 3),
              height: 2 + (i % 3),
              background: '#fff',
              borderRadius: '50%',
              left: `${(i * 3.3) % 100}%`,
              top: `${(i * 7.1) % 100}%`,
              opacity: 0.1 + (i % 5) * 0.05,
            }} />
          ))}
        </div>

        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: 'var(--sp-xl)', maxWidth: 480, width: '100%', position: 'relative', zIndex: 1,
          opacity: titleVisible ? 1 : 0, transform: titleVisible ? 'none' : 'translateY(20px)',
          transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
        }}>
          <div style={{ textAlign: 'center' }}>
            <h1 className="text-gradient" style={{ lineHeight: 1, marginBottom: 4 }}>WordQuest</h1>
            <h2 style={{ color: 'var(--text-secondary)', fontWeight: 700, fontSize: '1.4rem' }}>Heroes</h2>
          </div>

          <LexCharacter size={160} animate />

          <div className="card card-glow" style={{ width: '100%', textAlign: 'center' }}>
            <h3 style={{ marginBottom: 'var(--sp-xs)' }}>
              Welcome back, <span style={{ color: 'var(--primary)' }}>{profile.name}</span>!
            </h3>
            <p style={{ marginBottom: 'var(--sp-lg)', fontSize: '0.95rem' }}>
              Ready to continue your adventure?
            </p>
            <div className="stats-grid" style={{ marginBottom: 'var(--sp-lg)' }}>
              <div className="stat-card">
                <div className="stat-value" style={{ color: 'var(--warning)' }}>{wordCoins}</div>
                <div className="stat-label">Word Coins</div>
              </div>
              <div className="stat-card">
                <div className="stat-value" style={{ color: 'var(--accent)' }}>{stats.totalWordsLearned}</div>
                <div className="stat-label">Words Learned</div>
              </div>
              <div className="stat-card">
                <div className="stat-value" style={{ color: 'var(--primary)' }}>{completedChapters}</div>
                <div className="stat-label">Chapters Done</div>
              </div>
              <div className="stat-card">
                <div className="stat-value" style={{ color: 'var(--secondary)' }}>{accuracy}%</div>
                <div className="stat-label">Accuracy</div>
              </div>
            </div>
            <button className="btn btn-primary btn-lg btn-full" onClick={() => setScreen('map')}>
              Continue — Chapter {currentChapter}
            </button>
          </div>

          <div style={{ display: 'flex', gap: 'var(--sp-md)', width: '100%' }}>
            <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setScreen('dictionary')}>
              My Dictionary
            </button>
            <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setScreen('parentDashboard')}>
              Parent Area
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Registration flow ──────────────────────────────────────
  const stepList: RegistrationStep[] = ['name', 'year', 'avatar', 'pin', 'confirmPin'];
  const stepIndex = stepList.indexOf(step);

  const goToStep = (s: RegistrationStep) => {
    setStep(s);
    setNameError('');
    setPinError('');
  };

  const handleNameNext = () => {
    if (!name.trim() || name.trim().length < 2) {
      setNameError('Please enter at least 2 characters.');
      return;
    }
    goToStep('year');
  };

  const handlePinNext = () => {
    if (pin.length < 4) { setPinError('Please enter all 4 digits.'); return; }
    goToStep('confirmPin');
  };

  const handleConfirmPin = () => {
    if (confirmPin !== pin) {
      setPinError("PINs don't match. Please try again.");
      setConfirmPin('');
      return;
    }
    completeRegistration(name.trim(), yearBand, avatar, pin);
    setScreen('map');
  };

  return (
    <div className="screen screen-gradient" style={{ alignItems: 'center', justifyContent: 'center', padding: 'var(--sp-lg)' }}>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} style={{
            position: 'absolute', width: 2, height: 2, background: '#fff', borderRadius: '50%',
            left: `${(i * 5) % 100}%`, top: `${(i * 4.7) % 100}%`, opacity: 0.15,
          }} />
        ))}
      </div>

      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--sp-lg)',
        maxWidth: 520, width: '100%', position: 'relative', zIndex: 1,
      }}>
        {/* Welcome splash */}
        {step === 'welcome' && (
          <div className="anim-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--sp-lg)', textAlign: 'center' }}>
            <h1 className="text-gradient text-glow" style={{ lineHeight: 1 }}>WordQuest<br />Heroes</h1>
            <p style={{ fontSize: '1.1rem', maxWidth: 340 }}>An epic vocabulary adventure for young readers!</p>
            <LexCharacter size={180} animate />
            <button className="btn btn-primary btn-lg" onClick={() => goToStep('name')}>
              Start Your Adventure
            </button>
          </div>
        )}

        {/* Step UI */}
        {step !== 'welcome' && (
          <div style={{ width: '100%' }}>
            {/* Lex mini for steps */}
            <div style={{ textAlign: 'center', marginBottom: 'var(--sp-sm)' }}>
              <h2 className="text-gradient" style={{ fontSize: '1.3rem' }}>WordQuest Heroes</h2>
            </div>

            <div className="step-indicator">
              {stepList.map((_, i) => (
                <div key={i} className={`step-dot${i === stepIndex ? ' active' : ''}${i < stepIndex ? ' done' : ''}`} />
              ))}
            </div>

            {/* Step: Name */}
            {step === 'name' && (
              <div className="card card-glow anim-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-lg)' }}>
                <div style={{ textAlign: 'center' }}>
                  <LexCharacter size={80} animate={false} />
                  <h2 style={{ marginTop: 'var(--sp-sm)', marginBottom: 8 }}>What's your name, hero?</h2>
                  <p>Tell us your name so we can begin your quest!</p>
                </div>
                <div>
                  <input
                    className="input-field"
                    type="text"
                    placeholder="Enter your name..."
                    value={name}
                    onChange={(e) => { setName(e.target.value); setNameError(''); }}
                    onKeyDown={(e) => e.key === 'Enter' && handleNameNext()}
                    autoFocus
                    maxLength={30}
                    aria-label="Child's name"
                    style={{ fontSize: '1.3rem', textAlign: 'center' }}
                  />
                  {nameError && (
                    <p style={{ color: 'var(--danger)', fontSize: '0.875rem', marginTop: 8, fontWeight: 600 }}>{nameError}</p>
                  )}
                </div>
                <button className="btn btn-primary btn-lg btn-full" onClick={handleNameNext}>Next</button>
              </div>
            )}

            {/* Step: Year */}
            {step === 'year' && (
              <div className="card card-glow anim-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-lg)' }}>
                <div style={{ textAlign: 'center' }}>
                  <h2 style={{ marginBottom: 8 }}>Which year are you in, {name}?</h2>
                  <p>We'll match the words perfectly to your level.</p>
                </div>
                <div className="year-grid">
                  {([1, 2, 3, 4, 5] as YearBand[]).map((y) => (
                    <button key={y} className={`year-card${yearBand === y ? ' selected' : ''}`} onClick={() => setYearBand(y)} type="button">
                      <h4>Year {y}</h4>
                      <span>{YEAR_AGES[y]}</span>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: 4 }}>{YEAR_DESCRIPTIONS[y]}</div>
                    </button>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 'var(--sp-md)' }}>
                  <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => goToStep('name')}>Back</button>
                  <button className="btn btn-primary" style={{ flex: 2 }} onClick={() => goToStep('avatar')}>Next</button>
                </div>
              </div>
            )}

            {/* Step: Avatar */}
            {step === 'avatar' && (
              <div className="card card-glow anim-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-lg)' }}>
                <div style={{ textAlign: 'center' }}>
                  <h2 style={{ marginBottom: 8 }}>Pick your hero!</h2>
                  <p>Who will you be on your epic quest?</p>
                </div>
                <AvatarPicker selected={avatar} onSelect={setAvatar} />
                <div style={{ display: 'flex', gap: 'var(--sp-md)' }}>
                  <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => goToStep('year')}>Back</button>
                  <button className="btn btn-primary" style={{ flex: 2 }} onClick={() => goToStep('pin')}>Next</button>
                </div>
              </div>
            )}

            {/* Step: PIN */}
            {step === 'pin' && (
              <div className="card card-glow anim-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-lg)', alignItems: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                  <h2 style={{ marginBottom: 8 }}>Parent PIN Setup</h2>
                  <p style={{ maxWidth: 300 }}>Set a secret 4-digit PIN so parents can access the dashboard.</p>
                </div>
                <PinKeypad value={pin} onChange={(v) => { setPin(v); setPinError(''); }} label="Create a 4-digit PIN" />
                {pinError && <p style={{ color: 'var(--danger)', fontSize: '0.875rem', fontWeight: 600 }}>{pinError}</p>}
                <div style={{ display: 'flex', gap: 'var(--sp-md)', width: '100%' }}>
                  <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => goToStep('avatar')}>Back</button>
                  <button className="btn btn-primary" style={{ flex: 2 }} onClick={handlePinNext} disabled={pin.length < 4}>Next</button>
                </div>
              </div>
            )}

            {/* Step: Confirm PIN */}
            {step === 'confirmPin' && (
              <div className="card card-glow anim-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-lg)', alignItems: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                  <h2 style={{ marginBottom: 8 }}>Confirm your PIN</h2>
                  <p>Enter the same PIN again to confirm.</p>
                </div>
                <PinKeypad value={confirmPin} onChange={(v) => { setConfirmPin(v); setPinError(''); }} label="Confirm PIN" />
                {pinError && <p style={{ color: 'var(--danger)', fontSize: '0.875rem', fontWeight: 600 }}>{pinError}</p>}
                <div style={{ display: 'flex', gap: 'var(--sp-md)', width: '100%' }}>
                  <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => { goToStep('pin'); setPin(''); setConfirmPin(''); }}>Back</button>
                  <button className="btn btn-accent" style={{ flex: 2 }} onClick={handleConfirmPin} disabled={confirmPin.length < 4}>
                    Start Adventure!
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
