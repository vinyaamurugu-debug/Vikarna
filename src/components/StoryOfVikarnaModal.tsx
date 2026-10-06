import React from 'react';
import { BookOpen, X, Sparkles, Compass, Shield } from 'lucide-react';
import { sounds } from '../utils/sound';

interface StoryOfVikarnaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartAdventure?: () => void;
}

export const StoryOfVikarnaModal: React.FC<StoryOfVikarnaModalProps> = ({
  isOpen,
  onClose,
  onStartAdventure,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0B1120] border border-amber-500/30 rounded-2xl max-w-xl w-full shadow-[0_0_50px_rgba(240,178,62,0.15)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Gold Accent */}
        <div className="h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600" />

        <div className="p-6 overflow-y-auto space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-amber-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400/90 block">
                  Ancient Epic Inspiration
                </span>
                <h2 className="font-cinzel text-lg font-bold text-amber-200 leading-tight">
                  The Story of Vikarna
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

          {/* Narrative Content */}
          <div className="space-y-3.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <div className="bg-[#0F172A] p-4 rounded-xl border border-amber-500/20">
              <span className="text-amber-400 font-semibold block mb-1">
                The Courage in the Royal Hall
              </span>
              <p>
                In the ancient Indian epic <em>Mahabharata</em>, when elders, warriors, and kings sat silent during an unjust moment in the royal dice-hall, one young prince stood up. His name was <strong>Vikarna</strong>.
              </p>
            </div>

            <p>
              Unlike his brothers who cheered without thinking, and unlike the ministers who looked away, Vikarna broke the silence. He did not shout with anger. Instead, he calmly asked <strong>searching questions</strong>:
            </p>

            <div className="border-l-2 border-amber-400/60 pl-3.5 py-1 text-amber-200/90 italic font-cinzel text-xs sm:text-sm">
              “How can someone stake what is not rightfully theirs? Why are we accepting this without examining the rules of honor?”
            </div>

            <p>
              Even though the entire room pressured everyone to conform, Vikarna demonstrated the greatest quality of an independent mind: <strong>the bravery to question assumptions rather than blindly following the crowd.</strong>
            </p>

            <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-3.5 text-xs text-amber-200">
              <strong className="text-amber-300 block mb-0.5">The Modern Meaning:</strong>
              True critical thinking does not mean being contrary for its own sake. It means having the clarity and integrity to ask: <em>“What is the evidence? What is the fair truth?”</em>
            </div>
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
              START INVESTIGATING LIKE VIKARNA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
