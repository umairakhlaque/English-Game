import React from 'react';
import { AvatarType } from '../../types';

interface AvatarPickerProps {
  selected: AvatarType;
  onSelect: (avatar: AvatarType) => void;
}

interface AvatarDef {
  id: AvatarType;
  label: string;
  svgPath: React.ReactNode;
  color: string;
}

const KnightSVG = () => (
  <svg viewBox="0 0 80 80" width="60" height="60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="40" cy="28" r="18" fill="#E2E8F0" />
    <rect x="24" y="16" width="32" height="12" rx="4" fill="#94A3B8" />
    <rect x="30" y="10" width="20" height="8" rx="4" fill="#64748B" />
    <rect x="26" y="22" width="4" height="8" rx="1" fill="#475569" />
    <rect x="50" y="22" width="4" height="8" rx="1" fill="#475569" />
    <ellipse cx="34" cy="29" rx="4" ry="4.5" fill="white" />
    <ellipse cx="46" cy="29" rx="4" ry="4.5" fill="white" />
    <circle cx="35" cy="30" r="2.5" fill="#1E293B" />
    <circle cx="47" cy="30" r="2.5" fill="#1E293B" />
    <rect x="28" y="46" width="24" height="28" rx="6" fill="#3B82F6" />
    <rect x="33" y="52" width="14" height="3" rx="1" fill="#60A5FA" />
    <rect x="33" y="58" width="14" height="3" rx="1" fill="#60A5FA" />
    <rect x="16" y="48" width="14" height="10" rx="5" fill="#3B82F6" />
    <rect x="50" y="48" width="14" height="10" rx="5" fill="#3B82F6" />
    <rect x="52" y="44" width="6" height="22" rx="3" fill="#94A3B8" />
    <rect x="48" y="52" width="14" height="4" rx="2" fill="#64748B" />
  </svg>
);

const WizardSVG = () => (
  <svg viewBox="0 0 80 80" width="60" height="60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="40" cy="34" r="16" fill="#FCD9A8" />
    <ellipse cx="40" cy="25" rx="16" ry="10" fill="#7C3AED" />
    <path d="M24 25 L40 2 L56 25Z" fill="#6D28D9" />
    <circle cx="40" cy="2" r="4" fill="#F7B731" />
    <ellipse cx="33" cy="35" rx="3.5" ry="4" fill="white" />
    <ellipse cx="47" cy="35" rx="3.5" ry="4" fill="white" />
    <circle cx="34" cy="36" r="2" fill="#312e81" />
    <circle cx="48" cy="36" r="2" fill="#312e81" />
    <path d="M34 44 Q40 48 46 44" stroke="#92400E" strokeWidth="2" fill="none" />
    <path d="M26 14 L22 10" stroke="#F7B731" strokeWidth="2" />
    <path d="M54 14 L58 10" stroke="#F7B731" strokeWidth="2" />
    <path d="M20 20 L14 18" stroke="#F7B731" strokeWidth="2" />
    <circle cx="22" cy="10" r="3" fill="#F7B731" />
    <circle cx="58" cy="10" r="3" fill="#F7B731" />
    <circle cx="14" cy="18" r="3" fill="#A78BFA" />
    <rect x="28" y="50" width="24" height="26" rx="8" fill="#7C3AED" />
    <rect x="20" y="52" width="10" height="8" rx="4" fill="#7C3AED" />
    <rect x="50" y="52" width="10" height="8" rx="4" fill="#7C3AED" />
    <rect x="56" y="44" width="4" height="20" rx="2" fill="#A78BFA" />
    <circle cx="58" cy="42" r="5" fill="#43E97B" />
  </svg>
);

