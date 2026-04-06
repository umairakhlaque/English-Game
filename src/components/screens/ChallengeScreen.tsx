import React, { useState, useEffect, useCallback } from 'react';
import { useGameStore } from '../../store/gameStore';
import { storyChapters } from '../../data/story';
import { LexCharacter } from '../characters/LexCharacter';
import { MinionCharacter } from '../characters/MinionCharacter';
import { BuzzyCharacter } from '../characters/BuzzyCharacter';
import { HPBar } from '../ui/HPBar';
import { CoinAnimation } from '../ui/CoinAnimation';

const LABELS = ['A', 'B', 'C', 'D'];

export const ChallengeScreen: React.FC = () => {
  const {
    currentChapterId, currentQuestions, currentQuestionIndex,
    currentAnswerResult, currentChosenAnswer, showBuzzyHint,
    submitAnswer, nextQuestion, toggleBuzzyHint, setScreen,
    wordCoins, chapterSessionCorrect, chapterSessionTotal,
    battleAnimating,
  } = useGameStore();

  const [shaking, setShaking] = useState(false);
  const [showCoin, setShowCoin] = useState(false);
  const [lexSwing, setLexSwing] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const chapter = storyChapters.find((c) => c.id === currentChapterId);
  const question = currentQuestions[currentQuestionIndex];
  const total = currentQuestions.length;

  // HP calculations
  const enemyMaxHP = total * 10;
  const enemyCurrentHP = Math.max(0, enemyMaxHP - (chapterSessionCorrect * 10));
  const heroMaxHP = 100;
  const heroCurrentHP = Math.max(0, heroMaxHP - ((chapterSessionTotal - chapterSessionCorrect) * 20));

  useEffect(() => {
    setSubmitted(false);
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (currentAnswerResult === 'wrong') {
      setShaking(true);
      const t = setTimeout(() => setShaking(false), 600);
      return () => clearTimeout(t);
    }
    if (currentAnswerResult === 'correct') {
      setShowCoin(true);
      setLexSwing(true);
      const t1 = setTimeout(() => setShowCoin(false), 1200);
      const t2 = setTimeout(() => setLexSwing(false), 600);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [currentAnswerResult]);

  useEffect(() => {
    if (battleAnimating) {
      const t = setTimeout(() => setScreen('battle'), 400);
      return () => clearTimeout(t);
    }
  }, [battleAnimating, setScreen]);

  const handleAnswer = useCallback((answer: string) => {
    if (submitted || currentAnswerResult !== null) return;
    setSubmitted(true);
    submitAnswer(answer);
  }, [submitted, currentAnswerResult, submitAnswer]);

  const handleNext = () => {
    nextQuestion();
  };

  if (!question || !chapter) {
    return (
      <div className="screen flex-center">
        <p>Loading challenge...</p>
      </div>
    );
  }

  const getCardClass = (option: string) => {
    let cls = 'answer-card';
    if (currentAnswerResult === null) return cls;
    if (option === question.correctAnswer) return cls + ' correct';
    if (option === currentChosenAnswer && currentAnswerResult === 'wrong') return cls + ' wrong';
    return cls;
  };

  return (
    <div className={`screen screen-gradient${shaking ? ' anim-shake' : ''}`}>
      <CoinAnimation trigger={showCoin} count={5} originX={window.innerWidth * 0.7} originY={200} />

      {/* Top bar */}
      <div className="topbar">
        <button className="btn btn-ghost btn-sm" onClick={() => setScreen('map')} aria-label="Back to map">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        <div style={{ flex: 1, maxWidth: 240 }}>
          <div className="progress-track" style={{ height: 8 }}>
            <div
              className="progress-fill"
              style={{ width: `${((currentQuestionIndex) / total) * 100}%` }}
              role="progressbar"
              aria-valuenow={currentQuestionIndex}
              aria-valuemax={total}
              aria-label={`Question ${currentQuestionIndex + 1} of ${total}`}
            />
          </div>
          <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 4 }}>
            {currentQuestionIndex + 1} / {total}
          </div>
        </div>
        <div className="coin-counter" aria-label={`${wordCoins} word coins`}>
          <div className="coin" aria-hidden="true">W</div>
          {wordCoins}
        </div>
      </div>

      <div className="scroll-content">
        <div className="container" style={{ maxWidth: 700 }}>

          {/* Battle arena */}
          <div className="card" style={{ marginBottom: 'var(--sp-md)', padding: 'var(--sp-md)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 'var(--sp-lg)' }}>
              {/* Lex side */}
              <div style={{ flex: 1 }}>
                <HPBar current={heroCurrentHP} max={heroMaxHP} label="Lex" variant="hero" />
                <div style={{ textAlign: 'center', marginTop: 'var(--sp-sm)' }}>
                  <LexCharacter size={90} animate={false} swinging={lexSwing} />
                </div>
              </div>

              {/* VS */}
              <div style={{ flexShrink: 0, textAlign: 'center' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--secondary)', textShadow: '0 0 8px rgba(255,101,132,0.5)' }}>VS</span>
              </div>

              {/* Enemy side */}
              <div style={{ flex: 1 }}>
                <HPBar current={enemyCurrentHP} max={enemyMaxHP} label={chapter.minionName} variant="enemy" />
                <div style={{ textAlign: 'center', marginTop: 'var(--sp-sm)' }}>
                  <MinionCharacter
                    size={90}
                    name=""
                    animate={false}
                    wiggling={currentAnswerResult === 'wrong'}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Question card */}
          <div className="card card-glow" style={{ marginBottom: 'var(--sp-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-sm)', marginBottom: 'var(--sp-sm)' }}>
              <span className="badge badge-primary">{question.type === 'cloze' ? 'Fill the Blank' : question.type === 'multipleChoice' ? 'Multiple Choice' : question.type === 'wordScramble' ? 'Unscramble' : 'Build It'}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Word: <strong style={{ color: 'var(--text-primary)' }}>{question.word}</strong></span>
            </div>

            {/* Sentence / question */}
            {question.sentence && (
              <p style={{
                fontSize: '1.15rem', lineHeight: 1.7, color: 'var(--text-primary)',
                fontWeight: 600, margin: '0 0 var(--sp-sm)',
                borderLeft: '3px solid var(--primary)', paddingLeft: 'var(--sp-sm)',
              }}>
                {question.sentence}
              </p>
            )}
            {question.type === 'wordScramble' && question.scrambled && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 'var(--sp-sm)' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', width: '100%' }}>Unscramble these letters:</span>
                {question.scrambled.map((letter, i) => (
                  <div key={i} style={{
                    width: 44, height: 44, borderRadius: 10, background: 'var(--primary-dim)',
                    border: '2px solid var(--card-border)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.3rem', fontWeight: 900, color: 'var(--primary)',
                  }}>
                    {letter.toUpperCase()}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Answer options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-sm)', marginBottom: 'var(--sp-md)' }}>
            {question.options.map((option, i) => (
              <button
                key={`${question.id}-${i}`}
                className={getCardClass(option)}
                onClick={() => handleAnswer(option)}
                disabled={currentAnswerResult !== null}
                aria-label={`Option ${LABELS[i]}: ${option}`}
              >
                <div className="answer-label">{LABELS[i]}</div>
                <span className="answer-text">{option}</span>
                {currentAnswerResult !== null && option === question.correctAnswer && (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }} aria-hidden="true">
                    <circle cx="10" cy="10" r="10" fill="#43E97B" />
                    <path d="M5 10 L8.5 13.5 L15 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                {currentAnswerResult === 'wrong' && option === currentChosenAnswer && (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }} aria-hidden="true">
                    <circle cx="10" cy="10" r="10" fill="#FF4757" />
                    <path d="M7 7 L13 13 M13 7 L7 13" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                )}
              </button>
            ))}
          </div>

          {/* Hint + Buzzy */}
          <div style={{ marginBottom: 'var(--sp-md)' }}>
            {!showBuzzyHint ? (
              <button className="btn btn-ghost btn-sm" onClick={toggleBuzzyHint} style={{ gap: 8 }}>
                <BuzzyCharacter size={28} animate={false} />
                Ask Buzzy for a hint
              </button>
            ) : (
              <div className="anim-slide-up-full">
                <BuzzyCharacter size={60} animate says={question.buzzySays} />
              </div>
            )}
          </div>

          {/* Result feedback */}
          {currentAnswerResult === 'correct' && (
            <div className="anim-bounce-in" style={{
              background: 'rgba(67,233,123,0.15)', border: '2px solid var(--accent)',
              borderRadius: 'var(--radius-md)', padding: 'var(--sp-md)', textAlign: 'center', marginBottom: 'var(--sp-md)',
            }}>
              <p style={{ color: 'var(--accent)', fontWeight: 800, fontSize: '1.1rem', margin: 0 }}>
                Excellent! +10 coins!
              </p>
            </div>
          )}
          {currentAnswerResult === 'wrong' && (
            <div className="anim-scale-pop" style={{
              background: 'rgba(255,71,87,0.1)', border: '2px solid var(--danger)',
              borderRadius: 'var(--radius-md)', padding: 'var(--sp-md)', textAlign: 'center', marginBottom: 'var(--sp-md)',
            }}>
              <p style={{ color: 'var(--danger)', fontWeight: 800, fontSize: '1rem', margin: 0 }}>
                Not quite! The answer was: <strong>{question.correctAnswer}</strong>
              </p>
              <p style={{ color: 'var(--text-secondary)', margin: '4px 0 0', fontSize: '0.875rem' }}>
                {question.hint}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Sticky bottom: Continue */}
      {currentAnswerResult !== null && (
        <div className="sticky-bottom anim-slide-up-full">
          <button className="btn btn-primary btn-lg btn-full" onClick={handleNext}>
            {currentQuestionIndex < currentQuestions.length - 1 ? 'Next Question' : 'Finish Chapter'}
          </button>
        </div>
      )}
    </div>
  );
};
