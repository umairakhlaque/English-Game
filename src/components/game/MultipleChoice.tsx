import React from 'react';
import { Question } from '../../types';

interface MultipleChoiceProps {
  question: Question;
  onAnswer: (answer: string) => void;
  chosenAnswer: string;
  result: 'correct' | 'wrong' | null;
  disabled: boolean;
}

export const MultipleChoice: React.FC<MultipleChoiceProps> = ({
  question,
  onAnswer,
  chosenAnswer,
  result,
  disabled,
}) => {
  return (
    <div className="question-container">
      <div className="question-prompt">{`Which word means: "${question.wordEntry.definition}"?`}</div>

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
