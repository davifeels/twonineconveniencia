import React from 'react';

interface BrandLogoProps {
  variant?: 'full' | 'icon-only' | 'horizontal' | 'badge';
  subtitle?: 'conveniencia' | 'manager' | 'none';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  monochrome?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'full',
  subtitle = 'manager',
  size = 'md',
  monochrome = false,
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-18 h-18',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  const subTextSizes = {
    sm: 'text-[9px] tracking-[0.2em]',
    md: 'text-[11px] tracking-[0.25em]',
    lg: 'text-xs tracking-[0.3em]',
    xl: 'text-sm tracking-[0.35em]',
  };

  // Modern Vector: Intertwined 29 with Hookah / Flame Apex Dynamic
  const SvgIcon = () => (
    <div className={`relative flex items-center justify-center ${iconSizes[size]} shrink-0`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-lg"
      >
        <defs>
          <linearGradient id="twonineGradPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={monochrome ? '#FFFFFF' : '#FF2A55'} />
            <stop offset="50%" stopColor={monochrome ? '#E2E8F0' : '#E11D48'} />
            <stop offset="100%" stopColor={monochrome ? '#94A3B8' : '#9F1239'} />
          </linearGradient>
          <linearGradient id="twonineGradAccent" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={monochrome ? '#CBD5E1' : '#FB7185'} />
            <stop offset="100%" stopColor={monochrome ? '#64748B' : '#E11D48'} />
          </linearGradient>
          <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Shield Container */}
        <rect
          x="3"
          y="3"
          width="94"
          height="94"
          rx="26"
          fill={monochrome ? 'rgba(255,255,255,0.06)' : '#0F172A'}
          stroke={monochrome ? 'rgba(255,255,255,0.2)' : 'rgba(225, 29, 72, 0.4)'}
          strokeWidth="2.5"
        />

        {/* Energy Aura */}
        {!monochrome && (
          <circle cx="50" cy="50" r="30" fill="#E11D48" opacity="0.18" filter="url(#glowEffect)" />
        )}

        {/* Hookah / Flame Stem Accent */}
        <path
          d="M 50 16 L 50 28 M 45 22 L 55 22 M 50 16 C 48 12, 52 10, 50 8"
          stroke={monochrome ? '#FFFFFF' : '#FF4365'}
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Number 2 Geometry (Left Store / Vila Buritis) */}
        <path
          d="M 28 42 C 28 32, 44 26, 48 36 C 50 42, 38 49, 28 62 L 28 69 L 52 69"
          stroke="url(#twonineGradPrimary)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Number 9 Geometry (Right Store / Setor Tradicional) */}
        <path
          d="M 68 45 C 68 36, 57 33, 52 38 C 47 43, 50 51, 62 51 C 70 51, 72 44, 72 50 C 72 63, 60 70, 52 70"
          stroke="url(#twonineGradAccent)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Central Convergence Core (Nexus) */}
        <circle
          cx="50"
          cy="50"
          r="3"
          fill="#FFFFFF"
          className="animate-pulse"
        />
      </svg>
    </div>
  );

  if (variant === 'icon-only') {
    return <SvgIcon />;
  }

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <SvgIcon />

      {(variant === 'full' || variant === 'horizontal') && (
        <div className="flex flex-col justify-center leading-none">
          <div className="flex items-center gap-2">
            <span
              className={`font-black tracking-tight ${textSizes[size]} text-white`}
              style={{ letterSpacing: '-0.03em' }}
            >
              TWO<span className="text-rose-500 font-extrabold">NINE</span>
            </span>

            <span className="bg-rose-500/15 text-rose-400 text-[10px] font-bold px-1.5 py-0.5 rounded border border-rose-500/30 uppercase tracking-wider flex items-center gap-1">
              <span>🔞</span>
              <span>18+</span>
            </span>

            {subtitle === 'manager' && (
              <span className="bg-slate-800 text-slate-300 text-[10px] font-bold px-1.5 py-0.5 rounded border border-slate-700 uppercase tracking-widest hidden sm:inline">
                ERP
              </span>
            )}
          </div>

          {subtitle === 'conveniencia' && (
            <span
              className={`text-slate-400 font-bold uppercase ${subTextSizes[size]} mt-1 flex items-center gap-1`}
            >
              <span>TABACARIA & CONVENIÊNCIA</span>
              <span className="text-rose-500">•</span>
              <span className="text-slate-500">DESDE 2017</span>
            </span>
          )}

          {subtitle === 'manager' && (
            <span
              className={`text-slate-400 font-semibold uppercase ${subTextSizes[size]} mt-1`}
            >
              TABACARIA & CONVENIÊNCIA • GESTÃO MULTIUNIDADE
            </span>
          )}
        </div>
      )}
    </div>
  );
};
