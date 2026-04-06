import React, { useState, useEffect } from 'react';
import { Question } from '../../types';

interface SentenceBuilderProps {
  question: Question;
  onAnswer: (answer: string) => void;
  result: 'correct' | 'wrong' | null;
  disabled: boolean;
}

export const SentenceBuilder: React.FC<SentenceBuilderProps> = ({
  question,
  onAnswer,
  result,
  disabled,
}) => {
  const shuffledWords = question.sentenceWords ?? [];
  const [chosen, setChosen] = useState<{ word: string; idx: number }[]>([]);
  const [available, setAvailable] = useState<{ word: string; idx: number }[]>(
    shuffledWords.map((w, i) => ({ word: w, idx: i }))
  );

  useEffect(() => {
    setChosen([]);
    setAvailable(shuffledWords.map((w, i) => ({ word: w, idx: i })));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question.id]);

  const addWord = (item: { word: string; idx: number }) => {
    if (disabled) return;
    setChosen((prev) => [...prev, item]);
    setAvailable((prev) => prev.filter((a) => a.idx !== item.idx));
  };

  const removeWord = (item: { word: string; idx: number }, chosenIdx: number) => {
    if (disabled) return;
    setChosen((prev) => prev.filter((_, i) => i !== chosenIdx));
    setAvailable((prev) => [...prev, item].sort((a, b) => a.idx - b.idx));
  };

  const handleSubmit = () => {
    if (chosen.length === 0) return;
    onAnswer(chosen.map((c) => c.word).join(' '));
  };

  const isComplete = chosen.length === shuffledWords.length;

  return (
    <div className="question-container">
      <div className="question-prompt">Build the sentence in the right order!</div>
      <div style={{ fontSize: '1.05rem', color: '#6B7280', marginBottom: '12px', textAlign: 'center' }}>
        Use the word: <strong style={{ color: '#7C3AED' }}>{question.word}</strong>
      </div>

      {/* Built sentence area */}
      <div className="sentence-build-area">
        {chosen.length > 0 ? (
          chosen.map((item, idx) => (
            <button
              key={`c-${idx}`}
              className="sentence-word chosen-word"
              onClick={() => removeWord(item, idx)}
              disabled={disabled}
              title="Tap to remove"
            >
              {item.word}
            </button>
          ))
        ) : (
          <div className="scramble-placeholder">Tap words below to build the sentence</div>
        )}
      </div>

      {/* Feedback */}
      {result && (
        <div className={`scramble-feedback ${result === 'correct' ? 'feedback-correct' : 'feedback-wrong'}`}>
          {result === 'correct'
            ? `✅ Correct!`
            : `❌ The sentence was: "${question.correctAnswer}"`}
        </div>
      )}

      {/* Available words */}
      <div className="sentence-words-row">
        {available.map((item) => (
          <button
            key={`a-${item.idx}`}
            className="sentence-word available-word"
            onClick={() => addWord(item)}
            disabled={disabled}
          >
            {item.word}
          </button>
        ))}
      </div>

      {/* Submit */}
      {!result && (
        <button
          className={`submit-btn ${isComplete ? 'submit-ready' : 'submit-waiting'}`}
          onClick={handleSubmit}
          disabled={!isComplete || disabled}
        >
          Check Sentence ✓
        </button>
      )}
    </div>
  );
};
