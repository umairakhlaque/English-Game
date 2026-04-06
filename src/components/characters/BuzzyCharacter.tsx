import React from 'react';

interface BuzzyCharacterProps {
  size?: number;
  animate?: boolean;
  says?: string;
  className?: string;
}

export const BuzzyCharacter: React.FC<BuzzyCharacterProps> = ({
  size = 100,
  animate = true,
  says,
  className = '',
}) => {
  return (
    <div className={`flex-col flex-center ${className}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
      {says && (
        <div className="speech-bubble" style={{ maxWidth: 240, marginBottom: 8 }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 600, margin: 0 }}>{says}</p>
        </div>
      )}
      <div
        style={{
          width: size,
          height: size * 1.3,
          display: 'inline-block',
          animation: animate ? 'bounce-in 0.55s cubic-bezier(0.34,1.56,0.64,1) forwards' : undefined,
        }}
        aria-label="Buzzy the bookworm"
      >
        <svg
          viewBox="0 0 100 130"
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size * 1.3}
          role="img"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="buzzy-body-grad" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#86EFAC" />
              <stop offset="100%" stopColor="#16A34A" />
            </radialGradient>
            <radialGradient id="buzzy-head-grad" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#A7F3D0" />
              <stop offset="100%" stopColor="#34D399" />
            </radialGradient>
          </defs>

          {/* Body segments (worm) */}
          <ellipse cx="50" cy="115" rx="18" ry="14" fill="url(#buzzy-body-grad)" />
          <ellipse cx="50" cy="100" rx="20" ry="14" fill="#22C55E" />
          <ellipse cx="50" cy="85" rx="19" ry="13" fill="url(#buzzy-body-grad)" />
          <ellipse cx="50" cy="71" rx="20" ry="14" fill="#22C55E" />

          {/* Segment lines */}
          <path d="M32 107 Q50 104 68 107" stroke="#15803D" strokeWidth="1.5" fill="none" />
          <path d="M31 92 Q50 89 69 92" stroke="#15803D" strokeWidth="1.5" fill="none" />
          <path d="M32 78 Q50 75 68 78" stroke="#15803D" strokeWidth="1.5" fill="none" />

          {/* Belly highlights */}
          <ellipse cx="50" cy="115" rx="10" ry="8" fill="#BBF7D0" opacity="0.5" />
          <ellipse cx="50" cy="100" rx="11" ry="8" fill="#BBF7D0" opacity="0.5" />
          <ellipse cx="50" cy="85" rx="10" ry="7" fill="#BBF7D0" opacity="0.5" />

          {/* Head */}
          <ellipse cx="50" cy="52" rx="26" ry="24" fill="url(#buzzy-head-grad)" />
          <ellipse cx="50" cy="52" rx="18" ry="16" fill="#A7F3D0" opacity="0.4" />

          {/* Graduation cap */}
          <ellipse cx="50" cy="31" rx="22" ry="7" fill="#1E3A5F" />
          <rect x="37" y="25" width="26" height="8" rx="3" fill="#1E3A5F" />
          {/* Cap top */}
          <rect x="44" y="18" width="12" height="8" rx="2" fill="#2563EB" />
          {/* Tassel */}
          <line x1="68" y1="31" x2="74" y2="44" stroke="#F7B731" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="74" cy="45" r="4" fill="#F7B731" />

          {/* Eyes */}
          <ellipse cx="40" cy="52" rx="7" ry="8" fill="white" />
          <ellipse cx="60" cy="52" rx="7" ry="8" fill="white" />
          <circle cx="41" cy="53" r="4.5" fill="#1E1B4B" />
          <circle cx="61" cy="53" r="4.5" fill="#1E1B4B" />
          <circle cx="42.5" cy="51.5" r="1.5" fill="white" />
          <circle cx="62.5" cy="51.5" r="1.5" fill="white" />

          {/* Glasses frames */}
          <ellipse cx="40" cy="52" rx="8" ry="9" fill="none" stroke="#0F172A" strokeWidth="2.5" />
          <ellipse cx="60" cy="52" rx="8" ry="9" fill="none" stroke="#0F172A" strokeWidth="2.5" />
          <line x1="48" y1="52" x2="52" y2="52" stroke="#0F172A" strokeWidth="2" />
          <line x1="27" y1="50" x2="32" y2="52" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
          <line x1="73" y1="50" x2="68" y2="52" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />

          {/* Smile */}
          <path d="M38 63 Q50 70 62 63" stroke="#15803D" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Antenna/Antennae */}
          <line x1="42" y1="29" x2="36" y2="15" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" />
          <circle cx="36" cy="13" r="4" fill="#43E97B" />
          <line x1="58" y1="29" x2="64" y2="15" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" />
          <circle cx="64" cy="13" r="4" fill="#43E97B" />

          {/* Cheeks */}
          <ellipse cx="31" cy="60" rx="6" ry="4" fill="#F87171" opacity="0.4" />
          <ellipse cx="69" cy="60" rx="6" ry="4" fill="#F87171" opacity="0.4" />
        </svg>
      </div>
    </div>
  );
};
