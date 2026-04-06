import React from 'react';

interface MinionCharacterProps {
  size?: number;
  name?: string;
  animate?: boolean;
  wiggling?: boolean;
  className?: string;
}

export const MinionCharacter: React.FC<MinionCharacterProps> = ({
  size = 120,
  name = 'Minion',
  animate = true,
  wiggling = false,
  className = '',
}) => {
  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
      }}
      aria-label={`${name} the confusion minion`}
    >
      <div
        style={{
          width: size,
          height: size * 1.2,
          animation: wiggling
            ? 'wiggle 0.6s ease-in-out infinite'
            : animate
            ? 'float 2.5s ease-in-out infinite'
            : undefined,
          transformOrigin: 'bottom center',
        }}
      >
        <svg
          viewBox="0 0 120 144"
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size * 1.2}
          role="img"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="min-body-grad" cx="40%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#A78BFA" />
              <stop offset="100%" stopColor="#6C63FF" />
            </radialGradient>
            <radialGradient id="min-head-grad" cx="40%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#C4B5FD" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </radialGradient>
          </defs>

          {/* Shadow */}
          <ellipse cx="60" cy="140" rx="28" ry="6" fill="#000" opacity="0.2" />

          {/* Body */}
          <ellipse cx="60" cy="108" rx="30" ry="34" fill="url(#min-body-grad)" />
          {/* Belly */}
          <ellipse cx="60" cy="112" rx="18" ry="22" fill="#7C3AED" opacity="0.4" />

          {/* Arms */}
          {/* Left arm */}
          <ellipse cx="28" cy="100" rx="10" ry="18" fill="url(#min-body-grad)" transform="rotate(-25 28 100)" />
          <circle cx="20" cy="114" r="9" fill="#C4B5FD" />
          {/* Left claws */}
          <line x1="14" y1="118" x2="11" y2="124" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="20" y1="121" x2="20" y2="128" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="26" y1="118" x2="29" y2="124" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round" />

          {/* Right arm */}
          <ellipse cx="92" cy="100" rx="10" ry="18" fill="url(#min-body-grad)" transform="rotate(25 92 100)" />
          <circle cx="100" cy="114" r="9" fill="#C4B5FD" />
          {/* Right claws */}
          <line x1="94" y1="118" x2="91" y2="124" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="100" y1="121" x2="100" y2="128" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="106" y1="118" x2="109" y2="124" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round" />

          {/* Legs */}
          <rect x="46" y="136" width="12" height="8" rx="4" fill="#4C1D95" />
          <rect x="62" y="136" width="12" height="8" rx="4" fill="#4C1D95" />

          {/* Head */}
          <ellipse cx="60" cy="62" rx="32" ry="30" fill="url(#min-head-grad)" />

          {/* Horns */}
          <path d="M42 38 L36 16 L48 34" fill="#F7B731" />
          <path d="M78 38 L84 16 L72 34" fill="#F7B731" />
          {/* Horn tips */}
          <circle cx="36" cy="14" r="4" fill="#F59E0B" />
          <circle cx="84" cy="14" r="4" fill="#F59E0B" />

          {/* Ears */}
          <ellipse cx="28" cy="64" rx="8" ry="10" fill="#A78BFA" />
          <ellipse cx="92" cy="64" rx="8" ry="10" fill="#A78BFA" />

          {/* Confused eyes (X eyes) */}
          {/* Left eye */}
          <ellipse cx="47" cy="60" rx="9" ry="10" fill="white" />
          <line x1="41" y1="54" x2="53" y2="66" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
          <line x1="53" y1="54" x2="41" y2="66" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
          {/* Right eye */}
          <ellipse cx="73" cy="60" rx="9" ry="10" fill="white" />
          <line x1="67" y1="54" x2="79" y2="66" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
          <line x1="79" y1="54" x2="67" y2="66" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />

          {/* Eyebrow (confused / wiggly) */}
          <path d="M38 48 Q47 44 56 49" stroke="#4C1D95" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M64 49 Q73 44 82 48" stroke="#4C1D95" strokeWidth="3" fill="none" strokeLinecap="round" />

          {/* Confused mouth (wavy) */}
          <path d="M46 78 Q52 83 60 79 Q68 74 74 78" stroke="#4C1D95" strokeWidth="2.5" fill="none" strokeLinecap="round" />

          {/* Question marks on body */}
          <text x="44" y="118" fontSize="14" fill="#A78BFA" fontWeight="900" opacity="0.7">?</text>
          <text x="68" y="108" fontSize="10" fill="#C4B5FD" fontWeight="900" opacity="0.5">?</text>

          {/* Cheeks */}
          <ellipse cx="33" cy="72" rx="7" ry="5" fill="#F9A8D4" opacity="0.4" />
          <ellipse cx="87" cy="72" rx="7" ry="5" fill="#F9A8D4" opacity="0.4" />

          {/* Swirls on body */}
          <path d="M50 98 Q56 94 60 98 Q64 102 70 98" stroke="#A78BFA" strokeWidth="1.5" fill="none" opacity="0.5" />
        </svg>
      </div>
      {name && (
        <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-secondary)' }}>{name}</span>
      )}
    </div>
  );
};