const ArcherSVG = () => (
  <svg viewBox="0 0 80 80" width="60" height="60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="40" cy="28" r="16" fill="#FCD9A8" />
    <rect x="26" y="16" width="28" height="8" rx="4" fill="#065F46" />
    <ellipse cx="34" cy="29" rx="3.5" ry="4" fill="white" />
    <ellipse cx="46" cy="29" rx="3.5" ry="4" fill="white" />
    <circle cx="35" cy="30" r="2" fill="#1E293B" />
    <circle cx="47" cy="30" r="2" fill="#1E293B" />
    <path d="M34 38 Q40 42 46 38" stroke="#92400E" strokeWidth="2" fill="none" />
    <rect x="29" y="44" width="22" height="26" rx="6" fill="#059669" />
    <rect x="19" y="48" width="12" height="8" rx="4" fill="#059669" />
    <rect x="49" y="48" width="12" height="8" rx="4" fill="#059669" />
    <line x1="55" y1="20" x2="55" y2="68" stroke="#92400E" strokeWidth="3" strokeLinecap="round" />
    <path d="M55 20 Q70 36 55 52" fill="none" stroke="#6B7280" strokeWidth="2" />
    <path d="M55 20 L59 26" stroke="#92400E" strokeWidth="2" />
    <path d="M55 20 L51 26" stroke="#92400E" strokeWidth="2" />
    <line x1="19" y1="38" x2="55" y2="38" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" />
    <polygon points="19,38 23,35 23,41" fill="#F7B731" />
  </svg>
);

const NinjaSVG = () => (
  <svg viewBox="0 0 80 80" width="60" height="60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="40" cy="28" r="16" fill="#1E293B" />
    <rect x="26" y="14" width="28" height="16" rx="8" fill="#0F172A" />
    <rect x="24" y="22" width="32" height="14" rx="4" fill="#1E293B" />
    <rect x="28" y="24" width="24" height="4" rx="2" fill="#334155" />
    <ellipse cx="35" cy="28" rx="4" ry="3.5" fill="white" />
    <ellipse cx="45" cy="28" rx="4" ry="3.5" fill="white" />
    <circle cx="36" cy="29" r="2.5" fill="#DC2626" />
    <circle cx="46" cy="29" r="2.5" fill="#DC2626" />
    <rect x="28" y="44" width="24" height="28" rx="6" fill="#0F172A" />
    <rect x="17" y="46" width="13" height="10" rx="5" fill="#0F172A" />
    <rect x="50" y="46" width="13" height="10" rx="5" fill="#0F172A" />
    <path d="M60 38 L74 28 L68 36 L76 32 L62 44Z" fill="#94A3B8" />
    <path d="M58 42 L74 36 L66 42 L74 40 L60 50Z" fill="#94A3B8" />
    <polygon points="55,50 65,44 65,56" fill="#64748B" />
  </svg>
);

const avatars: AvatarDef[] = [
  { id: 'knight', label: 'Knight', svgPath: <KnightSVG />, color: '#3B82F6' },
  { id: 'wizard', label: 'Wizard', svgPath: <WizardSVG />, color: '#7C3AED' },
  { id: 'archer', label: 'Archer', svgPath: <ArcherSVG />, color: '#059669' },
  { id: 'ninja',  label: 'Ninja',  svgPath: <NinjaSVG />,  color: '#DC2626' },
];

export const AvatarPicker: React.FC<AvatarPickerProps> = ({ selected, onSelect }) => {
  return (
    <div className="avatar-grid" role="radiogroup" aria-label="Choose your avatar">
      {avatars.map((av) => (
        <button
          key={av.id}
          className={`avatar-option${selected === av.id ? ' selected' : ''}`}
          onClick={() => onSelect(av.id)}
          role="radio"
          aria-checked={selected === av.id}
          aria-label={av.label}
          type="button"
          style={selected === av.id ? { borderColor: av.color, boxShadow: `0 0 20px ${av.color}66` } : {}}
        >
          {av.svgPath}
          <span style={selected === av.id ? { color: av.color } : {}}>{av.label}</span>
        </button>
      ))}
    </div>
  );
};
