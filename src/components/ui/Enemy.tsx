import React from 'react';

interface EnemyProps {
  emoji: string;
  name: string;
  state?: 'idle' | 'hurt' | 'defeated';
  size?: 'small' | 'medium' | 'large';
}

export const Enemy: React.FC<EnemyProps> = ({
  emoji,
  name,
  state = 'idle',
  size = 'medium',
}) => {
  const sizeMap = { small: '60px', medium: '100px', large: '140px' };
  const fontSize = { small: '2.5rem', medium: '4rem', large: '5.5rem' };

  const animClass =
    state === 'idle'
      ? 'enemy-idle'
      : state === 'hurt'
      ? 'enemy-hurt'
      : 'enemy-defeated';

  return (
    <div
      className={`enemy ${animClass}`}
      style={{
        width: sizeMap[size],
        textAlign: 'center',
        display: 'inline-block',
        opacity: state === 'defeated' ? 0.4 : 1,
        transform: state === 'defeated' ? 'rotate(90deg)' : 'none',
        transition: 'all 0.4s ease',
      }}
      role="img"
      aria-label={name}
    >
      <div style={{ fontSize: fontSize[size], lineHeight: 1 }}>{emoji}</div>
      <div
        style={{
          fontSize: '0.75rem',
          fontWeight: 700,
          color: '#EC4899',
          marginTop: '4px',
        }}
      >
        {name}
      </div>
    </div>
  );
};
