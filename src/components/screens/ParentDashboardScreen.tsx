import React, { useState } from 'react';
import { useGameStore, verifyPin } from '../../store/gameStore';
import { storyChapters } from '../../data/story';
import { YearBand } from '../../types';
import { PinKeypad } from '../ui/PinKeypad';
import { AvatarPicker } from '../ui/AvatarPicker';

type DashboardView = 'pin' | 'dashboard';

const YEAR_COLORS: Record<number, string> = {
  1: 'var(--accent)',
  2: '#60A5FA',
  3: 'var(--primary)',
  4: 'var(--secondary)',
  5: 'var(--warning)',
};

const YEAR_BANDS: YearBand[] = [1, 2, 3, 4, 5];

export const ParentDashboardScreen: React.FC = () => {
  const {
    setScreen, profile, stats, wordCoins, levelProgress, dictionary,
    updateProfile, resetProgress,
  } = useGameStore();

  const [view, setView] = useState<DashboardView>('pin');
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [showReset, setShowReset] = useState(false);
  const [showChangePin, setShowChangePin] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [changePinStep, setChangePinStep] = useState<'new' | 'confirm'>('new');
  const [changePinError, setChangePinError] = useState('');
  const [showChangeYear, setShowChangeYear] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handlePinSubmit = () => {
    if (!profile.pinHash) {
      // No PIN set (shouldn't happen after registration)
      setView('dashboard');
      return;
    }
    if (verifyPin(pinInput, profile.pinHash)) {
      setView('dashboard');
      setPinError('');
    } else {
      setPinError('Incorrect PIN. Please try again.');
      setPinInput('');
    }
  };

  // Auto-submit when 4 digits entered
  React.useEffect(() => {
    if (pinInput.length === 4 && view === 'pin') {
      handlePinSubmit();
    }
  }, [pinInput]); // eslint-disable-line react-hooks/exhaustive-deps

  const completedChapters = Object.values(levelProgress).filter((p) => p.completed).length;
  const accuracy = stats.totalQuestionsAnswered > 0
    ? Math.round((stats.totalCorrect / stats.totalQuestionsAnswered) * 100)
    : 0;
  const timePlayed = Math.round((Date.now() - stats.sessionStartTime) / 60000);

  // Words per year band
  const wordsByYear = YEAR_BANDS.map((y) => ({
    year: y,
    count: dictionary.filter((d) => d.yearBand === y).length,
    total: storyChapters.flatMap((c) => c.targetWords).filter((w, _i, arr) => {
      const entry = dictionary.find((d) => d.word === w);
      return entry ? entry.yearBand === y : false;
    }).length,
  }));

  const handleResetProgress = () => {
    resetProgress();
    setShowReset(false);
    setSuccessMsg('Progress has been reset.');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleChangePin = () => {
    if (changePinStep === 'new') {
      if (newPin.length < 4) { setChangePinError('Enter all 4 digits.'); return; }
      setChangePinStep('confirm');
      setChangePinError('');
    } else {
      if (confirmPin !== newPin) {
        setChangePinError("PINs don't match.");
        setConfirmPin('');
        return;
      }
      // Apply new pin via obfuscation in store
      const { obfuscatePin } = (() => {
        function obfuscatePin(pin: string): string {
          return btoa(pin.split('').map((c, i) => String.fromCharCode(c.charCodeAt(0) ^ (i + 7))).join(''));
        }
        return { obfuscatePin };
      })();
      updateProfile({ pinHash: obfuscatePin(newPin) });
      setShowChangePin(false);
      setNewPin('');
      setConfirmPin('');
      setChangePinStep('new');
      setSuccessMsg('PIN updated successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  };

  // PIN entry screen
  if (view === 'pin') {
    return (
      <div className="screen screen-gradient" style={{ alignItems: 'center', justifyContent: 'center', padding: 'var(--sp-lg)' }}>
        <div style={{ maxWidth: 400, width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--sp-xl)' }}>
            <h2 style={{ marginBottom: 8 }}>Parent Dashboard</h2>
            <p>Enter your 4-digit PIN to access the parent area.</p>
          </div>

          <div className="card card-glow">
            <PinKeypad
              value={pinInput}
              onChange={(v) => { setPinInput(v); setPinError(''); }}
              label="Enter Parent PIN"
            />
            {pinError && (
              <p style={{ color: 'var(--danger)', textAlign: 'center', marginTop: 'var(--sp-sm)', fontWeight: 600 }}>{pinError}</p>
            )}
            <button
              className="btn btn-primary btn-full"
              style={{ marginTop: 'var(--sp-lg)' }}
              onClick={handlePinSubmit}
              disabled={pinInput.length < 4}
            >
              Unlock
            </button>
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--sp-lg)' }}>
            <button className="btn btn-ghost btn-sm" onClick={() => setScreen('home')}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard view
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
        <span className="topbar-title">Parent Dashboard</span>
        <button className="btn btn-ghost btn-sm" onClick={() => setView('pin')}>
          Lock
        </button>
      </div>

      <div className="scroll-content">
        <div className="container" style={{ maxWidth: 700 }}>
          {successMsg && (
            <div className="anim-bounce-in" style={{
              background: 'rgba(67,233,123,0.15)', border: '2px solid var(--accent)',
              borderRadius: 'var(--radius-md)', padding: 'var(--sp-md)', textAlign: 'center',
              marginBottom: 'var(--sp-md)', color: 'var(--accent)', fontWeight: 700,
            }}>
              {successMsg}
            </div>
          )}

          {/* Child profile card */}
          <div className="card card-glow" style={{ marginBottom: 'var(--sp-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-lg)', flexWrap: 'wrap' }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: 'var(--primary-dim)', border: '2px solid var(--card-border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.8rem', flexShrink: 0,
              }} aria-hidden="true">
                {profile.avatar === 'knight' ? '⚔️' : profile.avatar === 'wizard' ? '🔮' : profile.avatar === 'archer' ? '🏹' : '🥷'}
              </div>
              <div>
                <h3 style={{ marginBottom: 2 }}>{profile.name}</h3>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <span className="badge badge-primary">Year {profile.yearBand}</span>
                  <span className="badge badge-accent">{profile.avatar}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats grid */}
          <h3 style={{ marginBottom: 'var(--sp-md)', fontSize: '1rem' }}>Progress Overview</h3>
          <div className="stats-grid" style={{ marginBottom: 'var(--sp-lg)' }}>
            <div className="stat-card">
              <div className="stat-value" style={{ color: 'var(--accent)' }}>{stats.totalWordsLearned}</div>
              <div className="stat-label">Words Learned</div>
            </div>
            <div className="stat-card">
              <div className="stat-value" style={{ color: 'var(--primary)' }}>{accuracy}%</div>
              <div className="stat-label">Accuracy</div>
            </div>
            <div className="stat-card">
              <div className="stat-value" style={{ color: 'var(--secondary)' }}>{completedChapters}</div>
              <div className="stat-label">Chapters Done</div>
            </div>
            <div className="stat-card">
              <div className="stat-value" style={{ color: 'var(--warning)' }}>{wordCoins}</div>
              <div className="stat-label">Word Coins</div>
            </div>
          </div>

          {/* Overall questions */}
          <div className="card" style={{ marginBottom: 'var(--sp-lg)' }}>
            <h4 style={{ marginBottom: 'var(--sp-sm)' }}>Questions Answered</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Correct vs Total</span>
              <span style={{ fontWeight: 700 }}>{stats.totalCorrect} / {stats.totalQuestionsAnswered}</span>
            </div>
            <div className="progress-track">
              <div
                className="progress-fill-accent progress-fill"
                style={{ width: stats.totalQuestionsAnswered > 0 ? `${(stats.totalCorrect / stats.totalQuestionsAnswered) * 100}%` : '0%' }}
              />
            </div>
            <p style={{ fontSize: '0.8rem', marginTop: 8 }}>Session time: ~{timePlayed} min</p>
          </div>

          {/* Progress per Year band */}
          <h3 style={{ marginBottom: 'var(--sp-md)', fontSize: '1rem' }}>Progress by Year Band</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-sm)', marginBottom: 'var(--sp-lg)' }}>
            {YEAR_BANDS.map((y) => {
              const learnedForYear = dictionary.filter((d) => d.yearBand === y).length;
              // Approximate total from wordData - 18, 20, 58, 47, 27 approximately
              const totals: Record<YearBand, number> = { 1: 18, 2: 20, 3: 58, 4: 47, 5: 27 };
              const total = totals[y];
              const pct = total > 0 ? Math.round((learnedForYear / total) * 100) : 0;

              return (
                <div key={y}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 700 }}>Year {y}</span>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{learnedForYear}/{total} words ({pct}%)</span>
                  </div>
                  <div className="progress-track" style={{ height: 8 }}>
                    <div
                      className="progress-fill"
                      style={{ width: `${pct}%`, background: YEAR_COLORS[y] }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chapter progress */}
          <h3 style={{ marginBottom: 'var(--sp-md)', fontSize: '1rem' }}>Chapter Results</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-sm)', marginBottom: 'var(--sp-lg)' }}>
            {storyChapters.map((ch) => {
              const p = levelProgress[ch.id];
              return (
                <div key={ch.id} className="card" style={{ padding: 'var(--sp-md)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-sm)' }}>
                    <span style={{ fontSize: '1.3rem' }} aria-hidden="true">{ch.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Ch.{ch.id}: {ch.title}</span>
                        {p?.completed ? (
                          <div style={{ display: 'flex', gap: 3 }}>
                            {[1, 2, 3].map((s) => (
                              <div key={s} className={`star-icon sm${s <= (p.stars ?? 0) ? ' filled' : ''}`} />
                            ))}
                          </div>
                        ) : (
                          <span className="badge" style={{ background: 'rgba(167,169,190,0.1)', color: 'var(--text-secondary)', fontSize: '0.7rem', border: '1px solid var(--card-border)' }}>
                            {ch.id <= Object.values(levelProgress).filter((x) => x.completed).length + 1 ? 'Not started' : 'Locked'}
                          </span>
                        )}
                      </div>
                      {p?.completed && (
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                          Accuracy: {Math.round((p.accuracy ?? 0) * 100)}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Settings */}
          <h3 style={{ marginBottom: 'var(--sp-md)', fontSize: '1rem' }}>Settings</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-md)', marginBottom: 'var(--sp-2xl)' }}>

            {/* Change Year Band */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: showChangeYear ? 'var(--sp-md)' : 0 }}>
                <div>
                  <h4 style={{ marginBottom: 2 }}>Change Year Band</h4>
                  <p style={{ fontSize: '0.875rem', margin: 0 }}>Current: Year {profile.yearBand}</p>
                </div>
                <button className="btn btn-ghost btn-sm" onClick={() => setShowChangeYear(!showChangeYear)}>
                  {showChangeYear ? 'Cancel' : 'Change'}
                </button>
              </div>
              {showChangeYear && (
                <div className="anim-slide-up">
                  <div className="year-grid" style={{ marginBottom: 'var(--sp-md)' }}>
                    {YEAR_BANDS.map((y) => (
                      <button
                        key={y}
                        className={`year-card${profile.yearBand === y ? ' selected' : ''}`}
                        onClick={() => updateProfile({ yearBand: y })}
                        type="button"
                      >
                        <h4>Year {y}</h4>
                      </button>
                    ))}
                  </div>
                  <button className="btn btn-accent btn-sm" onClick={() => setShowChangeYear(false)}>Save</button>
                </div>
              )}
            </div>

            {/* Change Avatar */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--sp-md)' }}>
                <div>
                  <h4 style={{ marginBottom: 2 }}>Change Avatar</h4>
                  <p style={{ fontSize: '0.875rem', margin: 0 }}>Current: {profile.avatar}</p>
                </div>
              </div>
              <AvatarPicker selected={profile.avatar} onSelect={(av) => updateProfile({ avatar: av })} />
            </div>

            {/* Change PIN */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: showChangePin ? 'var(--sp-lg)' : 0 }}>
                <div>
                  <h4 style={{ marginBottom: 2 }}>Change Parent PIN</h4>
                  <p style={{ fontSize: '0.875rem', margin: 0 }}>Update your 4-digit PIN</p>
                </div>
                <button className="btn btn-ghost btn-sm" onClick={() => { setShowChangePin(!showChangePin); setChangePinStep('new'); setNewPin(''); setConfirmPin(''); setChangePinError(''); }}>
                  {showChangePin ? 'Cancel' : 'Change'}
                </button>
              </div>
              {showChangePin && (
                <div className="anim-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-md)', alignItems: 'center' }}>
                  {changePinStep === 'new' ? (
                    <PinKeypad value={newPin} onChange={(v) => { setNewPin(v); setChangePinError(''); }} label="Enter new PIN" />
                  ) : (
                    <PinKeypad value={confirmPin} onChange={(v) => { setConfirmPin(v); setChangePinError(''); }} label="Confirm new PIN" />
                  )}
                  {changePinError && <p style={{ color: 'var(--danger)', fontWeight: 600, fontSize: '0.875rem' }}>{changePinError}</p>}
                  <button className="btn btn-primary btn-full" onClick={handleChangePin}>
                    {changePinStep === 'new' ? 'Continue' : 'Save PIN'}
                  </button>
                </div>
              )}
            </div>

            {/* Reset progress */}
            <div className="card" style={{ border: '1px solid rgba(255,71,87,0.3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ marginBottom: 2, color: 'var(--danger)' }}>Reset Progress</h4>
                  <p style={{ fontSize: '0.875rem', margin: 0 }}>Clear all game progress (keeps profile)</p>
                </div>
                <button className="btn btn-danger btn-sm" onClick={() => setShowReset(true)}>Reset</button>
              </div>
              {showReset && (
                <div className="anim-slide-up" style={{ marginTop: 'var(--sp-md)', padding: 'var(--sp-md)', background: 'rgba(255,71,87,0.1)', borderRadius: 'var(--radius-sm)' }}>
                  <p style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: 'var(--sp-sm)' }}>
                    Are you sure? All progress, coins and learned words will be deleted.
                  </p>
                  <div style={{ display: 'flex', gap: 'var(--sp-sm)' }}>
                    <button className="btn btn-ghost btn-sm" style={{ flex: 1 }} onClick={() => setShowReset(false)}>Cancel</button>
                    <button className="btn btn-danger btn-sm" style={{ flex: 1 }} onClick={handleResetProgress}>Yes, Reset</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
