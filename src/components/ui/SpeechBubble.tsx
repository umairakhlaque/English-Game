import React from 'react';

interface SpeechBubbleProps {
  text: string;
  speaker?: 'buzzy' | 'lex' | 'enemy';
  direction?: 'left' | 'right' | 'up';
  emoji?: string;
}

export const SpeechBubble: React.FC<SpeechBubbleProps> = ({
  text,
  speaker = 'buzzy',
  direction = 'right',
  emoji,
}) => {
  const colors = {
    buzzy: { bg: '#ECFDF5', border: '#10B981', text: '#065F46' },
    lex: { bg: '#EDE9FE', border: '#7C3AED', text: '#4C1D95' },
    enemy: { bg: '#FFF1F2', border: '#EC4899', text: '#9F1239' },
  };

  const c = colors[speaker];

  return (
    <div
      style={{
        background: c.bg,
        border: `2px solid ${c.border}`,
        borderRadius: '16px',
        padding: '10px 14px',
        position: 'relative',
        maxWidth: '280px',
        boxShadow: `0 4px 12px ${c.border}30`,
      }}
    >
      {emoji && <span style={{ marginRight: '6px', fontSize: '1.1rem' }}>{emoji}</span>}
      <span style={{ color: c.text, fontSize: '1.1rem', fontWeight: 600, lineHeight: 1.4 }}>
        {text}
      </span>
      {/* Tail */}
      <div
        style={{
          position: 'absolute',
          bottom: direction === 'up' ? 'auto' : '-12px',
          top: direction === 'up' ? '-12px' : 'auto',
          left: direction === 'left' ? '20px' : direction === 'right' ? 'auto' : '50%',
          right: direction === 'right' ? '20px' : 'auto',
          transform: direction === 'up' ? 'rotate(180deg)' : 'none',
          width: 0,
          height: 0,
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          borderTop: `12px solid ${c.border}`,
        }}
      />
    </div>
  );
};
