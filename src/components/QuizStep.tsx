import React from 'react';
import { motion } from 'motion/react';
import { 
  Coins, 
  Code2, 
  Palette, 
  Briefcase, 
  CupSoda, 
  Wind, 
  Zap, 
  Smile, 
  Laptop, 
  Sparkles, 
  TrendingDown, 
  Calendar, 
  Flame, 
  BatteryLow, 
  HeartCrack,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { QuizQuestion, QuizQuestionOption } from '../quizData';

interface QuizStepProps {
  question: QuizQuestion<any>;
  selectedValue: string;
  onSelect: (value: any) => void;
  onNext: () => void;
  onBack?: () => void;
  isFirst: boolean;
  stepNumber: number;
  totalSteps: number;
}

// Icon mapper to ensure type-safe rendering
const QuizIcon = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
    case 'Coins':
      return <Coins className={className} />;
    case 'Code2':
      return <Code2 className={className} />;
    case 'Palette':
      return <Palette className={className} />;
    case 'Briefcase':
      return <Briefcase className={className} />;
    case 'CupSoda':
      return <CupSoda className={className} />;
    case 'Wind':
      return <Wind className={className} />;
    case 'Zap':
      return <Zap className={className} />;
    case 'Smile':
      return <Smile className={className} />;
    case 'Laptop':
      return <Laptop className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    case 'TrendingDown':
      return <TrendingDown className={className} />;
    case 'Calendar':
      return <Calendar className={className} />;
    case 'Flame':
      return <Flame className={className} />;
    case 'BatteryLow':
      return <BatteryLow className={className} />;
    case 'HeartCrack':
      return <HeartCrack className={className} />;
    default:
      return <ShieldCheck className={className} />;
  }
};

export default function QuizStep({
  question,
  selectedValue,
  onSelect,
  onNext,
  onBack,
  isFirst,
  stepNumber,
  totalSteps
}: QuizStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="w-full flex flex-col gap-6"
    >
      {/* Step Indicator & Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono tracking-widest text-emerald-400 font-bold">
            QUESTION {stepNumber} OF {totalSteps}
          </span>
          <div className="flex gap-1">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i + 1 === stepNumber
                    ? 'w-6 bg-emerald-400 shadow-[0_0_8px_#10b981]'
                    : i + 1 < stepNumber
                    ? 'w-2 bg-emerald-600/60'
                    : 'w-2 bg-slate-800'
                }`}
              />
            ))}
          </div>
        </div>
        <h2 className="text-xl md:text-2xl font-bold font-display text-white tracking-tight">
          {question.questionText}
        </h2>
        <p className="text-xs md:text-sm text-slate-400 font-sans leading-relaxed">
          {question.subText}
        </p>
      </div>

      {/* Grid Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options.map((option) => {
          const isSelected = selectedValue === option.value;
          return (
            <button
              id={`option-${option.value}`}
              key={option.value}
              onClick={() => onSelect(option.value)}
              className={`group flex items-start gap-4 p-5 rounded-2xl text-left border-2 transition-all duration-300 cursor-pointer select-none outline-none relative overflow-hidden ${
                isSelected
                  ? 'bg-emerald-950/20 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                  : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-900/80 hover:border-slate-700 hover:shadow-[0_0_15px_rgba(255,255,255,0.02)]'
              }`}
            >
              {/* Decorative side bar on active */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-1.5 transition-transform duration-300 ${
                  isSelected ? 'bg-emerald-500 scale-y-100' : 'bg-transparent scale-y-0'
                }`}
              />

              {/* Icon Container */}
              <div
                className={`p-3 rounded-xl transition-all duration-300 ${
                  isSelected
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700/80 group-hover:text-slate-300'
                }`}
              >
                <QuizIcon name={option.iconName} className="w-6 h-6" />
              </div>

              {/* Text Area */}
              <div className="flex-1 flex flex-col gap-1 pr-2">
                <span
                  className={`font-semibold font-display text-sm md:text-base leading-snug transition-colors ${
                    isSelected ? 'text-emerald-300' : 'text-slate-200 group-hover:text-white'
                  }`}
                >
                  {option.label}
                </span>
                <span className="text-xs text-slate-400 leading-normal group-hover:text-slate-300 font-sans">
                  {option.description}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-900">
        <div>
          {!isFirst && onBack && (
            <button
              onClick={onBack}
              className="px-5 py-2.5 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs md:text-sm font-mono tracking-wider uppercase transition-all"
            >
              Back
            </button>
          )}
        </div>

        <button
          onClick={onNext}
          disabled={!selectedValue}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-mono text-xs md:text-sm tracking-wider uppercase transition-all duration-300 ${
            selectedValue
              ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] font-bold cursor-pointer'
              : 'bg-slate-800/80 text-slate-500 cursor-not-allowed border border-slate-700/40'
          }`}
        >
          {stepNumber === totalSteps ? 'Generate Badge' : 'Continue'}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
