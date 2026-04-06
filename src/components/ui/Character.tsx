import React from 'react';

interface CharacterProps {
  character: 'lex' | 'buzzy';
  state?: 'idle' | 'attack' | 'celebrate' | 'hurt' | 'think';
  size?: 'small' | 'medium' | 'large';
  label?: string;
}

export const Character: React.FC<CharacterProps> = ({
  character,
  state = 'idle',
  size = 'medium',
  label,
}) => {
  const sizeMap = { small: '60px', medium: '100px', large: '140px' };
  const fontSize = { small: '2.5rem', medium: '4rem', large: '5.5rem' };

  const lexEmoji = {
    idle: '🧙‍♂️',
    attack: '⚡',
    celebrate: '🥳',
    hurt: '😵',
    think: '🤔',
  };

  const buzzyEmoji = {
    idle: '🐛',
    attack: '📚',
    celebrate: '🎉',
    hurt: '😟',
    think: '🤓',
  };

  const emoji = character === 'lex' ? lexEmoji[state] : buzzyEmoji[state];

  const animClass =
    state === 'idle'
      ? 'char-bounce'
      : state === 'attack'
      ? 'char-attack'
      : state === 'celebrate'
      ? 'char-celebrate'
      : state === 'hurt'
      ? 'char-hurt'
      : 'char-think';

  return (
    <div
      className={`character ${animClass}`}
      style={{ width: sizeMap[size], textAlign: 'center', display: 'inline-block' }}
      role="img"
      aria-label={character === 'lex' ? 'Lex the hero' : 'Buzzy the bookworm'}
    >
      <div style={{ fontSize: fontSize[size], lineHeight: 1 }}>{emoji}</div>
      {label && (
        <div
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: character === 'lex' ? '#7C3AED' : '#10B981',
            marginTop: '4px',
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};
