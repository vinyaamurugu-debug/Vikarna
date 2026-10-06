import React, { useEffect } from 'react';
import { Mystery, DecisionOption } from '../types/mystery';
import { sounds } from '../utils/sound';
import { Star, Award, CheckCircle2, ArrowRight, Map, RotateCcw } from 'lucide-react';

interface ResultsScreenProps {
  mystery: Mystery;
  decision: DecisionOption;
  cluesDiscoveredIds: string[];
  askedWhyCount: number;
  hintsUsedCount: number;
  onNextMystery: () => void;
  onReturnToMap: () => void;
  onReplayMystery: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  mystery,
  decision,
  cluesDiscoveredIds,
  askedWhyCount,
  hintsUsedCount,
  onNextMystery,
  onReturnToMap,
  onReplayMystery,
}) => {
  const totalClues = mystery.clues.length;
  const discoveredCount = cluesDiscoveredIds.length;
  const hasKeyClue = mystery.clues.some(
    (c) => c.importance === 'key' && cluesDiscoveredIds.includes(c.id)
  );
  const foundAllClues = discoveredCount === totalClues;
  const askedQuestion = askedWhyCount > 0;
  const avoidedUnfairAccusation = decision.reasoningCategory === 'evidence_based';
  const evidenceDecision = decision.isCorrect;

  const starBreakdown = [
    { title: 'Asked a Useful Question', earned: askedQuestion, desc: 'Used the Ask Why inquiry tool' },
    { title: 'Found Important Key Evidence', earned: hasKeyClue, desc: 'Uncovered vital physical facts' },
    { title: 'Found All Scene Clues', earned: foundAllClues, desc: `Discovered all ${totalClues} clues in the area` },
    { title: 'Avoided Unfair Accusation', earned: avoidedUnfairAccusation, desc: 'Refused to blame someone without proof' },
    { title: 'Evidence-Based Resolution', earned: evidenceDecision, desc: 'Reached the conclusion backed by reality' },
  ];

  const earnedStarsCount = starBreakdown.filter((s) => s.earned).length;

  useEffect(() => {
    sounds.playVictory();
    for (let i = 0; i < earnedStarsCount; i++) {
      setTimeout(() => {
        sounds.playStar(i);
      }, 400 + i * 200);
    }
  }, [earnedStarsCount]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 min-h-[calc(100vh-70px)] flex flex-col justify-between bg-[#070B14]">
      <div>
        {/* Celebration Title */}
        <div className="text-center mb-6">
          <span className="text-xs uppercase font-bold tracking-widest text-amber-400 block mb-1">
            Investigation Complete
          </span>
          <h1 className="font-cinzel text-3xl sm:text-5xl font-black text-[#F0B23E] gold-text-glow tracking-wide mb-2">
            MYSTERY SOLVED!
          </h1>
          <p className="text-sm text-slate-300">
            Case #{mystery.order} · {mystery.title}
          </p>
        </div>

        {/* Stars Display Arena */}
        <div className="bg-[#0B1120] rounded-2xl p-6 border border-amber-500/35 shadow-[0_0_40px_rgba(240,178,62,0.15)] text-center mb-6">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3">
            {[0, 1, 2, 3, 4].map((idx) => {
              const isEarned = idx < earnedStarsCount;
              return (
                <div
                  key={idx}
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all ${
                    isEarned
                      ? 'bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-400 text-slate-950 shadow-[0_0_20px_rgba(240,178,62,0.5)] scale-105'
                      : 'bg-[#070B14] text-slate-700 border border-slate-800'
                  }`}
                >
                  <Star className={`w-7 h-7 sm:w-8 sm:h-8 ${isEarned ? 'fill-slate-950 text-slate-950' : 'text-slate-700'}`} />
                </div>
              );
            })}
          </div>

          <h2 className="font-outfit text-xl font-bold text-amber-100 mb-1">
            {earnedStarsCount >= 4
              ? 'You investigated with extraordinary wisdom!'
              : 'Good observation! You’re sharpening your reasoning skills.'}
          </h2>
          <span className="text-xs text-amber-400 font-semibold font-mono">
            {earnedStarsCount} / 5 Curiosity Stars Earned ⭐
          </span>
        </div>

        {/* Star Criteria Breakdown */}
        <div className="bg-[#0B1120] rounded-2xl p-5 border border-amber-500/20 mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-3">
            Curiosity Star Achievements:
          </span>
          <div className="space-y-2.5">
            {starBreakdown.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-3 text-xs bg-[#070B14] rounded-lg p-2.5 border border-amber-500/15"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs ${
                      item.earned ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-slate-800 text-slate-600'
                    }`}
                  >
                    ★
                  </span>
                  <div>
                    <span className="font-semibold text-slate-200">{item.title}</span>
                    <span className="text-slate-400 block text-[11px]">{item.desc}</span>
                  </div>
                </div>
                <span className={`font-semibold ${item.earned ? 'text-amber-400' : 'text-slate-600'}`}>
                  {item.earned ? 'Earned +1 ⭐' : '0 ⭐'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Lesson Card */}
        <div className="bg-gradient-to-r from-[#172544] via-[#0F1A30] to-[#2E1F0F] rounded-2xl p-6 text-white border border-amber-500/30 shadow-md mb-8">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block mb-1">
            The Vikarna Lesson
          </span>
          <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#F0B23E] mb-2">
            “{mystery.lesson}”
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            <strong className="text-amber-200">The True Story:</strong> {mystery.solutionSummary}
          </p>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-amber-500/20">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => {
              sounds.playClick();
              onReplayMystery();
            }}
            className="flex-1 sm:flex-initial py-3 px-4 rounded-xl border border-amber-500/30 bg-[#0B1120] hover:bg-[#121B30] text-xs font-semibold text-slate-200 transition-colors flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4 text-amber-400" />
            <span>Replay Mystery</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              onReturnToMap();
            }}
            className="flex-1 sm:flex-initial py-3 px-4 rounded-xl border border-amber-500/30 bg-[#0B1120] hover:bg-[#121B30] text-xs font-semibold text-slate-200 transition-colors flex items-center justify-center gap-1.5"
          >
            <Map className="w-4 h-4 text-amber-400" />
            <span>Adventure Map</span>
          </button>
        </div>

        <button
          onClick={() => {
            sounds.playVictory();
            onNextMystery();
          }}
          className="w-full sm:w-auto py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-500 text-slate-950 font-outfit text-sm font-extrabold transition-all shadow-[0_0_25px_rgba(240,178,62,0.35)] flex items-center justify-center gap-2 cursor-pointer group"
        >
          <span>NEXT MYSTERY</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
