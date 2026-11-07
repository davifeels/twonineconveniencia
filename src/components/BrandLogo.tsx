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
  // Dimension mappings
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
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

  // Modern Vector Monogram: Continuous geometric "2" and "9" with energy dynamic
  const SvgIcon = () => (
    <div className={`relative flex items-center justify-center ${iconSizes[size]} shrink-0`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        <defs>
          <linearGradient id="twonineGradPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={monochrome ? '#FFFFFF' : '#FF3366'} />
            <stop offset="50%" stopColor={monochrome ? '#E2E8F0' : '#E11D48'} />
            <stop offset="100%" stopColor={monochrome ? '#94A3B8' : '#BE123C'} />
          </linearGradient>
          <linearGradient id="twonineGradAccent" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={monochrome ? '#CBD5E1' : '#FB7185'} />
            <stop offset="100%" stopColor={monochrome ? '#64748B' : '#E11D48'} />
          </linearGradient>
          <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Hex-Rounded Protective Shield */}
        <rect
          x="4"
          y="4"
          width="92"
          height="92"
          rx="24"
          fill={monochrome ? 'rgba(255,255,255,0.05)' : '#0F172A'}
          stroke={monochrome ? 'rgba(255,255,255,0.2)' : 'rgba(225, 29, 72, 0.35)'}
          strokeWidth="2.5"
        />

        {/* Glow underlay */}
        {!monochrome && (
          <circle cx="50" cy="50" r="28" fill="#E11D48" opacity="0.15" filter="url(#glowEffect)" />
        )}

        {/* Number "2" Geometry - Left loop, diagonal & base */}
        <path
          d="M 28 42 C 28 32, 44 26, 48 36 C 50 42, 38 49, 28 62 L 28 69 L 52 69"
          stroke="url(#twonineGradPrimary)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Number "9" Geometry - Right loop and smooth tail interlocking */}
        <path
          d="M 68 45 C 68 36, 57 33, 52 38 C 47 43, 50 51, 62 51 C 70 51, 72 44, 72 50 C 72 63, 60 70, 52 70"
          stroke="url(#twonineGradAccent)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Central Convergence Point: Represents the 2 stores connected */}
        <circle
          cx="50"
          cy="50"
          r="3"
          fill={monochrome ? '#FFFFFF' : '#FFFFFF'}
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
          <div className="flex items-center gap-1.5">
            <span
              className={`font-black tracking-tight ${textSizes[size]} text-white`}
              style={{ letterSpacing: '-0.03em' }}
            >
              TWO<span className="text-rose-500 font-extrabold">NINE</span>
            </span>
            {subtitle === 'manager' && (
              <span className="bg-rose-500/15 text-rose-400 text-[10px] font-bold px-1.5 py-0.5 rounded border border-rose-500/30 uppercase tracking-widest">
                MANAGER
              </span>
            )}
          </div>

          {subtitle === 'conveniencia' && (
            <span
              className={`text-slate-400 font-semibold uppercase ${subTextSizes[size]} mt-0.5`}
            >
              CONVENIÊNCIA
            </span>
          )}

          {subtitle === 'manager' && (
            <span
              className={`text-slate-400 font-medium uppercase ${subTextSizes[size]} mt-0.5`}
            >
              SISTEMA DE GESTÃO CENTRALIZADA
            </span>
          )}
        </div>
      )}
    </div>
  );
};
