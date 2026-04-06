import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  color?: string;
  label?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  color = '#7C3AED',
  label,
}) => {
  const pct = total > 0 ? Math.min((current / total) * 100, 100) : 0;

  return (
    <div style={{ width: '100%' }}>
      {label && (
        <div
          style={{
            fontSize: '1rem',
            fontWeight: 700,
            color: '#6B7280',
            marginBottom: '4px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span>{label}</span>
          <span>
            {current}/{total}
          </span>
        </div>
      )}
      <div
        style={{
          background: '#E5E7EB',
          borderRadius: '999px',
          height: '14px',
          overflow: 'hidden',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <div
          style={{
            background: color,
            width: `${pct}%`,
            height: '100%',
            borderRadius: '999px',
            transition: 'width 0.5s ease',
            boxShadow: `0 0 8px ${color}80`,
          }}
        />
      </div>
    </div>
  );
};
