import React, { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  left: number;
  color: string;
  delay: number;
  duration: number;
  size: number;
  shape: 'square' | 'circle' | 'rect';
  rotation: number;
}

const COLORS = ['#6C63FF', '#FF6584', '#43E97B', '#F7B731', '#60A5FA', '#F472B6', '#A78BFA', '#34D399'];

function randomPiece(id: number): ConfettiPiece {
  return {
    id,
    left: Math.random() * 100,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    delay: Math.random() * 1.5,
    duration: 2.2 + Math.random() * 1.8,
    size: 6 + Math.floor(Math.random() * 10),
    shape: ['square', 'circle', 'rect'][Math.floor(Math.random() * 3)] as ConfettiPiece['shape'],
    rotation: Math.random() * 360,
  };
}

interface ConfettiProps {
  active?: boolean;
  count?: number;
}

export const Confetti: React.FC<ConfettiProps> = ({ active = true, count = 60 }) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (active) {
      setPieces(Array.from({ length: count }, (_, i) => randomPiece(i)));
    } else {
      setPieces([]);
    }
  }, [active, count]);

  if (!active || pieces.length === 0) return null;

  return (
    <div className="celebration-overlay" aria-hidden="true">
      {pieces.map((p) => {
        const style: React.CSSProperties = {
          position: 'absolute',
          left: `${p.left}%`,
          top: '-20px',
          width: p.shape === 'rect' ? p.size * 2 : p.size,
          height: p.shape === 'rect' ? p.size / 2 : p.size,
          background: p.color,
          borderRadius: p.shape === 'circle' ? '50%' : p.shape === 'square' ? '2px' : '3px',
          animation: `confetti-fall ${p.duration}s ${p.delay}s ease-in forwards`,
          transform: `rotate(${p.rotation}deg)`,
          opacity: 0.9,
        };
        return <div key={p.id} style={style} />;
      })}
    </div>
  );
};
