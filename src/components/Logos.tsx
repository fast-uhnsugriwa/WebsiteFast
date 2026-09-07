import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  variant?: 'light' | 'dark' | 'color';
}

/**
 * Universitas Hindu Negeri I Gusti Bagus Sugriwa Denpasar Logo
 * Authentic Balinese academic crest: Lotus Astadala, Cakra, Sacred Flame, and Royal Gold/Orange tones.
 */
export const UniversityLogo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  variant = 'color'
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeDimensions = {
    sm: 'w-8 h-8',
    md: 'w-9 h-9 sm:w-12 sm:h-12',
    lg: 'w-14 h-14 sm:w-16 sm:h-16',
    xl: 'w-18 h-18 sm:w-20 sm:h-20'
  }[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Visual Emblem Container */}
      <div className={`relative flex items-center justify-center shrink-0 ${sizeDimensions} rounded-xl bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-transparent p-0.5 shadow-sm ring-1 ring-amber-500/20`}>
        {!imageError ? (
          <img
            src="/Logo UHN.png"
            alt="Logo UHN I Gusti Bagus Sugriwa Denpasar"
            className="w-full h-full object-contain"
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
          />
        ) : null}

        {/* High-fidelity Vector Fallback Emblem */}
        {imageError && (
          <svg
            viewBox="0 0 120 120"
            className="w-full h-full drop-shadow-sm"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Emblem UHN I Gusti Bagus Sugriwa Denpasar"
          >
            {/* Outer Sacred Lotus Ring */}
            <circle cx="60" cy="60" r="56" className="stroke-amber-600/80" strokeWidth="2.5" strokeDasharray="3 2" />
            <circle cx="60" cy="60" r="50" className="fill-amber-500/10 stroke-orange-600" strokeWidth="2" />
            
            {/* 8-Petaled Lotus (Padma Astadala) */}
            <g className="fill-amber-500 stroke-amber-700" strokeWidth="1">
              <path d="M60 14 C65 26, 65 34, 60 42 C55 34, 55 26, 60 14 Z" fill="url(#goldGrad)" />
              <path d="M60 106 C65 94, 65 86, 60 78 C55 86, 55 94, 60 106 Z" fill="url(#goldGrad)" />
              <path d="M14 60 C26 65, 34 65, 42 60 C34 55, 26 55, 14 60 Z" fill="url(#goldGrad)" />
              <path d="M106 60 C94 65, 86 65, 78 60 C86 55, 94 55, 106 60 Z" fill="url(#goldGrad)" />
              
              <path d="M27 27 C38 35, 43 41, 46 47 C39 46, 33 41, 27 27 Z" fill="url(#orangeGrad)" />
              <path d="M93 93 C82 85, 77 79, 74 73 C81 74, 87 79, 93 93 Z" fill="url(#orangeGrad)" />
              <path d="M93 27 C85 38, 79 43, 73 46 C74 39, 79 33, 93 27 Z" fill="url(#orangeGrad)" />
              <path d="M27 93 C35 82, 41 77, 46 73 C46 81, 41 87, 27 93 Z" fill="url(#orangeGrad)" />
            </g>

            {/* Central Temple Kori / Candi & Flame */}
            <circle cx="60" cy="60" r="28" className="fill-stone-900 stroke-amber-400" strokeWidth="2" />
            
            {/* Sacred Flame & Cakra */}
            <path
              d="M60 38 C64 45, 68 49, 68 56 C68 62, 64 67, 60 67 C56 67, 52 62, 52 56 C52 49, 56 45, 60 38 Z"
              fill="url(#goldGrad)"
              className="stroke-amber-300"
              strokeWidth="0.8"
            />
            {/* Open Book / Sastra Leaf */}
            <path
              d="M48 68 C54 66, 58 68, 60 72 C62 68, 66 66, 72 68 C70 76, 62 76, 60 79 C58 76, 50 76, 48 68 Z"
              fill="#fef3c7"
              className="stroke-amber-600"
              strokeWidth="0.8"
            />
            
            {/* Gradients */}
            <defs>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>
              <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fb923c" />
                <stop offset="100%" stopColor="#ea580c" />
              </linearGradient>
            </defs>
          </svg>
        )}
      </div>

      {/* Typography */}
      {showText && (
        <div className="flex flex-col leading-tight">
          <span className="text-[10px] tracking-wider uppercase font-semibold text-amber-700">
            Universitas Hindu Negeri
          </span>
          <span className="text-sm sm:text-base font-bold text-stone-900 tracking-tight">
            I Gusti Bagus Sugriwa
          </span>
          <span className="text-[10px] text-stone-500 font-medium">
            Denpasar - Bali
          </span>
        </div>
      )}
    </div>
  );
};

/**
 * Fakultas Sains dan Teknologi (FAST) Logo
 * Modern fusion of science & computational circuit with Balinese sacred geometry and warm orange/gold identity.
 */
