import React, { useEffect } from 'react';
import { useGameStore } from '../../store/gameStore';
import { useGameEngine } from '../../hooks/useGameEngine';
import { storyChapters } from '../../data/story';
import { Character } from '../ui/Character';
import { Enemy } from '../ui/Enemy';
import { SpeechBubble } from '../ui/SpeechBubble';
import { ProgressBar } from '../ui/ProgressBar';
import { WordCoin } from '../ui/WordCoin';
import { MultipleChoice } from '../game/MultipleChoice';
import { ClozeQuestion } from '../game/ClozeQuestion';
import { WordScramble } from '../game/WordScramble';
import { SentenceBuilder } from '../game/SentenceBuilder';

export const ChallengeScreen: React.FC = () => {
  const {
    currentChapterId,
    currentQuestionIndex,
    currentQuestions,
    wordCoins,
    showBuzzyHint,
    currentAnswerResult,
    currentChosenAnswer,
    toggleBuzzyHint,
    setScreen,
    handleAnswerSubmit,
    handleNextAfterResult,
    currentQuestion,
    speakText,
  } = useGameEngine();

  const chapter = storyChapters.find((c) => c.id === currentChapterId);

  useEffect(() => {
    if (currentQuestion?.word) {
      // Auto-read prompt for accessibility
    }
  }, [currentQuestion]);

  if (!chapter || !currentQuestion) {
    return (
      <div className="challenge-screen">
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ fontSize: '3rem' }}>🎉</div>
          <p>Loading challenge...</p>
          <button className="btn-primary" onClick={() => setScreen('map')}>
            Back to Map
          </button>
        </div>
      </div>
    );
  }

  const isAnswered = !!currentAnswerResult;
  const lexState = currentAnswerResult === 'correct' ? 'attack' : currentAnswerResult === 'wrong' ? 'hurt' : showBuzzyHint ? 'think' : 'idle';
  const enemyState = currentAnswerResult === 'correct' ? 'hurt' : 'idle';

  const renderQuestion = () => {
    const props = {
      question: currentQuestion,
      onAnswer: handleAnswerSubmit,
      chosenAnswer: currentChosenAnswer,
      result: currentAnswerResult,
      disabled: isAnswered,
    };

    switch (currentQuestion.type) {
      case 'cloze':
        return <ClozeQuestion {...props} />;
      case 'multipleChoice':
        return <MultipleChoice {...props} />;
      case 'wordScramble':
        return <WordScramble {...props} result={currentAnswerResult} disabled={isAnswered} />;
      case 'sentenceBuilder':
        return <SentenceBuilder {...props} result={currentAnswerResult} disabled={isAnswered} />;
      default:
        return <MultipleChoice {...props} />;
    }
  };

  return (
    <div className="challenge-screen">
      {/* Top bar */}
      <div className="challenge-topbar">
        <button className="back-btn" onClick={() => setScreen('map')}>
          ✕
        </button>

        <ProgressBar
          current={currentQuestionIndex + (isAnswered ? 1 : 0)}
          total={currentQuestions.length}
          color="#7C3AED"
          label={`Question ${currentQuestionIndex + 1}/${currentQuestions.length}`}
        />

        <WordCoin count={wordCoins} />
      </div>

      {/* Battle area */}
      <div className="challenge-battle-area">
        <div className="battle-lex">
          <Character character="lex" state={lexState} size="medium" label="Lex" />
        </div>

        <div className="battle-center">
          <div className="battle-chapter-info">
            {chapter.emoji} {chapter.title}
          </div>
          <div className="battle-vs">⚔️</div>
        </div>

        <div className="battle-enemy">
          <Enemy
            emoji={chapter.minionEmoji}
            name={chapter.minionName}
            state={enemyState}
            size="medium"
          />
        </div>
      </div>

      {/* Question area */}
      <div className="challenge-question-area">
        {renderQuestion()}
      </div>

      {/* Feedback bar */}
      {currentAnswerResult && (
        <div className={`answer-feedback ${currentAnswerResult === 'correct' ? 'feedback-correct-bar' : 'feedback-wrong-bar'}`}>
          <span className="feedback-icon">{currentAnswerResult === 'correct' ? '✅' : '❌'}</span>
          <span className="feedback-text">
            {currentAnswerResult === 'correct'
              ? `Brilliant! +10 coins 🪙`
              : `The answer was: "${currentQuestion.correctAnswer}"`}
          </span>
          <button className="feedback-continue-btn" onClick={handleNextAfterResult}>
            {currentAnswerResult === 'correct' ? 'Battle! →' : 'Next →'}
          </button>
        </div>
      )}

      {/* Buzzy hint area */}
      {showBuzzyHint && !currentAnswerResult && (
        <div className="buzzy-hint-box">
          <Character character="buzzy" state="think" size="small" />
          <SpeechBubble
            text={currentQuestion.buzzySays}
            speaker="buzzy"
            direction="left"
          />
        </div>
      )}

      {/* Bottom bar */}
      {!currentAnswerResult && (
        <div className="challenge-bottom">
          <button
            className="hint-btn"
            onClick={toggleBuzzyHint}
            aria-label="Get a hint from Buzzy"
          >
            {showBuzzyHint ? '🐛 Hide Hint' : '🐛 Buzzy Hint'}
          </button>

          <button
            className="speak-btn"
            onClick={() => speakText(currentQuestion.word)}
            aria-label="Hear the word"
          >
            🔊 Hear Word
          </button>
        </div>
      )}
    </div>
  );
};
