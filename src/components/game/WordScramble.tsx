import React, { useState, useEffect } from 'react';
import { Question } from '../../types';

interface WordScrambleProps {
  question: Question;
  onAnswer: (answer: string) => void;
  result: 'correct' | 'wrong' | null;
  disabled: boolean;
}

export const WordScramble: React.FC<WordScrambleProps> = ({
  question,
  onAnswer,
  result,
  disabled,
}) => {
  const scrambled = question.scrambled ?? question.word.split('');
  const [selected, setSelected] = useState<{ letter: string; origIdx: number }[]>([]);
  const [remaining, setRemaining] = useState<{ letter: string; origIdx: number }[]>(
    scrambled.map((l, i) => ({ letter: l, origIdx: i }))
  );

  useEffect(() => {
    setSelected([]);
    setRemaining(scrambled.map((l, i) => ({ letter: l, origIdx: i })));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question.id]);

  const addLetter = (item: { letter: string; origIdx: number }) => {
    if (disabled) return;
    setSelected((prev) => [...prev, item]);
    setRemaining((prev) => prev.filter((r) => r.origIdx !== item.origIdx));
  };

  const removeLetter = (item: { letter: string; origIdx: number }, selIdx: number) => {
    if (disabled) return;
    setSelected((prev) => prev.filter((_, i) => i !== selIdx));
    setRemaining((prev) => [...prev, item].sort((a, b) => a.origIdx - b.origIdx));
  };

  const handleSubmit = () => {
    if (selected.length === 0) return;
    onAnswer(selected.map((s) => s.letter).join(''));
  };

  const currentWord = selected.map((s) => s.letter).join('');
  const isComplete = currentWord.length === question.word.length;

  return (
    <div className="question-container">
      <div className="question-prompt">
        Unscramble the letters to make a word!
      </div>
      <div style={{ fontSize: '0.9rem', color: '#6B7280', marginBottom: '12px', textAlign: 'center' }}>
        Clue: {question.wordEntry.emoji} <em>{question.wordEntry.definition}</em>
      </div>

      {/* Selected letters area */}
      <div className="scramble-answer-area">
        {selected.length > 0 ? (
          selected.map((item, idx) => (
            <button
              key={`sel-${idx}`}
              className="scramble-letter selected-letter"
              onClick={() => removeLetter(item, idx)}
              disabled={disabled}
              title="Tap to remove"
            >
              {item.letter.toUpperCase()}
            </button>
          ))
        ) : (
          <div className="scramble-placeholder">Tap letters below</div>
        )}
      </div>

      {/* Feedback */}
      {result && (
        <div className={`scramble-feedback ${result === 'correct' ? 'feedback-correct' : 'feedback-wrong'}`}>
          {result === 'correct' ? `✅ ${question.correctAnswer}` : `❌ The word was: ${question.correctAnswer}`}
        </div>
      )}

      {/* Available letters */}
      <div className="scramble-letters-row">
        {remaining.map((item) => (
          <button
            key={`rem-${item.origIdx}`}
            className="scramble-letter available-letter"
            onClick={() => addLetter(item)}
            disabled={disabled}
          >
            {item.letter.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Submit button */}
      {!result && (
        <button
          className={`submit-btn ${isComplete ? 'submit-ready' : 'submit-waiting'}`}
          onClick={handleSubmit}
          disabled={!isComplete || disabled}
        >
          Check Answer ✓
        </button>
      )}
    </div>
  );
};
