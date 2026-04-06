import React from 'react';

interface HPBarProps {
  current: number;
  max: number;
  label: string;
  variant?: 'hero' | 'enemy';
}

export const HPBar: React.FC<HPBarProps> = ({ current, max, label, variant = 'hero' }) => {
  const pct = Math.max(0, Math.min(100, (current / max) * 100));

  return (
    <div className="hp-bar-wrapper">
      <div className="hp-bar-label">
        <span>{label}</span>
        <span>{current}/{max}</span>
      </div>
      <div className="hp-track">
        <div
          className={`hp-fill hp-fill-${variant}`}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={current}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={`${label} HP: ${current} of ${max}`}
        />
      </div>
    </div>
  );
};
