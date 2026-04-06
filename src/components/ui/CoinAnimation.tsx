import React, { useEffect, useState } from 'react';

interface FlyingCoin {
  id: number;
  startX: number;
  startY: number;
}

interface CoinAnimationProps {
  trigger: boolean;
  count?: number;
  originX?: number;
  originY?: number;
}

export const CoinAnimation: React.FC<CoinAnimationProps> = ({
  trigger,
  count = 5,
  originX = 50,
  originY = 60,
}) => {
  const [coins, setCoins] = useState<FlyingCoin[]>([]);

  useEffect(() => {
    if (!trigger) return;
    const newCoins = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      startX: originX + (Math.random() - 0.5) * 60,
      startY: originY + (Math.random() - 0.5) * 40,
    }));
    setCoins(newCoins);
    const t = setTimeout(() => setCoins([]), 1200);
    return () => clearTimeout(t);
  }, [trigger, count, originX, originY]);

  if (coins.length === 0) return null;

  return (
    <div aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 500 }}>
      {coins.map((c) => {
        const tx = (Math.random() - 0.5) * 200;
        const ty = -(80 + Math.random() * 100);
        const style: React.CSSProperties = {
          position: 'absolute',
          left: c.startX,
          top: c.startY,
          width: 28,
          height: 28,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #FFE566, #F7B731)',
          border: '2px solid #F59E0B',
          boxShadow: '0 0 8px rgba(247,183,49,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.8rem',
          fontWeight: 900,
          color: '#92400E',
          fontFamily: 'inherit',
          // @ts-expect-error CSS custom property
          '--cx': `${tx}px`,
          '--cy': `${ty}px`,
          animation: `coin-fly 0.9s cubic-bezier(0.16,1,0.3,1) forwards`,
          animationDelay: `${Math.random() * 0.2}s`,
        };
        return (
          <div key={c.id} style={style}>
            W
          </div>
        );
      })}
    </div>
  );
};
