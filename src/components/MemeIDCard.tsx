import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { 
  Download, 
  Share2, 
  Copy, 
  Check, 
  ExternalLink, 
  Activity, 
  AlertTriangle, 
  Cpu, 
  Layers, 
  ShieldAlert,
  Frown,
  CheckCircle,
  HelpCircle,
  X
} from 'lucide-react';
import { IDCardDetails, QuizState } from '../types';

interface MemeIDCardProps {
  details: IDCardDetails;
  quizState: QuizState;
  expression: string;
  accessory: string;
  colorFilter: string;
}

export default function MemeIDCard({ details, quizState, expression, accessory, colorFilter }: MemeIDCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // Get matching styles for avatar matching inside card
  const getAvatarColors = () => {
    switch (colorFilter) {
      case 'matrix-green':
        return { svgColor: '#10b981', svgAccent: '#34d399', svgBg: '#022c22', border: 'border-emerald-500/50', badgeGlow: 'shadow-[0_0_10px_rgba(16,185,129,0.3)]', text: 'text-emerald-400' };
      case 'neon-pink':
        return { svgColor: '#f43f5e', svgAccent: '#fb7185', svgBg: '#4c0519', border: 'border-pink-500/50', badgeGlow: 'shadow-[0_0_10px_rgba(244,63,94,0.3)]', text: 'text-pink-400' };
      case 'nuclear-amber':
        return { svgColor: '#f59e0b', svgAccent: '#fbbf24', svgBg: '#451a03', border: 'border-amber-500/50', badgeGlow: 'shadow-[0_0_10px_rgba(245,158,11,0.3)]', text: 'text-amber-400' };
      case 'glitch-blue':
      default:
        return { svgColor: '#06b6d4', svgAccent: '#22d3ee', svgBg: '#083344', border: 'border-cyan-500/50', badgeGlow: 'shadow-[0_0_10px_rgba(6,182,212,0.3)]', text: 'text-cyan-400' };
    }
  };

  const avStyles = getAvatarColors();

  // Draw Head
  const drawHeadOutline = (svgColor: string, svgAccent: string) => {
    switch (quizState.archetype) {
      case 'crypto':
        return (
          <>
            <path d="M30,38 C30,22 70,22 70,38 L72,42 L28,42 Z" fill={svgAccent} opacity="0.8" />
            <rect x="20" y="32" width="25" height="6" rx="2" fill={svgColor} />
            <circle cx="40" cy="50" r="12" stroke={svgColor} strokeWidth="1.5" fill="none" opacity="0.3" />
            <circle cx="60" cy="50" r="12" stroke={svgColor} strokeWidth="1.5" fill="none" opacity="0.3" />
          </>
        );
      case 'engineer':
        return (
          <>
            <path d="M25,35 L28,24 L34,28 L40,20 L48,27 L56,18 L64,28 L72,22 L75,35 Z" fill={svgAccent} opacity="0.75" />
            <rect x="22" y="44" width="7" height="16" rx="3" fill={svgColor} />
            <rect x="71" y="44" width="7" height="16" rx="3" fill={svgColor} />
            <path d="M25,44 C25,24 75,24 75,44" fill="none" stroke={svgColor} strokeWidth="4" />
          </>
        );
      case 'designer':
        return (
          <>
            <path d="M26,38 C26,20 74,18 74,38 L75,44 L25,44 Z" fill={svgAccent} />
            <circle cx="38" cy="50" r="10" stroke={svgColor} strokeWidth="1.5" fill="none" opacity="0.3" />
            <circle cx="62" cy="50" r="10" stroke={svgColor} strokeWidth="1.5" fill="none" opacity="0.3" />
            <line x1="48" y1="50" x2="52" y2="50" stroke={svgColor} strokeWidth="1.5" />
          </>
        );
      case 'corporate':
      default:
        return (
          <>
            <path d="M28,32 Q50,15 72,32 L75,40 L25,40 Z" fill={svgAccent} />
            <path d="M72,48 C75,48 77,52 75,55 L72,58" fill="none" stroke={svgColor} strokeWidth="2.5" />
          </>
        );
    }
  };

  // Draw Eyes
  const drawEyesOutline = (svgColor: string) => {
    switch (expression) {
      case 'panic':
        return (
          <>
            <circle cx="40" cy="50" r="4" fill="none" stroke={svgColor} strokeWidth="2" />
            <circle cx="60" cy="50" r="4" fill="none" stroke={svgColor} strokeWidth="2" />
            <circle cx="40" cy="50" r="1" fill={svgColor} />
            <circle cx="60" cy="50" r="1" fill={svgColor} />
            <path d="M34,42 Q40,39 46,43" fill="none" stroke={svgColor} strokeWidth="1.5" />
            <path d="M54,43 Q60,39 66,42" fill="none" stroke={svgColor} strokeWidth="1.5" />
          </>
        );
      case 'dead-inside':
        return (
          <>
            <line x1="34" y1="50" x2="46" y2="50" stroke={svgColor} strokeWidth="3" strokeLinecap="round" />
            <line x1="54" y1="50" x2="66" y2="50" stroke={svgColor} strokeWidth="3" strokeLinecap="round" />
            <path d="M34,54 Q40,57 46,54" fill="none" stroke={svgColor} strokeWidth="1" opacity="0.7" />
            <path d="M54,54 Q60,57 66,54" fill="none" stroke={svgColor} strokeWidth="1" opacity="0.7" />
          </>
        );
      case 'smug':
        return (
          <>
            <path d="M34,48 Q40,45 46,48" fill="none" stroke={svgColor} strokeWidth="2" />
            <path d="M54,49 Q60,46 66,48" fill="none" stroke={svgColor} strokeWidth="2" />
            <circle cx="39" cy="52" r="1.5" fill={svgColor} />
            <circle cx="61" cy="52" r="1.5" fill={svgColor} />
            <path d="M33,42 Q40,38 47,44" fill="none" stroke={svgColor} strokeWidth="2" />
            <path d="M53,43 Q60,40 67,39" fill="none" stroke={svgColor} strokeWidth="2" />
          </>
        );
      case 'crying':
        return (
          <>
            <path d="M34,51 L44,48" stroke={svgColor} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M56,48 L66,51" stroke={svgColor} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M38,53 Q38,62 36,65 C35,67 39,67 38,65 Z" fill={avStyles.svgAccent} opacity="0.9" />
            <path d="M62,53 Q62,62 64,65 C65,67 61,67 62,65 Z" fill={avStyles.svgAccent} opacity="0.9" />
          </>
        );
      case 'dissociated':
      default:
        return (
          <>
            <circle cx="40" cy="50" r="3" fill="none" stroke={svgColor} strokeWidth="2" />
            <circle cx="60" cy="50" r="3" fill="none" stroke={svgColor} strokeWidth="2" />
            <line x1="34" y1="42" x2="46" y2="42" stroke={svgColor} strokeWidth="1.5" />
            <line x1="54" y1="42" x2="66" y2="42" stroke={svgColor} strokeWidth="1.5" />
          </>
        );
    }
  };

  // Draw Mouth
  const drawMouthOutline = (svgColor: string) => {
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

  // Draw Accessory
  const drawAccessoryOutline = (svgColor: string) => {
    switch (accessory) {
      case 'neon-visor':
        return (
          <>
            <polygon points="28,44 72,44 70,54 30,54" fill={avStyles.svgAccent} opacity="0.85" />
            <line x1="28" y1="49" x2="72" y2="49" stroke="#fff" strokeWidth="1" opacity="0.6" />
          </>
        );
      case 'robotic-eye':
        return (
          <>
            <circle cx="60" cy="50" r="8" fill="none" stroke={avStyles.svgAccent} strokeWidth="2" />
            <line x1="68" y1="50" x2="78" y2="50" stroke={avStyles.svgAccent} strokeWidth="1.5" />
            <line x1="60" y1="42" x2="60" y2="35" stroke={avStyles.svgAccent} strokeWidth="1.5" />
            <circle cx="60" cy="50" r="1.5" fill="#ff0055" />
          </>
        );
      case 'coffee-iv':
        return (
          <>
            <path d="M22,58 Q12,50 15,25" fill="none" stroke="#7c2d12" strokeWidth="2.5" />
            <path d="M15,25 Q17,20 12,15" fill="none" stroke="#7c2d12" strokeWidth="1.5" />
            <circle cx="22" cy="58" r="2" fill="#7c2d12" />
          </>
        );
      case 'vr-goggles':
        return (
          <>
            <rect x="28" y="42" width="44" height="15" rx="3" fill={svgColor} stroke="#fff" strokeWidth="1.5" />
            <line x1="28" y1="50" x2="72" y2="50" stroke={avStyles.svgAccent} strokeWidth="2" />
            <rect x="42" y="44" width="16" height="5" rx="1" fill={avStyles.svgBg} />
          </>
        );
      default:
        return null;
    }
  };

  const downloadCardPNG = async () => {
    if (!cardRef.current || downloading) return;
    try {
      setDownloading(true);
      
      // Delay slightly to allow any animations to rest
      await new Promise((resolve) => setTimeout(resolve, 300));
      
      const dataUrl = await toPng(cardRef.current, {
        quality: 0.98,
        pixelRatio: 2, // 2x density for gorgeous high-resolution shares!
        backgroundColor: '#020617', // Force explicit background on export
        style: {
          transform: 'scale(1)',
          borderRadius: '0px',
        },
      });

      const filename = `satirical-id-${quizState.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'survivor'}.png`;
      const link = document.createElement('a');
      link.download = filename;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export card image:', err);
    } finally {
      setDownloading(false);
    }
  };

  const copyShareLink = () => {
    const shareText = `Check out my Official Digital Misery Satirical Badge!\n\nName: ${quizState.name}\nTitle: ${details.title}\nAnxiety: ${details.anxietyLevel}%\nPatience: ${details.patienceLevel}%\n\nGenerate your own at: ${window.location.href}`;
    navigator.clipboard.writeText(shareText)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => console.error('Could not copy text: ', err));
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      
      {/* Container holding physical card structure */}
      <div className="relative w-full max-w-sm md:max-w-md flex flex-col items-center">
        
        {/* Physical Badge Clip (Sits outside the downloaded frame for realism, but we render inside the node too for download integrity!) */}
        <div className="absolute -top-6 w-16 h-8 bg-slate-800 border-t border-x border-slate-700 rounded-t-xl shadow-lg z-10 flex items-center justify-center">
          <div className="w-10 h-3 bg-slate-950 rounded-full border border-slate-700/50" />
        </div>
        
        {/* Lanyard Cord Visual */}
        <div className="absolute -top-40 w-1 h-36 bg-linear-to-b from-slate-900 to-slate-700 pointer-events-none" />

        {/* --- MAIN ID CARD FOR EXPORT --- */}
        <div
          ref={cardRef}
          id="meme-card"
          className={`relative w-full aspect-[1/1.55] bg-slate-950 rounded-[2.5rem] border-4 p-6 md:p-8 flex flex-col justify-between overflow-hidden transition-all duration-500 shadow-[0_0_40px_rgba(0,0,0,0.8)] ${details.badgeColor}`}
          style={{ boxSizing: 'border-box' }}
        >
          {/* Futuristic background elements for high quality screenshot capture */}
          <div className="absolute inset-0 bg-radial-[circle_at_bottom_right] from-slate-900/40 via-transparent to-transparent pointer-events-none" />
          
          {/* Subtle Cyber Grid (renders beautifully on screenshots) */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

          {/* Hologram Circle Backdrop */}
          <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-slate-900/10 border border-slate-800/10 pointer-events-none" />

          {/* Lanyard Clip-Slot representation INSIDE the capture card so it matches properly */}
          <div className="flex justify-center mb-1">
            <div className="w-12 h-3.5 bg-slate-950 rounded-full border border-slate-800 flex items-center justify-center">
              <div className="w-8 h-1 bg-slate-900 rounded-full" />
            </div>
          </div>

          {/* CARD HEADER */}
          <div className="flex justify-between items-start gap-2 border-b border-white/10 pb-4 font-mono">
            <div className="flex flex-col">
              <span className="text-[10px] tracking-[0.25em] text-emerald-400 font-bold">OFFICIAL BADGE</span>
              <span className="text-[9px] text-white/50 tracking-wider">STATE RESILIENCE DEPT</span>
            </div>
            
            {/* Fake EMV Security Chip */}
            <div className="w-10 h-8 rounded-lg bg-linear-to-br from-amber-400/80 via-yellow-300/40 to-amber-600/80 p-0.5 border border-amber-500/30 flex flex-col justify-between overflow-hidden shadow-inner shrink-0">
              <div className="grid grid-cols-3 gap-0.5 h-full opacity-60">
                <div className="border-r border-b border-amber-950/20" />
                <div className="border-r border-b border-amber-950/20" />
                <div className="border-b border-amber-950/20" />
                <div className="border-r border-b border-amber-950/20" />
                <div className="border-r border-b border-amber-950/20" />
                <div className="border-b border-amber-950/20" />
              </div>
            </div>
          </div>

          {/* MAIN PROFILE ROW */}
          <div className="flex gap-4 md:gap-5 items-center my-4">
            
            {/* Photo Avatar Frame */}
            <div className={`relative w-24 h-24 md:w-28 md:h-28 rounded-2xl border-2 overflow-hidden bg-slate-950 shrink-0 ${avStyles.border} ${avStyles.badgeGlow}`}>
              {/* Scanline filter overlay */}
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/5 to-transparent animate-scanline pointer-events-none" />
              
              {/* Actual Avatar SVG Renderer */}
              <svg viewBox="0 0 100 100" className="w-full h-full bg-slate-950 object-cover">
                <circle cx="50" cy="55" r="40" fill={colorFilter === 'matrix-green' ? '#022c22' : colorFilter === 'neon-pink' ? '#4c0519' : colorFilter === 'nuclear-amber' ? '#451a03' : '#083344'} />
                {drawHeadOutline(avStyles.svgColor, avStyles.svgAccent)}
                <path d="M30,42 C30,30 70,30 70,42 L68,75 C68,82 32,82 32,75 Z" fill={avStyles.svgBg} stroke={avStyles.svgColor} strokeWidth="2.5" />
                <path d="M38,78 L34,88 L66,88 L62,78 Z" fill={avStyles.svgBg} stroke={avStyles.svgColor} strokeWidth="2.5" />
                {quizState.archetype === 'corporate' && (
                  <path d="M46,81 L50,88 L54,81 Z" fill={avStyles.svgAccent} />
                )}
                <circle cx="28" cy="52" r="3.5" fill={avStyles.svgBg} stroke={avStyles.svgColor} strokeWidth="2" />
                <circle cx="72" cy="52" r="3.5" fill={avStyles.svgBg} stroke={avStyles.svgColor} strokeWidth="2" />
                {drawEyesOutline(avStyles.svgColor)}
                <path d="M48,58 Q50,61 52,58" fill="none" stroke={avStyles.svgColor} strokeWidth="1.8" />
                {drawMouthOutline(avStyles.svgColor)}
                {drawAccessoryOutline(avStyles.svgColor)}
              </svg>

              {/* Secure Stamp */}
              <div className="absolute top-1 left-1.5 flex items-center gap-1 opacity-60">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                <span className="text-[7px] font-mono tracking-widest text-white/80">SYS_OK</span>
              </div>
            </div>

            {/* User details section */}
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">SUBJECT CLASSIFICATION</span>
              <h3 className="text-lg md:text-xl font-bold text-white font-display truncate leading-tight my-0.5">
                {quizState.name || 'Subject 404'}
              </h3>
              
              <div className="inline-flex py-1 px-2.5 rounded-md bg-white/5 border border-white/10 w-fit">
                <span className="text-[10px] md:text-xs font-mono font-bold text-slate-200 tracking-wide uppercase">
                  {details.title}
                </span>
              </div>

              <div className="mt-2 text-[10px] font-mono text-slate-400 flex flex-col gap-0.5">
                <div><span className="text-slate-600">DEPT:</span> {details.department}</div>
                <div><span className="text-slate-600">CLEARANCE:</span> <span className="text-amber-400/90 font-bold">{details.clearanceLevel}</span></div>
              </div>
            </div>
          </div>

          {/* DYNAMIC METRIC BARS */}
          <div className="space-y-3 font-mono border-y border-white/5 py-4">
            
            {/* Stat 1: Patience Level */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>PATIENCE QUOTA</span>
                <span className={details.patienceLevel <= 10 ? 'text-rose-500 font-bold animate-pulse' : 'text-slate-300'}>
                  {details.patienceLevel}%
                </span>
              </div>
              <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${
                    details.patienceLevel <= 15 ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${details.patienceLevel}%` }}
                />
              </div>
            </div>

            {/* Stat 2: Anxiety Level */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>ANXIETY THRESHOLD</span>
                <span className={details.anxietyLevel >= 85 ? 'text-rose-500 font-bold animate-pulse' : 'text-slate-300'}>
                  {details.anxietyLevel}%
                </span>
              </div>
              <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${
                    details.anxietyLevel >= 75 ? 'bg-rose-500' : 'bg-amber-500'
                  }`}
                  style={{ width: `${details.anxietyLevel}%` }}
                />
              </div>
            </div>

            {/* Stat 3: Client Resistance */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>CLIENT CRITIQUE SHIELD</span>
                <span className="text-slate-300">{details.clientResistance}%</span>
              </div>
              <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
                <div 
                  className="h-full bg-cyan-500 rounded-full transition-all duration-1000"
                  style={{ width: `${details.clientResistance}%` }}
                />
              </div>
            </div>

          </div>

          {/* DYNAMIC SILLY DUTIES & ABILITY */}
          <div className="my-3 font-mono text-[9px] md:text-[10px] text-slate-400 grid grid-cols-2 gap-2">
            <div className="p-2 rounded-lg bg-white/5 border border-white/10 flex flex-col justify-between">
              <span className="text-slate-600 font-bold">TACTICAL POWER:</span>
              <span className="text-slate-200 mt-1 leading-tight font-sans">{details.specialAbility}</span>
            </div>
            <div className="p-2 rounded-lg bg-white/5 border border-white/10 flex flex-col justify-between">
              <span className="text-slate-600 font-bold">DAILY BURDEN:</span>
              <span className="text-slate-200 mt-1 leading-tight font-sans">{details.dailyDuty}</span>
            </div>
          </div>

          {/* EXISTENTIAL QUOTE BOX */}
          <div className="relative p-3.5 rounded-xl bg-slate-950 border border-white/10 text-center flex flex-col justify-center min-h-[55px]">
            <span className="absolute -top-2 left-4 px-2 bg-slate-950 text-[8px] font-mono text-emerald-400 uppercase tracking-widest font-bold">
              EXISTENTIAL LOG
            </span>
            <p className="text-[10px] md:text-[11px] text-slate-300 italic font-sans leading-relaxed">
              "{details.existentialQuote}"
            </p>
          </div>

          {/* BARCODE FOOTER */}
          <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-1 font-mono">
            {/* Real Barcode representation using pure styled divs */}
            <div className="flex flex-col gap-1 w-2/3">
              <div className="flex items-end h-8 bg-transparent opacity-80 gap-[1.5px]">
                {/* Seed a deterministic set of bars for the barcode based on barcode value */}
                {Array.from({ length: 38 }).map((_, i) => {
                  const heights = [100, 80, 100, 60, 100, 80, 50, 100, 90, 100, 70, 100];
                  const height = heights[i % heights.length];
                  const widths = ['w-[1px]', 'w-[2px]', 'w-[1px]', 'w-[3px]', 'w-[1px]'];
                  const width = widths[i % widths.length];
                  return (
                    <div
                      key={i}
                      className={`bg-white ${width}`}
                      style={{ height: `${height}%` }}
                    />
                  );
                })}
              </div>
              <span className="text-[8px] tracking-widest text-white/40">{details.barcodeValue}</span>
            </div>

            <div className="flex flex-col items-end text-right">
              <span className="text-[8px] text-slate-500 uppercase tracking-widest">STATUS STAMP</span>
              <span className="text-[10px] font-bold text-red-500 border border-red-500/40 rounded px-1 mt-1 font-mono uppercase tracking-wide rotate-[-3deg] shadow-[0_0_8px_rgba(239,68,68,0.2)] animate-pulse-slow">
                VERIFIED EXHAUSTED
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* --- EXTERNAL CTA CONTROL ACTIONS --- */}
      <div className="flex flex-wrap gap-4 justify-center w-full max-w-sm">
        <button
          onClick={downloadCardPNG}
          disabled={downloading}
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-mono text-xs md:text-sm tracking-wider uppercase font-bold transition-all duration-300 ${
            downloading
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] cursor-pointer'
          }`}
        >
          {downloading ? (
            <>
              <Activity className="w-4 h-4 animate-spin" />
              Generating PNG...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              Download Card (PNG)
            </>
          )}
        </button>

        <button
          onClick={() => setShowShareModal(true)}
          className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800/80 hover:border-slate-700 text-white font-mono text-xs md:text-sm tracking-wider uppercase font-semibold transition-all duration-200 cursor-pointer"
        >
          <Share2 className="w-4 h-4 text-sky-400" />
          Share Meme
        </button>
      </div>

      {/* Share Modal Dialog */}
      {showShareModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-md w-full relative">
            <button 
              onClick={() => setShowShareModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-lg font-bold font-display text-white mb-2 flex items-center gap-2">
              <Share2 className="w-5 h-5 text-emerald-400" />
              Share Your Digital Misery
            </h3>
            <p className="text-xs text-slate-400 mb-4 font-sans leading-relaxed">
              Spread the misery! Share your custom ID badge statistics with fellow professional sufferers on social media.
            </p>

            <div className="space-y-3">
              {/* Copy Quote Button */}
              <button
                onClick={copyShareLink}
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-900 rounded-lg text-slate-400 group-hover:text-emerald-400 transition">
                    <Copy className="w-4 h-4" />
                  </div>
                  <div className="text-left font-mono text-xs">
                    <p className="text-white font-semibold">Copy Share Text</p>
                    <p className="text-[10px] text-slate-500">Includes your custom badge details</p>
                  </div>
                </div>
                {copied ? (
                  <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                    <Check className="w-3 h-3" /> Copied!
                  </span>
                ) : (
                  <span className="text-[11px] text-slate-500 group-hover:text-slate-300 font-mono">Copy</span>
                )}
              </button>

              {/* Twitter/X Button */}
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  `I just generated my official Satirical Identity Card on the Digital Misery Dashboard!\n\nClassification: ${details.title}\nAnxiety Level: ${details.anxietyLevel}%\nPatience Level: ${details.patienceLevel}%\n\nGet your misery badge at `
                )}&url=${encodeURIComponent(window.location.origin)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-900 rounded-lg text-slate-400 group-hover:text-sky-400 transition">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                  <div className="text-left font-mono text-xs">
                    <p className="text-white font-semibold">Post on X / Twitter</p>
                    <p className="text-[10px] text-slate-500">Share your suffering with the algorithm</p>
                  </div>
                </div>
                <span className="text-xs text-sky-400 group-hover:underline">Post</span>
              </a>

              {/* LinkedIn Share Button */}
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-900 rounded-lg text-slate-400 group-hover:text-blue-400 transition">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                  <div className="text-left font-mono text-xs">
                    <p className="text-white font-semibold">Post on LinkedIn</p>
                    <p className="text-[10px] text-slate-500">Pretend it's a professional achievement</p>
                  </div>
                </div>
                <span className="text-xs text-blue-400 group-hover:underline">Post</span>
              </a>
            </div>

            <button
              onClick={() => setShowShareModal(false)}
              className="mt-5 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono tracking-wider uppercase transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
