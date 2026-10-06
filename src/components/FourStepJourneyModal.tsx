import React from 'react';
import { Compass, X, CheckCircle2, Search, HelpCircle, FileText, ArrowRight } from 'lucide-react';
import { sounds } from '../utils/sound';

interface FourStepJourneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartAdventure?: () => void;
}

export const FourStepJourneyModal: React.FC<FourStepJourneyModalProps> = ({
  isOpen,
  onClose,
  onStartAdventure,
}) => {
  if (!isOpen) return null;

  const steps = [
    {
      num: '01',
      title: 'OBSERVE & IDENTIFY THE CLAIM',
      desc: 'Listen to what the crowd or accusers are claiming. Recognize when an accusation is based purely on rumors or hasty assumptions.',
      icon: '👁️',
      color: 'text-amber-400',
    },
    {
      num: '02',
      title: 'QUESTION THE ASSUMPTION (ASK WHY?)',
      desc: 'Use Vikarna’s signature inquiry. Ask: “What proof do we actually have? What else could have caused this? Did anyone verify it?”',
      icon: '🔍',
      color: 'text-amber-400',
    },
    {
      num: '03',
      title: 'GATHER PHYSICAL EVIDENCE',
      desc: 'Inspect the environment thoroughly. Look for footprints, broken objects, weather indicators, and mechanical clues that verify reality.',
      icon: '🧩',
      color: 'text-amber-400',
    },
    {
      num: '04',
      title: 'DECIDE ON VERIFIED FACTS',
      desc: 'Connect the clues inside your Evidence Notebook. Form a conclusion based on solid proof rather than social pressure or fear.',
      icon: '⚖️',
      color: 'text-amber-400',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0B1120] border border-amber-500/30 rounded-2xl max-w-xl w-full shadow-[0_0_50px_rgba(240,178,62,0.15)] overflow-hidden flex flex-col max-h-[90vh]">
        <div className="h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600" />

        <div className="p-6 overflow-y-auto space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-amber-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400/90 block">
                  Methodology of Reason
                </span>
                <h2 className="font-cinzel text-lg font-bold text-amber-200 leading-tight">
                  The 4–Step Journey
                </h2>
              </div>
            </div>

            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="p-1 rounded-lg text-slate-400 hover:text-amber-200 hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Every mystery in <strong>VIKARNA</strong> guides you through a repeatable, lifelong critical thinking system:
          </p>

          {/* 4 Steps */}
          <div className="space-y-3">
            {steps.map((st) => (
              <div
                key={st.num}
                className="bg-[#0F172A] rounded-xl p-3.5 border border-amber-500/20 flex items-start gap-3.5 hover:border-amber-400/40 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold text-xs flex items-center justify-center shrink-0 font-mono">
                  {st.num}
                </div>
                <div>
                  <h3 className="font-outfit font-bold text-xs sm:text-sm text-amber-200 mb-0.5">
                    {st.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Golden Rule Callout */}
          <div className="bg-amber-950/25 border border-amber-500/30 rounded-xl p-3.5 text-xs text-amber-200/95">
            <strong>Key Insight:</strong> Never assume you must always disagree with others. If the crowd’s belief is verified by real facts, reason guides you to accept the truth!
          </div>

          {/* CTA */}
          <div className="pt-2">
            <button
              onClick={() => {
                sounds.playVictory();
                onClose();
                if (onStartAdventure) onStartAdventure();
              }}
              className="w-full py-3 px-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-outfit text-xs font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(240,178,62,0.2)] cursor-pointer"
            >
              APPLY THE 4 STEPS TO A MYSTERY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
