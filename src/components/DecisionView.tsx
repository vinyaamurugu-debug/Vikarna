import React, { useState } from 'react';
import { Mystery, DecisionOption, Clue } from '../types/mystery';
import { sounds } from '../utils/sound';
import { BookOpen, AlertCircle, ArrowLeft, ChevronRight, HelpCircle } from 'lucide-react';

interface DecisionViewProps {
  mystery: Mystery;
  discoveredClues: Clue[];
  onDecisionChosen: (decision: DecisionOption) => void;
  onBackToInvestigation: () => void;
  onOpenNotebook: () => void;
}

export const DecisionView: React.FC<DecisionViewProps> = ({
  mystery,
  discoveredClues,
  onDecisionChosen,
  onBackToInvestigation,
  onOpenNotebook,
}) => {
  const [selectedDecisionId, setSelectedDecisionId] = useState<string | null>(null);
  const [feedbackState, setFeedbackState] = useState<{
    option: DecisionOption;
    showModal: boolean;
  } | null>(null);

  const handleSelectOption = (option: DecisionOption) => {
    setSelectedDecisionId(option.id);
    sounds.playClick();
  };

  const handleConfirmDecision = () => {
    if (!selectedDecisionId) return;
    const option = mystery.decisions.find((d) => d.id === selectedDecisionId);
    if (!option) return;

    if (!option.isCorrect) {
      sounds.playClick();
      setFeedbackState({ option, showModal: true });
    } else {
      sounds.playVictory();
      onDecisionChosen(option);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 min-h-[calc(100vh-70px)] flex flex-col justify-between bg-[#070B14]">
      <div>
        {/* Top Header & Navigation */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <button
            onClick={() => {
              sounds.playClick();
              onBackToInvestigation();
            }}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-amber-300 py-1.5 px-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400" />
            <span>Back to Scene</span>
          </button>

          <button
            onClick={() => {
              sounds.playPageTurn();
              onOpenNotebook();
            }}
            className="flex items-center gap-1.5 text-xs font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/40 py-1.5 px-3 rounded-lg hover:bg-amber-500/20 transition-colors shadow-xs"
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Review Notebook ({discoveredClues.length} clues)</span>
          </button>
        </div>

        {/* Stage Progress Header */}
        <div className="bg-[#0B1120] rounded-2xl p-6 border border-amber-500/30 shadow-md mb-6">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2">
            <span className="text-amber-400 font-mono">Stage 5 of 5: Resolution</span>
            <span className="text-amber-300">Think Before You Decide</span>
          </div>
          <h1 className="font-cinzel text-xl sm:text-2xl font-bold text-[#F0B23E] mb-2">
            {mystery.title}: Form Your Conclusion
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Review the evidence you gathered. Which conclusion is supported by real physical facts rather than gossip or haste?
          </p>
        </div>

        {/* Evidence Highlights Strip */}
        <div className="bg-[#0D1527] rounded-xl p-4 border border-amber-500/20 mb-6">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block mb-2">
            Verified Physical Evidence on Record:
          </span>
          <div className="flex flex-wrap gap-2">
            {discoveredClues.map((clue) => (
              <span
                key={clue.id}
                className="text-xs bg-[#070B14] text-amber-200 px-3 py-1 rounded-md border border-amber-500/30 font-medium"
              >
                ✓ {clue.name}
              </span>
            ))}
          </div>
        </div>

        {/* Decision Choices */}
        <div className="space-y-3.5 mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
            What should Vikarna and the investigators conclude?
          </span>

          {mystery.decisions.map((option, index) => {
            const isSelected = selectedDecisionId === option.id;
            const letter = String.fromCharCode(65 + index);

            return (
              <button
                key={option.id}
                onClick={() => handleSelectOption(option)}
                className={`w-full text-left p-4 sm:p-5 rounded-xl border-2 transition-all flex items-start gap-4 focus-visible:outline-none cursor-pointer ${
                  isSelected
                    ? 'bg-[#15233E] border-amber-400 shadow-[0_0_25px_rgba(240,178,62,0.25)]'
                    : 'bg-[#0B1120] border-amber-500/25 hover:border-amber-400/50 hover:bg-[#0E172B]'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors font-mono ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 shadow-[0_0_10px_rgba(240,178,62,0.5)]'
                      : 'bg-[#121B30] text-amber-300 border border-amber-500/30'
                  }`}
                >
                  {letter}
                </div>
                <div className="flex-1">
                  <p className="text-xs sm:text-sm font-medium text-slate-100 leading-relaxed">
                    {option.text}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Confirmation Bar */}
      <div className="pt-4 border-t border-amber-500/20">
        <button
          onClick={handleConfirmDecision}
          disabled={!selectedDecisionId}
          className={`w-full py-4 px-6 rounded-xl font-outfit text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-xs ${
            selectedDecisionId
              ? 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-500 text-slate-950 font-extrabold cursor-pointer shadow-[0_0_30px_rgba(240,178,62,0.35)]'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
          }`}
        >
          <span>SUBMIT MY FINAL DECISION</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Encouragement Dialog */}
      {feedbackState && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0B1120] border border-amber-500/40 rounded-2xl max-w-md w-full shadow-[0_0_60px_rgba(240,178,62,0.2)] p-6">
            <div className="flex items-center gap-2 text-amber-400 mb-3">
              <AlertCircle className="w-5 h-5 text-amber-400" />
              <h3 className="font-outfit text-lg font-bold text-amber-100">
                Let's Look at the Evidence Again
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-4">
              "{feedbackState.option.feedback}"
            </p>

            <div className="bg-[#070B14] rounded-xl p-3 border border-amber-500/25 text-xs text-amber-200/90 italic mb-6">
              Vikarna says: “A thoughtful investigator never rushes to blame someone without solid proof. Take another look at our clues!”
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  sounds.playPageTurn();
                  setFeedbackState(null);
                  onOpenNotebook();
                }}
                className="w-1/2 py-2.5 px-3 rounded-xl border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-xs font-bold text-amber-300 transition-colors flex items-center justify-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                <span>Check Notebook</span>
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  setFeedbackState(null);
                }}
                className="w-1/2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-slate-950 text-xs font-extrabold transition-colors"
              >
                Try Another Option
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
