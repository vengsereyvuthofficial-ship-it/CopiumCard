import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldAlert, 
  Terminal, 
  Cpu, 
  RefreshCcw, 
  Sparkles, 
  HelpCircle,
  AlertOctagon,
  FileCheck,
  User,
  Building,
  CheckCircle,
  Activity,
  Flame,
  Coffee
} from 'lucide-react';
import { QuizState, IDCardDetails } from './types';
import { 
  ARCHETYPES, 
  ENERGY_SOURCES, 
  ACHIEVEMENTS, 
  MENTAL_STATUSES, 
  evaluateQuizResults 
} from './quizData';
import QuizStep from './components/QuizStep';
import AvatarPicker, { AvatarExpression, AvatarAccessory, AvatarFilter } from './components/AvatarPicker';
import MemeIDCard from './components/MemeIDCard';

export default function App() {
  // Phase managers: 'landing' | 'quiz' | 'generating' | 'results'
  const [phase, setPhase] = useState<'landing' | 'quiz' | 'generating' | 'results'>('landing');
  const [step, setStep] = useState<number>(1);
  const [loadingText, setLoadingText] = useState<string>('Initializing systems...');
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  
  // Custom user parameters
  const [quizState, setQuizState] = useState<QuizState>({
    name: '',
    department: '',
    archetype: '',
    energySource: '',
    achievement: '',
    mentalStatus: ''
  });

  // Customized avatar settings linked directly to result card
  const [expression, setExpression] = useState<AvatarExpression>('dissociated');
  const [accessory, setAccessory] = useState<AvatarAccessory>('none');
  const [colorFilter, setColorFilter] = useState<AvatarFilter>('matrix-green');

  // Computed results state
  const [cardDetails, setCardDetails] = useState<IDCardDetails | null>(null);

  // Validate form
  const isLandingFormValid = quizState.name.trim().length >= 2;

  // Custom terminal loading sequence mock text
  const loadingLogs = [
    'Authenticating security credentials against Slack active directory...',
    'Evaluating current Copium reserve saturation levels...',
    'Scanning screen presence history logs for heavy dissociation periods...',
    'Injecting passive-aggressive synergistic meeting alignment metrics...',
    'Compiling ultimate digital misery index score...',
    'Forging cryptographic holographic card components...',
    'Finalizing official verified state of suffering...'
  ];

  // Sync avatar filter preference with selected archetype color themes on initial load
  useEffect(() => {
    if (quizState.archetype) {
      if (quizState.archetype === 'crypto') {
        setColorFilter('nuclear-amber');
      } else if (quizState.archetype === 'engineer') {
        setColorFilter('glitch-blue');
      } else if (quizState.archetype === 'designer') {
        setColorFilter('neon-pink');
      } else {
        setColorFilter('matrix-green');
      }
    }
  }, [quizState.archetype]);

  // Loading process emulator
  useEffect(() => {
    if (phase === 'generating') {
      setLoadingProgress(0);
      let logIndex = 0;
      setLoadingText(loadingLogs[0]);

      const logInterval = setInterval(() => {
        logIndex++;
        if (logIndex < loadingLogs.length) {
          setLoadingText(loadingLogs[logIndex]);
        }
      }, 350);

      const progressInterval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            clearInterval(logInterval);
            setTimeout(() => {
              // Compile result and transition
              const finalDetails = evaluateQuizResults(quizState);
              setCardDetails(finalDetails);
              setPhase('results');
            }, 300);
            return 100;
          }
          return prev + 5;
        });
      }, 100);

      return () => {
        clearInterval(progressInterval);
        clearInterval(logInterval);
      };
    }
  }, [phase]);

  const handleStartQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLandingFormValid) {
      setPhase('quiz');
      setStep(1);
    }
  };

  const handleOptionSelect = (field: keyof QuizState, value: any) => {
    setQuizState((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNextStep = () => {
    if (step < 4) {
      setStep((prev) => prev + 1);
    } else {
      // Generate stage
      setPhase('generating');
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    } else {
      setPhase('landing');
    }
  };

  const handleReset = () => {
    setQuizState({
      name: '',
      department: '',
      archetype: '',
      energySource: '',
      achievement: '',
      mentalStatus: ''
    });
    setExpression('dissociated');
    setAccessory('none');
    setColorFilter('matrix-green');
    setCardDetails(null);
    setPhase('landing');
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-emerald-500/30 selection:text-emerald-300 relative overflow-x-hidden font-sans">
      
      {/* Background visual graphics */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-radial-[circle_at_top] from-emerald-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-96 h-96 rounded-full bg-blue-500/5 filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-indigo-500/5 filter blur-[120px] pointer-events-none" />

      {/* HEADER SECTION */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md z-40 sticky top-0 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.1)]">
              <ShieldAlert className="w-4.5 h-4.5 text-emerald-400" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-sm tracking-wide text-white uppercase">The Digital Misery Dashboard</span>
              <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">SYS_REV // MEME_ID_GEN</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 font-mono text-xs text-slate-500 bg-slate-900/60 py-1 px-2.5 rounded-md border border-slate-800/80">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="hidden sm:inline">CRITICAL EXHAUSTION INDEX: </span>98.4%
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 md:py-12 flex flex-col justify-center items-center z-10">
        
        <AnimatePresence mode="wait">
          
          {/* PHASE 1: LANDING HERO & BOARDING INTAKE FORM */}
          {phase === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-xl flex flex-col items-center text-center gap-8"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="inline-flex py-1 px-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono tracking-wider uppercase mb-1">
                  ✨ Instant Satirical Badge Generator
                </div>
                
                <h1 className="text-4xl md:text-5xl font-black font-display tracking-tight text-white leading-none">
                  Get Your Official <br />
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 via-teal-300 to-cyan-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.15)]">
                    Digital Misery ID Card
                  </span>
                </h1>
                
                <p className="text-sm md:text-base text-slate-400 max-w-md font-sans leading-relaxed mt-2">
                  Generate your official Satirical Identity Card and showcase your daily digital suffering to colleagues, clients, and your feed.
                </p>
              </div>

              {/* Boarding Form Input Block */}
              <div className="w-full p-6 md:p-8 rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md text-left shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-800/80">
                  <Terminal className="w-5 h-5 text-emerald-400" />
                  <span className="font-mono text-xs uppercase tracking-widest text-slate-300 font-bold">RESTRICTED DECAY INTAKE FORM</span>
                </div>

                <form onSubmit={handleStartQuiz} className="space-y-5">
                  <div className="space-y-2">
                    <label className="block font-mono text-[11px] text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-emerald-400" />
                      Slack Handle / Professional Alias <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      maxLength={24}
                      placeholder="e.g. Satoshi McDonald, BugSlayer99"
                      value={quizState.name}
                      onChange={(e) => handleOptionSelect('name', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800/80 rounded-xl px-4 py-3 text-slate-200 font-mono text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-slate-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block font-mono text-[11px] text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-slate-500" />
                      Department / Organization <span className="text-slate-600">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      maxLength={28}
                      placeholder="e.g. Vaporware Dept, Zoom Alignment Board"
                      value={quizState.department}
                      onChange={(e) => handleOptionSelect('department', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800/80 rounded-xl px-4 py-3 text-slate-200 font-mono text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-slate-600"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!isLandingFormValid}
                    className={`w-full py-4 px-6 rounded-xl font-mono text-xs md:text-sm tracking-wider uppercase font-bold transition-all duration-300 relative overflow-hidden group flex items-center justify-center gap-2 ${
                      isLandingFormValid
                        ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] cursor-pointer'
                        : 'bg-slate-800/80 text-slate-500 cursor-not-allowed border border-slate-700/40'
                    }`}
                  >
                    Start Existential Evaluation
                  </button>
                </form>
              </div>

              {/* Minimal disclaimer footer */}
              <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 leading-normal">
                <AlertOctagon className="w-4 h-4 text-slate-600" />
                <p>Warning: This test contains heavy traces of corporate cynicism and copium. Results are legally Binding on Slack.</p>
              </div>
            </motion.div>
          )}

          {/* PHASE 2: STATE QUESTIONNAIRE */}
          {phase === 'quiz' && (
            <div className="w-full max-w-2xl bg-slate-900/30 border border-slate-900/80 p-6 md:p-8 rounded-3xl backdrop-blur-md shadow-2xl relative">
              {step === 1 && (
                <QuizStep
                  question={{
                    id: 'archetype',
                    questionText: 'Select your Digital Realm (Archetype)',
                    subText: 'Which class of digital martyr best represents your primary keyboard activity?',
                    options: ARCHETYPES
                  }}
                  selectedValue={quizState.archetype}
                  onSelect={(v) => handleOptionSelect('archetype', v)}
                  onNext={handleNextStep}
                  onBack={handlePrevStep}
                  isFirst={true}
                  stepNumber={1}
                  totalSteps={4}
                />
              )}

              {step === 2 && (
                <QuizStep
                  question={{
                    id: 'energySource',
                    questionText: 'What is your Primary Energy Source?',
                    subText: 'Select the primary chemical or emotional catalyst that fuels your active Slack status.',
                    options: ENERGY_SOURCES
                  }}
                  selectedValue={quizState.energySource}
                  onSelect={(v) => handleOptionSelect('energySource', v)}
                  onNext={handleNextStep}
                  onBack={handlePrevStep}
                  isFirst={false}
                  stepNumber={2}
                  totalSteps={4}
                />
              )}

              {step === 3 && (
                <QuizStep
                  question={{
                    id: 'achievement',
                    questionText: 'What is your Biggest Achievement this week?',
                    subText: 'Select the monumental success that is currently keeping you from quiet quitting.',
                    options: ACHIEVEMENTS
                  }}
                  selectedValue={quizState.achievement}
                  onSelect={(v) => handleOptionSelect('achievement', v)}
                  onNext={handleNextStep}
                  onBack={handlePrevStep}
                  isFirst={false}
                  stepNumber={3}
                  totalSteps={4}
                />
              )}

              {step === 4 && (
                <QuizStep
                  question={{
                    id: 'mentalStatus',
                    questionText: 'What is your Current Mental Status?',
                    subText: 'Be brutally honest. The system is scanning for micro-expressions through your browser.',
                    options: MENTAL_STATUSES
                  }}
                  selectedValue={quizState.mentalStatus}
                  onSelect={(v) => handleOptionSelect('mentalStatus', v)}
                  onNext={handleNextStep}
                  onBack={handlePrevStep}
                  isFirst={false}
                  stepNumber={4}
                  totalSteps={4}
                />
              )}
            </div>
          )}

          {/* PHASE 3: CALCULATING / LOADING STATE */}
          {phase === 'generating' && (
            <motion.div
              key="generating"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md flex flex-col items-center text-center gap-6"
            >
              <div className="relative flex items-center justify-center w-24 h-24 mb-2">
                {/* Glowing tech spinner rings */}
                <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 animate-spin" />
                <div className="absolute inset-2 rounded-full border-4 border-teal-500/10 border-b-teal-400 animate-spin [animation-direction:reverse]" />
                <div className="absolute inset-4 rounded-full border-2 border-dashed border-cyan-500/30 animate-pulse" />
                <Cpu className="w-8 h-8 text-emerald-400 animate-pulse" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold font-display text-white tracking-wide">FORGING BADGE</h3>
                <p className="text-xs font-mono text-emerald-400 tracking-wider">LEVEL OF DESPAIR BEING ASSESSED...</p>
              </div>

              {/* Progress Tracker bar */}
              <div className="w-full bg-slate-900 border border-slate-800 rounded-full h-4 overflow-hidden p-0.5 shadow-inner">
                <div 
                  className="h-full bg-linear-to-r from-emerald-500 via-teal-400 to-cyan-500 rounded-full transition-all duration-150 shadow-[0_0_10px_#10b981]"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>

              {/* Satirical Loading log line */}
              <div className="w-full p-4 rounded-xl bg-slate-950 border border-slate-900 font-mono text-[11px] text-slate-400 text-left min-h-[64px] flex items-center gap-3">
                <Activity className="w-4 h-4 text-emerald-500 shrink-0 animate-pulse" />
                <p className="leading-relaxed select-none animate-pulse">
                  <span className="text-emerald-500 font-bold">&gt;_ </span>
                  {loadingText}
                </p>
              </div>
            </motion.div>
          )}

          {/* PHASE 4: RESULTS & CUSTOMIZER DASHBOARD */}
          {phase === 'results' && cardDetails && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              
              {/* Left Column: ID Card rendering */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <MemeIDCard
                  details={cardDetails}
                  quizState={quizState}
                  expression={expression}
                  accessory={accessory}
                  colorFilter={colorFilter}
                />
              </div>

              {/* Right Column: Customization Controls & Summary Details */}
              <div className="lg:col-span-7 space-y-6 flex flex-col justify-center">
                
                {/* Custom header */}
                <div className="flex flex-col gap-2">
                  <div className="inline-flex py-1 px-2.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono tracking-widest uppercase w-fit">
                    BADGE SECURE // ONLINE
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold font-display text-white tracking-tight">
                    Your Digital Misery Badge is Ready
                  </h2>
                  <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-sans">
                    Your results have been processed using standard high-grade corporate metrics. Customize your security hologram to perfectly match your current emotional status before download.
                  </p>
                </div>

                {/* Avatar Hologram Customize Area */}
                <AvatarPicker
                  archetype={quizState.archetype}
                  name={quizState.name}
                  expression={expression}
                  setExpression={setExpression}
                  accessory={accessory}
                  setAccessory={setAccessory}
                  colorFilter={colorFilter}
                  setColorFilter={setColorFilter}
                />

                {/* Live Customizer State Bindings (Subtle sync to pass parameters to MemeIDCard props) */}
                <div className="hidden">
                  <span id="state-sync-expression">{expression}</span>
                  <span id="state-sync-accessory">{accessory}</span>
                  <span id="state-sync-colorFilter">{colorFilter}</span>
                </div>

                {/* Custom interactive AvatarPicker Event capture block */}
                <div className="p-5 rounded-2xl bg-slate-900/30 border border-slate-900/80 backdrop-blur-md space-y-3 font-mono text-xs">
                  <h4 className="font-semibold font-display text-sm text-slate-300 flex items-center gap-1.5 pb-2 border-b border-slate-900">
                    <Coffee className="w-4 h-4 text-emerald-400" />
                    Subject Evaluation Metrics
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-400">
                    <div className="p-2.5 rounded bg-slate-950/40 border border-slate-900">
                      <span className="text-[10px] text-slate-600 block">ARCHETYPE:</span>
                      <span className="text-slate-300 font-bold capitalize">{quizState.archetype}</span>
                    </div>
                    <div className="p-2.5 rounded bg-slate-950/40 border border-slate-900">
                      <span className="text-[10px] text-slate-600 block">PRIMARY FUEL:</span>
                      <span className="text-slate-300 font-bold capitalize">{quizState.energySource?.replace('-', ' ')}</span>
                    </div>
                    <div className="p-2.5 rounded bg-slate-950/40 border border-slate-900">
                      <span className="text-[10px] text-slate-600 block">MAJOR OUTCOME:</span>
                      <span className="text-slate-300 font-bold capitalize truncate block">{quizState.achievement?.replace('-', ' ')}</span>
                    </div>
                    <div className="p-2.5 rounded bg-slate-950/40 border border-slate-900">
                      <span className="text-[10px] text-slate-600 block">MIND STATUS:</span>
                      <span className="text-slate-300 font-bold capitalize">{quizState.mentalStatus?.replace('-', ' ')}</span>
                    </div>
                  </div>
                </div>

                {/* Return button */}
                <div className="flex justify-center pt-2">
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-800 bg-slate-900/40 text-slate-400 hover:text-slate-200 text-xs font-mono uppercase tracking-wider transition hover:bg-slate-900"
                  >
                    <RefreshCcw className="w-3.5 h-3.5" />
                    Recalculate Existential Score (Retake Quiz)
                  </button>
                </div>

              </div>

            </motion.div>
          )}

        </AnimatePresence>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-900 bg-slate-950/40 py-6 text-center font-mono text-[10px] text-slate-600 z-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <p>© 2026 The Digital Misery Commission. All digital suffering is property of Vaporware Corp.</p>
          <p className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
            Vaporware Core Engine v4.9.12 // Encrypted
          </p>
        </div>
      </footer>

    </div>
  );
}
