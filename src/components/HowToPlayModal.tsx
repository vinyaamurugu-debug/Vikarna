import React from 'react';
import { sounds } from '../utils/sound';
import { HelpCircle, X, Sparkles, BookOpen, Star, Compass, CheckCircle2 } from 'lucide-react';

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartFirstMystery: () => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({
  isOpen,
  onClose,
  onStartFirstMystery,
}) => {
  if (!isOpen) return null;

  const steps = [
    {
      num: '1',
      title: 'Hear What Everyone Says',
      desc: 'At the start of every case, people will immediately jump to blame someone. Don’t accept rumors as truth!',
      icon: '👂',
    },
    {
      num: '2',
      title: 'Press 🔍 “ASK WHY?”',
      desc: 'Your signature power! Young Vikarna will give you Socratic thinking questions to challenge hasty assumptions.',
      icon: '🔍',
    },
    {
      num: '3',
      title: 'Explore & Inspect Clues',
      desc: 'Click on glowing marks in the scene (footprints, broken objects, weather signs) to add verified facts to your Evidence Notebook.',
      icon: '👣',
    },
    {
      num: '4',
      title: 'Weigh Real Facts in the Notebook',
      desc: 'Open your Evidence Notebook anytime to compare rumors against what physical objects actually prove.',
      icon: '📖',
    },
    {
      num: '5',
      title: 'Decide & Earn Curiosity Stars ⭐',
      desc: 'Form an evidence-based conclusion. You earn up to 5 Curiosity Stars for thoughtful questions and fair reasoning!',
      icon: '⭐',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0B1120] border border-amber-500/35 rounded-2xl max-w-xl w-full shadow-[0_0_60px_rgba(240,178,62,0.2)] overflow-hidden flex flex-col max-h-[90vh]">
        <div className="h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600" />

        <div className="p-6 overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 mb-4 border-b border-amber-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <HelpCircle className="w-4 h-4 text-amber-400" />
              </div>
              <h2 className="font-cinzel text-xl font-bold text-[#F0B23E] leading-tight">
                How to Play Vikarna
              </h2>
            </div>

            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="p-1 rounded-lg text-slate-400 hover:text-amber-200 hover:bg-white/5 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
            In the ancient epic Mahabharata, while everyone in the hall stayed silent or followed the crowd, <strong>Vikarna</strong> had the courage to ask: <em>“Is this right? What is the truth?”</em>
          </p>

          {/* 5 Step Cards */}
          <div className="space-y-3 mb-6">
            {steps.map((st) => (
              <div
                key={st.num}
                className="bg-[#0F172A] rounded-xl p-3.5 border border-amber-500/20 flex items-start gap-3.5 hover:border-amber-400/40 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold text-sm flex items-center justify-center shrink-0 font-mono">
                  {st.num}
                </div>
                <div>
                  <h3 className="font-outfit font-bold text-sm text-amber-200 mb-0.5">
                    {st.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Curiosity Stars Info Box */}
          <div className="bg-amber-950/25 rounded-xl p-4 border border-amber-500/30 text-xs text-amber-200 mb-6">
            <strong className="block mb-1 text-amber-300">Remember the Golden Rule:</strong>
            Critical thinking does not mean disagreeing with everyone just to be contrary. It means following the <strong>EVIDENCE</strong> wherever it leads!
          </div>

          {/* Action button */}
          <button
            onClick={() => {
              sounds.playVictory();
              onClose();
              onStartFirstMystery();
            }}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-outfit text-sm font-extrabold rounded-xl transition-all shadow-[0_0_20px_rgba(240,178,62,0.3)] cursor-pointer"
          >
            LET’S SOLVE MYSTERY 1!
          </button>
        </div>
      </div>
    </div>
  );
};
