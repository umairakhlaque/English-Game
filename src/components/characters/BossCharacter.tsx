import React from 'react';

interface BossCharacterProps {
  size?: number;
  name?: string;
  animate?: boolean;
  className?: string;
}

export const BossCharacter: React.FC<BossCharacterProps> = ({
  size = 180,
  name = 'Shadow Scrambler',
  animate = true,
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
      aria-label={`${name} the boss villain`}
    >
      <div
        style={{
          width: size,
          height: size * 1.3,
          animation: animate ? 'float 2s ease-in-out infinite' : undefined,
          filter: 'drop-shadow(0 0 16px rgba(108,99,255,0.4))',
        }}
      >
        <svg
          viewBox="0 0 180 234"
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size * 1.3}
          role="img"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="boss-shadow-grad" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor="#312e81" />
              <stop offset="100%" stopColor="#0f0e17" />
            </radialGradient>
            <radialGradient id="boss-head-grad" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#4C1D95" />
              <stop offset="100%" stopColor="#1E1B4B" />
            </radialGradient>
            <filter id="shadow-blur">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="boss-glow">
              <feGaussianBlur stdDeviation="6" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Swirling shadow base */}
          <ellipse cx="90" cy="220" rx="65" ry="14" fill="#0a0a1a" opacity="0.6" />

          {/* Shadow wisps */}
          <path d="M15 180 Q30 160 20 140 Q30 150 25 165 Q40 145 35 120" stroke="#1E1B4B" strokeWidth="12" strokeLinecap="round" fill="none" opacity="0.7" />
          <path d="M165 175 Q150 155 160 135 Q150 148 155 162 Q140 140 148 115" stroke="#1E1B4B" strokeWidth="12" strokeLinecap="round" fill="none" opacity="0.7" />
          <path d="M45 200 Q35 180 50 160" stroke="#2D1B69" strokeWidth="18" strokeLinecap="round" fill="none" opacity="0.5" />
          <path d="M135 200 Q145 180 130 160" stroke="#2D1B69" strokeWidth="18" strokeLinecap="round" fill="none" opacity="0.5" />

          {/* Cloak / body */}
          <path d="M40 130 Q30 170 25 210 Q55 200 90 205 Q125 200 155 210 Q150 170 140 130 Q120 145 90 140 Q60 145 40 130Z" fill="#1E1B4B" />
          <path d="M45 135 Q40 165 38 195 Q55 188 90 192" stroke="#312e81" strokeWidth="2" fill="none" opacity="0.5" />
          <path d="M135 135 Q140 165 142 195 Q125 188 90 192" stroke="#312e81" strokeWidth="2" fill="none" opacity="0.5" />

          {/* Body core glow */}
          <ellipse cx="90" cy="165" rx="30" ry="38" fill="url(#boss-shadow-grad)" opacity="0.8" />
          {/* Rune markings */}
          <text x="72" y="155" fontSize="18" fill="#6C63FF" fontWeight="900" opacity="0.4" fontFamily="monospace">§</text>
          <text x="88" y="175" fontSize="14" fill="#8B5CF6" fontWeight="900" opacity="0.3" fontFamily="monospace">∞</text>
          <text x="98" y="153" fontSize="12" fill="#A78BFA" fontWeight="900" opacity="0.3" fontFamily="monospace">Ω</text>

          {/* Arms */}
          {/* Left arm — long clawed */}
          <path d="M42 135 Q22 155 18 175 Q28 168 22 185" stroke="#2D1B69" strokeWidth="20" strokeLinecap="round" fill="none" />
          <path d="M22 185 Q16 198 10 202" stroke="#1E1B4B" strokeWidth="14" strokeLinecap="round" fill="none" />
          {/* Left claws */}
          <path d="M16 205 L8 214" stroke="#4C1D95" strokeWidth="3" strokeLinecap="round" />
          <path d="M22 208 L18 220" stroke="#4C1D95" strokeWidth="3" strokeLinecap="round" />
          <path d="M28 207 L28 218" stroke="#4C1D95" strokeWidth="3" strokeLinecap="round" />

          {/* Right arm */}
          <path d="M138 135 Q158 155 162 175 Q152 168 158 185" stroke="#2D1B69" strokeWidth="20" strokeLinecap="round" fill="none" />
          <path d="M158 185 Q164 198 170 202" stroke="#1E1B4B" strokeWidth="14" strokeLinecap="round" fill="none" />
          {/* Right claws */}
          <path d="M164 205 L172 214" stroke="#4C1D95" strokeWidth="3" strokeLinecap="round" />
          <path d="M158 208 L162 220" stroke="#4C1D95" strokeWidth="3" strokeLinecap="round" />
          <path d="M152 207 L152 218" stroke="#4C1D95" strokeWidth="3" strokeLinecap="round" />

          {/* Neck */}
          <rect x="76" y="118" width="28" height="18" rx="8" fill="#2D1B69" />

          {/* Head */}
          <ellipse cx="90" cy="90" rx="48" ry="44" fill="url(#boss-head-grad)" filter="url(#shadow-blur)" />

          {/* Crown of horns */}
          <path d="M52 62 L44 30 L58 56" fill="#6C63FF" />
          <path d="M68 54 L62 20 L74 50" fill="#8B5CF6" />
          <path d="M90 50 L90 15 L96 48" fill="#6C63FF" />
          <path d="M112 54 L118 20 L106 50" fill="#8B5CF6" />
          <path d="M128 62 L136 30 L122 56" fill="#6C63FF" />
          {/* Horn tips glow */}
          <circle cx="44" cy="28" r="5" fill="#A78BFA" filter="url(#boss-glow)" opacity="0.9" />
          <circle cx="62" cy="18" r="4" fill="#C4B5FD" filter="url(#boss-glow)" opacity="0.9" />
          <circle cx="90" cy="13" r="6" fill="#A78BFA" filter="url(#boss-glow)" opacity="0.9" />
          <circle cx="118" cy="18" r="4" fill="#C4B5FD" filter="url(#boss-glow)" opacity="0.9" />
          <circle cx="136" cy="28" r="5" fill="#A78BFA" filter="url(#boss-glow)" opacity="0.9" />

          {/* Eyes — glowing red */}
          <ellipse cx="72" cy="88" rx="11" ry="12" fill="#1E1B4B" />
          <ellipse cx="108" cy="88" rx="11" ry="12" fill="#1E1B4B" />
          <ellipse cx="72" cy="88" rx="7" ry="8" fill="#EF4444" filter="url(#boss-glow)" />
          <ellipse cx="108" cy="88" rx="7" ry="8" fill="#EF4444" filter="url(#boss-glow)" />
          <ellipse cx="72" cy="88" rx="4" ry="5" fill="#FCA5A5" />
          <ellipse cx="108" cy="88" rx="4" ry="5" fill="#FCA5A5" />
          {/* Eye glow rings */}
          <ellipse cx="72" cy="88" rx="11" ry="12" fill="none" stroke="#EF4444" strokeWidth="2" opacity="0.5" />
          <ellipse cx="108" cy="88" rx="11" ry="12" fill="none" stroke="#EF4444" strokeWidth="2" opacity="0.5" />

          {/* Angry eyebrows */}
          <path d="M60 73 L84 78" stroke="#2D1B69" strokeWidth="4" strokeLinecap="round" />
          <path d="M96 78 L120 73" stroke="#2D1B69" strokeWidth="4" strokeLinecap="round" />

          {/* Sinister mouth */}
          <path d="M68 108 Q90 120 112 108" stroke="#4C1D95" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M72 110 L72 116" stroke="#4C1D95" strokeWidth="2" />
          <path d="M80 113 L80 118" stroke="#4C1D95" strokeWidth="2" />
          <path d="M90 115 L90 120" stroke="#4C1D95" strokeWidth="2" />
          <path d="M100 113 L100 118" stroke="#4C1D95" strokeWidth="2" />
          <path d="M108 110 L108 116" stroke="#4C1D95" strokeWidth="2" />

          {/* Shadow mist around body */}
          <ellipse cx="90" cy="170" rx="50" ry="20" fill="#1E1B4B" opacity="0.3" />
          <ellipse cx="90" cy="180" rx="60" ry="15" fill="#0F0E17" opacity="0.2" />

          {/* Floating letter fragments (scrambled words effect) */}
          <g filter="url(#boss-glow)" opacity="0.5">
            <text x="20" y="100" fontSize="12" fill="#8B5CF6" fontWeight="900" transform="rotate(-20 20 100)">W</text>
            <text x="148" y="95" fontSize="10" fill="#6C63FF" fontWeight="900" transform="rotate(15 148 95)">R</text>
            <text x="30" y="130" fontSize="8" fill="#A78BFA" fontWeight="900" transform="rotate(-10 30 130)">D</text>
            <text x="152" y="128" fontSize="9" fill="#7C3AED" fontWeight="900" transform="rotate(12 152 128)">S</text>
          </g>
        </svg>
      </div>
      {name && (
        <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--secondary)', textShadow: '0 0 8px rgba(255,101,132,0.4)' }}>{name}</span>
      )}
    </div>
  );
};
