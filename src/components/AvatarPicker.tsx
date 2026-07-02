import React, { useState } from 'react';
import { Camera, RefreshCw, Eye, Sparkles, Smile, ShieldAlert } from 'lucide-react';

interface AvatarPickerProps {
  archetype: string;
  name: string;
  expression: AvatarExpression;
  setExpression: (e: AvatarExpression) => void;
  accessory: AvatarAccessory;
  setAccessory: (a: AvatarAccessory) => void;
  colorFilter: AvatarFilter;
  setColorFilter: (f: AvatarFilter) => void;
}

export type AvatarExpression = 'dissociated' | 'panic' | 'dead-inside' | 'smug' | 'crying';
export type AvatarAccessory = 'none' | 'neon-visor' | 'robotic-eye' | 'coffee-iv' | 'vr-goggles';
export type AvatarFilter = 'matrix-green' | 'neon-pink' | 'nuclear-amber' | 'glitch-blue';

export default function AvatarPicker({
  archetype,
  name,
  expression,
  setExpression,
  accessory,
  setAccessory,
  colorFilter,
  setColorFilter
}: AvatarPickerProps) {
  const [glitchFactor, setGlitchFactor] = useState(false);

  // Generate responsive background/accent colors for filters
  const getFilterStyles = () => {
    switch (colorFilter) {
      case 'matrix-green':
        return {
          bg: 'bg-emerald-950/40',
          text: 'text-emerald-400',
          border: 'border-emerald-500/30',
          glow: 'shadow-[0_0_15px_rgba(16,185,129,0.2)]',
          svgColor: '#10b981',
          svgAccent: '#34d399',
          svgBg: '#022c22'
        };
      case 'neon-pink':
        return {
          bg: 'bg-pink-950/40',
          text: 'text-pink-400',
          border: 'border-pink-500/30',
          glow: 'shadow-[0_0_15px_rgba(244,63,94,0.2)]',
          svgColor: '#f43f5e',
          svgAccent: '#fb7185',
          svgBg: '#4c0519'
        };
      case 'nuclear-amber':
        return {
          bg: 'bg-amber-950/40',
          text: 'text-amber-400',
          border: 'border-amber-500/30',
          glow: 'shadow-[0_0_15px_rgba(245,158,11,0.2)]',
          svgColor: '#f59e0b',
          svgAccent: '#fbbf24',
          svgBg: '#451a03'
        };
      case 'glitch-blue':
        return {
          bg: 'bg-cyan-950/40',
          text: 'text-cyan-400',
          border: 'border-cyan-500/30',
          glow: 'shadow-[0_0_15px_rgba(6,182,212,0.2)]',
          svgColor: '#06b6d4',
          svgAccent: '#22d3ee',
          svgBg: '#083344'
        };
    }
  };

  const style = getFilterStyles();

  // Helper to draw head/hair outline based on archetype
  const drawArchetypeHead = (svgColor: string, svgAccent: string) => {
    switch (archetype) {
      case 'crypto':
        return (
          <>
            {/* Backward Cap */}
            <path d="M30,38 C30,22 70,22 70,38 L72,42 L28,42 Z" fill={svgAccent} opacity="0.8" />
            <rect x="20" y="32" width="25" height="6" rx="2" fill={svgColor} />
            {/* Sunglasses / laser outline behind accessory */}
            <circle cx="40" cy="50" r="12" stroke={svgColor} strokeWidth="1.5" fill="none" opacity="0.3" />
            <circle cx="60" cy="50" r="12" stroke={svgColor} strokeWidth="1.5" fill="none" opacity="0.3" />
          </>
        );
      case 'engineer':
        return (
          <>
            {/* Messy hair */}
            <path d="M25,35 L28,24 L34,28 L40,20 L48,27 L56,18 L64,28 L72,22 L75,35 Z" fill={svgAccent} opacity="0.75" />
            {/* Classic headphones */}
            <rect x="22" y="44" width="7" height="16" rx="3" fill={svgColor} />
            <rect x="71" y="44" width="7" height="16" rx="3" fill={svgColor} />
            <path d="M25,44 C25,24 75,24 75,44" fill="none" stroke={svgColor} strokeWidth="4" />
          </>
        );
      case 'designer':
        return (
          <>
            {/* Cool asymmetric indie haircut / Beanie */}
            <path d="M26,38 C26,20 74,18 74,38 L75,44 L25,44 Z" fill={svgAccent} />
            {/* Designer round glasses rim */}
            <circle cx="38" cy="50" r="10" stroke={svgColor} strokeWidth="1.5" fill="none" opacity="0.3" />
            <circle cx="62" cy="50" r="10" stroke={svgColor} strokeWidth="1.5" fill="none" opacity="0.3" />
            <line x1="48" y1="50" x2="52" y2="50" stroke={svgColor} strokeWidth="1.5" />
          </>
        );
      case 'corporate':
      default:
        return (
          <>
            {/* Perfectly slicked-back corporate hair */}
            <path d="M28,32 Q50,15 72,32 L75,40 L25,40 Z" fill={svgAccent} />
            {/* Bluetooth earpiece */}
            <path d="M72,48 C75,48 77,52 75,55 L72,58" fill="none" stroke={svgColor} strokeWidth="2.5" />
          </>
        );
    }
  };

  // Helper to draw eyes based on expression
  const drawEyes = (svgColor: string) => {
    switch (expression) {
      case 'panic':
        return (
          <>
            {/* Wide shocked circles */}
            <circle cx="40" cy="50" r="4" fill="none" stroke={svgColor} strokeWidth="2" />
            <circle cx="60" cy="50" r="4" fill="none" stroke={svgColor} strokeWidth="2" />
            <circle cx="40" cy="50" r="1" fill={svgColor} />
            <circle cx="60" cy="50" r="1" fill={svgColor} />
            {/* Worried eyebrows */}
            <path d="M34,42 Q40,39 46,43" fill="none" stroke={svgColor} strokeWidth="1.5" />
            <path d="M54,43 Q60,39 66,42" fill="none" stroke={svgColor} strokeWidth="1.5" />
          </>
        );
      case 'dead-inside':
        return (
          <>
            {/* Flat eyes (half closed) */}
            <line x1="34" y1="50" x2="46" y2="50" stroke={svgColor} strokeWidth="3" strokeLinecap="round" />
            <line x1="54" y1="50" x2="66" y2="50" stroke={svgColor} strokeWidth="3" strokeLinecap="round" />
            {/* Tired eye bags */}
            <path d="M34,54 Q40,57 46,54" fill="none" stroke={svgColor} strokeWidth="1" opacity="0.7" />
            <path d="M54,54 Q60,57 66,54" fill="none" stroke={svgColor} strokeWidth="1" opacity="0.7" />
          </>
        );
      case 'smug':
        return (
          <>
            {/* Asymmetrical confident eyes */}
            <path d="M34,48 Q40,45 46,48" fill="none" stroke={svgColor} strokeWidth="2" />
            <path d="M54,49 Q60,46 66,48" fill="none" stroke={svgColor} strokeWidth="2" />
            <circle cx="39" cy="52" r="1.5" fill={svgColor} />
            <circle cx="61" cy="52" r="1.5" fill={svgColor} />
            {/* Smug eyebrows */}
            <path d="M33,42 Q40,38 47,44" fill="none" stroke={svgColor} strokeWidth="2" />
            <path d="M53,43 Q60,40 67,39" fill="none" stroke={svgColor} strokeWidth="2" />
          </>
        );
      case 'crying':
        return (
          <>
            {/* Squeezed crying eyes */}
            <path d="M34,51 L44,48" stroke={svgColor} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M56,48 L66,51" stroke={svgColor} strokeWidth="2.5" strokeLinecap="round" />
            {/* Big teardrops */}
            <path d="M38,53 Q38,62 36,65 C35,67 39,67 38,65 Z" fill={style.svgAccent} opacity="0.9" />
            <path d="M62,53 Q62,62 64,65 C65,67 61,67 62,65 Z" fill={style.svgAccent} opacity="0.9" />
          </>
        );
      case 'dissociated':
      default:
        return (
          <>
            {/* Completely blank, soulless circles */}
            <circle cx="40" cy="50" r="3" fill="none" stroke={svgColor} strokeWidth="2" />
            <circle cx="60" cy="50" r="3" fill="none" stroke={svgColor} strokeWidth="2" />
            {/* Flat eyebrows */}
            <line x1="34" y1="42" x2="46" y2="42" stroke={svgColor} strokeWidth="1.5" />
            <line x1="54" y1="42" x2="66" y2="42" stroke={svgColor} strokeWidth="1.5" />
          </>
        );
    }
  };

  // Helper to draw mouth
  const drawMouth = (svgColor: string) => {
    switch (expression) {
      case 'panic':
        return <ellipse cx="50" cy="68" rx="6" ry="4" fill="none" stroke={svgColor} strokeWidth="2" />;
      case 'dead-inside':
        return <line x1="43" y1="68" x2="57" y2="68" stroke={svgColor} strokeWidth="2" strokeLinecap="round" />;
      case 'smug':
        return <path d="M44,66 Q54,72 56,66" fill="none" stroke={svgColor} strokeWidth="2" strokeLinecap="round" />;
      case 'crying':
        return <path d="M43,70 Q50,64 57,70" fill="none" stroke={svgColor} strokeWidth="2.5" strokeLinecap="round" />;
      case 'dissociated':
      default:
        return <line x1="44" y1="67" x2="56" y2="67" stroke={svgColor} strokeWidth="1.5" />;
    }
  };

  // Helper to draw special cyberpunk accessory overlays
  const drawAccessory = (svgColor: string) => {
    switch (accessory) {
      case 'neon-visor':
        return (
          <>
            {/* Glowing neon visor strip */}
            <polygon points="28,44 72,44 70,54 30,54" fill={style.svgAccent} opacity="0.85" className="animate-pulse" />
            <line x1="28" y1="49" x2="72" y2="49" stroke="#fff" strokeWidth="1" opacity="0.6" />
          </>
        );
      case 'robotic-eye':
        return (
          <>
            {/* Borg / Terminator lens on right eye */}
            <circle cx="60" cy="50" r="8" fill="none" stroke={style.svgAccent} strokeWidth="2" />
            <line x1="68" y1="50" x2="78" y2="50" stroke={style.svgAccent} strokeWidth="1.5" />
            <line x1="60" y1="42" x2="60" y2="35" stroke={style.svgAccent} strokeWidth="1.5" />
            <circle cx="60" cy="50" r="2.5" fill="#fff" className="animate-ping" />
            <circle cx="60" cy="50" r="1.5" fill="#ff0055" />
          </>
        );
      case 'coffee-iv':
        return (
          <>
            {/* Coffee tube directly injecting into side of neck/head */}
            <path d="M22,58 Q12,50 15,25" fill="none" stroke="#7c2d12" strokeWidth="2.5" />
            <path d="M15,25 Q17,20 12,15" fill="none" stroke="#7c2d12" strokeWidth="1.5" />
            <circle cx="22" cy="58" r="2" fill="#7c2d12" />
          </>
        );
      case 'vr-goggles':
        return (
          <>
            {/* Retro VR headset */}
            <rect x="28" y="42" width="44" height="15" rx="3" fill={svgColor} stroke="#fff" strokeWidth="1.5" />
            <line x1="28" y1="50" x2="72" y2="50" stroke={style.svgAccent} strokeWidth="2" />
            <rect x="42" y="44" width="16" height="5" rx="1" fill={style.svgBg} />
          </>
        );
      case 'none':
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
      {/* Visual Portrait */}
      <div className="flex flex-col items-center justify-center">
        <div className={`relative w-40 h-40 rounded-xl border-2 overflow-hidden transition-all duration-300 ${style.border} ${style.bg} ${style.glow}`}>
          
          {/* Scanline overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-emerald-500/5 to-transparent animate-scanline pointer-events-none" />
          
          {/* Grid lines background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:10px_10px] opacity-40" />

          {/* Hologram badge watermark */}
          <div className="absolute top-2 right-2 flex items-center justify-center opacity-40">
            <ShieldAlert className={`w-4 h-4 ${style.text}`} />
          </div>

          {/* Dynamic SVG Drawing */}
          <svg
            viewBox="0 0 100 100"
            className={`w-full h-full object-cover select-none ${glitchFactor ? 'scale-x-95 skew-x-3 translate-y-0.5 filter hue-rotate-15 saturate-200' : ''}`}
          >
            {/* Defs for gradients/filters if needed */}
            <defs>
              <radialGradient id="avatarGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={style.svgAccent} stopOpacity="0.25" />
                <stop offset="100%" stopColor={style.svgBg} stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Background spotlight */}
            <circle cx="50" cy="55" r="40" fill="url(#avatarGlow)" />

            {/* Archetype specific hair/earpiece back element */}
            {drawArchetypeHead(style.svgColor, style.svgAccent)}

            {/* General Face Outline */}
            <path
              d="M30,42 C30,30 70,30 70,42 L68,75 C68,82 32,82 32,75 Z"
              fill={style.svgBg}
              stroke={style.svgColor}
              strokeWidth="2.5"
            />

            {/* Neck & Shoulders */}
            <path
              d="M38,78 L34,88 L66,88 L62,78 Z"
              fill={style.svgBg}
              stroke={style.svgColor}
              strokeWidth="2.5"
            />
            {/* Tie / Collar for corporate look */}
            {archetype === 'corporate' && (
              <path d="M46,81 L50,88 L54,81 Z" fill={style.svgAccent} />
            )}

            {/* Ears */}
            <circle cx="28" cy="52" r="3.5" fill={style.svgBg} stroke={style.svgColor} strokeWidth="2" />
            <circle cx="72" cy="52" r="3.5" fill={style.svgBg} stroke={style.svgColor} strokeWidth="2" />

            {/* Eyes */}
            {drawEyes(style.svgColor)}

            {/* Nose */}
            <path d="M48,58 Q50,61 52,58" fill="none" stroke={style.svgColor} strokeWidth="1.8" />

            {/* Mouth */}
            {drawMouth(style.svgColor)}

            {/* Accessory Overlay */}
            {drawAccessory(style.svgColor)}
          </svg>

          {/* Photo label tag */}
          <div className="absolute bottom-1 left-2 flex items-center gap-1.5 opacity-60">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />
            <span className="text-[9px] font-mono tracking-widest text-white/70">REC</span>
          </div>

          <div className="absolute bottom-1 right-2">
            <span className="text-[8px] font-mono text-white/50">{name ? name.slice(0, 10).toUpperCase() : 'SURVIVOR'}</span>
          </div>
        </div>

        {/* Glitch preview control */}
        <button
          onClick={() => {
            setGlitchFactor(true);
            setTimeout(() => setGlitchFactor(false), 200);
          }}
          className="mt-3 px-3 py-1 flex items-center gap-1.5 text-xs font-mono rounded bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 transition"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Trigger Glitch
        </button>
      </div>

      {/* Selector Customization Options */}
      <div className="flex-1 flex flex-col justify-between gap-4">
        <div>
          <h4 className="text-sm font-semibold text-slate-300 font-display flex items-center gap-1.5 mb-3">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            Customize Security Hologram
          </h4>
          
          <div className="space-y-3 font-mono text-xs text-slate-400">
            {/* Expression Row */}
            <div>
              <p className="mb-1 text-[11px] text-slate-500 tracking-wider">EXPRESSION</p>
              <div className="flex flex-wrap gap-1.5">
                {(['dissociated', 'panic', 'dead-inside', 'smug', 'crying'] as AvatarExpression[]).map((exp) => (
                  <button
                    key={exp}
                    onClick={() => setExpression(exp)}
                    className={`px-2.5 py-1 rounded capitalize border transition-all ${
                      expression === exp
                        ? `${style.text} ${style.border} bg-slate-800/80 font-bold`
                        : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {exp.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Cyberware Accessories Row */}
            <div>
              <p className="mb-1 text-[11px] text-slate-500 tracking-wider">CYBERWARE ACC.</p>
              <div className="flex flex-wrap gap-1.5">
                {(['none', 'neon-visor', 'robotic-eye', 'coffee-iv', 'vr-goggles'] as AvatarAccessory[]).map((acc) => (
                  <button
                    key={acc}
                    onClick={() => setAccessory(acc)}
                    className={`px-2.5 py-1 rounded capitalize border transition-all ${
                      accessory === acc
                        ? `${style.text} ${style.border} bg-slate-800/80 font-bold`
                        : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {acc.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Overlay Tint Color Row */}
            <div>
              <p className="mb-1 text-[11px] text-slate-500 tracking-wider">OVERLAY TINT</p>
              <div className="flex gap-2">
                {[
                  { id: 'matrix-green', color: 'bg-emerald-500', label: 'Matrix' },
                  { id: 'neon-pink', color: 'bg-pink-500', label: 'Pink' },
                  { id: 'nuclear-amber', color: 'bg-amber-500', label: 'Radioactive' },
                  { id: 'glitch-blue', color: 'bg-cyan-500', label: 'Cyan' }
                ].map((tint) => (
                  <button
                    key={tint.id}
                    onClick={() => setColorFilter(tint.id as AvatarFilter)}
                    className={`flex items-center gap-1.5 px-2 py-1 rounded border transition-all ${
                      colorFilter === tint.id
                        ? 'border-white text-white bg-slate-800'
                        : 'border-slate-800 text-slate-500 hover:border-slate-700'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${tint.color}`} />
                    <span className="text-[10px]">{tint.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-slate-950/50 border border-slate-800/80 text-[11px] text-slate-400 flex items-start gap-2 leading-relaxed">
          <Eye className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
          <p>
            Your bio-electric parameters have been digitized. The hologram is fully compatible with internal company monitors to track active screen engagement.
          </p>
        </div>
      </div>
    </div>
  );
}
