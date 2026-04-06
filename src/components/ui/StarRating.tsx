import React from 'react';

interface StarRatingProps {
  stars: number;
  maxStars?: number;
  size?: 'small' | 'medium' | 'large';
  animate?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({
  stars,
  maxStars = 3,
  size = 'medium',
  animate = false,
}) => {
  const fontSize = { small: '1.2rem', medium: '1.8rem', large: '2.5rem' };

  return (
    <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
      {Array.from({ length: maxStars }, (_, i) => (
        <span
          key={i}
          className={animate && i < stars ? 'star-pop' : ''}
          style={{
            fontSize: fontSize[size],
            filter: i < stars ? 'none' : 'grayscale(1) opacity(0.3)',
            animationDelay: animate ? `${i * 0.2}s` : '0s',
          }}
        >
          ⭐
        </span>
      ))}
    </div>
  );
};
