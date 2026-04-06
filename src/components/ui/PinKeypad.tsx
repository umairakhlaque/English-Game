import React from 'react';

interface PinKeypadProps {
  value: string;
  onChange: (val: string) => void;
  maxLength?: number;
  label?: string;
}

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'];

export const PinKeypad: React.FC<PinKeypadProps> = ({
  value,
  onChange,
  maxLength = 4,
  label = 'Enter PIN',
}) => {
  const handleKey = (key: string) => {
    if (key === 'del') {
      onChange(value.slice(0, -1));
    } else if (key === '') {
      return;
    } else if (value.length < maxLength) {
      onChange(value + key);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--sp-md)' }}>
      {label && (
        <p style={{ color: 'var(--text-secondary)', fontWeight: 700, fontSize: '0.95rem', marginBottom: 4 }}>{label}</p>
      )}
      {/* PIN dots */}
      <div className="pin-dots" role="status" aria-label={`${value.length} of ${maxLength} digits entered`}>
        {Array.from({ length: maxLength }, (_, i) => (
          <div key={i} className={`pin-dot${i < value.length ? ' filled' : ''}`} />
        ))}
      </div>

      {/* Keypad */}
      <div className="keypad-grid" role="group" aria-label="Number keypad">
        {KEYS.map((key, idx) => {
          if (key === '') {
            return <div key={idx} />;
          }
          return (
            <button
              key={idx}
              className={`keypad-key${key === 'del' ? ' delete' : ''}`}
              onClick={() => handleKey(key)}
              aria-label={key === 'del' ? 'Delete last digit' : `Digit ${key}`}
              type="button"
            >
              {key === 'del' ? '⌫' : key}
            </button>
          );
        })}
      </div>
    </div>
  );
};
