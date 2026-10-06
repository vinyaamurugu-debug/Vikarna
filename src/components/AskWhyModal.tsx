import React, { useState } from 'react';
import { Mystery } from '../types/mystery';
import { VikarnaPrinceIllustration } from './VikarnaPrinceIllustration';
import { sounds } from '../utils/sound';
import { HelpCircle, ChevronRight, Sparkles, X, Lightbulb, Compass } from 'lucide-react';

interface AskWhyModalProps {
  mystery: Mystery;
  discoveredClueIds: string[];
  isOpen: boolean;
  onClose: () => void;
  onHintUsed: (level: number) => void;
}

export const AskWhyModal: React.FC<AskWhyModalProps> = ({
  mystery,
  discoveredClueIds,
  isOpen,
  onClose,
  onHintUsed,
}) => {
  const [currentHintLevel, setCurrentHintLevel] = useState<number>(1);

  if (!isOpen) return null;

  const handleNextHint = (level: number) => {
    setCurrentHintLevel(level);
    sounds.playAskWhy();
    onHintUsed(level);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0B1120] border border-amber-500/40 rounded-2xl max-w-lg w-full shadow-[0_0_60px_rgba(240,178,62,0.2)] overflow-hidden">
        {/* Top Gold Gradient Trim */}
        <div className="h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600" />

        <div className="p-6">
          {/* Header row */}
          <div className="flex items-center justify-between gap-3 mb-5 border-b border-amber-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-[0_0_12px_rgba(240,178,62,0.25)]">
                <HelpCircle className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 block">
                  Signature Inquiry Mechanic
                </span>
                <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#F0B23E] leading-tight">
                  Vikarna Asks: “WHY?”
                </h3>
              </div>
            </div>

            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-amber-200 hover:bg-white/5 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Young Vikarna Dialogue Card */}
          <div className="bg-[#0F172A] rounded-xl p-4 border border-amber-500/25 flex items-start gap-3.5 mb-5 shadow-xs">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-amber-400/80 shrink-0 gold-glow-sm">
              <VikarnaPrinceIllustration className="w-full h-full" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-400 block mb-0.5">
                Vikarna's Guiding Question:
              </span>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                "{mystery.vikarnaPrompt}"
              </p>
            </div>
          </div>

          {/* Socratic Question Box */}
          <div className="mb-5 bg-[#070B14] rounded-xl p-3.5 border border-amber-500/20">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-2">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              Questions to Challenge the Rumor:
            </span>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {mystery.questions.map((q, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Progressive Hint Ladder */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
              <span>Socratic Hint Progression</span>
              <span className="text-amber-400 font-mono">Level {currentHintLevel} / 3</span>
            </div>

            {/* Hint Tier 1 */}
            <div className="rounded-xl p-3.5 border bg-[#0F172A] border-amber-500/30 text-slate-200">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                  Hint 1: First Observation
                </span>
                <span className="text-[10px] text-amber-400/80 font-mono">Subtle</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-300">{mystery.hints.hint1}</p>
            </div>

            {/* Hint Tier 2 */}
            {currentHintLevel >= 2 ? (
              <div className="rounded-xl p-3.5 border bg-[#0F172A] border-amber-500/40 text-slate-200 animate-in fade-in duration-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Hint 2: Closer Inquiry
                  </span>
                  <span className="text-[10px] text-amber-400/80 font-mono">Targeted</span>
                </div>
                <p className="text-xs leading-relaxed text-slate-300">{mystery.hints.hint2}</p>
              </div>
            ) : (
              <button
                onClick={() => handleNextHint(2)}
                className="w-full py-2.5 px-3 rounded-xl border border-dashed border-amber-500/30 text-xs font-semibold text-amber-300/80 hover:text-amber-200 hover:border-amber-400/60 bg-[#070B14] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Unlock Hint 2 (Look Closer)</span>
                <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
              </button>
            )}

            {/* Hint Tier 3 */}
            {currentHintLevel >= 3 ? (
              <div className="rounded-xl p-3.5 border bg-[#14233C] border-amber-400/50 text-slate-200 animate-in fade-in duration-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5 text-amber-300" />
                    Hint 3: Guiding Path
                  </span>
                  <span className="text-[10px] text-amber-300 font-mono font-bold">Direct Guide</span>
                </div>
                <p className="text-xs leading-relaxed text-amber-100">{mystery.hints.hint3}</p>
              </div>
            ) : currentHintLevel >= 2 ? (
              <button
                onClick={() => handleNextHint(3)}
                className="w-full py-2.5 px-3 rounded-xl border border-dashed border-amber-500/30 text-xs font-semibold text-amber-300/80 hover:text-amber-200 hover:border-amber-400/60 bg-[#070B14] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Unlock Hint 3 (Final Guide)</span>
                <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
              </button>
            ) : null}
          </div>

          {/* Action button */}
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-outfit text-xs font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(240,178,62,0.25)] cursor-pointer uppercase tracking-wider"
          >
            I'm Ready to Gather Evidence
          </button>
        </div>
      </div>
    </div>
  );
};
