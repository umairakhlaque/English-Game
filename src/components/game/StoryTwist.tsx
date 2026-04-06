import React from 'react';
import { StoryTwistOption } from '../../types';

interface StoryTwistProps {
  prompt: string;
  options: StoryTwistOption[];
  onChoose: (option: StoryTwistOption) => void;
  chosenOption: StoryTwistOption | null;
}

export const StoryTwist: React.FC<StoryTwistProps> = ({
  prompt,
  options,
  onChoose,
  chosenOption,
}) => {
  return (
    <div className="story-twist-container">
      <div className="twist-title">🌀 Story Twist!</div>
      <div className="twist-prompt">{prompt}</div>

      {chosenOption ? (
        <div className="twist-consequence">
          <span style={{ fontSize: '2rem' }}>{chosenOption.emoji}</span>
          <p>{chosenOption.consequence}</p>
        </div>
      ) : (
        <div className="twist-options">
          {options.map((opt, idx) => (
            <button
              key={idx}
              className="twist-option-btn"
              onClick={() => onChoose(opt)}
            >
              <span className="twist-emoji">{opt.emoji}</span>
              <span>{opt.text}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
