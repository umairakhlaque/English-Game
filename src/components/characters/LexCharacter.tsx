import React from 'react';

interface LexCharacterProps {
  size?: number;
  animate?: boolean;
  swinging?: boolean;
  className?: string;
}

export const LexCharacter: React.FC<LexCharacterProps> = ({
  size = 160,
  animate = true,
  swinging = false,
  className = '',
}) => {
  const wrapStyle: React.CSSProperties = {
    width: size,
    height: size,
    display: 'inline-block',
    animation: animate ? 'float 3s ease-in-out infinite' : undefined,
  };

  return (
    <div style={wrapStyle} className={className} aria-label="Lex the hero character">
      <svg
        viewBox="0 0 160 200"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size * 1.25}
        role="img"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="lex-head-grad" cx="45%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#FFD9A8" />
            <stop offset="100%" stopColor="#F4A261" />
          </radialGradient>
          <radialGradient id="lex-body-grad" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#6C63FF" />
          </radialGradient>
          <filter id="glow-filter">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="sword-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C0C0C0" />
            <stop offset="50%" stopColor="#E0E0E0" />
            <stop offset="100%" stopColor="#A0A0A0" />
          </linearGradient>
          <linearGradient id="book-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#43E97B" />
            <stop offset="100%" stopColor="#38F9D7" />
          </linearGradient>
        </defs>

        {/* Cape */}
        <ellipse cx="80" cy="135" rx="38" ry="28" fill="#4C1D95" opacity="0.8" />
        <path d="M42 120 Q60 160 42 175" fill="#5B21B6" stroke="#4C1D95" strokeWidth="1" />
        <path d="M118 120 Q100 160 118 175" fill="#5B21B6" stroke="#4C1D95" strokeWidth="1" />

        {/* Body */}
        <rect x="54" y="110" width="52" height="60" rx="12" fill="url(#lex-body-grad)" />
        {/* Chest plate */}
        <rect x="62" y="118" width="36" height="32" rx="6" fill="#7C3AED" opacity="0.7" />
        <rect x="69" y="124" width="22" height="4" rx="2" fill="#A78BFA" opacity="0.8" />
        <rect x="69" y="131" width="22" height="4" rx="2" fill="#A78BFA" opacity="0.6" />
        <rect x="69" y="138" width="22" height="4" rx="2" fill="#A78BFA" opacity="0.4" />

        {/* Legs */}
        <rect x="60" y="164" width="18" height="28" rx="8" fill="#4C1D95" />
        <rect x="82" y="164" width="18" height="28" rx="8" fill="#4C1D95" />
        {/* Boots */}
        <rect x="58" y="184" width="22" height="12" rx="6" fill="#1E1B4B" />
        <rect x="80" y="184" width="22" height="12" rx="6" fill="#1E1B4B" />

        {/* Left arm */}
        <rect x="34" y="112" width="22" height="14" rx="7" fill="url(#lex-body-grad)" />
        {/* Left hand */}
        <circle cx="34" cy="122" r="8" fill="url(#lex-head-grad)" />

        {/* Right arm — holds book+sword */}
        <g
          style={{
            transformOrigin: '120px 115px',
            animation: swinging ? 'sword-swing 0.5s cubic-bezier(0.16,1,0.3,1) forwards' : undefined,
          }}
        >
          <rect x="104" y="112" width="22" height="14" rx="7" fill="url(#lex-body-grad)" />
          <circle cx="126" cy="122" r="8" fill="url(#lex-head-grad)" />
          {/* Glowing book-sword */}
          {/* Book */}
          <rect x="118" y="90" width="20" height="26" rx="3" fill="url(#book-grad)" filter="url(#glow-filter)" />
          <rect x="120" y="93" width="16" height="2" rx="1" fill="#fff" opacity="0.6" />
          <rect x="120" y="97" width="16" height="2" rx="1" fill="#fff" opacity="0.6" />
          <rect x="120" y="101" width="12" height="2" rx="1" fill="#fff" opacity="0.6" />
          <rect x="120" y="105" width="16" height="2" rx="1" fill="#fff" opacity="0.6" />
          <rect x="120" y="109" width="10" height="2" rx="1" fill="#fff" opacity="0.6" />
          {/* Sword blade */}
          <rect x="126" y="52" width="6" height="42" rx="3" fill="url(#sword-grad)" filter="url(#glow-filter)" />
          <rect x="127" y="54" width="3" height="38" rx="1" fill="#fff" opacity="0.4" />
          {/* Crossguard */}
          <rect x="117" y="88" width="24" height="6" rx="3" fill="#A78BFA" />
          {/* Tip glow */}
          <ellipse cx="129" cy="52" rx="5" ry="3" fill="#6C63FF" opacity="0.8" filter="url(#glow-filter)" />
          {/* Glow aura */}
          <ellipse cx="129" cy="72" rx="12" ry="25" fill="#6C63FF" opacity="0.08" />
        </g>

        {/* Head */}
        <ellipse cx="80" cy="75" rx="32" ry="34" fill="url(#lex-head-grad)" />

        {/* Hair */}
        <ellipse cx="80" cy="44" rx="30" ry="16" fill="#1E1B4B" />
        <path d="M50 60 Q48 48 56 42" stroke="#1E1B4B" strokeWidth="8" strokeLinecap="round" fill="none" />
        <path d="M110 60 Q112 48 104 42" stroke="#1E1B4B" strokeWidth="8" strokeLinecap="round" fill="none" />
        <path d="M64 41 Q80 32 96 41" fill="#1E1B4B" />

        {/* Eyes */}
        <ellipse cx="68" cy="74" rx="8" ry="9" fill="white" />
        <ellipse cx="92" cy="74" rx="8" ry="9" fill="white" />
        <circle cx="70" cy="75" r="5" fill="#1E1B4B" />
        <circle cx="94" cy="75" r="5" fill="#1E1B4B" />
        {/* Eye shine */}
        <circle cx="72" cy="73" r="2" fill="white" />
        <circle cx="96" cy="73" r="2" fill="white" />

        {/* Eyebrows */}
        <path d="M61 65 Q68 62 75 65" stroke="#92400E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M85 65 Q92 62 99 65" stroke="#92400E" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* Smile */}
        <path d="M70 88 Q80 96 90 88" stroke="#92400E" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* Cheek blush */}
        <ellipse cx="60" cy="83" rx="7" ry="5" fill="#F87171" opacity="0.3" />
        <ellipse cx="100" cy="83" rx="7" ry="5" fill="#F87171" opacity="0.3" />

        {/* Helmet band */}
        <path d="M50 68 Q80 58 110 68" stroke="#A78BFA" strokeWidth="3" strokeLinecap="round" fill="none" />

        {/* Sparkles around sword tip */}
        <g filter="url(#glow-filter)">
          <circle cx="140" cy="46" r="3" fill="#43E97B" opacity="0.9" />
          <circle cx="148" cy="38" r="2" fill="#6C63FF" opacity="0.8" />
          <circle cx="136" cy="38" r="1.5" fill="#F7B731" opacity="0.9" />
        </g>
      </svg>
    </div>
  );
};
