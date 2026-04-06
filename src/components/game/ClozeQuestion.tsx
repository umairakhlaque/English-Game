import React from 'react';
import { Question } from '../../types';

interface ClozeQuestionProps {
  question: Question;
  onAnswer: (answer: string) => void;
  chosenAnswer: string;
  result: 'correct' | 'wrong' | null;
  disabled: boolean;
}

export const ClozeQuestion: React.FC<ClozeQuestionProps> = ({
  question,
  onAnswer,
  chosenAnswer,
  result,
  disabled,
}) => {
  const sentence = question.sentence ?? '';
  const parts = sentence.split('_____');

  return (
    <div className="question-container">
      <div className="cloze-sentence" aria-label="Fill in the blank sentence">
        {parts.map((part, i) => (
          <React.Fragment key={i}>
            <span>{part}</span>
            {i < parts.length - 1 && (
              <span
                className={`cloze-blank ${result === 'correct' ? 'blank-correct' : result === 'wrong' ? 'blank-wrong' : ''}`}
              >
                {result ? question.correctAnswer : '_____'}
              </span>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="question-prompt" style={{ marginTop: '12px' }}>
        Which word completes the sentence?
      </div>

      <div className="options-grid">
        {question.options.slice(0, 3).map((option, idx) => {
          const isChosen = chosenAnswer === option;
          const isCorrect = option === question.correctAnswer;
          let btnClass = 'option-btn';

          if (result && isChosen) {
            btnClass += result === 'correct' ? ' option-correct' : ' option-wrong';
          } else if (result === 'wrong' && isCorrect) {
            btnClass += ' option-reveal';
          }

          return (
            <button
              key={idx}
              className={btnClass}
              onClick={() => !disabled && onAnswer(option)}
              disabled={disabled}
              aria-label={`Option: ${option}`}
            >
              <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
              <span className="option-text">{option}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
