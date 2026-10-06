import React from 'react';
import { Clue } from '../types/mystery';
import { sounds } from '../utils/sound';
import { Check, Sparkles, BookPlus, X } from 'lucide-react';

interface ClueDiscoveryModalProps {
  clue: Clue;
  isOpen: boolean;
  isAlreadyAdded: boolean;
  onAddToNotebook: () => void;
  onClose: () => void;
}

export const ClueDiscoveryModal: React.FC<ClueDiscoveryModalProps> = ({
  clue,
  isOpen,
  isAlreadyAdded,
  onAddToNotebook,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0B1120] border border-amber-500/40 rounded-2xl max-w-md w-full shadow-[0_0_60px_rgba(240,178,62,0.2)] overflow-hidden">
        {/* Top Gold Trim */}
        <div className="h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600" />

        <div className="p-6">
          {/* Header Tag & Close */}
          <div className="flex items-center justify-between gap-3 mb-3 border-b border-amber-500/20 pb-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Clue Discovered</span>
            </div>
            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="p-1 rounded-lg text-slate-400 hover:text-amber-200 hover:bg-white/5 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Clue Title */}
          <h3 className="font-cinzel text-xl font-bold text-[#F0B23E] mb-2">
            {clue.name}
          </h3>

          {/* Category Chip */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
            <span className="font-semibold text-amber-300 capitalize">{clue.category} Evidence</span>
            <span>·</span>
            <span className="text-slate-300 font-mono">{clue.importance === 'key' ? '⭐ Key Evidence' : 'Supporting Detail'}</span>
          </div>

          {/* Clue Details Box */}
          <div className="bg-[#0F172A] rounded-xl p-4 border border-amber-500/25 text-sm text-slate-200 leading-relaxed mb-6">
            <p className="font-medium text-amber-100 mb-2">{clue.description}</p>
            <p className="text-xs text-slate-300 leading-normal">{clue.details}</p>
          </div>

          {/* Action Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="w-1/3 py-2.5 px-3 rounded-xl border border-amber-500/30 text-xs font-semibold text-slate-300 hover:text-amber-200 hover:bg-[#070B14] transition-colors"
            >
              Inspect Later
            </button>

            <button
              onClick={() => {
                sounds.playPageTurn();
                onAddToNotebook();
              }}
              className={`w-2/3 py-2.5 px-4 rounded-xl text-xs font-bold font-outfit transition-all flex items-center justify-center gap-2 shadow-xs ${
                isAlreadyAdded
                  ? 'bg-emerald-950/80 border border-emerald-400/40 text-emerald-300 cursor-default'
                  : 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-extrabold cursor-pointer shadow-[0_0_20px_rgba(240,178,62,0.3)]'
              }`}
            >
              {isAlreadyAdded ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Already In Notebook</span>
                </>
              ) : (
                <>
                  <BookPlus className="w-4 h-4 text-slate-950" />
                  <span>ADD TO EVIDENCE NOTEBOOK</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
