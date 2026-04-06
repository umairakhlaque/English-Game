import React from 'react';

interface WordCoinProps {
  count: number;
  animate?: boolean;
}

export const WordCoin: React.FC<WordCoinProps> = ({ count, animate = false }) => (
  <div
    className={animate ? 'coin-pop' : ''}
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      background: 'linear-gradient(135deg, #F59E0B, #FCD34D)',
      borderRadius: '999px',
      padding: '6px 14px',
      boxShadow: '0 2px 8px rgba(245,158,11,0.4)',
      fontWeight: 800,
      fontSize: '1.1rem',
      color: '#92400E',
    }}
  >
    <span style={{ fontSize: '1.3rem' }}>🪙</span>
    <span>{count}</span>
  </div>
);
