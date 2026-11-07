import React from 'react';
import { Product, ProductArtworkType } from '../types';

interface ProductArtworkProps {
  product: Product;
  height?: string;
  showBadges?: boolean;
}

const DEFAULT_THEMES: Record<string, { primary: string; secondary: string; accent: string; artworkType: ProductArtworkType }> = {
  'Tabacaria & Hookah': { primary: '#FB7185', secondary: '#E11D48', accent: '#FDE047', artworkType: 'essence' },
  'Carvões & Insumos': { primary: '#F97316', secondary: '#9A3412', accent: '#FDBA74', artworkType: 'charcoal' },
  'Gelo & Copos': { primary: '#38BDF8', secondary: '#0284C7', accent: '#FACC15', artworkType: 'cup' },
  'Bebidas & Energéticos': { primary: '#3B82F6', secondary: '#1D4ED8', accent: '#EF4444', artworkType: 'energydrink' },
  'Acessórios & Headshop': { primary: '#E11D48', secondary: '#881337', accent: '#FBBF24', artworkType: 'rosh' },
  'Snacks & Bomboniere': { primary: '#EF4444', secondary: '#991B1B', accent: '#FDE047', artworkType: 'snack' },
};

export const ProductArtwork: React.FC<ProductArtworkProps> = ({
  product,
  height = 'h-48',
  showBadges = true,
}) => {
  const theme = product.visualTheme || DEFAULT_THEMES[product.category] || DEFAULT_THEMES['Tabacaria & Hookah'];
  const brandLabel = (product.brand || product.name.split(' ')[0]).substring(0, 14).toUpperCase();
  const shortBrand = brandLabel.split(' ')[0];
  const uid = product.id.replace(/[^a-zA-Z0-9]/g, '');

  const marginPct = Math.round(((product.sellingPrice - product.costPrice) / (product.costPrice || 1)) * 100);

  return (
    <div
      className={`relative w-full ${height} rounded-2xl overflow-hidden select-none flex items-center justify-center bg-[#060913] border border-white/[0.07] group-hover:border-rose-500/40 transition-all duration-500`}
    >
      {/* Dynamic Radial Studio Spotlight */}
      <div
        className="absolute inset-0 opacity-35 group-hover:opacity-60 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 55%, ${theme.primary}55 0%, ${theme.secondary}25 45%, transparent 78%)`,
        }}
      />

      {/* Studio Perspective Grid Floor */}
      <div
        className="absolute inset-x-0 bottom-0 h-16 opacity-25 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, ${theme.primary}33 1px, transparent 1px), linear-gradient(to bottom, ${theme.primary}33 1px, transparent 1px)`,
          backgroundSize: '18px 10px',
          maskImage: 'linear-gradient(to top, black, transparent)',
          WebkitMaskImage: 'linear-gradient(to top, black, transparent)',
        }}
      />

      {/* Top Floating Badges */}
      {showBadges && (
        <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-1.5 z-20 pointer-events-none">
          <div className="flex items-center gap-1.5">
            {product.ageRestricted && (
              <span className="px-2 py-0.5 rounded-md bg-rose-950/90 border border-rose-500/50 text-rose-200 font-mono font-black text-[10px] shadow-md backdrop-blur-md">
                🔞 18+
              </span>
            )}
            {product.badge && (
              <span className="px-2.5 py-0.5 rounded-md bg-slate-950/85 border border-white/15 text-white font-bold text-[10px] shadow-md backdrop-blur-md truncate max-w-[145px]">
                {product.badge}
              </span>
            )}
          </div>

          <span className="px-2 py-0.5 rounded-md bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 font-mono font-extrabold text-[10px] shadow-md backdrop-blur-md">
            +{marginPct}% lucro
          </span>
        </div>
      )}

      {/* Bottom Left SKU Watermark */}
      {showBadges && (
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between z-20 pointer-events-none">
          <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 bg-slate-950/80 px-2 py-0.5 rounded border border-white/10">
            {product.sku}
          </span>
          <span className="text-[9px] font-mono uppercase tracking-wider text-rose-300/90 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-500/25">
            {product.unit.toUpperCase()}
          </span>
        </div>
      )}

      {/* 3D STUDIO SVG PRODUCT ILLUSTRATION */}
      <div className="relative z-10 w-36 h-36 flex items-center justify-center transform group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-500">
        <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-[0_14px_22px_rgba(0,0,0,0.85)]">
          <defs>
            <linearGradient id={`gradMain-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={theme.primary} />
              <stop offset="100%" stopColor={theme.secondary} />
            </linearGradient>
            <linearGradient id={`gradDark-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#090D16" />
            </linearGradient>
            <linearGradient id={`gradAccent-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={theme.accent} />
              <stop offset="100%" stopColor={theme.primary} />
            </linearGradient>
          </defs>

          {/* Floor Shadow Ellipse */}
          <ellipse cx="80" cy="142" rx="44" ry="8" fill="#000000" opacity="0.65" />

          {/* 1. ESSENCE 50G BOX */}
          {theme.artworkType === 'essence' && (
            <g>
              {/* Aromatic Smoke Waves */}
              <path
                d="M52 38 C46 26, 62 18, 56 8 M108 42 C114 30, 98 22, 104 12"
                stroke={theme.accent}
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                opacity="0.55"
              />
              {/* 3D Side Panel */}
              <polygon points="116,34 128,42 128,130 116,138" fill={theme.secondary} opacity="0.85" />
              {/* Main Box Front */}
              <rect
                x="42"
                y="34"
                width="74"
                height="104"
                rx="7"
                fill={`url(#gradDark-${uid})`}
                stroke={theme.primary}
                strokeWidth="2"
              />
              {/* Metallic Top Foil Band */}
              <rect x="42" y="34" width="74" height="22" rx="6" fill={`url(#gradMain-${uid})`} />
              <text
                x="79"
                y="49"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="11"
                fontWeight="900"
                fontFamily="Plus Jakarta Sans, sans-serif"
                letterSpacing="1.5"
              >
                {shortBrand}
              </text>
              {/* Flavor Glow Orb */}
              <circle cx="79" cy="84" r="21" fill={`url(#gradMain-${uid})`} opacity="0.9" />
              <circle cx="79" cy="84" r="15" fill="#090D16" opacity="0.35" />
              <path
                d="M73 84 C73 77, 85 77, 85 84 C85 91, 73 91, 73 84 Z"
                fill={theme.accent}
              />
              {/* Bottom Spec Strip */}
              <rect x="50" y="114" width="58" height="15" rx="4" fill="#0F172A" stroke={theme.primary} strokeWidth="1" />
              <text
                x="79"
                y="124"
                textAnchor="middle"
                fill={theme.accent}
                fontSize="8"
                fontWeight="800"
                fontFamily="JetBrains Mono, monospace"
              >
                PREMIUM 50G
              </text>
            </g>
          )}

          {/* 2. POD VAPE IGNITE */}
          {theme.artworkType === 'pod' && (
            <g>
              {/* Vapor Glow */}
              <circle cx="80" cy="30" r="16" fill={theme.accent} opacity="0.2" />
              {/* Mouthpiece */}
              <rect x="65" y="24" width="30" height="16" rx="5" fill="#0F172A" stroke={theme.accent} strokeWidth="1.5" />
              {/* Sleek Metallic Body */}
              <rect
                x="54"
                y="38"
                width="52"
                height="98"
                rx="12"
                fill={`url(#gradDark-${uid})`}
                stroke={theme.primary}
                strokeWidth="2.5"
              />
              {/* Diagonal Neon Stripe */}
              <polygon points="56,62 104,48 104,74 56,88" fill={`url(#gradMain-${uid})`} opacity="0.85" />
              <text
                x="80"
                y="72"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="10"
                fontWeight="900"
                letterSpacing="2"
              >
                IGNITE
              </text>
              <text
                x="80"
                y="104"
                textAnchor="middle"
                fill={theme.accent}
                fontSize="8.5"
                fontWeight="800"
                fontFamily="JetBrains Mono, monospace"
              >
                V80 • 8000
              </text>
              {/* LED Indicator */}
              <circle cx="80" cy="122" r="4" fill={theme.accent} />
            </g>
          )}

          {/* 3. CHARCOAL 1KG BOX */}
          {theme.artworkType === 'charcoal' && (
            <g>
              {/* 3D Side Cube */}
              <polygon points="118,44 134,54 134,128 118,136" fill={theme.secondary} />
              {/* Main Cube Box */}
              <rect
                x="34"
                y="44"
                width="84"
                height="92"
                rx="6"
                fill={`url(#gradDark-${uid})`}
                stroke={theme.primary}
                strokeWidth="2.2"
              />
              {/* Flame Header */}
              <rect x="34" y="44" width="84" height="24" rx="5" fill={`url(#gradMain-${uid})`} />
              <text
                x="76"
                y="60"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="10"
                fontWeight="900"
                letterSpacing="1"
              >
                {shortBrand} 1KG
              </text>
              {/* Hexagonal Ember Graphic */}
              <polygon
                points="76,74 94,84 94,104 76,114 58,104 58,84"
                fill="#090D16"
                stroke={theme.accent}
                strokeWidth="2"
              />
              <polygon
                points="76,81 87,87 87,99 76,105 65,99 65,87"
                fill={`url(#gradMain-${uid})`}
              />
              <text
                x="76"
                y="128"
                textAnchor="middle"
                fill={theme.accent}
                fontSize="7.5"
                fontWeight="800"
                fontFamily="JetBrains Mono, monospace"
              >
                100% COCO HEX
              </text>
            </g>
          )}

          {/* 4. ALUMINUM FOIL */}
          {theme.artworkType === 'foil' && (
            <g>
              <rect
                x="28"
                y="54"
                width="104"
                height="64"
                rx="8"
                fill={`url(#gradMain-${uid})`}
                stroke="#E2E8F0"
                strokeWidth="2"
              />
              <rect x="36" y="62" width="88" height="48" rx="5" fill="#0F172A" />
              <circle cx="80" cy="86" r="16" fill="none" stroke={theme.accent} strokeWidth="2" strokeDasharray="3 3" />
              <text
                x="80"
                y="84"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="10"
                fontWeight="900"
                letterSpacing="1.5"
              >
                PREDATOR
              </text>
              <text
                x="80"
                y="97"
                textAnchor="middle"
                fill={theme.accent}
                fontSize="7.5"
                fontWeight="800"
                fontFamily="JetBrains Mono, monospace"
              >
                50 FOLHAS 40μm
              </text>
            </g>
          )}

          {/* 5. ICE PACKAGE / SABORIZADO */}
          {theme.artworkType === 'ice' && (
            <g>
              <rect
                x="44"
                y="34"
                width="72"
                height="102"
                rx="12"
                fill={`url(#gradMain-${uid})`}
                stroke="#BAE6FD"
                strokeWidth="2"
                opacity="0.92"
              />
              {/* Ice Cubes Floating */}
              <rect
                x="58"
                y="52"
                width="22"
                height="22"
                rx="5"
                transform="rotate(-12 69 63)"
                fill="#E0F2FE"
                opacity="0.85"
              />
              <rect
                x="80"
                y="62"
                width="20"
                height="20"
                rx="5"
                transform="rotate(15 90 72)"
                fill="#FFFFFF"
                opacity="0.9"
              />
              <rect x="52" y="92" width="56" height="28" rx="6" fill="#090D16" opacity="0.85" />
              <text
                x="80"
                y="105"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="8.5"
                fontWeight="900"
              >
                GELO GOURMET
              </text>
              <text
                x="80"
                y="115"
                textAnchor="middle"
                fill={theme.accent}
                fontSize="7.5"
                fontWeight="800"
                fontFamily="JetBrains Mono, monospace"
              >
                COCO & MARACUJÁ
              </text>
            </g>
          )}

          {/* 6. COPÃO TWISTER 700ML */}
          {theme.artworkType === 'cup' && (
            <g>
              {/* Neon Straw */}
              <line x1="94" y1="14" x2="78" y2="125" stroke={theme.accent} strokeWidth="5" strokeLinecap="round" />
              {/* Dome Lid */}
              <path
                d="M46 50 C46 26, 114 26, 114 50 Z"
                fill="rgba(255,255,255,0.18)"
                stroke="#F8FAFC"
                strokeWidth="2"
              />
              {/* Cup Body */}
              <polygon
                points="46,50 114,50 104,136 56,136"
                fill={`url(#gradMain-${uid})`}
                stroke="#FDA4AF"
                strokeWidth="2"
              />
              {/* Ice Cubes inside Cup */}
              <rect x="62" y="62" width="14" height="14" rx="3" fill="#FFFFFF" opacity="0.45" />
              <rect x="82" y="68" width="14" height="14" rx="3" fill={theme.accent} opacity="0.55" />
              {/* TwoNine Badge on Cup */}
              <circle cx="80" cy="98" r="17" fill="#090D16" stroke={theme.accent} strokeWidth="1.5" />
              <text
                x="80"
                y="102"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="12"
                fontWeight="900"
              >
                29
              </text>
              <text
                x="80"
                y="128"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="8"
                fontWeight="800"
                fontFamily="JetBrains Mono, monospace"
              >
                COPÃO 700ML
              </text>
            </g>
          )}

          {/* 7. ENERGY DRINK CAN */}
          {theme.artworkType === 'energydrink' && (
            <g>
              {/* Can Top Rim */}
              <ellipse cx="80" cy="30" rx="28" ry="6" fill="#CBD5E1" />
              {/* Can Cylinder */}
              <rect
                x="52"
                y="30"
                width="56"
                height="104"
                rx="8"
                fill={`url(#gradDark-${uid})`}
                stroke={theme.primary}
                strokeWidth="2.2"
              />
              {/* Colored Energy Panel */}
              <path d="M52 45 L108 65 L108 105 L52 85 Z" fill={`url(#gradMain-${uid})`} />
              <text
                x="80"
                y="78"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="10"
                fontWeight="900"
                letterSpacing="1"
              >
                {shortBrand}
              </text>
              <text
                x="80"
                y="120"
                textAnchor="middle"
                fill={theme.accent}
                fontSize="8"
                fontWeight="800"
                fontFamily="JetBrains Mono, monospace"
              >
                ENERGY ICE
              </text>
              {/* Can Bottom Rim */}
              <ellipse cx="80" cy="134" rx="26" ry="5" fill="#94A3B8" />
            </g>
          )}

          {/* 8. 2L BOTTLE (BALY / COCA) */}
          {theme.artworkType === 'bottle' && (
            <g>
              {/* Bottle Cap */}
              <rect x="72" y="16" width="16" height="10" rx="3" fill={theme.accent} />
              {/* Bottle Neck */}
              <path
                d="M72 26 L60 52 L100 52 L88 26 Z"
                fill={`url(#gradMain-${uid})`}
                opacity="0.85"
              />
              {/* Bottle Body */}
              <rect
                x="54"
                y="50"
                width="52"
                height="86"
                rx="14"
                fill={`url(#gradMain-${uid})`}
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />
              {/* Center Label */}
              <rect x="54" y="72" width="52" height="34" fill="#090D16" />
              <text
                x="80"
                y="91"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="10.5"
                fontWeight="900"
                letterSpacing="1"
              >
                {shortBrand}
              </text>
              <text
                x="80"
                y="102"
                textAnchor="middle"
                fill={theme.accent}
                fontSize="7.5"
                fontWeight="800"
                fontFamily="JetBrains Mono, monospace"
              >
                2 LITROS
              </text>
            </g>
          )}

          {/* 9. CLIPPER LIGHTER */}
          {theme.artworkType === 'lighter' && (
            <g>
              {/* Flame */}
              <path
                d="M80 14 C88 24, 90 34, 80 40 C70 34, 72 24, 80 14 Z"
                fill={theme.accent}
              />
              {/* Metal Guard */}
              <rect x="68" y="40" width="24" height="16" rx="3" fill="#CBD5E1" />
              {/* Cylindrical Body */}
              <rect
                x="62"
                y="54"
                width="36"
                height="82"
                rx="8"
                fill={`url(#gradMain-${uid})`}
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />
              <text
                x="80"
                y="98"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="9"
                fontWeight="900"
                transform="rotate(-90 80 98)"
                letterSpacing="2"
              >
                CLIPPER
              </text>
            </g>
          )}

          {/* 10. ROLLING PAPER SEDA */}
          {theme.artworkType === 'rollingpaper' && (
            <g>
              <rect
                x="24"
                y="58"
                width="112"
                height="52"
                rx="7"
                fill={`url(#gradDark-${uid})`}
                stroke={theme.primary}
                strokeWidth="2"
              />
              <rect x="24" y="58" width="112" height="16" rx="5" fill={theme.accent} />
              <text
                x="80"
                y="70"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="9"
                fontWeight="900"
                letterSpacing="2"
              >
                SMOKING MASTER
              </text>
              <text
                x="80"
                y="94"
                textAnchor="middle"
                fill="#E2E8F0"
                fontSize="8.5"
                fontWeight="800"
                fontFamily="JetBrains Mono, monospace"
              >
                KING SIZE + TIPS
              </text>
            </g>
          )}

          {/* 11. ROSH PHUNNEL / KALOUD */}
          {theme.artworkType === 'rosh' && (
            <g>
              {/* Glowing Coals on Top */}
              <rect x="64" y="24" width="13" height="13" rx="2" fill="#F97316" />
              <rect x="82" y="24" width="13" height="13" rx="2" fill="#EF4444" />
              {/* Bowl Top Cup */}
              <path
                d="M44 38 L116 38 L102 68 L58 68 Z"
                fill={`url(#gradMain-${uid})`}
                stroke={theme.accent}
                strokeWidth="2"
              />
              {/* Stem Ring */}
              <ellipse cx="80" cy="84" rx="16" ry="8" fill={theme.accent} />
              {/* Base Foot */}
              <path
                d="M68 68 L92 68 L98 136 L62 136 Z"
                fill={`url(#gradDark-${uid})`}
                stroke={theme.primary}
                strokeWidth="2"
              />
              <text
                x="80"
                y="56"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="8.5"
                fontWeight="900"
                letterSpacing="1"
              >
                {shortBrand}
              </text>
            </g>
          )}

          {/* 12. COMPLETE HOOKAH */}
          {theme.artworkType === 'hookah' && (
            <g>
              {/* Rosh */}
              <polygon points="66,22 94,22 88,36 72,36" fill={theme.accent} />
              {/* Plate */}
              <ellipse cx="80" cy="40" rx="26" ry="5" fill={theme.primary} />
              {/* Anodized Stem */}
              <rect x="75" y="40" width="10" height="54" rx="3" fill={`url(#gradMain-${uid})`} />
              {/* Crystal Vase */}
              <path
                d="M66 94 L94 94 L112 136 L48 136 Z"
                fill="rgba(244,63,94,0.28)"
                stroke={theme.primary}
                strokeWidth="2.5"
              />
              {/* Hose Curve */}
              <path
                d="M74 82 C42 82, 38 118, 56 126"
                fill="none"
                stroke={theme.accent}
                strokeWidth="3"
                strokeLinecap="round"
              />
            </g>
          )}

          {/* 13. SNACKS (PRINGLES / DORITOS / KITKAT) */}
          {theme.artworkType === 'snack' && (
            <g>
              <rect
                x="46"
                y="34"
                width="68"
                height="102"
                rx="10"
                fill={`url(#gradMain-${uid})`}
                stroke={theme.accent}
                strokeWidth="2"
              />
              <circle cx="80" cy="76" r="20" fill="#090D16" />
              <text
                x="80"
                y="80"
                textAnchor="middle"
                fill={theme.accent}
                fontSize="9.5"
                fontWeight="900"
              >
                {shortBrand}
              </text>
              <rect x="54" y="108" width="52" height="16" rx="4" fill="#090D16" />
              <text
                x="80"
                y="119"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="7.5"
                fontWeight="800"
                fontFamily="JetBrains Mono, monospace"
              >
                SNACK LOUNGE
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};