export const FacultyLogo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  variant = 'color'
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeDimensions = {
    sm: 'w-8 h-8',
    md: 'w-9 h-9 sm:w-12 sm:h-12',
    lg: 'w-14 h-14 sm:w-16 sm:h-16',
    xl: 'w-18 h-18 sm:w-20 sm:h-20'
  }[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Visual Emblem Container */}
      <div className={`relative flex items-center justify-center shrink-0 ${sizeDimensions} rounded-xl bg-gradient-to-br from-orange-500/15 via-amber-500/10 to-transparent p-0.5 shadow-sm ring-1 ring-orange-500/30`}>
        {!imageError ? (
          <img
            src="/FASTONLY.png"
            alt="Logo Fakultas Sains dan Teknologi UHN Sugriwa"
            className="w-full h-full object-contain"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.src.includes('public/FASTONLY.png')) {
                target.src = '/public/FASTONLY.png';
              } else {
                setImageError(true);
              }
            }}
            referrerPolicy="no-referrer"
          />
        ) : null}

        {/* High-fidelity Vector Fallback Emblem */}
        {imageError && (
          <svg
            viewBox="0 0 120 120"
            className="w-full h-full drop-shadow-sm"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Emblem Fakultas Sains dan Teknologi"
          >
            {/* Outer Hexagon Tech Frame */}
            <polygon
              points="60,8 104,33 104,87 60,112 16,87 16,33"
              className="fill-stone-900 stroke-orange-500"
              strokeWidth="2.5"
            />

            {/* Concentric Modern Tech Nodes / Orbit Rings */}
            <circle cx="60" cy="60" r="38" className="stroke-amber-400/40" strokeWidth="1.5" strokeDasharray="4 3" />
            <circle cx="60" cy="60" r="26" className="stroke-orange-400" strokeWidth="1.5" />

            {/* Circuit Line Accents */}
            <line x1="60" y1="12" x2="60" y2="28" className="stroke-amber-400" strokeWidth="2" />
            <line x1="100" y1="35" x2="86" y2="44" className="stroke-amber-400" strokeWidth="2" />
            <line x1="100" y1="85" x2="86" y2="76" className="stroke-amber-400" strokeWidth="2" />
            <line x1="60" y1="108" x2="60" y2="92" className="stroke-amber-400" strokeWidth="2" />
            <line x1="20" y1="85" x2="34" y2="76" className="stroke-amber-400" strokeWidth="2" />
            <line x1="20" y1="35" x2="34" y2="44" className="stroke-amber-400" strokeWidth="2" />

            {/* Central Scientific Atom + Balinese Tri Murti / Flame Core */}
            <ellipse cx="60" cy="60" rx="22" ry="7" transform="rotate(30 60 60)" className="stroke-amber-300" strokeWidth="1.2" />
            <ellipse cx="60" cy="60" rx="22" ry="7" transform="rotate(-30 60 60)" className="stroke-orange-300" strokeWidth="1.2" />
            
            {/* Center Glowing Core Node */}
            <circle cx="60" cy="60" r="7" className="fill-orange-500 stroke-amber-200" strokeWidth="1.5" />
            <circle cx="60" cy="60" r="3" className="fill-white" />

            {/* Node Points */}
            <circle cx="60" cy="22" r="2.5" className="fill-amber-400" />
            <circle cx="92" cy="40" r="2.5" className="fill-orange-400" />
            <circle cx="92" cy="80" r="2.5" className="fill-amber-400" />
            <circle cx="60" cy="98" r="2.5" className="fill-orange-400" />
            <circle cx="28" cy="80" r="2.5" className="fill-amber-400" />
            <circle cx="28" cy="40" r="2.5" className="fill-orange-400" />
          </svg>
        )}
      </div>

      {/* Typography */}
      {showText && (
        <div className="flex flex-col leading-tight">
          <span className="text-[10px] tracking-wider uppercase font-semibold text-orange-600">
            Fakultas Sains dan Teknologi
          </span>
          <span className="text-sm sm:text-base font-bold text-stone-900 tracking-tight flex items-center gap-1.5">
            FAST Sugriwa
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
              OBE
            </span>
          </span>
          <span className="text-[10px] text-stone-500 font-medium">
            Informatika • DKV • Sains Informasi
          </span>
        </div>
      )}
    </div>
  );
};

/**
 * Unified Header Brand Lockup
 * Shows university + faculty logos with divider and official institutional identity.
 */
export const InstitutionalBrandLockup: React.FC<{
  onHomeClick?: () => void;
  compact?: boolean;
}> = ({ onHomeClick, compact = false }) => {
  return (
    <button
      id="brand-header-link"
      onClick={onHomeClick}
      className="group flex items-center text-left gap-2 sm:gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-lg p-1 transition hover:opacity-95 max-w-[calc(100vw-80px)] sm:max-w-none shrink-0"
      aria-label="Kembali ke Beranda Fakultas Sains dan Teknologi UHN Sugriwa"
    >
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        <UniversityLogo size={compact ? 'sm' : 'md'} showText={false} />
        <FacultyLogo size={compact ? 'sm' : 'md'} showText={false} />
      </div>

      <div className="h-8 sm:h-9 w-px bg-stone-200 hidden sm:block shrink-0" aria-hidden="true" />

      <div className="flex flex-col min-w-0 shrink-0">
        <span className="text-[9px] sm:text-[10px] xl:text-[11px] uppercase tracking-wider font-semibold text-amber-700 leading-none truncate">
          UHN I Gusti Bagus Sugriwa
        </span>
        <span className="text-xs sm:text-base xl:text-lg font-extrabold text-stone-900 tracking-tight leading-tight mt-0.5 group-hover:text-orange-600 transition-colors whitespace-nowrap">
          Fakultas Sains dan Teknologi
        </span>
      </div>
    </button>
  );
};
